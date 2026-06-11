---
layout: ../../../../layouts/DocLayout.astro
title: Interface Ideas
---

# Interface Ideas

Scratchpad. Mostly unformed. Writing things down because they keep coming back.

---

## The problem with modals

Every modal dialog is an admission of failure — a sign that something couldn't be surfaced in context. Confirmation dialogs especially. "Are you sure?" means the action was unclear or the consequences opaque. The solution is rarely a better modal; it's a clearer action with built-in undo.

Gmail's undo-send is better than any "are you sure you want to send?" dialog ever was. The toast at the bottom of the screen doesn't interrupt the flow. The regret is handled where it belongs — after the action, not before it.

---

## Progressive disclosure at scale

Most UI complexity is latent complexity — features that most users never need, but that can't be removed because some users do. The question isn't how to hide features; it's how to *earn* the right to show them.

Notion does this reasonably well. Block types are discoverable without being mandatory. The power is there; it waits until you need it.

---

## Typography as the first design decision

Before colour, before layout, before components: choose the typeface and the type scale. Almost everything else flows from there. A well-set page in system-ui with comfortable line-height and a reasonable measure (60–75 characters) is better than a poorly-set page in an expensive custom font.

The measure is the most underrated variable. Lines that are too long are harder to read. Lines that are too short create awkward rag. Most content-heavy UIs use lines that are 20–30% too wide.

---

## Things I want to build

- A read-it-later app that deletes articles after 30 days unless explicitly saved. Force prioritisation.
- A task manager with no overdue state. A task you haven't done yet is just a task. The red badge is a guilt machine.
- A code review tool that shows the diff sorted by *complexity change* rather than file path.
