# Truth Oracle API — Front-End Wireframes
> For architect review | Created: 2026-02-25 | **REVISED: 2026-02-25** (model lineup + pricing corrected)
> Design language: Dark theme (bg-surface-0), Tailwind, font-display, glow accents
> Existing components to reuse: Button, Card, Badge, Input, Modal, Spinner, Toast, VerificationBadge
>
> **Quorum of Five models (CONFIRMED by architect):**
> 1. Llama 3.1 70B (Meta/Groq) — US training
> 2. Mixtral 8x22B (Mistral/Together) — EU training
> 3. Command-R+ (Cohere) — Canada training
> 4. Qwen 2.5 72B (Alibaba/Together) — China training
> 5. DeepSeek-V3 (DeepSeek) — China training
>
> **Revenue model (CONFIRMED):** x402 $0.01-0.05/query agent tier | $2K+/mo API tier | $0.10-1.00/attestation
> **Enterprise sales: VETOED.** Self-serve API only. No sales calls. No "Contact Us" flows.

---

## 1. Landing Page (`/oracle`)

Purpose: Marketing/conversion page for the Truth Oracle API product.
Separate from the Parallax Drift content platform.

```
┌─────────────────────────────────────────────────────────────────────┐
│  HEADER                                                             │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │ [◇ Truth Oracle]              [Docs]  [Pricing]  [Dashboard]   ││
│  └─────────────────────────────────────────────────────────────────┘│
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │                      HERO SECTION                               ││
│  │                                                                 ││
│  │         ◆ TRUTH ORACLE                                          ││
│  │         AI-Powered Fact Verification API                        ││
│  │                                                                 ││
│  │    Five independent AI models reach consensus on whether        ││
│  │    claims are true. No token. No bias. Just truth.              ││
│  │                                                                 ││
│  │    ┌──────────────┐  ┌──────────────────┐                       ││
│  │    │  Get API Key  │  │  View Docs →     │                       ││
│  │    └──────────────┘  └──────────────────┘                       ││
│  │                                                                 ││
│  │    ┌─ Live Demo ──────────────────────────────────┐             ││
│  │    │ POST /api/verify                              │             ││
│  │    │ ┌──────────────────────────────────────────┐  │             ││
│  │    │ │ { "title": "Earth is flat" }             │  │             ││
│  │    │ └──────────────────────────────────────────┘  │             ││
│  │    │  [▶ Verify]                                   │             ││
│  │    │                                               │             ││
│  │    │  Response:                                    │             ││
│  │    │  ┌────────────────────────────────────────┐   │             ││
│  │    │  │ classification: "fake"    ⊘ FAKE       │   │             ││
│  │    │  │ consensus: "unanimous"                  │   │             ││
│  │    │  │ confidence: 0.97                        │   │             ││
│  │    │  │ models: 5/5 responded                   │   │             ││
│  │    │  │ ┌─ Votes ────────────────────────┐      │   │             ││
│  │    │  │ │ ● Llama 3.1 70B  → fake (0.99) │      │   │             ││
│  │    │  │ │ ● Mixtral 8x22B  → fake (0.98) │      │   │             ││
│  │    │  │ │ ● Command-R+     → fake (0.96) │      │   │             ││
│  │    │  │ │ ● Qwen 2.5 72B   → fake (0.95) │      │   │             ││
│  │    │  │ │ ● DeepSeek-V3    → fake (0.97) │      │   │             ││
│  │    │  │ └────────────────────────────────┘      │   │             ││
│  │    │  └────────────────────────────────────────┘   │             ││
│  │    └───────────────────────────────────────────────┘             ││
│  └─────────────────────────────────────────────────────────────────┘│
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │                   HOW IT WORKS (3-step)                         ││
│  │                                                                 ││
│  │  ┌──────────┐    ┌──────────────┐    ┌──────────────┐           ││
│  │  │ 1. SEND  │ →  │ 2. VERIFY    │ →  │ 3. RESULT    │           ││
│  │  │ POST req │    │ 5 AI models  │    │ Consensus +  │           ││
│  │  │ w/ claim │    │ vote indep.  │    │ EAS attested │           ││
│  │  └──────────┘    └──────────────┘    └──────────────┘           ││
│  │                                                                 ││
│  │  Commit-reveal voting prevents model bias.                      ││
│  │  Ethereum Attestation Service provides tamper-proof records.    ││
│  │  ERC-8004 gives each model a verifiable on-chain identity.     ││
│  └─────────────────────────────────────────────────────────────────┘│
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │                     PRICING                                     ││
│  │                                                                 ││
│  │  ┌────────────┐  ┌────────────────┐  ┌──────────────────┐       ││
│  │  │  AGENT      │  │  API            │  │  API PRO         │       ││
│  │  │  (x402)     │  │                │  │                  │       ││
│  │  │             │  │  Self-serve    │  │  Self-serve      │       ││
│  │  │  Pay-per-   │  │  monthly       │  │  monthly         │       ││
│  │  │  query      │  │                │  │                  │       ││
│  │  │  $0.01-0.05 │  │  $2,000/mo     │  │  $5,000/mo       │       ││
│  │  │  per query  │  │                │  │                  │       ││
│  │  │  x402 proto │  │  50,000 req/   │  │  200,000 req/    │       ││
│  │  │  No signup  │  │  month         │  │  month           │       ││
│  │  │  needed     │  │                │  │  + $0.10-1.00    │       ││
│  │  │             │  │  + EAS attest  │  │  per attestation │       ││
│  │  │  [Docs →]   │  │  $0.10-1.00/ea │  │                  │       ││
│  │  │             │  │                │  │  Priority queue   │       ││
│  │  │             │  │  [Subscribe]   │  │  [Subscribe]      │       ││
│  │  └─────────────┘  └────────────────┘  └──────────────────┘       ││
│  └─────────────────────────────────────────────────────────────────┘│
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │  TRUST INDICATORS                                               ││
│  │                                                                 ││
│  │  [✓ 5 Independent Models]  [✓ On-Chain Attestations]            ││
│  │  [✓ Commit-Reveal Voting]  [✓ Open Verification]               ││
│  │  [✓ No Token Required]    [✓ Stripe Billing]                   ││
│  └─────────────────────────────────────────────────────────────────┘│
│                                                                     │
│  FOOTER (reuse existing pdrift Footer component)                   │
└─────────────────────────────────────────────────────────────────────┘
```

### Component Breakdown:
- `OracleHeader` — Separate from pdrift header. Minimal. Logo + 3 nav links.
- `HeroSection` — Headline, subhead, 2 CTAs, live demo widget
- `LiveDemoWidget` — Interactive: text input → POST /verify → animated response
- `HowItWorks` — 3-step horizontal flow with icons
- `PricingCards` — 3-tier pricing (reuse Card component)
- `TrustIndicators` — Badge row (reuse Badge component)

---

## 2. API Documentation (`/oracle/docs`)

Purpose: Developer-facing docs. Powered by @fastify/swagger-ui at `/docs` on the API,
but also needs a friendlier branded wrapper.

```
┌─────────────────────────────────────────────────────────────────────┐
│  [◇ Truth Oracle]              [Docs]  [Pricing]  [Dashboard]      │
├────────────────┬────────────────────────────────────────────────────┤
│  SIDEBAR       │  MAIN CONTENT                                     │
│                │                                                    │
│  Getting       │  # Authentication                                  │
│  Started ●     │                                                    │
│                │  All requests require an API key passed via:        │
│  Authenti-     │    Authorization: Bearer sk-oracle-...              │
│  cation        │    — or —                                          │
│                │    X-API-Key: sk-oracle-...                         │
│  POST /verify  │                                                    │
│                │  ┌─ Code Example ──────────────────────────────┐   │
│  Response      │  │  curl -X POST https://api.truthoracle.io/  │   │
│  Format        │  │    api/verify \                              │   │
│                │  │    -H "Authorization: Bearer sk-oracle-..." \│   │
│  Error         │  │    -H "Content-Type: application/json" \     │   │
│  Codes         │  │    -d '{                                     │   │
│                │  │      "title": "Claim to verify",             │   │
│  Rate          │  │      "description": "Optional context",      │   │
│  Limits        │  │      "transcript": "Optional transcript"     │   │
│                │  │    }'                                         │   │
│  Billing       │  └──────────────────────────────────────────────┘  │
│                │                                                    │
│  Webhooks      │  # POST /api/verify                                │
│                │                                                    │
│  SDKs          │  ## Request Body (JSON)                            │
│                │  ┌────────────┬──────────┬─────────────────────┐   │
│                │  │ Field      │ Type     │ Required            │   │
│                │  ├────────────┼──────────┼─────────────────────┤   │
│                │  │ title      │ string   │ ✓ Yes               │   │
│                │  │ description│ string   │ No                  │   │
│                │  │ transcript │ string   │ No                  │   │
│                │  │ tags       │ string[] │ No                  │   │
│                │  └────────────┴──────────┴─────────────────────┘   │
│                │                                                    │
│                │  ## Response (200 OK)                               │
│                │  ┌──────────────────────────────────────────────┐  │
│                │  │ {                                            │  │
│                │  │   "requestId": "uuid",                      │  │
│                │  │   "classification": "factual|fake|art|...", │  │
│                │  │   "consensusType": "unanimous|majority|..", │  │
│                │  │   "confidence": 0.85,                       │  │
│                │  │   "summary": "Human-readable summary",      │  │
│                │  │   "votes": [{                               │  │
│                │  │     "model": "llama-3.1-70b",               │  │
│                │  │     "classification": "factual",            │  │
│                │  │     "confidence": 0.9,                      │  │
│                │  │     "reasoning": "Evidence supports..."     │  │
│                │  │   }],                                       │  │
│                │  │   "evidence": {                              │  │
│                │  │     "claimsChecked": 5,                     │  │
│                │  │     "corroborated": 3,                      │  │
│                │  │     "disputed": 1,                          │  │
│                │  │     "noResults": 1                          │  │
│                │  │   },                                        │  │
│                │  │   "metadata": {                              │  │
│                │  │     "totalModels": 5,                       │  │
│                │  │     "respondedModels": 5,                   │  │
│                │  │     "processingTimeMs": 4200                │  │
│                │  │   },                                        │  │
│                │  │   "attestation": {                           │  │
│                │  │     "commitRevealHash": "0xabc...",         │  │
│                │  │     "easAttestationUid": "0x..."            │  │
│                │  │   }                                         │  │
│                │  │ }                                            │  │
│                │  └──────────────────────────────────────────────┘  │
│                │                                                    │
│                │  ## Error Responses                                 │
│                │  ┌──────┬──────────────────────────────────────┐   │
│                │  │ 400  │ Invalid request body                  │   │
│                │  │ 401  │ Missing or invalid API key            │   │
│                │  │ 429  │ Rate limit / quota exceeded           │   │
│                │  │ 503  │ Quorum engine unavailable             │   │
│                │  └──────┴──────────────────────────────────────┘   │
├────────────────┴────────────────────────────────────────────────────┤
│  FOOTER                                                             │
└─────────────────────────────────────────────────────────────────────┘
```

### Component Breakdown:
- `DocsSidebar` — Sticky left nav with section links
- `CodeBlock` — Syntax-highlighted code with copy button (dark bg-surface-1)
- `RequestTable` — Styled table for request/response fields
- `ResponsePreview` — JSON viewer with collapsible sections
- `ErrorTable` — Status code reference table

---

## 3. Developer Dashboard (`/oracle/dashboard`)

Purpose: API key management, usage monitoring, billing.
Auth: API key holders authenticate via email + Stripe customer portal.

```
┌─────────────────────────────────────────────────────────────────────┐
│  [◇ Truth Oracle]              [Docs]  [Pricing]  [Dashboard ●]    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Welcome back, user@bellingcat.org          Plan: PRO | [Upgrade]  │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │  API KEYS                                              [+ New]  ││
│  │                                                                 ││
│  │  ┌──────────────────────────────────────────────────────────┐   ││
│  │  │  Production Key                                          │   ││
│  │  │  sk-oracle-prod-••••••••1234                    [Copy]   │   ││
│  │  │  Created: 2026-02-25  │  Last used: 2 min ago            │   ││
│  │  │  Status: ● Active                         [Revoke]       │   ││
│  │  └──────────────────────────────────────────────────────────┘   ││
│  │                                                                 ││
│  │  ┌──────────────────────────────────────────────────────────┐   ││
│  │  │  Development Key                                         │   ││
│  │  │  sk-oracle-dev-••••••••5678                     [Copy]   │   ││
│  │  │  Created: 2026-02-25  │  Last used: 1 hr ago             │   ││
│  │  │  Status: ● Active                         [Revoke]       │   ││
│  │  └──────────────────────────────────────────────────────────┘   ││
│  └─────────────────────────────────────────────────────────────────┘│
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │  USAGE THIS MONTH                                               ││
│  │                                                                 ││
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          ││
│  │  │  Requests    │  │  Avg Latency │  │  Quota       │          ││
│  │  │  4,231       │  │  3.8s        │  │  42%         │          ││
│  │  │  ↑12% vs     │  │              │  │  4,231 /     │          ││
│  │  │  last month  │  │              │  │  10,000      │          ││
│  │  └──────────────┘  └──────────────┘  └──────────────┘          ││
│  │                                                                 ││
│  │  ┌─ Usage Over Time ────────────────────────────────────────┐   ││
│  │  │                                                          │   ││
│  │  │  400 ┤                              ╭─╮                  │   ││
│  │  │  300 ┤               ╭──╮    ╭──╮  │ │  ╭─╮            │   ││
│  │  │  200 ┤    ╭──╮  ╭──╮│  │╭──╮│  │╭─╯ ╰──╯ │            │   ││
│  │  │  100 ┤╭──╮│  ╰──╯  ╰╯  ╰╯  ╰╯  ╰╯       ╰─╮          │   ││
│  │  │    0 ┤╰──╯                                    ╰──        │   ││
│  │  │      └──────────────────────────────────────────────     │   ││
│  │  │       Feb 1    Feb 7    Feb 14   Feb 21    Feb 25       │   ││
│  │  └──────────────────────────────────────────────────────────┘   ││
│  │                                                                 ││
│  │  ┌─ Classification Breakdown ───────────────────────────────┐   ││
│  │  │                                                          │   ││
│  │  │  ████████████████████░░░░░░░░░░  Factual  48%           │   ││
│  │  │  ██████████████░░░░░░░░░░░░░░░░  Fake     32%           │   ││
│  │  │  ██████░░░░░░░░░░░░░░░░░░░░░░░░  Art      14%           │   ││
│  │  │  ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░  Unverif.  6%           │   ││
│  │  └──────────────────────────────────────────────────────────┘   ││
│  └─────────────────────────────────────────────────────────────────┘│
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │  RECENT VERIFICATIONS                                           ││
│  │                                                                 ││
│  │  ┌──────┬──────────────────────────┬──────────┬────────┬─────┐ ││
│  │  │ Time │ Title                    │ Result   │ Conf.  │ Ms  │ ││
│  │  ├──────┼──────────────────────────┼──────────┼────────┼─────┤ ││
│  │  │ 2m   │ "Vaccine causes autism"  │ ⊘ FAKE   │  0.97  │ 3.8s│ ││
│  │  │ 14m  │ "GDP grew 2.3% in Q4"   │ ✓ FACT   │  0.91  │ 4.1s│ ││
│  │  │ 1h   │ "AI-generated landscape" │ ◆ ART    │  0.88  │ 3.2s│ ││
│  │  │ 2h   │ "New species discovered" │ ✓ FACT   │  0.82  │ 5.1s│ ││
│  │  │ 3h   │ "CEO resigned today"     │ ? UNVER  │  0.45  │ 4.8s│ ││
│  │  └──────┴──────────────────────────┴──────────┴────────┴─────┘ ││
│  │                                                    [View All →] ││
│  └─────────────────────────────────────────────────────────────────┘│
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │  BILLING                              [Manage in Stripe →]      ││
│  │                                                                 ││
│  │  Current plan: PRO ($99/mo)                                     ││
│  │  Next billing: March 1, 2026                                    ││
│  │  Overage this month: 0 requests ($0.00)                         ││
│  └─────────────────────────────────────────────────────────────────┘│
│                                                                     │
│  FOOTER                                                             │
└─────────────────────────────────────────────────────────────────────┘
```

### Component Breakdown:
- `DashboardLayout` — Full-width, no sidebar (unlike docs)
- `ApiKeyCard` — Key display with mask, copy, revoke actions (reuse Card)
- `CreateKeyModal` — Name input + plan selection (reuse Modal, Input)
- `UsageStats` — 3 metric cards (reuse Card + custom stat layout)
- `UsageChart` — Time-series chart (lightweight: recharts or chart.js)
- `ClassificationBreakdown` — Horizontal bar chart
- `RecentVerifications` — Table with VerificationBadge status icons
- `BillingCard` — Plan info + Stripe portal link

---

## 4. Verification Detail Modal (reusable across dashboard + content platform)

Purpose: Deep dive into a single verification result.
Triggered from Recent Verifications table or content platform video page.

```
┌─────────────────────────────────────────────────────────────────────┐
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                    VERIFICATION DETAIL                    [✕] │  │
│  │                                                               │  │
│  │  "Vaccine causes autism"                                      │  │
│  │                                                               │  │
│  │  ┌──────────────────────────────────────────────────────────┐ │  │
│  │  │  ⊘ FAKE          Unanimous (5/5)         Conf: 0.97     │ │  │
│  │  │  ═══════════════════════════════════════════════ 97%     │ │  │
│  │  └──────────────────────────────────────────────────────────┘ │  │
│  │                                                               │  │
│  │  SUMMARY                                                      │  │
│  │  All five independent models classified this claim as fake.   │  │
│  │  Extensive scientific evidence contradicts this claim.        │  │
│  │                                                               │  │
│  │  MODEL VOTES                                                  │  │
│  │  ┌────────────────┬──────────┬──────┬───────────────────────┐ │  │
│  │  │ Model          │ Vote     │ Conf │ Reasoning (truncated) │ │  │
│  │  ├────────────────┼──────────┼──────┼───────────────────────┤ │  │
│  │  │ Llama 3.1 70B  │ ⊘ fake   │ 0.99 │ "Multiple studies..." │ │  │
│  │  │ Mixtral 8x22B  │ ⊘ fake   │ 0.98 │ "The original 1998.." │ │  │
│  │  │ Command-R+     │ ⊘ fake   │ 0.96 │ "Thoroughly debunk.." │ │  │
│  │  │ Qwen 2.5 72B   │ ⊘ fake   │ 0.95 │ "Scientific consens." │ │  │
│  │  │ DeepSeek-V3    │ ⊘ fake   │ 0.97 │ "No credible evid.." │ │  │
│  │  └────────────────┴──────────┴──────┴───────────────────────┘ │  │
│  │                                                               │  │
│  │  EVIDENCE                                                     │  │
│  │  ┌────────────────────────────────────────────────────────┐   │  │
│  │  │ Claims checked: 3                                      │   │  │
│  │  │  ● "Wakefield study proved link" — DISPUTED            │   │  │
│  │  │    Source: The Lancet (retracted), CDC, WHO             │   │  │
│  │  │  ● "Autism rates rose with vaccination" — NO RESULTS   │   │  │
│  │  │    Correlation ≠ causation flagged                      │   │  │
│  │  │  ● "MMR vaccine contains mercury" — DISPUTED           │   │  │
│  │  │    Source: FDA, peer-reviewed studies                    │   │  │
│  │  └────────────────────────────────────────────────────────┘   │  │
│  │                                                               │  │
│  │  CRYPTOGRAPHIC PROOF                                          │  │
│  │  ┌────────────────────────────────────────────────────────┐   │  │
│  │  │ Commit-Reveal Hash: 0x7f3a...8b2c                     │   │  │
│  │  │ EAS Attestation:    0x91d4...f7e1     [View on EAS ↗] │   │  │
│  │  │ Merkle Root:        0xa3c2...4d91                      │   │  │
│  │  │ Timestamp:          2026-02-25T05:30:12Z               │   │  │
│  │  └────────────────────────────────────────────────────────┘   │  │
│  │                                                               │  │
│  │  ┌──────────────────────────────────────────────────────────┐ │  │
│  │  │  Request ID: 7f3a2b1c-...   │  Processing: 3,812ms     │ │  │
│  │  │  API Key: sk-oracle-••1234   │  Models: 5/5 responded   │ │  │
│  │  └──────────────────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

### Component Breakdown:
- `VerificationDetailModal` — Full-screen modal (reuse Modal)
- `ConsensusBar` — Classification + consensus type + confidence bar
- `VotesTable` — Expandable rows for full reasoning
- `EvidenceSection` — Claim-by-claim evidence with source badges
- `CryptoProofSection` — Hash display with external links
- `MetadataFooter` — Request ID, timing, model count

---

## 5. Component Hierarchy (New Components)

```
oracle/
├── OracleHeader.tsx          ← Separate from pdrift header
├── landing/
│   ├── HeroSection.tsx
│   ├── LiveDemoWidget.tsx    ← Interactive API tester
│   ├── HowItWorks.tsx
│   ├── PricingCards.tsx
│   └── TrustIndicators.tsx
├── docs/
│   ├── DocsSidebar.tsx
│   ├── CodeBlock.tsx         ← Syntax highlight + copy
│   ├── RequestTable.tsx
│   ├── ResponsePreview.tsx
│   └── ErrorTable.tsx
├── dashboard/
│   ├── DashboardLayout.tsx
│   ├── ApiKeyCard.tsx
│   ├── CreateKeyModal.tsx
│   ├── UsageStats.tsx
│   ├── UsageChart.tsx
│   ├── ClassificationBreakdown.tsx
│   ├── RecentVerifications.tsx
│   └── BillingCard.tsx
└── shared/
    ├── VerificationDetailModal.tsx
    ├── ConsensusBar.tsx
    ├── VotesTable.tsx
    ├── EvidenceSection.tsx
    └── CryptoProofSection.tsx
```

## 6. Routes

```
/oracle                → Landing page (public)
/oracle/docs           → API documentation (public)
/oracle/dashboard      → Developer dashboard (authenticated)
/oracle/dashboard/keys → API key management
/oracle/dashboard/usage→ Detailed usage analytics
/oracle/dashboard/billing → Billing management (redirects to Stripe)
```

## 7. Design Notes for Architect

1. **Separation from pdrift content platform**: Oracle pages live under `/oracle/*` route group. Completely separate header, auth flow (email/Stripe vs wallet/SIWE), and navigation. No wallet connect on Oracle pages.

2. **Reuse existing UI components**: Button, Card, Badge, Input, Modal, Spinner, Toast, Skeleton, PageTransition all carry over. VerificationBadge already has the exact status taxonomy we need (FACTUAL/FAKE/ART/PENDING/UNVERIFIED).

3. **Dark theme consistent**: Same `bg-surface-0`, `bg-surface-1`, glow effects. Oracle pages should feel like the same product family.

4. **LiveDemoWidget is the key conversion tool**: Interactive API tester on the landing page. Pre-populated with example claims. Shows real responses. This is what will sell Bellingcat.

5. **Dashboard auth is email-based, NOT wallet**: API customers authenticate via email (tied to Stripe customer). This is intentionally separate from the SIWE wallet auth on the content platform.

6. **Mobile-responsive**: All wireframes should be responsive. Dashboard collapses to single-column. Docs sidebar becomes hamburger menu.

7. **Minimal new dependencies**: recharts or lightweight chart lib for UsageChart. Everything else uses existing Tailwind + custom components.

8. **ENTERPRISE SALES VETOED**: No "Contact Us" buttons, no custom pricing flows, no sales call scheduling. ALL tiers are self-serve via Stripe. The highest tier is API PRO at $5K/mo — still self-serve signup.

9. **Three-tier pricing reflects two customer types**: (a) Agent tier via x402 micropayments — no signup needed, pay-per-query $0.01-0.05. (b) API tier via Stripe subscription — $2K/mo and $5K/mo self-serve plans with EAS attestations.

10. **Model diversity is the product differentiator**: 5 models from 5 different training lineages (US/EU/Canada/China x2). Display this prominently — it's what makes consensus meaningful. Geographic/training diversity prevents systemic bias.

11. **Crypto layer is INVISIBLE to API customers**: Commit-reveal, EAS attestations, ERC-8004 agent identity all run under the hood. Customers see `attestation.commitRevealHash` and `attestation.easAttestationUid` in the response — they don't need to understand the crypto. The CryptoProofSection in the detail modal is opt-in transparency, not required interaction.

12. **CodeRabbit integration**: Repo uses CodeRabbit for CI/CD code review. Front-end PRs will get automated review. Plan component structure accordingly (small, focused files).

## 8. Architect's Flow (from architect's build plan)

```
Client Request
    │
    ▼
POST /api/verify (Stripe API key auth)
    │
    ▼
API Gateway (Fastify + helmet + rate-limit)
    │
    ▼
Zod Validation (title required, description/transcript/tags optional)
    │
    ▼
runContentAnalysis() ← MERGE CONTRACT (apps/api/src/services/quorum.ts)
    │
    ├──→ Fact-Check Preprocessing
    │    ├── ClaimExtractor (Type A-E taxonomy)
    │    ├── BraveSearch evidence gathering
    │    └── EvidenceBuilder (source tiers, corroboration)
    │
    ├──→ Quorum Orchestrator
    │    ├── Commit phase (hash votes before reveal)
    │    ├── 5 models vote in parallel (Promise.allSettled)
    │    │   ├── Llama 3.1 70B  (Groq)
    │    │   ├── Mixtral 8x22B  (Together)
    │    │   ├── Command-R+     (Cohere)
    │    │   ├── Qwen 2.5 72B   (Together)
    │    │   └── DeepSeek-V3    (DeepSeek)
    │    ├── Reveal phase (verify commitments)
    │    └── Consensus (unanimous/supermajority/majority/no-consensus)
    │
    ├──→ EAS Attestation (fire-and-forget, off-chain default)
    │
    └──→ ERC-8004 Agent Identity (enrich votes with agentId)
    │
    ▼
Structured JSON Response
    │
    ├──→ Usage event logged (DB)
    ├──→ Stripe meter fired (fire-and-forget)
    └──→ Return to client
```
