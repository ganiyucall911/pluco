// Compile PlucoOriginals with solc-js and write ABI + bytecode to ./artifacts.
import solc from "solc";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const root = path.dirname(new URL(import.meta.url).pathname);
const entries = ["src/PlucoOriginals.sol", "src/PlucoMarket.sol"];

function findImports(importPath) {
  const candidates = [
    path.join(root, "node_modules", importPath),
    path.join(root, "node_modules", "@openzeppelin/contracts", importPath.replace("@openzeppelin/contracts/", "")),
  ];
  for (const c of candidates) if (fs.existsSync(c)) return { contents: fs.readFileSync(c, "utf8") };
  return { error: "not found: " + importPath };
}

const input = {
  language: "Solidity",
      sources: Object.fromEntries(entries.map((e) => [e, { content: fs.readFileSync(path.join(root, e), "utf8") }])),
  settings: {
    optimizer: { enabled: true, runs: 200 },
    evmVersion: "cancun",
    outputSelection: { "*": { "*": ["abi", "evm.bytecode.object", "evm.deployedBytecode.object"] } },
  },
};

const out = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }));
const errors = (out.errors || []).filter((e) => e.severity === "error");
for (const w of (out.errors || []).filter((e) => e.severity !== "error")) console.warn(w.formattedMessage.trim());
if (errors.length) {
  for (const e of errors) console.error(e.formattedMessage);
  process.exit(1);
}

    fs.mkdirSync(path.join(root, "artifacts"), { recursive: true });
    for (const [entry, name] of [["src/PlucoOriginals.sol", "PlucoOriginals"], ["src/PlucoMarket.sol", "PlucoMarket"]]) {
      const c = out.contracts[entry][name];
      fs.writeFileSync(
        path.join(root, "artifacts", name + ".json"),
        JSON.stringify({ contractName: name, abi: c.abi, bytecode: "0x" + c.evm.bytecode.object }, null, 2)
      );
      console.log("compiled:", name, "| abi entries:", c.abi.length, "| bytecode bytes:", c.evm.bytecode.object.length / 2);
    }
