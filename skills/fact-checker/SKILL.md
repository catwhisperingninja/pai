---
name: fact-checker
description:
  Verify citations and factual claims in long-form content using 5-step URL
  verification, claim taxonomy (Type A/B/C/D), and web scraping. Use when
  fact-checking drafts, verifying sources, or validating claims in investigative
  journalism.
---

# Fact-Checker for Writers

A specialized fact-checking system for long-form content, investigative
journalism, and analytical writing.

## CRITICAL: First Step on Invocation

**BEFORE doing anything else**, you MUST read the full system prompt XML file:

```
/Users/lauralopez/Documents/gitlab-projects/content-ai/04_distribution/public_service/fact-checker-release/fact_checker_system_prompt_1.1.xml
```

This 600+ line XML contains the complete fact-checking protocol including:

- Type A-E claim taxonomy (not just A-D)
- U.S. federal data warnings (post-Jan 2025)
- User-provided context protocol
- Lessons learned from previous sessions
- Full verification procedures

**Do NOT proceed with fact-checking until you have read this file.**

## When to Use This Skill

Invoke this skill when you need to:

- Verify citations in drafts (internal sources and external URLs)
- Validate factual claims and identify unsourced assertions
- Distinguish between claims needing sources vs. critiques demonstrating
  dysfunction
- Generate comprehensive fact-check reports with actionable recommendations
- Preserve valid arguments when correcting factual errors

## Tool Usage Requirements

When this skill is invoked, follow the comprehensive fact-checking system prompt
located at:

````
/Users/lauralopez/Documents/gitlab-projects/content-ai/04_distribution/public_service/fact-checker-release/fact_checker_system_prompt_1.1.xml
### Primary Tools: MCP Docker (REQUIRED)

**ALWAYS use Browser Base MCP tools** for web scraping and search (Browser Base preferred over HyperBrowser for better Claude Code compatibility):
- `mcp__MCP_DOCKER__scrape_webpage` - Content extraction
- `mcp__MCP_DOCKER__brave_web_search` - Web searches
- `mcp__MCP_DOCKER__crawl_webpages` - Multi-page crawling
- `mcp__MCP_DOCKER__extract_structured_data` - Schema-based extraction

These are pre-approved via `.claude/settings.local.json` and enable autonomous URL verification. Browser Base preferred for connection reliability.

### WebFetch Restrictions

**DO NOT use WebFetch during fact-checking** unless:
1. MCP Docker tools are confirmed broken/unavailable, AND
2. User has been informed and explicitly approves WebFetch as fallback

If MCP tools fail, inform the user and ask for approval before falling back to WebFetch.

### Docker MCP Management

To check available MCP servers:
```bash
docker mcp list
````

To add a new MCP server:

```bash
docker mcp add <server-name>
```

When working with JSON in CLI, use `jq` for parsing:

```bash
docker mcp tools list | jq '.tools[]'
```

## Core Verification Process

1. **Classify Sources by Type**

   - Identify acceptable factual sources (government data, academic research,
     journalism)
   - Flag AI conversation threads as opinion/analysis only (NOT factual sources)
   - Mark external URLs for web scraping verification
   - Flag U.S. federal sources with post-Jan 2025 dates

2. **5-Step URL Verification** (using MCP Docker tools)

   - Accessibility check (404, paywall, redirects)
   - Publication date verification (compare claimed vs actual)
   - Retraction/correction check
   - Quote verification (verbatim vs paraphrased)
   - Context verification (supports claim vs misrepresented)

3. **Claim Type Taxonomy** (Type A/B/C/D/E - see XML for full details)

   - **Type A: Factual Claim** - Needs verification or sourcing
   - **Type B: Critique/Example** - Demonstrates dysfunction (verify accuracy,
     not "find sources")
   - **Type C: Opinion/Interpretation** - Label clearly or add supporting
     sources
   - **Type D: Rhetorical/Voice** - No action needed
   - **Type E: User-Provided Verified** - User has confirmed accuracy

4. **Critical Nuance Principle**

   > "Factual errors may exist within valid arguments. Correct the error,
   > preserve the valid critique."

5. **Generate Structured Report**
   - Clear status indicators (✅ ⚠️ ❌)
   - Citation verification results
   - Factual claims analysis by type
   - Research gaps with priority levels
   - Actionable recommendations

## Key Features

### AI Conversation Thread Classification

Explicitly prohibits citing AI-generated conversations (ChatGPT threads, LLM
outputs) as factual sources. These can only be used for voice/perspective, not
evidence.

### U.S. Federal Data Warning

Automatically flags U.S. federal government sources (.gov) published after
January 2025 as potentially unreliable, with editorial guidance.

## Report Structure

Generated reports include:

- **Citation Verification** (internal and external sources)
- **Factual Claims Analysis** (by type: A/B/C/D/E)
- **Research Gaps Identified** (with priority: HIGH/MEDIUM/NO ACTION)
- **Summary** (✅ Verified / ⚠️ Needs Review / ❌ Problematic)
- **Recommendations** (actionable next steps)

## Legal Disclaimer

This fact-checking system is provided "AS IS" without warranty. It is designed
to ASSIST with fact-checking and should not be relied upon as the sole method of
verification. Users are responsible for independently verifying all claims
before publication.

## Examples

### Example 1: Verifying a Draft with External Sources

**User Request**: "Fact-check the Christian Taliban V3 draft, focusing on the
legislative citations and timeline claims."

**Skill Response**: Generates comprehensive report with:

- URL verification for each external source
- Date accuracy validation
- Quote verification (verbatim vs paraphrased)
- Context analysis (proper usage vs misrepresentation)
- Recommendations for any issues found

### Example 2: Type B Critique Verification

**User Request**: "Check this claim: 'Government search returns 2-year-old
article as first result'"

**Skill Response**:

- Classifies as Type B (Critique - demonstrates dysfunction)
- Tests the critique's accuracy by performing actual search
- Verifies dates of search results
- Reports whether critique is accurate (not "needs source")

### Example 3: AI Thread Misuse Detection

**User Request**: "Verify sources in this draft about AI safety regulations"

**Skill Response**:

- Identifies ChatGPT thread cited as factual source
- Flags as ❌ CRITICAL error
- Explains: AI conversations are opinion/analysis, not factual sources
- Recommends: Replace with verified external sources

## Success Criteria

- ✅ System prompt XML read before starting
- ✅ MCP Docker tools used (not WebFetch)
- ✅ All cited sources checked (exist/accessible)
- ✅ External URLs verified with web scraping
- ✅ Context-aware analysis (factual vs critiques vs opinion vs voice)
- ✅ Unsourced claims identified
- ✅ Research gaps documented with priority levels
- ✅ Clear status indicators throughout report
- ✅ Source type classification enforced
- ✅ U.S. federal post-Jan 2025 sources flagged

## Technical Requirements

**Required**: Docker MCP with Browser Base (preferred) or HyperBrowser

- Browser Base has better Claude Code connection reliability
- Pre-configured in `.claude/settings.local.json`
- Enables autonomous URL verification without per-domain prompts
- Check status with `docker mcp list`
