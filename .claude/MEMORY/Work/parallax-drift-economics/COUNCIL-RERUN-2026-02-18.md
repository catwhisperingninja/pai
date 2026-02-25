# Council Re-run: Parallax Drift Economics (2026-02-18)

## Context
Re-ran debate council with actual codebase (repomix), architect counter-proposal, and full personal/geopolitical context. 3 rounds, 4 agents (Architect Serena, Engineer Marcus, Researcher Ava, Security Rook — Rook refused to engage constructively, replaced with Pi synthesis).

## Settled Decisions (LOCKED — do not relitigate)
- No centralized payment processor user-facing
- MaaS primary revenue (Quorum of Five as API)
- Crypto-native tips only, ETH L1 primary chain
- Safe{Wallet} 3-of-5 multisig, Shamir backup
- Smart contract audit mandatory
- CreatorRegistry only (wallet-to-CID)

## Council Findings

### 1. Auto-Tipping Formula
- Client-side recurring dispatch (NOT Superfluid/Sablier — minimize smart contract surface)
- Percentage-of-transaction: 1-3% of tip value
- Floor: $0.001 per auto-tip, Ceiling: $0.50
- Batch into periodic L1 transactions (~200 lines of code)
- A/B test parameters before mainnet deployment

### 2. MaaS Revenue Validation
- Content moderation API market: $1.59B (2025) → $2.69B (2032), 10.5% CAGR
- $2K x 10 customers = $20K/mo is CONSERVATIVE given market size
- EU Digital Services Act driving growing budgets
- 10 named targets: Meedan ($2,900/mo enterprise), Full Fact, Africa Check, AFP Fact Check, Bellingcat, BOOM Live, Rappler, EU DisinfoLab, Taiwan FactCheck Center, Logically
- First targets: newsrooms and fact-checkers (budget + urgency in current political climate)

### 3. ETH L1 Gas Economics
- Current: 0.07 gwei = $0.004 per transfer (essentially free)
- Working assumption: 5 gwei = $0.17/tip (workable)
- Historical worst: 30 gwei = $2.39 (not viable for $0.10 tips)
- Gas batching thresholds preserved: warn >10 gwei, auto-batch >50 gwei
- L2 NOT needed at pdrift's scale — L1 cheap due to post-Dencun activity migration
- Protodanksharding planned (not live) — assumes L1 stays viable with contingency logic

### 4. L2 Contingency (NOT MVP scope)
- Base REJECTED as contingency — Coinbase runs it, centralization risk
- ZK-based preferred: Aztec (ZK privacy L2), ETH ZK roadmap, ZEC/WZEC
- Fallback should be MORE decentralized than L1, not less
- PaymentProvider interface should anticipate ZK chains, not centralized L2s

### 5. Smart Contract Audit
- CreatorRegistry (minimal wallet-to-CID): $10-15K, 4-6 weeks
- Mid-tier firm: Code4rena contest or Sherlock
- DEFER until post-MaaS-revenue (month 5+)
- Keep contract surface absolutely minimal

### 6. IP Strategy
- No patent filing — anonymity > IP protection
- Defensive publication via GitHub (spec public 1+ month) is sufficient
- Grok 4.20 (4-agent debate) is architecturally distinct (same-model instances vs genuinely independent LLMs)
- Du et al. (2023) ICML 2024 is academic prior art for all multi-agent debate
- Grok is factually unreliable, not transparent, known CSAM problem

### 7. Business Entity Architecture
- Such Wow Inc (Delaware C-Corp) = media company/content creation
- Parallax Drift = separate, no entity, anonymous
- Canadian entity = visa vehicle only (C11 LMIA-exempt path)
- Estonian e-Residency = jurisdictional arbitrage for nonprofit, NOT pseudonymity (requires real identity)
- Multi-jurisdiction = coordination burden on authorities = delay mechanism

### 8. Privacy Infrastructure Migration (~1 focused week)
- Domain: Njalla (crypto, privacy) — 2 hours, highest leverage
- Hosting: Vercel → Fleek (IPFS-backed) or Coolify on Hetzner — 2 days, $20/mo
- API: DigitalOcean → Hetzner VPS — 1 day
- RPC: Alchemy → DRPC or Lava Network (no KYC) — 1 hour
- DNS: ENS + IPFS for unstoppable resolution

### 9. Immigration (Canada, Vancouver)
- Start-Up Visa closed Dec 2025
- C11 LMIA-exempt: requires 50% ownership, business plan, proof of funds, "significant benefit"
- Budget: $5-15K CAD legal, 2-4 months timeline
- Tension: immigration compliance creates paper trails vs pseudonymity

## 10-Month Timeline
- Weeks 1-2: MaaS payment gate (B2B invoicing)
- Weeks 3-4: Infrastructure migration (Njalla → Hetzner → DRPC)
- Month 2: MaaS outreach (Meedan, Full Fact, Bellingcat)
- Month 3: First MaaS revenue + C11 immigration legal ($5-15K CAD)
- Months 4-6: CreatorRegistry audit ($10-15K), operational hardening
- Month 8: Operational independence target

## Architect's Open Questions (from hub inbox)
Still need to answer:
1. PaymentProvider interface — how to abstract crypto cleanly? (Answer: anticipate ZK chains)
2. CreatorRegistry scope — minimal wallet-to-CID (confirmed)
3. MaaS API — queue mgmt, model failover, rate limiting (needs design)
4. IPFS pinning at scale — long-term cost (needs research)
5. Migration speed when crypto activates (N/A — already crypto-only)
6. Bus factor — docs/automation for survivability (needs planning)
7. IP/Patent question — defensive publication, no patent (decided)
