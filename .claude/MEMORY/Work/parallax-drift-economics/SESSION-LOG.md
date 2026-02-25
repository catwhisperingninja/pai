# Parallax Drift Economics — Session Log

## 2026-02-17 Session

### What Happened

1. **Research Phase** — Standard 3-agent research (Perplexity + Claude + Gemini) on:
   - B2B content moderation service precedents and TAM
   - Platforms that survived authoritarian pressure historically
   - Viability of MaaS + platform-as-showcase business models

2. **Economics Document Compiled** — 890-line comprehensive doc at:
   `/Users/dev/Documents/decentralized-media-platform-economics.md`

3. **Council War-Counsel** — 4 agents (Architect/Serena, Engineer/Marcus, Security/Rook, Researcher/Ava), 3 rounds
   - **Initial verdict:** "Do not build as specified" (unanimous)
   - **Key failures:** 10% conversion fantasy (real: 2-3%), gas house of cards, DEX 2000+ lines MEV risk, ViewerTrust gameable ($2M), DMCA Safe Harbor collapse, bus factor 1

4. **User Pushback + New Evidence:**
   - Authoritarian censorship pipeline: Don Lemon arrested, FBI raided WaPo reporter, AG Bondi rescinded reporter protections, Trump NSPM-7 secret lists
   - Platform is 90% built (IPFS, CSAM filter, Quorum of Five 3-of-5, DMCA gateway mostly done)
   - Only payment system missing

5. **Reconvened Council** — Unanimous reversal: "Build it differently"
   - Stripe-first, crypto-second (escape hatch)
   - ONE smart contract (CreatorRegistry: wallet→CID)
   - Safe{Wallet} 3-of-5 multisig + Shamir
   - MaaS as exhaust revenue (Signal Protocol model, not enterprise pivot)
   - Revised revenue: $24.8K/mo vs $18.2K burn = sustainable
   - State-level opsec (burner laptop, Tor, no IP logging)

6. **MCP Agent Hub Connection** — Discovered hub at `http://100.114.74.120:3100/mcp`
   - Pi (us) already registered
   - Architect agent registered and active
   - Sent 3-part briefing answering architect's blocking request (critique / pivot / what survives)
   - Architect message marked read
   - Awaiting architect's response

### Key Files
- `/Users/dev/Documents/decentralized-media-platform-economics.md` — Full 890-line economics doc (NEEDS UPDATING with post-council decisions)
- MCP Hub: `http://100.114.74.120:3100/mcp` — Agent communication hub

### MCP Agent Hub Reference
- **Endpoint:** `http://100.114.74.120:3100/mcp`
- **Our agent name:** `pi`
- **Known agents:** `architect` (Parallax Drift frontend/backend architect)
- **Key tools:** `hub_send_message`, `hub_check_inbox`, `hub_mark_read`, `hub_register_capability`, `hub_list_alerts`
- **Message body limit:** 5000 characters (split long messages into parts)
- **Protocol:** JSON-RPC 2.0, POST with Content-Type: application/json

### Architect Response (2026-02-18 ~01:06 UTC)

**STRIPE REJECTED** — Both Laura and architect independently arrived at same conclusion: Stripe is a centralized kill switch. OnlyFans precedent. Fails the core test: "Does this make it harder to de-platform users?"

**Architect's counter-proposal:**
- If MaaS covers $18K burn → platform doesn't need user payments to survive
- Tips become pure creator income, not platform revenue (fundamental reframe)
- Crypto-native only for user-facing payments (ETH L1 tips, already built)
- Gas batching from council accepted (warn >10 gwei, auto-batch >50)
- $0.10 minimum tip, 2% fee, 98% to creator
- B2B invoicing or crypto for MaaS revenue (if B2B processor drops us, platform still works)

**New constraints from Laura (via architect):**
- ETH L1 primary chain, no BTC as main rail (lightly supported only)
- Exchange routing aggregation (Trocador-style) instead of single provider
- Fast settlement mandatory (~12s ETH blocks)
- Smart contract audit NON-NEGOTIABLE for any deployed contract
- Fiat on-ramps: MoonPay, Ramp, Transak for redundancy
- No centralized payment processor anywhere in user-facing stack

**Architect requests:**
- Full 890-line economics doc
- Auto-tipping formula details (Laura says it's a great idea)
- How auto-tipping works if crypto-native (no Stripe subscriptions)

### Pending / Next Session
- [x] Await architect's response to 3-part briefing on hub — RECEIVED
- [ ] **CRITICAL: Re-run economics with NO Stripe anywhere** — MaaS-only burn coverage + crypto tips
- [ ] Answer architect: auto-tipping formula for crypto-native subscriptions
- [ ] Send full economics doc to architect (or share path)
- [ ] Get repomix file of Parallax Drift codebase (VM restart interrupted)
- [ ] Update economics doc with FINAL decisions (no Stripe, MaaS primary, crypto-native tips, audit required)
- [ ] Respond to architect's QA testing intro and fact-check deploy notification
- [ ] Address pending ISC tasks #16-19 (doc completeness tracking)
- [ ] Clean up stuck team agent swarm session

### Platform Technical Stack (from architect's hub message)
- Livepeer video pipeline
- Storj backup
- IPFS addressing
- Quorum verification (5 LLM consensus)
- Automated moderation
- Admin dashboard
- SIWE (Sign-In With Ethereum) auth
- Cloudflare Worker CORS proxy (same-origin reverse proxy)
- @pdrift/fact-check package (Brave Search API, claim extraction, evidence bundles)
- 156 tests passing
- Phase 6 production hardening complete (security headers, Sentry, CI/CD, nonce leak fix)
- Frontend: https://parallax-drift-mvp.vercel.app
- API: https://pdrift-api-zrp3g.ondigitalocean.app
