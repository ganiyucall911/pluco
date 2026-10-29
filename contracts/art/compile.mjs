// Compile the PLUCO art protocol with solc-js and write ABI + bytecode to ./artifacts.
import solc from "solc";
import fs from "node:fs";
import path from "node:path";

const root = path.dirname(new URL(import.meta.url).pathname);
const srcDir = path.join(root, "src");
const sources = {};
for (const f of fs.readdirSync(srcDir).filter((f) => f.endsWith(".sol"))) {
  sources["src/" + f] = { content: fs.readFileSync(path.join(srcDir, f), "utf8") };
}

function findImports(importPath) {
  const candidates = [
    path.join(root, "node_modules", importPath),
    path.join(root, "node_modules", "@openzeppelin/contracts", importPath.replace("@openzeppelin/contracts/", "")),
    path.join(root, importPath),
  ];
  for (const c of candidates) if (fs.existsSync(c)) return { contents: fs.readFileSync(c, "utf8") };
  return { error: "not found: " + importPath };
}

const input = {
  language: "Solidity",
  sources,
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
const wanted = ["PlucoOriginals", "PlucoRegistry", "PlucoMarketplace"];
let written = 0;
for (const [file, contracts] of Object.entries(out.contracts)) {
  for (const [name, c] of Object.entries(contracts)) {
    if (!wanted.includes(name)) continue;
    fs.writeFileSync(
      path.join(root, "artifacts", name + ".json"),
      JSON.stringify({ contractName: name, abi: c.abi, bytecode: "0x" + c.evm.bytecode.object }, null, 2)
    );
    console.log("compiled:", name, "abi entries:", c.abi.length, "bytecode bytes:", c.evm.bytecode.object.length / 2);
    written++;
  }
}
if (written === 0) {
  console.error("no contracts written");
  process.exit(1);
}
