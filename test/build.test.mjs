import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const build = fileURLToPath(new URL("../build.mjs", import.meta.url));
const fixture = fileURLToPath(new URL("./fixtures/prs.json", import.meta.url));

const cases = [
  { flag: "--fixture", args: ["--fixture", "--out", "badges"] },
  { flag: "--seats", args: ["--fixture", fixture, "--seats", ""] },
  { flag: "--out", args: ["--fixture", fixture, "--out"] },
  { flag: "--org", args: ["--fixture", fixture, "--org"] },
];

for (const { flag, args } of cases) {
  test(`the build rejects ${flag} without a value`, (t) => {
    const cwd = mkdtempSync(join(tmpdir(), "badges-build-"));
    t.after(() => rmSync(cwd, { recursive: true, force: true }));
    const env = { ...process.env };
    delete env.GITHUB_TOKEN;
    delete env.GH_TOKEN;
    const result = spawnSync(process.execPath, [build, ...args], { cwd, env, encoding: "utf8" });

    assert.equal(result.status, 1, result.stderr || result.stdout);
    assert.ok(result.stderr.includes(`Missing value for ${flag}`), result.stderr);
    assert.equal(existsSync(join(cwd, "_site")), false);
    assert.equal(existsSync(join(cwd, "badges")), false);
  });
}
