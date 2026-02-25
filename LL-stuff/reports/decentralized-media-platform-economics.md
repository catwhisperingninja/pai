# Decentralized Media Platform — Economic Model & Strategy

> Comprehensive economic architecture for a censorship-resistant, decentralized media platform (video-first, IPFS-hosted, ETH L1). Compiled February 2026.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Core Design Decisions](#2-core-design-decisions)
3. [Revenue Model](#3-revenue-model)
4. [Creator Reward Algorithm](#4-creator-reward-algorithm)
5. [Anti-Gaming & Sybil Resistance](#5-anti-gaming--sybil-resistance)
6. [Reddit Karma Failure Analysis](#6-reddit-karma-failure-analysis)
7. [Hate Speech Economics](#7-hate-speech-economics)
8. [ETH L1 Micropayment Viability](#8-eth-l1-micropayment-viability)
9. [Stablecoin Exchange Revenue](#9-stablecoin-exchange-revenue)
10. [Platform Fee & Sustainability Model](#10-platform-fee--sustainability-model)
11. [Creator Onboarding Subsidies](#11-creator-onboarding-subsidies)
12. [Engagement Architecture (Dopamine Without Rage)](#12-engagement-architecture)
13. [Transparency & Public Payment Logic](#13-transparency--public-payment-logic)
14. [Smart Contract Security (No-Audit Strategy)](#14-smart-contract-security)
15. [DMCA Resistance Architecture](#15-dmca-resistance-architecture)
16. [Global Accessibility](#16-global-accessibility)
17. [Existing Platform Comparisons](#17-existing-platform-comparisons)
18. [Phased Economic Roadmap](#18-phased-economic-roadmap)
19. [Critical Numbers Summary](#19-critical-numbers-summary)
20. [Strategic Recommendations](#20-strategic-recommendations)

---

## 1. Executive Summary

This document defines the economic architecture for a decentralized, censorship-resistant media platform. The platform hosts video content on IPFS, processes payments on Ethereum L1, and uses a "Quorum of Five" AI moderation system for content filtering and tagging.

**Key economic decisions:**
- **No ads.** Revenue comes from subscriptions, tip fees, and stablecoin exchange fees.
- **No tokenomics, no ICO, no DAO.** Pure ETH/stablecoin economics. No regulatory risk from token issuance.
- **ETH L1 only.** No L2 dependency. L1 gas is historically low post-Dencun and expected to remain favorable.
- **Barely-for-profit.** Revenue covers 1 developer (Vancouver, $150K/yr), office ($3K/mo), and infrastructure. Surplus flows to creator reward pool.
- **DMCA compliance on frontend, immutable content on IPFS/chain.** Four-layer decentralization architecture.

**Breakeven: ~13,000 users at 10% subscription conversion, ~9,000 at 15%.**

---

## 2. Core Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Advertising | **No ads** | Eliminates advertiser pressure, brand safety politics, and hate-content adjacency issues. Exchange revenue fills gap. |
| Token / ICO | **None** | LBRY was destroyed by SEC. No token = no securities risk. Use ETH directly. |
| DAO governance | **No** | Adds complexity, governance attacks (see: Steem/Justin Sun). Simple corporate structure with transparent on-chain economics. |
| Blockchain layer | **ETH L1 only** | L2 solutions expected to consolidate. L1 gas historically low post-EIP-4844. Simpler architecture. |
| Content storage | **IPFS** | Censorship-resistant, content-addressed, no single point of failure. |
| Moderation | **Quorum of Five** (5 open-source AI models) | Vote/debate/filter for CSAM, sexual content. Tag as fact/fake/art with hate speech subcategory. |
| Smart contract audits | **No formal audits** | Too expensive for barely-for-profit model. Use free tooling + simplicity + bug bounties instead. |
| Business model | **Barely-for-profit** | Pay 1 dev + office. Surplus to creators. No VC, no investors, no growth-at-all-costs. |
| Jurisdiction | **Vancouver, Canada** | Stronger fair use protections than US. Copyright Modernization Act 2012 favorable. |

---

## 3. Revenue Model

Three revenue streams, no ads:

### 3.1 Subscription Tiers

| Tier | Price | Includes |
|------|-------|----------|
| **Free** | $0 | View content, limited tipping (must hold own ETH for gas) |
| **Supporter** | $5/mo | Unlimited tipping, includes $2/mo auto-distributed to watched creators |
| **Patron** | $12/mo | Everything + 2x engagement weight, creator analytics, includes $5/mo auto-tip allocation |
| **Creator Pro** | $20/mo | Everything + priority transcoding, custom creator page, advanced analytics |

**Auto-tip allocation:** A portion of the subscription automatically flows to creators the subscriber watches, proportional to viewing time. Subscribers don't need to think about tipping — it happens based on behavior. This is the core innovation solving the "weaning off free" problem.

### 3.2 Tip Fees

- **2% platform fee** on all direct tips and auto-allocated subscription tips
- Creator receives 98% of every tip
- Minimum tip: $1 (enforced in contract to prevent dust attacks)

### 3.3 Stablecoin Exchange Frontend Fee

- **0.2-0.3% frontend fee** on all stablecoin conversions routed through Uniswap/1inch
- Platform is a UI frontend to existing DEXs, never custodies funds
- Atomic swaps: user wallet -> DEX pool -> recipient wallet in one transaction
- No money transmitter license required (you're a frontend, not an exchange)
- Revenue scales with global usage and multi-currency tipping

### 3.4 Revenue Projections (No Ads)

| Scale | Subscriptions (10% convert, $10 avg) | Tip Fees (2%) | Exchange Fees (0.2%) | Total Revenue | Total Costs | Net |
|-------|---------------------------------------|---------------|----------------------|---------------|-------------|-----|
| 10K users | $10,000 | $4,000 | $600 | **$14,600** | **$18,200** | **-$3,600** |
| 15K users | $15,000 | $6,000 | $900 | **$21,900** | **$20,000** | **+$1,900** |
| 100K users | $100,000 | $40,000 | $5,000 | **$145,000** | **$55,000** | **+$90,000** |
| 1M users | $1,000,000 | $400,000 | $50,000 | **$1,450,000** | **$405,000** | **+$1,045,000** |

**Breakeven: ~13K users at 10% subscription conversion. ~9K at 15% conversion.**

Early-stage gap (~$3,600/mo at 10K users) can be closed by:
- Higher subscription conversion via free trial month and strong onboarding
- Creator Pro tier adoption
- Personal subsidy for 6-12 months until scale kicks in

---

## 4. Creator Reward Algorithm

### 4.1 Core Formula: Weighted Engagement Score with Progressive Trust

```
CreatorReward(c, epoch) = RewardPool(epoch) * (WeightedScore(c) / TotalWeightedScores)

WeightedScore(c) = SUM over all engagements e on c's content:
    EngagementWeight(e.type) * ViewerTrust(e.viewer) * TimeDecay(e.timestamp) * ContentAge(c.content)
```

### 4.2 Engagement Weights

| Action | Weight | Rationale |
|--------|--------|-----------|
| Passive view (>30s) | 0.1 | Low signal, easy to bot |
| View >50% duration | 0.5 | Stronger attention signal |
| View 100% | 0.8 | Genuine interest |
| Comment (unique text) | 1.5 | High-effort engagement |
| Tip (any amount) | 3.0 + log2(tip_amount_wei / 1e15) | Economic commitment, logarithmic to prevent whale dominance |
| Share to external | 1.0 | Distribution value |
| Save/playlist add | 0.8 | Retention signal |

### 4.3 ViewerTrust — The Anti-Sybil Core

```
ViewerTrust(v) = min(1.0, AccountAge(v) * ActivityScore(v) * HumanityScore(v) * StakeWeight(v))
```

**AccountAge(v):**
```
min(1.0, days_since_creation / 180)
// Linear ramp over 6 months, capped at 1.0
```

**ActivityScore(v):**
```
min(1.0, unique_days_active_last_90 / 60)
// Must be active 60+ of last 90 days for full score
```

**HumanityScore(v):**
```
1.0   if verified via BrightID or similar
0.7   if social graph has 10+ mutual connections with verified users
0.4   if only wallet + activity history
0.1   if new account, no connections
```

**StakeWeight(v):**
```
min(1.0, log10(staked_eth_in_wei / 1e18 + 1) / 2)
// 0 ETH staked = 0
// 10 ETH staked = 0.52
// 100 ETH = 1.0
// 10,000 ETH = 1.0 (same as 100 — logarithmic cap)
// Wealth CANNOT buy disproportionate voting power
```

### 4.4 Time Decay

```
TimeDecay(t) = e^(-lambda * hours_since_engagement)
    where lambda = 0.005 (half-life ~138 hours / ~6 days)
```

### 4.5 Content Age — Anti-Repost / Evergreen Balance

```
ContentAge(c) = {
    1.0                                          if age < 7 days
    0.5 + 0.5 * e^(-0.01 * (age_days - 7))      if age >= 7 days
}
// Asymptotes to 0.5 — evergreen content still earns but new content is boosted
```

### 4.6 Reward Pool Structure

```
EpochRewardPool = ProtocolRevenue(epoch) * 0.70 + InflationPool(epoch)

ProtocolRevenue = sum(tip_fees) + sum(subscription_allocation_fees) + sum(exchange_fees)
```

**Distribution:**
- 70% to creators (proportional to weighted engagement)
- 15% to curators (early engagement discovery — first viewers/commenters earn more)
- 10% to protocol treasury (infrastructure costs)
- 5% to staking rewards (incentivize honest participation)

### 4.7 Why This Algorithm Resists Gaming

1. **View botting:** Bot farms with fresh accounts get ViewerTrust ~0.04 vs real users ~0.5+. That's a **125x disadvantage.**
2. **Wealth can't buy visibility:** Stake weight is logarithmic and capped at 1.0. 100 ETH = same influence as 10,000 ETH. No bid-for-placement.
3. **Sybil resistance:** 25 mature fake accounts needed to match 1 real user. Each requires 6 months activity + staked ETH + verification. Economic cost exceeds reward.
4. **Scales universally:** Formula is ratio-based (your share of total weighted scores). Works identically at 100 users or 10 million.

### 4.8 Creator Income Comparison vs YouTube

| Metric | YouTube | This Platform |
|--------|---------|---------------|
| Creator revenue share | 55% of ad revenue | 98% of tips + share of reward pool |
| Revenue source | Advertisers (indirect) | Viewers directly (tips + subscriptions) |
| A creator with 1K loyal subscribers | ~$50-200/mo (depends on CPM, views) | ~$500/mo (1K subs * $0.50 auto-allocation) + direct tips |
| A creator needing $1,000/mo | ~130K views/month needed | ~2,000 subscribers OR ~200 tips/month |
| Platform cut | 45% | 2% |

---

## 5. Anti-Gaming & Sybil Resistance

### 5.1 Layered Anti-Sybil Stack

```
TotalHumanityScore(user) = weighted_sum(
    0.30 * ProgressiveTrust(account_age, activity_consistency),
    0.25 * StakeSignal(min(staked_eth / threshold, 1.0)),
    0.25 * SocialGraph(eigentrust_score),
    0.20 * ExternalVerification(brightid OR gitcoin_passport)
)
```

### 5.2 Trust Tiers

| Tier | Score | Capabilities |
|------|-------|-------------|
| 0 (New) | 0.0-0.1 | View content, limited comments, no reward earning |
| 1 (Basic) | 0.1-0.3 | Post content, earn 25% rewards, limited voting weight |
| 2 (Established) | 0.3-0.6 | Full posting, earn 75% rewards, moderate voting weight |
| 3 (Trusted) | 0.6-1.0 | Full rewards, full voting weight, governance participation |

### 5.3 Cost to Create a Tier 3 Sybil Identity

- ~0.1 ETH staked (~$200)
- 6 months of daily activity simulation
- BrightID/Gitcoin verification (~$50)
- Social graph integration time
- **Total: $200-500 per Sybil identity**
- Break-even at $2/day manipulated rewards: 100-250 days
- During which behavioral anomaly detection can flag and slash

### 5.4 Anti-Sybil Mechanism Evaluation

| Mechanism | Effectiveness | Practicality | Recommended |
|-----------|--------------|-------------|-------------|
| Worldcoin (iris scan) | Near-perfect | Too centralized, privacy-invasive, requires physical Orbs | No |
| BrightID (social verification) | Good | Low adoption (~80K users), friction-heavy | Yes, as one layer |
| Gitcoin Passport (aggregated stamps) | Best practical | $50-200 to game, known threshold | Yes, primary external |
| Stake-based (ETH deposit) | Strong deterrent | Excludes poor users if sole mechanism | Yes, with logarithmic cap |
| Social graph (EigenTrust/SybilRank) | Powerful at scale | Cold-start problem for new users | Yes, at scale |
| Progressive trust (time-based) | Essential | Frustrates legitimate new users | Yes, with onboarding boost |

---

## 6. Reddit Karma Failure Analysis

### 6.1 Exploit Catalog with Mitigations

| # | Exploit | How It Works | Reddit's Weakness | Platform Mitigation |
|---|---------|-------------|-------------------|---------------------|
| 1 | **Vote manipulation bots** | Automated upvote services ($20-50/1K votes) | Every account's vote counts equally | ViewerTrust scoring: new accounts worth 4-10% of real votes |
| 2 | **Brigading** | Communities organize mass-upvote/downvote | No penalty for correlated voting | Correlation penalty: `effective_weight = sum * (1/sqrt(N))` |
| 3 | **Repost farming** | Bots repost top historical content | No content fingerprinting | Perceptual hashing (pHash): reposts get 0.1x multiplier, original creator retains full |
| 4 | **Karma farming circles** | Dedicated subreddits for upvote exchange | Low-quality karma counts same as high-engagement | Reciprocity penalty: >20% mutual engagement = 80% weight reduction |
| 5 | **Vote rings / cabals** | Small groups (5-20) systematically upvote each other | Hard to detect without graph analysis | Louvain community detection on transparent on-chain engagement data |
| 6 | **Purchased accounts** | Aged accounts sold for $50-200+ | Karma transfers with account sale | Wallet-based staking: selling account = transferring all staked ETH. Behavioral change triggers trust cooldown |
| 7 | **Comment karma farming** | Bots repost top comments from old threads | Comment and post karma are fungible | NLP uniqueness scoring: generic comments (<20 chars) get 0.1x weight |

---

## 7. Hate Speech Economics

### 7.1 The Core Tension

Content tagged as hate speech by the AI moderation quorum that passes legal filters (i.e., is legal but distasteful) must be treated fairly: it gets hosted and rewarded. But the economic incentives must not create a hate content factory.

### 7.2 Diminishing Returns Penalty Curve

```
HateMultiplier(creator) = 0.25 * (1 / (1 + hate_content_count_last_90_days))
```

| Hate-tagged pieces (90 days) | Multiplier on each hate piece | Cumulative reward (all hate pieces combined) |
|------------------------------|-------------------------------|---------------------------------------------|
| 1st | 0.250x | 0.25x (= 25% of 1 normal video) |
| 2nd | 0.125x | 0.375x |
| 5th | 0.050x | 0.46x |
| 10th | 0.025x | 0.57x |
| 20th | 0.012x | 0.73x |
| 100th | 0.0025x | 1.30x |

**Key insight:** 100 hate videos combined earn what 1.3 normal videos earn. Volume-based hate flooding is economic suicide.

### 7.3 Content Ratio Penalty

```
If hate_content_ratio > 0.5 (more than half your content is hate-tagged):
    ALL content rewards * 0.5 (even the non-hate content)
```

Prevents the "shell company" strategy: using a legit-looking channel as cover for a hate content pipeline.

### 7.4 Fairness Principle

- Content is NOT censored. It stays up. It's publicly accessible. It passed legal filters.
- The platform's reward algorithm economically deprioritizes hate content without removing it.
- Economic deprioritization is not censorship — it's the equivalent of a bookstore putting some books on the front shelf and others in the back.

---

## 8. ETH L1 Micropayment Viability

### 8.1 Current Gas Conditions (February 2026)

Live data from Ethereum mainnet (Blockscout):
- ETH price: **~$1,959**
- Gas prices: slow **0.23 gwei**, average **0.53 gwei**, fast **2.04 gwei**
- Network utilization: **~50%**
- These are historically low post-EIP-4844 (Dencun upgrade)

### 8.2 Gas Cost: Simple ETH Transfer (21,000 gas)

| Gas Price (gwei) | Gas Cost (USD) @ $2,000/ETH |
|-------------------|-------------------------------|
| 0.5 (current) | **$0.02** |
| 5 (moderate) | **$0.21** |
| 15 (busy) | **$0.63** |
| 30 (congested) | **$1.26** |
| 100 (spike) | **$4.20** |

### 8.3 Gas Cost: Smart Contract Tip (~80,000 gas)

| Gas Price (gwei) | Gas Cost (USD) | Min Tip @ 10% gas | Min Tip @ 20% gas | Min Tip @ 50% gas |
|-----------|----------------|--------------------|--------------------|---------------------|
| 0.5 gwei | $0.08 | **$0.80** | **$0.40** | **$0.16** |
| 5 gwei | $0.80 | **$8.00** | **$4.00** | **$1.60** |
| 15 gwei | $2.40 | **$24.00** | **$12.00** | **$4.80** |
| 30 gwei | $4.80 | **$48.00** | **$24.00** | **$9.60** |
| 100 gwei | $16.00 | **$160.00** | **$80.00** | **$32.00** |

### 8.4 Viability Verdict

- **Current gas (0.03-0.6 gwei):** L1 micropayments are viable. $0.80+ tips work at 10% threshold.
- **Moderate congestion (5-15 gwei):** Sub-$1 tips uneconomical. Minimum viable tip $2-$8.
- **High congestion (30-100 gwei):** L1 micropayments NOT viable below $12-$160.
- **Critical threshold:** Sub-$1 tips only viable below ~2 gwei.

### 8.5 L1 Mitigation Strategies (No L2)

#### A. Tip Batching
- Aggregate tips off-chain (signed messages), settle on-chain hourly/daily
- 50-tip batch: ~20,420 gas per tip vs 80,000 individually
- **75% gas savings**
- Trade-off: settlement delay (not instant gratification)

#### B. Payment Channels (State Channels)
- Open channel: 1 on-chain tx. Close channel: 1 on-chain tx. Unlimited tips in between.
- Total cost: ~$1.28 at 5 gwei for unlimited tips
- Best for repeat fan-to-creator tipping (subscription-like)
- Limitation: complex UX, both parties must be available for disputes

#### C. Meta-Transactions (ERC-4337 Account Abstraction)
- Platform relayer pays gas on behalf of user via paymaster
- User signs message (gasless from their perspective)
- Platform recoups from subscription fees
- Cost: at 5 gwei, sponsoring 10,000 tips/day = ~$8,000/day
- Viable once subscription revenue covers gas sponsorship

#### D. EIP-4844 Indirect Benefit
- Blob transactions moved L2 data off mainnet, reducing L1 demand
- Contributing to sustained low gas prices (0.03-0.6 gwei)
- If L2 activity continues growing, L1 gas may stay low long-term
- Makes L1 micropayments more sustainable than historically expected

### 8.6 Gas Safety Mechanism

Implement a gas price oracle check in the tipping UI:
```
if (currentGasPrice > 10 gwei) {
    show warning: "Gas is elevated. Your $X tip will cost $Y in gas (Z%)."
    suggest: "Batch this tip for lower fees (settles within 24h)"
}
if (currentGasPrice > 50 gwei) {
    auto-route to batch settlement
    show: "Gas is very high. Your tip will be batched and settled when gas drops."
}
```

---

## 9. Stablecoin Exchange Revenue

### 9.1 Architecture: DEX Frontend, Not an Exchange

The platform routes stablecoin conversions through existing decentralized exchanges (Uniswap, 1inch, 0x) and takes a frontend fee. **The platform never custodies funds.** Swaps are atomic — user wallet -> DEX pool -> recipient wallet in one transaction.

```solidity
// Simplified: tip with auto-conversion
function tipWithSwap(address creator, address tokenIn, uint amountIn) {
    uint fee = amountIn * 20 / 10000; // 0.2% frontend fee
    uint swapAmount = amountIn - fee;
    // Route through Uniswap: tokenIn -> creator's preferred token
    // Transfer to creator
    // Fee stays in platform treasury
}
```

### 9.2 Legal Status

- **NOT a Money Services Business (MSB)**: no custody, no money transmission
- **Precedent:** MetaMask Swaps (0.875% fee), Rainbow Wallet, and many DeFi frontends operate this model
- **No money transmitter license required** (you're routing, not exchanging)

### 9.3 Revenue Potential

| Scale | Monthly Conversion Volume (est. 30% of tips) | Exchange Revenue (0.2%) |
|-------|-----------------------------------------------|------------------------|
| 10K users | $60,000 | **$120/mo** |
| 100K users | $600,000 | **$1,200/mo** |
| 1M users | $6,000,000 | **$12,000/mo** |

Additional revenue from:
- Subscription auto-allocation conversions: +30-50% more volume
- Creator off-ramp conversions (stablecoin -> preferred token): +20-40% more volume
- **Realistic total at 100K users: ~$3,000-6,000/mo**

### 9.4 Global Currency Exchange Vision

Longer-term: integrate regional stablecoins (BRZ for Brazil, XSGD for Singapore, etc.) and mobile money bridges (M-Pesa in Kenya). Creators see "You earned $47 this week" and it lands in their local currency. The platform takes a fraction of every conversion.

---

## 10. Platform Fee & Sustainability Model

### 10.1 Infrastructure Costs

#### IPFS Pinning

| Provider | Cost/GB stored | Bandwidth/GB | Best For |
|----------|---------------|-------------|----------|
| Pinata Picnic ($20/mo) | $0.02/GB | 500GB included, $0.07 overage | Early stage |
| Filebase Starter ($20/mo) | $0.025/GB | $0.015/GB | Mid scale |
| Filebase Business ($100/mo) | $0.025/GB | $0.015/GB | Growth |

#### CDN / Gateway

| Provider | Cost/GB |
|----------|---------|
| BlazingCDN | $0.005/GB |
| CDNsun | $0.03/GB |
| Realistic hybrid | **$0.01-0.03/GB** |

#### Video Transcoding

| Provider | Cost/min (1080p) |
|----------|-----------------|
| AWS MediaConvert | $0.0075/min |
| 3 output formats (360p/720p/1080p) | **~$0.0225/min total** |

#### Video Size

| Format | Size/min | Size/hour |
|--------|----------|-----------|
| 720p | ~15 MB | ~0.9 GB |
| 1080p | ~25 MB | ~1.5 GB |
| Multi-rendition (3 formats) | ~50 MB | ~3.0 GB |

### 10.2 Cost Model by User Tier

**Assumptions:** avg user uploads 10 min video/month, watches 60 min/month.

| Tier | Users | Infra/mo (Month 1) | Infra/mo (Month 12) |
|------|-------|--------------------|--------------------|
| Small | 1,000 | $270 | $410 |
| Growing | 10,000 | $2,690 | $4,065 |
| Mid-size | 100,000 | $26,450 | $40,200 |
| Large | 1,000,000 | $255,500 | $393,000 |

**Dominant cost at scale: Transcoding ($225K/mo at 1M users).** Mitigation: require creators to upload pre-transcoded files, or lazy-transcode on first view.

### 10.3 Total Operating Costs (Vancouver)

| Line Item | Monthly Cost |
|-----------|-------------|
| 1 Developer (Vancouver, $150K/yr) | $12,500 |
| Office (Vancouver) | $3,000 |
| Infrastructure (varies with scale) | $270 — $393,000 |
| DMCA agent registration | $6/year |
| Domain + DNS | ~$20/mo |
| **Total at 10K users** | **~$18,200/mo** |
| **Total at 100K users** | **~$55,000/mo** |

---

## 11. Creator Onboarding Subsidies

Zero-cost subsidies that don't involve tokens or free ETH:

### 11.1 New Creator Boost (Attention Subsidy)
- First 30 days: content gets a **2x discovery multiplier** in the recommendation algorithm
- Costs nothing — it's algorithm weighting, not money
- Creates urgency: "Post your best stuff in the first month"

### 11.2 Welcome Engagement (Platform Interaction)
- Platform's own account watches and leaves an AI-generated comment on every new creator's first video
- Creates the feeling of "someone is here" vs posting into the void
- Cost: near-zero (one API call per creator)

### 11.3 Creator Reputation Seed
- New creators start at ViewerTrust **Tier 1** (instead of 0) for their own engagement
- Their votes on other content carry 0.3 weight instead of 0.1
- Immediately gives them a voice in the community

### 11.4 Milestone Notifications
- "Your first viewer!"
- "5 people watched your video!"
- "Someone saved your content!"
- "You received your first tip!"
- Free to generate, psychologically powerful for new creators

---

## 12. Engagement Architecture

### 12.1 Constructive Dopamine (Implement These)

| Mechanism | Effect | Cost |
|-----------|--------|------|
| **Streak rewards** | "You've posted 7 days in a row" — habit building | Free |
| **Progress bars** | Visual progress toward next ViewerTrust tier | Free |
| **"New audience" alerts** | "3 people who never watched you before found your content today" | Free |
| **Weekly creator digest** | "This week: 47 views, 3 tips ($12.40), 2 new followers" | Free |
| **Achievement badges** | Non-transferable, cosmetic. "First $100 earned" / "100 unique viewers" / "30-day streak" | Free |
| **Gratitude loop** | Notify tippers that their recipient posted new content | Free |

### 12.2 Destructive Dopamine (Avoid These)

| Anti-Pattern | Why It's Harmful |
|-------------|-----------------|
| Rage-bait notifications | "Someone disagreed with your comment!" — drives outrage engagement |
| Controversy metrics | "50/50 split!" — rewards divisive content |
| Infinite scroll without stopping cues | Exploits addictive behavior |
| Autoplay of increasingly extreme content | Radicalization pipeline |
| Engagement metrics that reward outrage | Creates perverse incentives |

### 12.3 Model

**Duolingo, not Twitter.** Streaks, progress, positive reinforcement, habit-building — all without making anyone angry.

---

## 13. Transparency & Public Payment Logic

### 13.1 On-Chain Transparency

All smart contracts are verified on Etherscan. Every fee split, every tip, every reward distribution is publicly auditable by anyone. This is the platform's **killer differentiator**.

### 13.2 Public Dashboard

Real-time display:
- Total tips this month: $X
- Platform fee collected: $Y (provably exactly 2% of X)
- Creator payouts: $Z
- Infrastructure costs: $W (link to hosting invoices)
- Surplus/deficit: $V

### 13.3 Competitive Advantage

YouTube's economics are a black box. Patreon's are murky. This platform's economics are **provably transparent.** The blockchain IS the audit trail. No trust required — verify yourself.

**Marketing angle:** "Every cent is on-chain. Verify yourself."

---

## 14. Smart Contract Security

### 14.1 No-Audit Security Stack

| Tool | Cost | What It Catches |
|------|------|----------------|
| **Slither** (Trail of Bits) | Free | Static analysis, 80% of common bugs |
| **Mythril** (ConsenSys) | Free | Symbolic execution, reentrancy/overflow |
| **OpenZeppelin contracts** | Free | Battle-tested base contracts (ERC-20, access control) |
| **Foundry fuzzing** | Free | Property-based testing, thousands of random inputs |
| **Immunefi bug bounty** | Pay-per-bug only | Community-sourced vulnerability discovery |
| **Community code review** | Free | GitHub publication, r/ethdev review requests |

### 14.2 Design Principle: Simplicity as Security

- Keep each contract under **200 lines of Solidity**
- Use `transfer()` not `call()` for ETH sends
- No proxy patterns, no upgradability (deploy new version + migrate if needed)
- No complex DeFi integrations in core contracts
- Tip contract, fee splitter, subscription contract — each dead simple, each verified on Etherscan

### 14.3 The Agent Threat Model

AI agents can find exploits faster than auditors. Defense:
- Tiny attack surface (simple contracts)
- Public code (good-faith agents spot issues before bad-faith ones exploit)
- Bug bounties reward responsible disclosure
- Transparency requirement means more eyes on the code

---

## 15. DMCA Resistance Architecture

### 15.1 Four Layers of Separation

```
Layer 1: Content lives on IPFS
  -> Content hash (CID) is permanent
  -> Replicated across multiple nodes worldwide
  -> Unpinning from YOUR node doesn't delete from network

Layer 2: Content INDEX lives on Ethereum L1
  -> publishContent(bytes32 cid, string metadata) -> immutable
  -> Cannot delete blockchain entries (physical property of the chain)

Layer 3: Your frontend is a READER, not the SOURCE
  -> Web app reads on-chain index, resolves IPFS CIDs
  -> DMCA compliance: hide CID from frontend search/display
  -> Content still exists on IPFS + chain

Layer 4: Open-source frontend, anyone can build alternatives
  -> On-chain contract is public (verified Etherscan)
  -> IPFS content is publicly resolvable
  -> If your frontend is taken down, 10 others replace it
```

### 15.2 DMCA Safe Harbor Compliance

**Register a DMCA agent** with the US Copyright Office (~$6). Comply on YOUR frontend:
1. Receive takedown notice
2. Remove content CID from frontend search/display
3. Notify creator of takedown
4. Process counter-notifications per Section 512(g)

**Legal statement when Disney's lawyers call:**
> "We have complied with the DMCA takedown by removing the content from our frontend search and display. However, the content was published by a user to the IPFS network and indexed on the Ethereum blockchain, neither of which we control or have the ability to modify."

This is truthful. You've complied with Section 512 Safe Harbor requirements. The content persists on IPFS/chain — that's a property of the decentralized infrastructure, not defiance of the law.

### 15.3 Counter-Notification as a Weapon

DMCA Section 512(g): when a creator disputes a takedown:
1. Creator files counter-notification (one-click in your UI)
2. Content restored after 10-14 business days UNLESS claimant files federal lawsuit
3. Most claimants (including media conglomerates) file automated bots and don't follow up with lawsuits

**Make counter-notification EASY.** Pre-filled templates. One-click dispute. This turns DMCA into a weapon AGAINST automated copyright abuse.

### 15.4 AI Content DMCA Shield

- US Copyright Office (2023-2025): purely AI-generated works cannot be copyrighted
- No copyright = no valid DMCA claim
- Platform metadata: "This content is AI-generated" -> auto-reject DMCA claims against it
- As more content becomes AI-generated, DMCA becomes increasingly irrelevant

### 15.5 Canadian Jurisdiction Advantage

- Copyright Modernization Act 2012 has stronger fair use ("fair dealing") protections
- Canadian courts more skeptical of automated copyright claims
- Operating from Vancouver provides slightly better legal positioning than US

---

## 16. Global Accessibility

### 16.1 Crypto-Restricted Regions

| Region | Status | Platform Impact |
|--------|--------|----------------|
| **China** | All crypto illegal since 2021 | Accessible via VPN + IPFS. Legally grey for users. |
| **India** | Legal but 30% tax + 1% TDS on transfers >$590 | Usable but tax burden makes microtips expensive |
| **Bangladesh, Nepal, Egypt** | Outright bans | VPN required |
| **Nigeria** | Regulated since 2023 | High adoption, workable |
| **Russia** | Legal to hold, restricted to trade | Sanctions complicate access |

### 16.2 Fiat On/Off Ramps

| Provider | Card Fee | Bank Fee | Min Purchase | Coverage |
|----------|----------|----------|-------------|----------|
| MoonPay | 4.5% | 1% | ~$30 | 160+ countries |
| Transak | 3.5-5% | ~1% | ~$15 | 170+ countries |
| Ramp | 2.5-3% | ~1% | ~$5 | 150+ countries |

**Key friction:** $5 tip via card on-ramp costs $0.23 in ramp fees + gas + platform fee. Total ~8-10% friction before platform fee. Minimum viable on-ramp purchase: $15-30.

**Mitigation:** Pre-load wallet balance. Subscription model (one monthly charge vs per-tip on-ramp). Stablecoin exchange integration reduces off-ramp costs.

### 16.3 Unbanked Populations

ETH-only payments actually benefit unbanked users — no bank account needed, just a smartphone. Barriers: acquiring initial ETH (P2P purchase, earning tips from content). Not a crypto-specific problem — smartphone + internet access is the real gate.

### 16.4 Stablecoin Support

Support ETH + USDC + DAI for tipping:
- Stablecoins eliminate ETH price volatility ($4,800 -> $1,800 in 6 months)
- Users reason about "$2 tip" not "0.001 ETH tip"
- ERC-4337 account abstraction lets users pay gas IN the stablecoin (no separate ETH needed)
- DAI preferred over USDC for censorship resistance (USDC can be frozen by Circle)

---

## 17. Existing Platform Comparisons

### 17.1 Platform Outcomes

| Platform | Token | Peak Users | What Killed It | Key Lesson |
|----------|-------|------------|----------------|------------|
| **Odysee/LBRY** | LBC | 5M MAU | SEC lawsuit ($22M judgment). Token collapsed 99.5%. | Token issuance by US company = securities risk. |
| **Steem/Hive** | STEEM/HIVE | 60K DAU | Whale plutocracy. Justin Sun hostile takeover. Vote-selling markets. | Stake-weighted linear voting creates plutocracy. |
| **DTube** | DTC | <5K active | Unsustainable video hosting costs. Own chain had zero liquidity. | Infrastructure costs need explicit funding model. |
| **Brave/BAT** | BAT | 60M MAU | Tiny creator payouts ($0.50-5/mo). <5% of users tip. | Micropayment tipping alone doesn't generate meaningful income. |
| **Mirror.xyz** | None (ETH) | 100K writers | 100% dependent on NFT speculation. Collapsed 90%+ post-bubble. | Speculation-driven engagement is not sustainable. |
| **PeerTube** | None | ~1K instances | No economic incentives. Running instance costs $50-500/mo with no revenue. | Decentralized architecture without economics = hobby project. |

### 17.2 Synthesized Principles

| Principle | Evidence |
|-----------|----------|
| Inflationary tokens without real revenue are unsustainable | Steem, DTube, LBRY: token collapse destroyed creator earnings |
| Stake-weighted voting = plutocracy | Steem: top 1% controlled 90% of voting influence |
| Real revenue must back the economics | BAT works (barely) because real advertisers pay. Mirror died with NFT speculation. |
| Centralized company + token = SEC risk | LBRY destroyed by SEC. This platform: no token = no risk. |
| Discovery must not be pay-to-play | LBRY's staking-for-search-ranking made wealth = visibility |
| Infrastructure costs need explicit funding | DTube/PeerTube: decentralized hosting isn't free |
| Federation without economics = hobby project | PeerTube: technically impressive, economically irrelevant |
| Micropayment tipping alone is insufficient | BAT: 60M users, pennies per creator. Need subscription aggregation. |

### 17.3 How This Platform Avoids Each Failure Mode

| Failure Mode | This Platform's Defense |
|-------------|----------------------|
| Token/SEC risk | No token. Pure ETH/stablecoin. |
| Whale plutocracy | Logarithmic stake cap. 100 ETH = 10,000 ETH in influence. |
| Inflationary token collapse | No inflation. Revenue-backed reward pool. |
| Unsustainable infra costs | Explicit fee model covering all infrastructure. |
| Speculation dependency | Subscription + tips = utility-based, not speculative. |
| No economic incentives | Creator rewards, viewer subsidies, exchange revenue all built in. |
| Pay-to-play discovery | Engagement-weighted algorithm. Wealth cannot buy visibility. |

---

## 18. Phased Economic Roadmap

### Phase 1: MVP — Tips + Subscriptions (NOW -> 1K users)

**Target:** Launch. Ship fast. Catch the YouTube deplatforming wave.

**Infrastructure:**
- Solidity tipping contract (~50 lines, simple `tip(address)` payable + fee split)
- Subscription contract (monthly payments, auto-tip allocation)
- IPFS pinning: Pinata Picnic ($20/mo)
- Frontend: static site, MetaMask/WalletConnect integration
- Gas safety mechanism (warn at >10 gwei, auto-batch at >50 gwei)

**Economics:**
- Fee: 0% initially -> 2% once volume justifies
- Subscription: $5 and $12 tiers
- Minimum tip: $1
- Support: ETH only (simplest)
- Gas: users pay own gas (currently ~$0.08/tip)

**Monthly cost:** ~$15,500/mo (dev + office + minimal infra)
**Revenue at 1K users:** ~$1,400/mo (tight, subsidize difference)

**Priority build: YouTube Migration Tool** — import subscriber lists from deplatformed creators.

### Phase 2: Creator Rewards + Stablecoins (5K+ users, $50K+ monthly tips)

**Trigger:** 5,000 active users, $50,000/mo in tip volume, 100+ regular creators.

**New features:**
- Tip batching contract (75% gas savings, hourly settlement)
- Stablecoin support (USDC, DAI)
- Stablecoin exchange (0.2% frontend fee via Uniswap router)
- ERC-4337 account abstraction (gasless tipping via paymaster)
- Creator reward pool (20% of fee revenue, distributed by engagement)
- Creator Pro tier ($20/mo, analytics + priority transcoding)
- Hate speech diminishing returns penalty curve

**Economics:**
- Fee: 2% on all tips/allocations
- Exchange fee: 0.2% on conversions
- Reward pool: ~$400-800/mo from fees
- Gas sponsorship via paymaster: budget $1,000-2,000/mo

**Monthly cost:** ~$20,000/mo
**Revenue at 10K users:** ~$14,600-21,900/mo (break-even zone)

### Phase 3: Full Economic System (50K+ users, $500K+ monthly volume)

**Trigger:** 50,000 active users, $500K/mo volume, self-sustaining on revenue.

**New features:**
- Reward pool / staking model (creators and curators stake ETH/stablecoins, yield from fees + DeFi)
- Regional stablecoin integration (BRZ, XSGD, etc.)
- Global creator payroll (auto-convert to local currency)
- Counter-notification automation (one-click DMCA dispute)
- Multiple frontend mirrors (community-operated)

**Economics:**
- Fee: 2-2.5%
- Revenue at 100K users: ~$145,000/mo
- Costs at 100K users: ~$55,000/mo
- Surplus: ~$90,000/mo -> reward pool + infrastructure scaling

**Optional (only if genuine community demand):**
- Governance token for protocol parameter voting (fee rates, reward allocation)
- NOT a payment token, NOT a revenue-share token (securities risk)
- Token launch only after legal review in Canadian jurisdiction

---

## 19. Critical Numbers Summary

| Metric | Value |
|--------|-------|
| **Current ETH L1 gas** | 0.23-2.04 gwei |
| **Simple ETH transfer cost** | $0.02 |
| **Smart contract tip cost** | $0.08 |
| **Min viable tip (current gas, 10%)** | $0.80 |
| **Min viable tip (5 gwei, 10%)** | $8.00 |
| **IPFS storage** | $0.02-0.025/GB/month |
| **CDN bandwidth** | $0.005-0.03/GB |
| **Video transcoding** | $0.0075-0.015/min |
| **Fiat on-ramp (card)** | 3.5-4.5% |
| **Platform tip fee** | 2% |
| **Stablecoin exchange fee** | 0.2% |
| **Break-even (10% sub conversion)** | ~13K users |
| **Break-even (15% sub conversion)** | ~9K users |
| **Monthly burn (Vancouver, 10K users)** | ~$18,200 |
| **Monthly burn (100K users)** | ~$55,000 |
| **Dominant cost at scale** | Transcoding ($225K/mo at 1M users) |
| **Creator revenue share** | 98% of tips |
| **Hate speech reward penalty** | 0.25x first piece, approaches 0 with volume |
| **Sybil cost per fake identity** | $200-500 |
| **Bot disadvantage ratio** | 125x vs real users |

---

## 20. Strategic Recommendations

### 20.1 Ship Phase 1 NOW

The YouTube deplatforming wave is your distribution strategy. Every creator who migrates brings their audience. Build the YouTube Migration Tool before anything else. Ship fast, iterate later.

### 20.2 Subscriptions Are the Core, Tips Are Gravy

The subscription with auto-tip allocation solves three problems simultaneously: revenue sustainability, creator income, and the "weaning off free" challenge. Don't start tips-only and add subscriptions later — the subscription IS the economics.

### 20.3 Keep Contracts Stupid Simple

One tipping contract, one fee splitter, one subscription contract. All under 200 lines each. Verified on Etherscan. Public dashboard. No proxy patterns. Simplicity is your security budget.

### 20.4 Transparency Is Your Moat

Every cent on-chain. Public dashboard. Provable fee percentages. No centralized platform can match this. Market it aggressively.

### 20.5 The Exchange Revenue Eliminates the Need for Ads

The stablecoin exchange frontend fee, combined with subscriptions and tip fees, makes the no-ads model financially viable. This is the most important economic innovation in the model — it removes advertiser dependency entirely.

### 20.6 DMCA: Comply on Frontend, Let the Protocol Be Immutable

Register a DMCA agent. Remove content from your frontend. Point lawyers at IPFS and Ethereum. Make counter-notifications one-click easy. The architecture makes the "sorry, can't do anything about it" response genuinely truthful.

### 20.7 Plan for Gas Variability

Current L1 gas is a gift. It won't last forever. Build tip batching and gas safety mechanisms into Phase 1, not Phase 2. The first time a user pays $5 gas for a $3 tip, you lose them permanently.

### 20.8 The Creator Math Wins

A creator with 1,000 loyal subscribers on this platform earns ~$500/mo guaranteed. The same creator on YouTube needs ~130K views/month for the same income. That math is your pitch to every deplatformed creator.

---

*Document compiled February 2026. All gas costs, ETH prices, and infrastructure pricing reflect current market conditions and should be updated periodically.*
