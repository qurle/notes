---
layout: ../../layouts/DocLayout.astro
title: Quantum Computing
---

# Quantum Computing

Quantum computers exploit superposition and entanglement to perform computations that would be intractable for classical machines. Not faster at everything — specifically powerful for factoring, search, and simulating quantum systems.

---

## Qubits

A classical bit is always 0 or 1. A qubit can be in superposition of both:

```
|ψ⟩ = α|0⟩ + β|1⟩
```

where |α|² + |β|² = 1. When measured, it collapses to |0⟩ with probability |α|² or |1⟩ with probability |β|².

---

## Bell state in Qiskit

```python
from qiskit import QuantumCircuit, transpile
from qiskit_aer import AerSimulator

qc = QuantumCircuit(2, 2)
qc.h(0)       # Hadamard: put qubit 0 in superposition
qc.cx(0, 1)   # CNOT: entangle qubit 0 and qubit 1
qc.measure([0, 1], [0, 1])

sim = AerSimulator()
job = sim.run(transpile(qc, sim), shots=1000)
counts = job.result().get_counts()
print(counts)
# {'00': 503, '11': 497}
```

The result is always `00` or `11` — never `01` or `10`. Measuring one qubit instantly determines the other, regardless of the distance between them.

---

## Quantum gates

| Gate | Effect |
|------|--------|
| X (Pauli-X) | Bit flip: \|0⟩ ↔ \|1⟩ |
| H (Hadamard) | Superposition: \|0⟩ → (\|0⟩+\|1⟩)/√2 |
| CNOT | Flip target if control = \|1⟩ |
| T | Phase: \|1⟩ → e^(iπ/4)\|1⟩ |
| Toffoli | Classically universal AND reversible |

---

## Algorithms with quantum advantage

**Shor's algorithm** (1994) — factors N-bit integers in O(n³) time. Classically the best known is sub-exponential. Breaks RSA if a large enough quantum computer is built.

**Grover's search** (1996) — finds a marked item in an unsorted database of N items in O(√N) queries, vs O(N) classically. Quadratic speedup; important for cryptanalysis.

**Variational Quantum Eigensolver (VQE)** — hybrid classical-quantum for chemistry simulation. Calculates ground state energies of molecules too complex for classical methods. Active use case for near-term hardware.

---

## Current hardware (2024–2025)

| Company | Processor | Qubits | Notes |
|---------|-----------|--------|-------|
| IBM | Heron r2 | 133 | Error rates ~0.1% per gate |
| Google | Willow | 105 | Claimed beyond-classical performance |
| IonQ | Forte | 35 | Trapped ion; higher fidelity |
| Quantinuum | H2 | 56 | Trapped ion; best two-qubit gates |

The current era is called NISQ — Noisy Intermediate-Scale Quantum. Fault-tolerant quantum computing likely requires millions of physical qubits to encode thousands of logical ones.
