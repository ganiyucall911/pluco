# Running the contract tests in CI

The repository has 65 Foundry tests but CI does not run them yet: `pluco-dev` has
OAuth App access restrictions, so workflow files cannot be updated by tooling and the
change has to land through the GitHub UI or a token with `workflow` scope.

Add this job to `.github/workflows/build.yml` (or drop it in as its own
`.github/workflows/contracts.yml`):

```yaml
  contracts:
    name: Contract tests
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: contracts
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: recursive # forge-std and openzeppelin-contracts are submodules
      - uses: foundry-rs/foundry-toolchain@v1
        with:
          version: stable
      - name: forge test
        run: forge test --gas-report
```

Two details that will bite if they are missed:

- `submodules: recursive` is required. Both `lib/forge-std` and
  `lib/openzeppelin-contracts` are git submodules, and a plain checkout leaves them empty.
- `working-directory: contracts` matters. `foundry.toml` lives there, so running
  `forge test` from the repository root finds no project.

Locally the same command is `cd contracts && forge test`.
