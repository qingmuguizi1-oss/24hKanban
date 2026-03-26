#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const args = process.argv.slice(2);
const options = new Set(args);
const strictSuspicious = options.has("--strict-suspicious");

const TEXT_EXTENSIONS = new Set([
  ".js", ".mjs", ".cjs", ".ts", ".tsx", ".jsx",
  ".css", ".scss", ".less",
  ".html", ".htm",
  ".json",
  ".md", ".txt",
  ".yml", ".yaml",
  ".xml",
  ".ps1", ".sh", ".bat", ".cmd",
  ".ini", ".toml",
  ".svg"
]);

const TEXT_BASENAMES = new Set([
  ".editorconfig",
  ".gitattributes",
  ".gitignore"
]);

const SUSPICIOUS_PATTERNS = [
  /绫诲|鍒犻櫎|鎷栨嫿|棰滆壊|鍚嶇О/g, // known broken strings seen in this repo
  /鈰嫯|閺堫剙鎳|閹烘帒鎮/g,
  /Ã[\u0080-\u00BF]/g,      // utf-8 bytes shown as latin-1
  /Â[\u0080-\u00BF]/g,
  /ðŸ/g
];

function normalizeInputPath(filePath) {
  return filePath.replace(/\\/g, "/").trim();
}

function listPathsFromStdinNull() {
  const input = fs.readFileSync(0);
  return input
    .toString("utf8")
    .split("\0")
    .map((item) => normalizeInputPath(item))
    .filter(Boolean);
}

function walkRepoFiles(rootDir, out) {
  const entries = fs.readdirSync(rootDir, { withFileTypes: true });
  entries.forEach((entry) => {
    const fullPath = path.join(rootDir, entry.name);
    const relPath = normalizeInputPath(path.relative(process.cwd(), fullPath));

    if (entry.isDirectory()) {
      if (entry.name === ".git" || entry.name === "node_modules") {
        return;
      }
      walkRepoFiles(fullPath, out);
      return;
    }
    if (entry.isFile()) {
      out.push(relPath);
    }
  });
}

function listCandidateFiles() {
  if (options.has("--stdin-null")) {
    return listPathsFromStdinNull();
  }

  const explicitFiles = args.filter((item) => !item.startsWith("--")).map(normalizeInputPath);
  if (explicitFiles.length > 0) {
    return explicitFiles;
  }

  const files = [];
  walkRepoFiles(process.cwd(), files);
  return files;
}

function isTextCandidate(filePath) {
  const base = path.basename(filePath).toLowerCase();
  if (TEXT_BASENAMES.has(base)) {
    return true;
  }
  const ext = path.extname(base);
  return TEXT_EXTENSIONS.has(ext);
}

function hasUtf8Bom(buffer) {
  return buffer.length >= 3 && buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf;
}

function hasUtf16Bom(buffer) {
  return (
    (buffer.length >= 2 && buffer[0] === 0xff && buffer[1] === 0xfe) ||
    (buffer.length >= 2 && buffer[0] === 0xfe && buffer[1] === 0xff)
  );
}

function hasNulByte(buffer) {
  for (let i = 0; i < buffer.length; i += 1) {
    if (buffer[i] === 0) {
      return true;
    }
  }
  return false;
}

function decodeUtf8Strict(buffer) {
  const decoder = new TextDecoder("utf-8", { fatal: true });
  return decoder.decode(buffer);
}

function findSuspiciousContent(text) {
  const hits = [];
  const lines = text.split(/\r?\n/);
  lines.forEach((line, idx) => {
    if (!line) {
      return;
    }
    for (const pattern of SUSPICIOUS_PATTERNS) {
      pattern.lastIndex = 0;
      if (pattern.test(line)) {
        hits.push({ line: idx + 1, sample: line.slice(0, 140) });
        break;
      }
    }
  });
  return hits;
}

function main() {
  const files = listCandidateFiles();
  const errors = [];
  const warnings = [];

  files.forEach((filePath) => {
    if (!isTextCandidate(filePath)) {
      return;
    }
    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
      return;
    }

    let buffer;
    try {
      buffer = fs.readFileSync(filePath);
    } catch (err) {
      errors.push(`${filePath}: failed to read file (${err.message})`);
      return;
    }

    if (hasNulByte(buffer)) {
      errors.push(`${filePath}: contains NUL byte; likely binary or wrong encoding`);
      return;
    }
    if (hasUtf16Bom(buffer)) {
      errors.push(`${filePath}: UTF-16 BOM detected; please convert to UTF-8`);
      return;
    }
    if (hasUtf8Bom(buffer)) {
      warnings.push(`${filePath}: UTF-8 BOM detected (allowed, but UTF-8 no BOM is recommended)`);
    }

    let text;
    try {
      text = decodeUtf8Strict(buffer);
    } catch (err) {
      errors.push(`${filePath}: invalid UTF-8 bytes (${err.message})`);
      return;
    }

    if (text.includes("\uFFFD")) {
      errors.push(`${filePath}: contains U+FFFD replacement character, possible broken text`);
    }

    // Do not self-flag this guard script's built-in pattern examples.
    if (normalizeInputPath(filePath) !== "scripts/check-utf8.js") {
      const suspicious = findSuspiciousContent(text);
      suspicious.forEach((hit) => {
        const message = `${filePath}:${hit.line}: suspicious mojibake text -> ${hit.sample}`;
        if (strictSuspicious) {
          errors.push(message);
        } else {
          warnings.push(message);
        }
      });
    }
  });

  if (errors.length > 0) {
    console.error("UTF-8 guard failed:");
    errors.forEach((item) => console.error(`- ${item}`));
    console.error("");
    console.error("Fix tip: resave these files as UTF-8 (no BOM), then re-commit.");
    process.exit(1);
  }

  const modeLabel = options.has("--stdin-null")
    ? "input file list"
    : (args.some((item) => !item.startsWith("--")) ? "explicit files" : "workspace scan");
  console.log(`UTF-8 guard passed (${modeLabel}).`);
  if (warnings.length > 0) {
    console.log("UTF-8 guard warnings:");
    warnings.forEach((item) => console.log(`- ${item}`));
  }
}

main();
