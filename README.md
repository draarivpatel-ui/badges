# Flisk contributor badges

A public page for every person outside the Flisk team who has had a pull request merged into a public [flisk-sh](https://github.com/flisk-sh) repository: their level, belt, founding seat and badges they can embed in a profile README.

Live at **https://badges.flisk.si**. Each person has a page at `https://badges.flisk.si/<login>-<id>/`.

## What a page shows

- **Level**, from merged PRs: Contributor (1), Regular (5), Core (15), Veteran (30), Elite (50), Legend (100). These are the same tiers as the Flisk Discord roles.
- **Belt**, from the hardest `rank: N kyu` or `rank: N dan` label on an issue the person's PRs fixed.
- **Founding seat**, the numbered seat claimed in the Flisk Discord. The first 100 people get one; the page shows how to claim yours.
- **Badges** to embed: `card.svg`, `plate.svg` and `medal.svg`, with copy-ready Markdown.

## How it is built

`build.mjs` reads GitHub's public merge record with the GitHub API and writes a static site. No model is involved, and the same data always gives the same pages. A workflow rebuilds the site every 30 minutes and publishes it to GitHub Pages.

Counted: merged PRs by people, not bots, whose author is not an owner or member of the org and is not a maintainer named in `config.json`.

## Run it locally

```bash
node --test
```

```bash
GITHUB_TOKEN=$(gh auth token) node build.mjs --out _site
```

```bash
node build.mjs --fixture test/fixtures/prs.json --seats test/fixtures/seats.json --out _site
```

The last command builds from saved data with no network.

## Leave the list

Open an issue or a pull request that adds `{"id": <your GitHub account id>, "login": "<your login>"}` to `optout.json`, and your page and leaderboard row are removed on the next build.

## License

MIT
