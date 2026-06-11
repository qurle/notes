---
layout: ../../../../layouts/DocLayout.astro
title: Special Relativity
---

# Special Relativity

Published by Einstein in 1905 in *Annalen der Physik*. Two postulates:

1. The laws of physics are the same in all inertial (non-accelerating) reference frames.
2. The speed of light in a vacuum is the same for all observers, regardless of the motion of the source or the observer.

From these two postulates, three deeply counterintuitive consequences follow with mathematical necessity.

---

## Time dilation

A clock moving relative to you ticks slower. At velocity v:

```
Δt' = Δt / √(1 − v²/c²)
```

At 87% of c, time runs at half speed. At 99.5% of c, it runs at 1/10th speed. This is not an illusion or a measurement artifact — it is what clocks physically do. GPS satellites must correct for both special-relativistic time dilation (satellites move fast → clocks slow down ~7 μs/day) and general-relativistic time dilation (less gravity → clocks speed up ~45 μs/day), net correction: ~38 μs/day. Without it, GPS would drift ~10 km/day.

---

## Length contraction

Objects moving relative to you are shorter along the direction of motion:

```
L' = L × √(1 − v²/c²)
```

A metre stick moving at 87% of c is half a metre long.

---

## Mass-energy equivalence

```
E = mc²
```

Mass and energy are the same thing in different forms. The c² factor is enormous (~9 × 10¹⁶ J/kg), which is why a small amount of mass releases tremendous energy — and why nuclear weapons work.

---

## The invariant interval

While space and time individually are relative (different observers measure different values), the *spacetime interval* between two events is absolute:

```
s² = c²Δt² − Δx² − Δy² − Δz²
```

This is the same for all inertial observers. Spacetime has a geometry; it's just not Euclidean.
