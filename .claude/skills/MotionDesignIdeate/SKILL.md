---
name: motion-design-prompt
description: Creates detailed, AI-friendly motion design prompts through a guided questionnaire. Helps users brainstorm concepts, specify visual elements, and outputs production-ready prompts for AI motion design tools. Use when user wants to create motion graphics, animated videos, or needs a prompt for tools like Runway, Pika, or similar AI video/motion generators.
---

# Motion Design Prompt Builder

**Purpose:** Guide users through creating detailed motion design prompts that AI tools can actually execute. Most AI motion tools need hyper-literal descriptions - this skill extracts those details through conversation.

## Why This Matters

AI motion design tools fail when prompts are vague. They need:
- Literal visual descriptions (not conceptual)
- Phase-by-phase animation sequences with timing
- Specific colors, sizes, shapes, positions
- Motion/easing curve descriptions
- Explicit "what to avoid" instructions
- Technical specifications

Most users don't know to include all this. This skill walks them through it.

## Reference Materials

- `references/example-prompts.md` - Two complete example prompts showing the target output format and level of detail

---

## Phase 1: Intake

**Start with:**

```
I'll help you create a detailed motion design prompt that AI tools can actually execute.

First question: Do you already have a concept in mind, or do you need help brainstorming ideas?

1. I have a concept (describe it)
2. I have a rough idea but need help developing it
3. I need help brainstorming from scratch
```

**If they have a concept:** Move to Phase 3 (Specification Gathering)

**If rough idea or brainstorming:** Continue to Phase 2

---

## Phase 2: Concept Development

Ask these **one at a time**, waiting for each response:

**Q1: Use Case**
```
What's this motion design for?
- Landing page hero animation
- Social media ad/post
- Product demo or explainer
- Logo animation
- Background/ambient loop
- Something else?
```

**Q2: Core Message**
```
What feeling or message should this communicate?

Examples:
- "Professional and trustworthy"
- "Fast and efficient"
- "Creative and playful"
- "Technical but accessible"
- "Premium and exclusive"
```

**Q3: Brand/Product Context**
```
What brand or product is this for?

If you have brand colors, share them (hex codes ideal). If not, describe the vibe you want.
```

**Q4: Visual References** (optional)
```
Any visual styles you like? Examples:
- "Clean and minimal like Apple"
- "Technical terminal/code aesthetic"
- "Soft organic flowing shapes"
- "Bold geometric patterns"
- "Abstract data visualization"

Or skip if you're open to suggestions.
```

**After gathering context, generate 3-5 concept options:**

```
Based on what you've shared, here are some concept directions:

1. [Concept name]: [Brief description]
2. [Concept name]: [Brief description]
3. [Concept name]: [Brief description]

Which direction interests you? Or combine elements from multiple?
```

Once they choose, move to Phase 3.

---

## Phase 3: Specification Gathering

Walk through each question **one at a time**. This is the most important phase - extract specific details.

### 3.1 Elements

```
Let's define what appears in the animation.

What visual elements do you want? Be specific:
- Shapes (circles, rectangles, lines, abstract forms)
- Icons (describe each one)
- Text (what words, if any)
- Objects (what do they look like)
- Characters/figures (describe appearance)

List everything that should appear on screen.
```

**Probe for specifics:**
- "What size relative to the frame?"
- "Where is it positioned?"
- "What color/style?"

### 3.2 Colors

```
Now let's nail down colors.

Option A: Share your brand colors (hex codes)
Option B: Describe the color mood:
- Warm tones (reds, oranges, yellows)
- Cool tones (blues, greens, purples)
- Neutral (black, white, grays)
- High contrast or subtle?
- Any accent colors?
```

**Build a color table** as you go - document primary, secondary, accent, background, text colors.

### 3.3 Background

```
What's the background?
- Solid color (which?)
- Gradient (describe direction and colors)
- Transparent (for overlay use)
- Textured/patterned (describe)
- Image/video behind elements?
```

### 3.4 Animation Flow

```
Describe the animation sequence - what happens from start to finish?

Walk me through it:
- What appears first?
- What happens next?
- How does it end?

Think of it like scenes or phases.
```

**After they describe, break it into numbered phases** and confirm:
```
So the sequence would be:
1. [Phase 1]: [Description]
2. [Phase 2]: [Description]
3. [Phase 3]: [Description]

Is that right? Anything to add or change?
```

### 3.5 Timing

```
Timing details:
- Total duration? (e.g., 5 seconds, 10 seconds)
- Should it loop seamlessly?
- Any pauses or holds?
- Fast and snappy, or slow and smooth?
```

### 3.6 Mood & Feel

```
Final vibe check - what feeling should the viewer have?

And equally important: what should this NOT feel like?
(e.g., "Not corporate and stiff" or "Not chaotic and overwhelming")
```

---

## Phase 4: Prompt Generation

After gathering all specifications, generate the complete prompt using this structure:

```markdown
## Motion Design Prompt: [Concept Name]

### Overall Concept
[2-3 sentence description of what this animation is and what it communicates]

---

### Visual Specifications

**The Canvas / Background**
[Exact background description - color, gradient, texture, size]

**Element 1: [Name]**
[Detailed literal description - size, color, position, shape, any inner details]

**Element 2: [Name]**
[Detailed literal description]

[Continue for all elements...]

---

### Animation Sequence

**Phase 1: [Name] ([Start time] - [End time])**
[Exact description of what happens - positions, movements, scale changes, opacity changes]

**Phase 2: [Name] ([Start time] - [End time])**
[Exact description]

[Continue for all phases...]

---

### Motion & Easing Details

**Movement Curves:**
- [Movement type]: [Easing description, e.g., "ease-out - fast start, gentle finish"]
- [Movement type]: [Easing description]

**Timing Feel:**
[Overall rhythm description - snappy, smooth, mechanical, organic, etc.]

---

### Color Summary

| Element | Color | Hex/Description |
|---------|-------|-----------------|
| Background | [Name] | [Hex] |
| [Element 1] | [Name] | [Hex] |
| [Element 2] | [Name] | [Hex] |
[Continue for all colors...]

---

### What to Avoid

- Do NOT [specific anti-pattern 1]
- Do NOT [specific anti-pattern 2]
- Do NOT [specific anti-pattern 3]
- Do NOT [specific anti-pattern 4]
- Do NOT [specific anti-pattern 5]

---

### Technical Specifications

- Resolution: [e.g., 1920x1080 minimum, 4K preferred]
- Frame rate: [e.g., 30fps or 60fps]
- Format: [e.g., MP4, MOV, with/without alpha]
- Duration: [Total length]
- Loopable: [Yes/No]

---

### Mood & Feeling

The viewer should feel: "[Desired emotional response]"

[1-2 sentence metaphor or comparison that captures the essence]
```

**Important generation guidelines:**

1. **Be hyper-literal** - Describe exactly what things look like, not what they represent
2. **Include timing** - Every phase needs start/end times
3. **Quantify everything** - Sizes in pixels, positions relative to frame, percentages
4. **Anti-patterns are critical** - AI tools need explicit "don't do this" instructions
5. **No ambiguity** - If something could be interpreted multiple ways, pick one and state it clearly

---

## Phase 5: Refinement

After presenting the prompt:

```
Here's your complete motion design prompt.

Before you use it, let me know:
1. Anything look off or need adjustment?
2. Want me to add more detail to any section?
3. Ready to use as-is?

You can also ask me to generate variations - same concept, different approach.
```

---

## Critical Reminders

### AI Motion Tools Need Literal Descriptions

**Bad:** "A modern, tech-forward animation"
**Good:** "A dark gray (#1a1a1a) rectangle with rounded corners (12px radius) containing cyan (#0891B2) text in a monospace font"

**Bad:** "The element flies in energetically"
**Good:** "The element moves from off-screen left to center over 0.5 seconds using ease-out easing (fast start, gradual deceleration)"

### Always Include "What to Avoid"

Common anti-patterns to warn against:
- Glitch effects, static, distortion (unless requested)
- 3D depth/perspective (unless requested)
- Overly complex particle effects
- Neon glow on everything
- Robotic/jerky motion (unless intended)
- Text appearing all at once instead of typing
- Sci-fi/futuristic elements (unless requested)

### Timing Must Be Explicit

Every animation phase needs:
- Start time
- End time
- Duration
- What happens during that window

---

## Example Outputs

For complete example prompts showing the target format and detail level, see:
```
Read references/example-prompts.md
```

These examples demonstrate:
- Terminal folder tree building animation
- Parallel agent swarm animation

Study these for the appropriate level of detail.
