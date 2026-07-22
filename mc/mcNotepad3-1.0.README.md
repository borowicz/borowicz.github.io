# mcNotepad3

Ultra-light native macOS text editor — Notepad2 spirit, Sequoia polish.

Multi-window, monospaced, instant. Built with **SwiftUI + AppKit** (`NSTextView`). No Electron, no network, no tabs.

## Features

| Area | Details |
|------|---------|
| **Core** | Multi-window (one file per window), native macOS UI, Auto light/dark |
| **Split View** | 1 / 2 / 3 panes per window, vertical or horizontal, drag-to-resize |
| **Scroll sync** | Optional synchronized scrolling across panes (same window only) |
| **Syntax** | Markdown, Python, JS/TS, HTML, CSS, JSON, XML, Go, Rust, Swift, C/C++, Java, Ruby, Shell, YAML, SQL |
| **Panes** | Editor · Markdown preview · Hex/binary view |
| **Find / Replace** | ⌘F / ⌥⌘F; selection → Find (⌘E); **⌥↓ history** (MRU); escapes; Replace (⌥⌘E) / Replace All (⌥⌘A) |
| **Folding** | Gutter triangles for `{…}` blocks and Markdown headings; Fold/Unfold All |
| **Editor** | Line numbers, zebra stripes, current-line highlight, font zoom, word wrap, soft tabs, indent/comment, **move lines** |
| **Line endings** | Paste and open normalize **CRLF / CR → LF** (Unix) |
| **Encodings** | Status bar shows encoding; **File → Encoding** convert for save; **Reopen with Encoding** reinterprets bytes on disk |
| **Files** | Open / Open With / drag-to-Dock, multi-select → windows, Save / Save As, auto-save, recent (security-scoped bookmarks), reload on external change, reveal in Finder, dotfiles |
| **Status bar** | Ln/Col, selection length, encoding, language, text/binary, words/chars/lines, zoom % |
| **Dock** | **Shift-click** → new empty file; context menu: **New File** + **Recent** |
| **Scrollers** | Overlay style; hidden when content fits |

### Supported encodings

UTF-8 · UTF-16 · UTF-16 LE/BE · ISO Latin 1 (8859-1) · ISO Latin 2 (8859-2) · Windows Latin 1 (CP1252) · Windows Central Europe (CP1250) · Mac Roman · ASCII

- **Convert** — sets encoding used on next save (in-memory text stays Unicode).
- **Reopen with Encoding** — reloads file bytes with the chosen encoding (needs a path on disk).

### Find escapes

In the find/replace fields:

| Escape | Meaning |
|--------|---------|
| `\n` | newline |
| `\r` | carriage return |
| `\t` | tab |
| `\0` | NUL |
| `\\` | backslash |
| `\xHH` | byte (hex), e.g. `\x09` = tab |

Multi-line selections are seeded into Find as escaped text (e.g. `\n`). Pasted control characters match literally. History: **⌥↓** (or ↓ when the field is empty).

## Requirements

- macOS 14.0+
- Xcode 15+ (to build)


## Keyboard shortcuts

| Shortcut | Action |
|----------|--------|
| ⌘N / ⇧⌘N | New / New window |
| ⌘O | Open (multi-select → multiple windows) |
| ⌘W | Close window |
| ⌘S / ⇧⌘S | Save / Save As |
| ⌘R | Reload from Disk |
| ⌥⌘R | Reveal in Finder |
| ⇧⌥⌘C | Copy Path |
| ⌘P | Print |
| ⌘F | Find (seeds from selection) |
| ⌥⌘F | Find and Replace |
| ⌘E | Use Selection for Find |
| ⌘G / ⇧⌘G | Find next / previous |
| ⌥⌘E | Replace current match |
| ⌥⌘A | Replace All |
| ⌥↓ | Find/Replace field history |
| ⌘L | Go to Line |
| ⌘] / ⌘[ | Indent / Outdent |
| ⌘⇧↑ / ⌘⇧↓ | Move line(s) up / down |
| ⌘/ | Toggle comment |
| ⌥⌘[ / ⌥⌘] | Fold all / Unfold all |
| ⌘+ / ⌘− / ⌘0 | Zoom in / out / reset |
| ⌥⌘1 / 2 / 3 | Single / two / three panes |

## License

Private / as-needed.
