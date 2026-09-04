# Internet Personality Atlas — GitHub Pages

This folder is a complete static site. It has no build step and no dependencies.

## Publish on GitHub Pages

1. Copy the contents of this folder to the root of a GitHub repository.
2. In **Settings → Pages**, choose **Deploy from a branch**.
3. Select `main` and `/ (root)`, then save.

The site works both as a user page (`username.github.io`) and as a project page
(`username.github.io/repository-name`) because all local assets use relative URLs.

## PWA

The site is an installable Progressive Web App. Its manifest, 192/512 px icons
and service worker live next to `index.html`. After the first complete visit,
the atlas, illustrations, and both test modes work offline. Installation requires
HTTPS (GitHub Pages provides it) or localhost.

## Local preview

Run any static HTTP server in this folder, for example:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Notes

- Languages: Polish, English and German.
- Test data stays in the browser; nothing is sent to a server.
- The test is educational and is not a clinical psychological assessment.
