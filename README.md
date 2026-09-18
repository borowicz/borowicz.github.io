# borowicz.github.io

Personal GitHub Pages collection of small web tools, experiments, product pages, downloadable macOS apps, and other deliberately useful or questionable projects.

🌐 **Website:** https://borowicz.github.io/  
🐙 **GitHub:** https://github.com/borowicz

## What is this?

This repository is a collection rather than a single application.

It contains lightweight static websites, browser tools, PWAs, product landing pages, downloadable macOS builds, and assorted experiments. Most projects are designed to run directly from GitHub Pages with no backend.

> `/var/www/life`  
> Small collection of useful and useless things.

## Projects & sites

| Project | Description | Link |
| --- | --- | --- |
| **Sheep Me to Sleep** | A deliberately simple sheep-counting experience for falling asleep. | [Open site](https://borowicz.github.io/sheep/) |
| **RoastOS** | Short, dry and unnecessary opinions for Apple devices. Includes widgets, roasts and custom text packs. | [Open site](https://borowicz.github.io/roast/) |
| **ReadMeAloud** | Product landing page for a local text-to-speech player built around Apple voices. | [Open site](https://borowicz.github.io/README.aloud/) |
| **lastOpened** | A small utility focused on getting back to recently used apps/items. | [Open site](https://borowicz.github.io/lastOpened/) |
| **MuuToo!** | Interactive “Mad Feminist Cow Test” web app with quiz, daily content, results and PWA support. | [Open site](https://borowicz.github.io/moootoo/) |
| **Internet Personality Atlas** | Browser-based personality test / atlas available as a static PWA. | [Open site](https://borowicz.github.io/ipa/) |
| **myCar analysis** | Client-side viewer and visual analyzer for myCar XML exports, with charts and filtering. | [Open site](https://borowicz.github.io/myCar/) |


## Browser tools

The `html/` directory contains a large set of standalone, client-side tools. They cover everyday developer and data tasks, for example:

- JSON, YAML, XML, CSV and Markdown
- Base64, hashes, UUIDs, JWT and passwords
- URL and HTML entities
- dates, timestamps, units, temperatures and currencies
- regex, diff, sorting and minification
- HTTP, cURL, Git, shell and cron helpers
- QR codes, colors and text utilities
- country, VAT, fuel and workday tools
- calendars and other small calculators

The tools are intentionally simple: open a page, use it in the browser, move on.

Browse the collection at:

**https://borowicz.github.io/html/**

## macOS downloads

The `mc/` directory contains downloadable macOS builds and screenshots for several small applications and experiments.

Current artifacts include:

- **dailyDownloadMaid**
- **macAmp**
- **mcNotepad3**
- **repoChronicle**
- **roastMyMac**
- **yearProgress**

Where available, releases include `.dmg`, `.app.zip` and/or preview images.

## Repository structure

```text
.
├── assets/             Shared website assets
├── html/               Browser tools and utilities
├── ipa/                Internet Personality Atlas PWA
├── lastOpened/         lastOpened product page
├── mc/                 macOS downloads and app artifacts
├── moootoo/            MuuToo! PWA
├── ms2026/             World Cup 2026 schedule
├── myCar/              myCar XML analysis tool
├── roast/              RoastOS product page
├── sheep/              Sheep Me to Sleep
├── x/                  Additional experiment / web project
└── index.html          Main GitHub Pages landing page
```

## Technology

The repository intentionally favors low-overhead web technologies:

- HTML
- CSS
- JavaScript
- Static JSON / data files
- Web App Manifests
- Service Workers / PWA support
- GitHub Pages

There is no single framework or build system shared by the repository. Individual projects may have their own architecture.

## Running locally

Most projects are plain static sites.

A simple local server is enough:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080/
```

For a specific project, start the server from that directory.

## GitHub Pages

The main site is published from the repository as a GitHub Pages user site:

**https://borowicz.github.io/**

Project directories are exposed as subpaths, for example:

- `/sheep/`
- `/roast/`
- `/README.aloud/`
- `/lastOpened/`
- `/moootoo/`
- `/ipa/`
- `/myCar/`
- `/ms2026/`
- `/html/`

## Philosophy

Small projects should stay small.

No unnecessary backend.  
No unnecessary framework.  
No build pipeline unless it solves a real problem.

Some projects are useful. Some are experiments. Some exist because they seemed funny at the time.

That's the point.

## License

No repository-wide license is currently declared. Individual files or projects may have their own licensing terms where applicable.