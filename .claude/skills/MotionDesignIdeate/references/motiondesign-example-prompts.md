# Example Motion Design Prompts

These examples show the level of detail AI motion design tools need. Study the structure, specificity, and literal descriptions.

---

## Example 1: Terminal Folder Tree Animation

### Overall Concept
A realistic computer terminal window where a folder/file structure types itself out line by line, as if someone is running a command. The aesthetic is "developer tool made beautiful" - clean, minimal, but with subtle glow effects that make it feel premium rather than intimidating.

---

### Visual Specifications

**The Terminal Window**
- A single rectangular window centered on screen, with rounded corners (approximately 12-16px radius)
- Window dimensions: roughly 600px wide by 400px tall, centered in frame with generous padding around it
- Background of the terminal window: very dark gray, almost black (#0D1117 or similar)
- The window has a subtle drop shadow beneath it (soft, diffused, about 20% opacity black)
- Top of window has a "title bar" strip approximately 32px tall
- Title bar contains three small circles in the top-left corner arranged horizontally (these represent window controls): red (#FF5F56), yellow (#FFBD2E), green (#27C93F) - each circle roughly 12px diameter with 8px spacing between them
- Title bar may show faint text in the center reading "Terminal" or "zsh" in a muted gray color
- Below the title bar is the main terminal content area

**Background Behind Terminal**
- Solid clean background, either:
  - Option A: Pure white (#FFFFFF) for light mode aesthetic matching the landing page
  - Option B: Very soft off-white with subtle gradient (#F8FAFC fading slightly)
- Alternatively, a very subtle radial glow of cyan (#0891B2 at about 5-8% opacity) emanating from behind the terminal, creating a soft halo effect

**Typography Inside Terminal**
- Monospace font (the kind used in code editors) - visually similar to JetBrains Mono, SF Mono, or Menlo
- Font size appears roughly 14-16px equivalent
- Line height has comfortable spacing (around 1.5x the font size)
- Text color: soft white or light gray (#E6EDF3) for the main content
- Cursor: a solid rectangle block, colored cyan (#0891B2), approximately the width of one character and the height of the text line

**The Folder Structure Content**
This is the exact text that should appear, typed out line by line. The structure uses standard terminal "tree" formatting with vertical lines and branch connectors:

```
~/co-writer-system
├── CLAUDE.md
├── .claude/
│   ├── agents/
│   │   ├── content-repurposer.md
│   │   ├── newsletter-writer.md
│   │   └── social-media-writer.md
│   └── skills/
│       ├── ghostwriter/
│       ├── linkedin-post/
│       ├── twitter-thread/
│       └── youtube-description/
└── context/
    ├── business-profile.json
    ├── icp.json
    └── social-links.json
```

**Color Coding Within the Text**
- The initial path `~/co-writer-system` should be colored cyan (#0891B2)
- Folder names (anything ending with `/` like `agents/`, `skills/`, `context/`) should be a brighter blue or cyan tint
- File names ending in `.md` should be soft white/gray
- File names ending in `.json` should be a muted yellow or gold (#E3B341)
- The tree branch characters (`├──`, `│`, `└──`) should be a dimmer gray (#484F58) so they recede visually

---

### Animation Sequence

**Phase 1: Terminal Window Appears (0.0s - 0.5s)**
- The terminal window fades in and slightly scales up (starting at 95% scale, ending at 100%)
- Motion should feel smooth and elegant, not jarring
- The window interior is empty/black, with just a blinking cursor in the top-left of the content area

**Phase 2: Initial Path Types Out (0.5s - 1.2s)**
- The cursor blinks 2-3 times in place (blink = disappear for 0.3s, reappear for 0.3s)
- Then the text `~/co-writer-system` types out character by character
- Typing speed: approximately 15-20 characters per second (fast enough to feel snappy, slow enough to read)
- As each character appears, the cursor moves to the right, always positioned immediately after the last typed character
- After the path finishes typing, cursor blinks once, then the line "enters" (content shifts as if Enter was pressed)

**Phase 3: Folder Tree Builds Line by Line (1.2s - 6.0s)**
- Each line of the folder structure types out one at a time
- Timing per line: approximately 0.3-0.5 seconds of typing, then 0.1-0.2 seconds pause before next line
- The tree branch characters (`├──`, `│`, `└──`) should type out as part of the line, not appear instantly
- When a folder with contents appears (like `.claude/`), there's a very subtle "expansion" feel - perhaps a 0.1s pause before its children start appearing
- Important folders/files can have a very subtle "glow pulse" when they complete - the text briefly brightens then settles (this is optional, keep it subtle)

**Typing Animation Details:**
- Characters appear one at a time from left to right
- The blinking block cursor always sits at the insertion point
- Cursor does NOT blink while actively typing - only blinks during pauses
- Each character should feel like it's being "printed" - instant appearance, no fade

**Phase 4: Completion Flourish (6.0s - 7.0s)**
- After the final line (`└── social-links.json`) completes, the cursor blinks 2-3 more times
- Then either:
  - Option A: Cursor fades out gracefully
  - Option B: A subtle horizontal line or "glow sweep" passes over the entire structure from top to bottom, like a scanner confirming completion - colored cyan, very soft, takes about 0.5 seconds
- The complete structure sits visible for at least 1-2 seconds before any loop

**Phase 5: Loop Behavior (if looping)**
- The entire terminal content fades out (text disappears, window stays)
- Brief pause (0.5s) with empty terminal
- Sequence restarts from Phase 2

---

### Motion & Easing

- All movements should use "ease-out" or "ease-in-out" curves - never linear, never jarring
- The typing should feel mechanical but smooth - consistent rhythm, not erratic
- Any scale or fade animations should be subtle (never more than 10% scale change, never harsh opacity jumps)
- The overall feeling should be: "satisfying to watch, like code coming to life"

---

### Color Summary

| Element | Color | Hex |
|---------|-------|-----|
| Background (behind terminal) | White / Off-white | #FFFFFF / #F8FAFC |
| Terminal window background | Near black | #0D1117 |
| Window controls | Red, Yellow, Green | #FF5F56, #FFBD2E, #27C93F |
| Main text | Light gray | #E6EDF3 |
| Cursor | Cyan | #0891B2 |
| Initial path | Cyan | #0891B2 |
| Folder names | Cyan/blue tint | #0891B2 |
| .json files | Muted gold | #E3B341 |
| Tree branches | Dim gray | #484F58 |

---

### What to Avoid

- Do NOT make the terminal look old/retro with scan lines, CRT effects, or green-on-black coloring
- Do NOT add glitch effects, static, or distortion
- Do NOT make text appear all at once or in chunks - it must type character by character
- Do NOT use a thin line cursor (like `|`) - use a solid block cursor
- Do NOT add excessive decorations, icons, or imagery inside the terminal
- Do NOT make the animation too fast (unreadable) or too slow (boring)
- Do NOT add sound visualization, waveforms, or unrelated graphical elements
- The terminal should look like a REAL modern terminal application (like macOS Terminal, iTerm2, or VS Code's integrated terminal) - not a sci-fi fantasy interface

---

### Technical Specifications

- Resolution: at least 1920x1080, ideally 4K (3840x2160) for crisp text
- Frame rate: 30fps or 60fps
- Format: MP4 or MOV with transparency if possible, otherwise on the white/off-white background
- Duration: 7-10 seconds for single play, or seamless loop
- The text MUST be sharp and legible - this is a text-focused animation, blurry text ruins it

---

### Mood & Feeling

The viewer should feel: "Oh, this is elegant and technical but not scary. I could see myself using this. It looks organized and powerful."

It's the visual equivalent of watching a master craftsman organize their workshop - everything has a place, the system makes sense, and there's something satisfying about watching it come together.

---
---

## Example 2: Parallel Agent Swarm Animation

### Overall Concept
A central hub pulses and spawns multiple agent entities that fly outward to different task stations, work briefly, then return to the center carrying completed deliverables. The visual metaphor: "one command spawns a team that works in parallel and brings back results." The aesthetic is clean, minimal, and satisfying to watch - like a well-oiled machine.

---

### Visual Specifications

**The Canvas / Background**
- Solid white background: `#FFFFFF`
- Completely flat - no textures, patterns, or gradients
- The entire animation plays in a square or 16:9 frame with generous padding around all elements

**The Central Hub**
- Positioned in the exact center of the frame
- A circle, approximately 80-100px diameter
- Filled with brand cyan: `#0891B2`
- Has a soft outer glow - same cyan at 15% opacity (`rgba(8, 145, 178, 0.15)`), feathered outward about 20px
- Inside the circle: a simple tilde symbol (~) in white, centered - this represents the "command origin"
- The hub should feel like the "brain" or "origin point" of the system

**The Agent Entities**
- There are exactly **5 agents** in this animation
- Each agent is a small rounded rectangle (pill shape), approximately 60px wide by 28px tall
- All agents share the same base style but have differentiated colors:
  - Agent 1 (newsletter): Brand cyan `#0891B2`
  - Agent 2 (linkedin): Darker cyan `#0E7490`
  - Agent 3 (twitter): Brand orange `#EA580C`
  - Agent 4 (youtube): Darker orange `#C2410C`
  - Agent 5 (research): Medium gray `#525252`
- Each agent has a small text label inside it in white (`#FFFFFF`), using a clean sans-serif font (similar to Outfit), approximately 11-12px:
  - Agent 1: "newsletter"
  - Agent 2: "linkedin"
  - Agent 3: "twitter"
  - Agent 4: "youtube"
  - Agent 5: "research"
- The agents have a very subtle drop shadow (2px blur, 1px offset, 8% black opacity)
- When moving, each agent leaves a faint motion trail - a soft streak of their color at 15% opacity that fades quickly

**The Task Destinations**
- 5 destination points arranged in a circle around the central hub
- Each destination is approximately 250-300px away from the center (measured from center to center)
- Arranged evenly spaced like points on a clock: top, top-right, bottom-right, bottom-left, top-left
- Each destination is represented by a simple icon or shape:
  - Position 1 (top): A small document/page icon outline - represents "newsletter"
  - Position 2 (top-right): LinkedIn logo outline (the "in" square) - represents "linkedin"
  - Position 3 (bottom-right): A small bird or "X" shape outline - represents "twitter"
  - Position 4 (bottom-left): A play button triangle outline - represents "youtube"
  - Position 5 (top-left): A magnifying glass outline - represents "research"
- Each icon is drawn with thin lines (1.5-2px stroke), colored in muted gray: `#a3a3a3`
- Icons are approximately 32-40px in size
- No fill on the icons - just outline/stroke

**The Deliverable Indicators**
- When an agent "completes" its task, a small checkmark appears
- This is a tiny icon (16-20px) that appears next to or slightly overlapping the agent
- Colored white with a subtle glow matching the agent's color
- Represents "work completed, carrying result back"

---

### Animation Sequence

**Phase 1: Idle Hub (0.0s - 0.8s)**
- The central hub is visible, gently pulsing
- Pulse animation: the outer glow expands slightly (grows from 20px to 30px radius) then contracts back, taking about 1.5 seconds per cycle
- The hub pulses 1-2 times while everything else is static
- The 5 destination icons are visible but dim (about 40% opacity)
- No agents visible yet - they haven't spawned

**Phase 2: Agent Spawn (0.8s - 1.3s)**
- The hub brightens momentarily (a quick flash, lasting 0.15s)
- All 5 agents emerge FROM the center of the hub simultaneously
- Spawn animation: agents start at 0% scale and 0% opacity, positioned exactly at the hub center
- Over 0.3 seconds, they scale up to 100% and fade to 100% opacity
- They spawn in a tight cluster, overlapping at first
- Small "burst" effect: a ring of cyan light (`#0891B2` at 20% opacity) quickly expands outward from the hub and fades - like a ripple in water, takes 0.4s

**Phase 3: Agents Disperse (1.3s - 2.3s)**
- All 5 agents fly outward simultaneously toward their respective destinations
- Each agent travels in a straight line (or very slight arc) from center to its destination
- Movement should use "ease-out" easing - fast at first, then decelerating smoothly as they approach
- Travel time: approximately 0.8-1.0 seconds for each agent
- As they move, their motion trails streak behind them briefly
- The destination icons brighten from 40% to 100% opacity as the agents approach
- Stagger the arrival slightly (within 0.2s of each other) so it doesn't feel too mechanical

**Phase 4: Agents Working (2.3s - 4.0s)**
- Each agent "docks" at its destination - it stops moving and hovers near/next to the destination icon
- While docked, each agent has a subtle "working" animation:
  - A small loading spinner appears next to the agent (a thin circular arc that rotates, colored `#a3a3a3`)
  - OR the agent gently bobs up and down (2-3px movement)
  - OR tiny dots appear and disappear in sequence (...) next to the agent
- The working animation runs for approximately 1.5-2.0 seconds
- Stagger the completion times - not all agents finish at the same moment:
  - Agent 5 (research) finishes first at 3.2s
  - Agent 2 (linkedin) finishes at 3.4s
  - Agent 3 (twitter) finishes at 3.5s
  - Agent 1 (newsletter) finishes at 3.7s
  - Agent 4 (youtube) finishes last at 4.0s
- When each agent completes:
  - The loading indicator disappears
  - A small checkmark icon appears attached to the agent (white with subtle glow)
  - A brief "completion flash" - the agent brightens for 0.1s
  - The destination icon pulses once with orange highlight (`#EA580C` at 30% opacity flash)

**Phase 5: Agents Return (4.0s - 5.2s)**
- As each agent completes, it immediately begins traveling back to the center
- Since they finish at staggered times, they return at staggered times - creating a "gathering" effect
- Return movement uses "ease-in-out" easing - smooth acceleration and deceleration
- Agents now have their small checkmark icon attached (visually trailing slightly behind them or tucked next to them)
- Motion trails appear again during return travel
- The destination icons dim back to 40% opacity after their agent leaves
- Return travel takes approximately 0.8 seconds per agent

**Phase 6: Convergence & Completion (5.2s - 6.0s)**
- Agents arrive back at the central hub one by one (staggered)
- As each agent reaches the hub:
  - It shrinks down (scales to 0%) and fades out
  - It appears to "merge" back into the hub
  - A small cyan pulse on the hub each time an agent returns
- After all 5 agents have returned:
  - The hub does one larger pulse (brighter cyan glow, expands further)
  - A final "completion" ring expands outward - a gradient ring that goes from cyan (`#0891B2`) to orange (`#EA580C`) as it expands and fades
  - This signals "all tasks complete"

**Phase 7: Reset / Loop (6.0s - 7.0s)**
- Brief pause (0.5s) with just the idle hub visible
- Loop back to Phase 1, or fade to black and restart

---

### Motion & Easing Details

**Movement Curves:**
- Outward travel: ease-out (cubic-bezier 0.16, 1, 0.3, 1) - fast departure, gentle arrival
- Return travel: ease-in-out (cubic-bezier 0.4, 0, 0.2, 1) - smooth both ways
- Scale animations (spawn/despawn): ease-out for appearing, ease-in for disappearing
- Pulse animations: sine wave easing for smooth, organic feel

**Motion Trails:**
- Trails are the agent's color at 15% opacity
- Trail length: approximately 40-60px behind the agent
- Trails fade out over 0.3 seconds after the agent passes
- Trails should feel like a "streak" not a solid line - slightly tapered

**Timing Feel:**
- The overall animation should feel purposeful and efficient
- Not frantic or chaotic - each agent knows exactly where it's going
- The staggered completions add visual interest without feeling random
- The convergence at the end should feel satisfying - like pieces clicking into place

---

### Color Summary

| Element | Color | Hex |
|---------|-------|-----|
| Background | White | `#FFFFFF` |
| Central Hub | Brand Cyan | `#0891B2` |
| Hub Glow | Cyan 15% | `rgba(8, 145, 178, 0.15)` |
| Agent 1 (newsletter) | Brand Cyan | `#0891B2` |
| Agent 2 (linkedin) | Cyan Dim | `#0E7490` |
| Agent 3 (twitter) | Brand Orange | `#EA580C` |
| Agent 4 (youtube) | Orange Dim | `#C2410C` |
| Agent 5 (research) | Text Secondary | `#525252` |
| Destination Icons (idle) | Text Faint | `#a3a3a3` |
| Destination Icons (active) | Text Muted | `#737373` |
| Agent Labels | White | `#FFFFFF` |
| Completion Checkmark | White | `#FFFFFF` |
| Completion Flash | Orange | `#EA580C` |
| Final Ring Gradient | Cyan → Orange | `#0891B2` → `#EA580C` |

---

### What to Avoid

- Do NOT make the agents look like robots, faces, or humanoid figures - they are abstract pill shapes with labels
- Do NOT add complex particle effects, explosions, or excessive sparkles
- Do NOT make movements jerky, linear, or robotic - everything should feel smooth and organic
- Do NOT have agents collide with each other or overlap awkwardly during travel
- Do NOT use 3D perspective, rotation, or depth effects - keep everything flat/2D
- Do NOT add sound visualization, waveforms, or pulsing backgrounds
- Do NOT make the animation too fast (overwhelming) or too slow (boring)
- Do NOT use neon/glowing effects on the agents themselves - they should be solid matte colors with subtle shadows
- Do NOT include any text besides the small labels on the agents
- Do NOT use colors outside the brand palette - stick to cyan, orange, white, and grays

---

### Technical Specifications

- Resolution: 1920x1080 minimum, 4K (3840x2160) preferred
- Frame rate: 60fps for smooth motion trails
- Format: MP4 or MOV, optionally with alpha channel for transparency
- Duration: 6-7 seconds per loop
- Loopable: yes, seamless loop preferred

---

### Mood & Feeling

The viewer should feel: "Wow, this is organized and powerful. One command triggers a whole team that works simultaneously and brings back results. This is what scaling looks like."

It's the visual equivalent of a conductor raising their baton, an orchestra playing in perfect sync, and then all instruments resolving to the same final note. Coordinated. Parallel. Satisfying.
