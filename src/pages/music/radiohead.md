---
layout: ../../layouts/DocLayout.astro
title: Radiohead
---

# Radiohead

![Radiohead in Oxford](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Radiohead_in_Oxford_2_crop.jpg/1280px-Radiohead_in_Oxford_2_crop.jpg)

Radiohead are a British rock band formed in Abingdon, Oxfordshire in 1985. Comprising Thom Yorke, Jonny Greenwood, Colin Greenwood, Ed O'Brien, and Philip Selway, they are among the most critically acclaimed acts of the last three decades.

---

## Discography

| Year | Album | Notes |
|------|-------|-------|
| 1993 | Pablo Honey | Debut; "Creep" |
| 1995 | The Bends | Guitar-driven maturity |
| 1997 | OK Computer | Mercury Prize; 6× platinum UK |
| 2000 | Kid A | Mercury Prize; krautrock & electronics |
| 2001 | Amnesiac | Kid A twin, released 9 months later |
| 2003 | Hail to the Thief | Last for EMI |
| 2007 | In Rainbows | Pay-what-you-want release |
| 2011 | The King of Limbs | 8 tracks, 37 minutes |
| 2016 | A Moon Shaped Pool | BAFTA-winning orchestral arrangements |

---

## Key signature analysis

Radiohead lean heavily on modal and ambiguous harmony — Thom's melodies often imply one key while the chords imply another. A rough survey:

```python
keys = {
    "Creep": "G major",
    "Fake Plastic Trees": "A major",
    "Street Spirit": "A minor",
    "Paranoid Android": "C minor / G minor",
    "Exit Music": "B minor",
    "No Surprises": "F major",
    "Everything in Its Right Place": "E mixolydian",
    "How to Disappear Completely": "D major",
    "Pyramid Song": "ambiguous — quartal harmony",
    "Weird Fishes": "A major",
    "Reckoner": "F# minor",
}

modal = [k for k, v in keys.items() if "mixolydian" in v or "quartal" in v]
print(modal)
# ['Everything in Its Right Place', 'Pyramid Song']
```

---

## Jonny Greenwood's scores

Outside Radiohead, Jonny Greenwood has scored five Paul Thomas Anderson films:

- *There Will Be Blood* (2007) — Penderecki-influenced strings
- *The Master* (2012)
- *Inherent Vice* (2014)
- *Phantom Thread* (2017) — Oscar nominated
- *The Power of the Dog* (2021) — BAFTA winning

> "I'm not here — this isn't happening."
> — *How to Disappear Completely*
