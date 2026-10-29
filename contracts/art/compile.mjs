// Compile PlucoOriginals with solc-js and write ABI + bytecode to ./artifacts.
import solc from "solc";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const root = path.dirname(new URL(import.meta.url).pathname);
const entry = "src/PlucoOriginals.sol";

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
  sources: { [entry]: { content: fs.readFileSync(path.join(root, entry), "utf8") } },
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

const c = out.contracts[entry].PlucoOriginals;
fs.mkdirSync(path.join(root, "artifacts"), { recursive: true });
fs.writeFileSync(
  path.join(root, "artifacts", "PlucoOriginals.json"),
  JSON.stringify({ contractName: "PlucoOriginals", abi: c.abi, bytecode: "0x" + c.evm.bytecode.object }, null, 2)
);
console.log("compiled: PlucoOriginals");
console.log("abi entries:", c.abi.length, "bytecode bytes:", c.evm.bytecode.object.length / 2);
