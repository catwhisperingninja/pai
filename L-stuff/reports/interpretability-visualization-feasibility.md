# Interpretability Visualization Feasibility Analysis
> Generated: 2026-02-24 | Research by PAI Agent

## 1. Academic Paper Summaries

**Interpretability: Understanding How AI Models Think** (Anthropic video transcript)
Core relevance: features as "concepts" distributed across many neurons (superposition), the model's "language of thought" is not English, circuits can be traced showing how the model routes information. The 6+9 addition feature example shows a single circuit firing across wildly different contexts -- exactly the kind of high-dimensional structure that needs visualization. Team emphasizes neuroscience analogy (fMRI, electrode probing) but with perfect observability. Key takeaway: internal representations are high-dimensional, multi-contextual, and non-obvious -- visualization is necessary, not optional.

**Visualizing the 4D Numbers: Quaternions** (3Blue1Brown transcript)
Core relevance: stereographic projection technique maps a hypersphere into 3D space -- concrete, well-understood algorithm for projecting 4D structures into viewable 3D. The dimensionality ladder pedagogy (Linus the Linelander → Felix the Flatlander → us) is directly applicable. The right-hand rule for perpendicular rotations and "two rotations perpendicular to and in sync with each other" in 4D could serve as visualization metaphor for correlated feature activations in different subspaces.

**strat-geo-2507.22010v1.pdf** (Strategic Geometry)
Could not be read -- needs `brew install poppler`. Likely contains directly relevant geometric methods for high-dimensional structures.

**Higher-Order Consciousness** (Trends in Cognitive Sciences)
Higher-order theories posit meta-representational layers where the system represents its own representations -- maps onto Anthropic's finding of "meta-circuits" (e.g., hallucination-gating circuit that decides whether the model "knows" something, separate from retrieval circuit).

**Global Workspace Theory** (Baars)
GWT proposes a "workspace" where information from specialized processors is broadcast globally -- strikingly analogous to transformer attention and the residual stream. The concept of a shared workspace where features compete for broadcast could inform how to visualize feature interactions.

**senior-computer-vision/SKILL.md**
3D Vision section (depth estimation, point cloud processing, NeRF) and TensorRT/ONNX deployment pipeline useful for running SAE inference locally on 32GB VRAM system.

## 2. Concept Connections

### Where quaternions and interpretability genuinely connect:

1. **Stereographic projection as visualization primitive.** Neural network feature spaces live in hundreds/thousands of dimensions. Stereographic projection from 4D to 3D (hypersphere case) is a real implementable algorithm. For higher dimensions, chain projections or combine with dimensionality reduction preprocessing.

2. **Superposition is geometric.** Anthropic's Feb 2025 paper "Spectral Superposition: A Theory of Feature Geometry" explicitly frames superposition as a geometric problem. The "frame operator" gives a spectral measure of how features allocate norm across eigenspaces. Exactly the kind of structure that benefits from spatial/rotational visualization.

3. **Paired rotations as metaphor for correlated features.** The quaternion concept of "two perpendicular rotations in sync" maps onto correlated feature activations in orthogonal subspaces. When feature A activates, feature B co-activates in a different dimension -- a rotation in higher-D space.

4. **Dimensionality ladder pedagogy as UX pattern.** The 1D→2D→3D→4D approach is not just pedagogical -- it is a viable UX design pattern for progressive disclosure in the visualization tool.

### Where they diverge:

- Quaternions are specifically 4D. Real interpretability spaces are 768D-4096D. Need to extract meaningful 4D subspaces first (via PCA, UMAP seed dimensions, or feature clustering) then apply quaternion visualization.
- Consciousness papers provide conceptual frameworks, not computational ones. Useful for thinking about *what* to visualize but not *how*.

## 3. Anthropic OSS Interpretability Tools

| Tool / Repo | Source | Has Visualization? | Description |
|---|---|---|---|
| **circuit-tracer** | Anthropic (May 2025) | Yes | Attribution graphs tracing computational paths through LLMs using cross-layer MLP transcoders |
| **attribution-graphs-frontend** | Anthropic | Yes | React frontend for interactive attribution graph exploration |
| **Neuronpedia** | Johnny Lin (neuronpedia.org) | Yes | 50M+ features, activation steering, circuit tracing, interactive dashboards |
| **SAELens** | Decode Research | Limited | Training/analyzing sparse autoencoders; works with any PyTorch model |
| **sae_vis** | Callum McDougall | Yes | HTML dashboards replicating Anthropic's SAE visualizations |
| **TransformerLens** | TransformerLensOrg | No | Load 50+ models, cache/hook internal activations |
| **sparse-dictionary-learning** | shehper | No | Implementation of "Towards Monosemanticity" |
| **SAELens-V** | PKU-Alignment | Limited | SAELens variant for vision models |
| **Self-Tracing** | Recursive Labs AI | Yes | Extends circuit-tracer with recursive self-interpretation |
| **awesome-sparse-autoencoders** | koayon | No | Curated reading list |
| **transformer-circuits.pub** | Anthropic | Yes | Publication platform with embedded interactive visualizations |

**KEY GAP:** None provide 3D spatial visualization of feature geometry. All are 2D dashboards or node-edge graphs. This is the opportunity space.

## 4. Visualization Algorithms for High-D Structures

### Established methods:

| Algorithm | Preserves | Speed | Interactive? | Limits |
|---|---|---|---|---|
| **PCA** | Global variance | Very fast | Yes | Misses nonlinear structure |
| **t-SNE** | Local neighborhoods | Slow (O(n²)) | Limited | Distorts global distances; not deterministic |
| **UMAP** | Local + some global | Fast | Yes | Better than t-SNE but still distorts global |
| **Isomap** | Global geodesic | Medium | Yes | Sensitive to noise |
| **Trimap** | Global + local | Fast | Yes | Less mainstream |
| **PaCMAP** | Balanced | Fast | Yes | Newer, less battle-tested |
| **Stereographic Projection** | Angles (conformal) | Instant | Yes | Only reduces by 1 dimension at a time |

### Cutting edge (2025-2026):

- **Spectral methods for feature geometry** (Anthropic, Feb 2025): Frame operator approach for principled subspace selection
- **Hybrid pipelines**: PCA first (denoise → ~50D) then UMAP/t-SNE to 3D
- **Self-supervised DR**: Neural network-based dimensionality reduction (experimental)
- **Interactive progressive disclosure**: Coarse global → drill into local (Three.js excels here)

**Nobody is doing quaternion-based 4D-to-3D animated projections of feature spaces. This would be novel.**

## 5. Cross-Sectional Approach Feasibility

The three anatomical planes (the forgotten third is **coronal**):
- **Transverse/Axial**: Horizontal slice (top to bottom)
- **Sagittal**: Vertical slice (left to right)
- **Coronal/Frontal**: Vertical slice (front to back)

### Why it works:
1. After projecting to 3D, you have a genuine 3D volume. Orthogonal slicing is valid.
2. Medical imaging volume rendering (1990s+) has mature algorithms: slice selection, rotation, alpha-compositing, transfer functions. Implementable in Three.js.
3. UX is intuitive -- anyone who's seen an MRI gets it. Massive advantage over abstract graphs.
4. Animated slice position creates navigation through feature space -- maps to Remotion video.

### 4D extension:
Quaternion rotations to animate how a 3D cross-section changes as you "rotate" through the 4th dimension. Stereographic projection from 3Blue1Brown applied to feature data. **Genuinely novel.**

### Caveats:
- 3D embedding is a lossy projection. Be transparent.
- Features cluster unevenly -- need adaptive slice thickness or density-aware rendering.
- Must integrate semantic labels (SAELens/Neuronpedia) or it's just pretty noise.

## 6. Tech Stack Assessment

### Three.js (via React Three Fiber) — **Core Engine**
- Excellent 3D rendering (100K+ points with instanced rendering)
- Native quaternion support (`THREE.Quaternion` with SLERP)
- Cross-sectional slicing via clipping planes and custom shaders
- Full interactivity (OrbitControls, raycasting, hover/click)

### p5.js — **Not Suitable**
- Basic WEBGL mode, poor performance past ~10K points
- No quaternion support, no slicing
- 3D is an afterthought

### Remotion — **Video Output Complement**
- Full Three.js capability via `@remotion/three`
- Renders to MP4 at any resolution/framerate
- No interactivity (video only)
- Perfect for explainer fly-throughs

### Recommended Stack:
- **Interactive:** React + React Three Fiber + custom shaders
- **Video:** Remotion wrapping same R3F scenes
- **Data pipeline:** Python (SAELens + TransformerLens) → extract → reduce → JSON for frontend
- **32GB VRAM:** SAELens on Gemma 2B or Llama 3 8B locally

## 7. Feasibility Verdict

**On the right track, with refinements needed.**

### Strong:
- Gap is real. No 3D spatial feature geometry visualization exists.
- Quaternion/stereographic projection is mathematically sound for 4D→3D.
- Medical imaging cross-sectional metaphor is brilliant UX.
- Three.js + Remotion handles it.
- 32GB VRAM can run SAELens locally.

### Needs refinement:
1. **Dimensionality gap is large.** Pipeline needed: extract features → identify meaningful 4D subspaces (spectral/PCA) → stereographic project → render. Quaternions handle the last steps, not end-to-end.
2. **Start with existing data.** Neuronpedia has 50M+ features. Prototype with exported data before building full pipeline.
3. **Pair spatial viz with semantic labels.** Point cloud without labels = pretty noise. Hover-to-reveal, click-to-drill.
4. **Consciousness papers = scaffolding, not algorithms.** Don't implement directly.

### Recommended Next Steps:
1. `brew install poppler` to read the strat-geo PDF
2. Prototype Three.js point cloud with Neuronpedia data
3. Implement PCA→4D → stereographic projection→3D
4. Add cross-sectional slicing (Three.js clipping planes) with animated sweep
5. Wrap in Remotion for video fly-throughs
6. Quaternion-animated 4D rotation as next level

## Sources
- [Anthropic: circuit-tracing tools](https://www.anthropic.com/research/open-source-circuit-tracing)
- [Neuronpedia](https://neuronpedia.org/) | [GitHub](https://github.com/hijohnnylin/neuronpedia)
- [attribution-graphs-frontend](https://github.com/anthropics/attribution-graphs-frontend)
- [SAELens](https://github.com/decoderesearch/SAELens)
- [TransformerLens](https://github.com/TransformerLensOrg/TransformerLens)
- [sae_vis](https://github.com/callummcdougall/sae_vis)
- [sparse-dictionary-learning](https://github.com/shehper/sparse-dictionary-learning)
- [Self-Tracing](https://github.com/recursivelabsai/Self-Tracing)
- [Spectral Superposition paper](https://arxiv.org/abs/2602.02224)
- [Transformer Circuits: methods](https://transformer-circuits.pub/2025/attribution-graphs/methods.html)
- [Remotion Three docs](https://www.remotion.dev/docs/three)
- [Three.js high-D geometry discussion](https://discourse.threejs.org/t/visualization-of-high-dimensional-geometries-like-tesseracts/23647)
- [Stop Misusing t-SNE and UMAP](https://arxiv.org/html/2506.08725v2)
- [Dimensionality reduction review](https://peerj.com/articles/cs-3025/)
- [Hypercomplex neural networks](https://pmc.ncbi.nlm.nih.gov/articles/PMC12513225/)
- [awesome-sparse-autoencoders](https://github.com/koayon/awesome-sparse-autoencoders)
