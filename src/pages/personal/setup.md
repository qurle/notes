---
layout: ../../layouts/DocLayout.astro
title: Setup
---

# Setup

Current dev environment, mid-2025.

---

## Machine

MacBook Pro M3 Max, 14-core CPU, 30-core GPU, 36 GB unified memory. The fan has never audibly turned on. Battery life is measured in days. The only upgrade worth making since the Intel era.

---

## Terminal

[Ghostty](https://ghostty.org) — fast, native, config-file-driven:

```toml
# ~/.config/ghostty/config
font-family = "Berkeley Mono"
font-size = 13
theme = "catppuccin-mocha"
window-padding-x = 12
window-padding-y = 8
background-opacity = 0.95
macos-titlebar-style = hidden
shell-integration-features = no-cursor
```

Shell is `zsh` with [Starship](https://starship.rs):

```toml
# ~/.config/starship.toml
format = "$directory$git_branch$git_status$character"
add_newline = false

[directory]
truncation_length = 3
style = "bold cyan"
truncate_to_repo = false

[git_branch]
symbol = " "
style = "bold purple"

[git_status]
ahead = "↑${count}"
behind = "↓${count}"
diverged = "↕"
modified = "·"

[character]
success_symbol = "[›](bold green)"
error_symbol = "[›](bold red)"
```

---

## Editor

VS Code with Vim keybindings. Not Neovim — I've tried, I'm back.

```json
{
  "editor.fontFamily": "Berkeley Mono",
  "editor.fontSize": 13,
  "editor.lineHeight": 1.65,
  "editor.tabSize": 2,
  "editor.formatOnSave": true,
  "editor.minimap.enabled": false,
  "editor.scrollbar.vertical": "hidden",
  "workbench.colorTheme": "Catppuccin Mocha",
  "workbench.activityBar.location": "hidden",
  "vim.useSystemClipboard": true,
  "vim.hlsearch": true,
  "vim.normalModeKeyBindings": [
    { "before": ["<C-d>"], "after": ["<C-d>", "z", "z"] },
    { "before": ["<C-u>"], "after": ["<C-u>", "z", "z"] }
  ]
}
```

Key extensions: **GitLens**, **Error Lens**, **Pretty TypeScript Errors**, **Astro**.

---

## CLI tools

```sh
# core
brew install git gh ripgrep fd bat eza fzf jq

# node
brew install fnm
fnm install --lts
npm i -g pnpm

# media
brew install imagemagick ffmpeg yt-dlp

# misc
brew install tldr watchman
```

`.zshrc` aliases:

```sh
alias ls="eza --icons"
alias ll="eza -la --icons --git"
alias cat="bat"
alias find="fd"
alias grep="rg"

# git shortcuts
alias gs="git status"
alias gd="git diff"
alias gl="git log --oneline --graph"
```

---

## Desk

Flexispot E7 standing desk, no monitor — laptop on a Rain Design mStand at eye level. MX Keys Mini keyboard. Magic Trackpad. No speakers, just AirPods Max. Grey anti-fatigue mat. One plant that has survived three moves.
