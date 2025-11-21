# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a reporting page project for PhishFort, a brand protection and phishing takedown service. The project will likely implement a web-based interface for reporting various types of cyber threats including phishing, brand impersonation, trademark infringement, and other malicious activities.

## Domain Context

PhishFort specializes in:
- Phishing and brand impersonation takedowns
- Trademark and copyright infringement cases
- Social media platform abuse reporting
- Domain, email, and phone-based attack mitigation
- APK and browser extension takedowns
- Search engine cache removal

## Evidence Requirements by Case Type

When building forms or data models for incident reporting, these are the key evidence requirements:

### Domain/Website Incidents
- Full URL with path (e.g., www.example.com/attack1/brand2)
- Screenshots showing infringement with date, time, and full URL visible
- Case description (context, discovery method, relevant details)
- Location, device, and browser information
- For geo-fenced attacks: specific browser, location, and device details

### Email Attacks
- Email headers (mandatory - raw email headers, not forwarded)
- Screenshots of email content (optional)
- Distinguish between malicious domains vs. legitimate mail service abuse

### Social Media Platforms
- Letter of Authorization (LOA) for all platform takedowns
- Legitimate profile/account being impersonated (when available)
- Direct URLs to infringing content
- Screenshots with visible timestamps and context
- Detailed explanation of infringement type

### Phone-Related Attacks (Smishing/Phone Scams)
- Caller/sender number
- Receiver number
- Date, time, and timezone
- SMS text or call description
- Screenshots where applicable

### Messaging Applications (WhatsApp, Telegram, Discord)
- User IDs, message links, or server IDs (platform-specific)
- Screenshots showing infringement with timestamps
- Context explanation
- LOA

### APK Cases
- LOA
- Proof of copyright violation
- Client relationship evidence for sub-brands
- Screenshots of malicious behavior (phishing forms, credential requests)
- Link to original APK if screenshots unavailable

### Trademark/Copyright Infringement
- Ownership documentation (TM registration, copyright certificates)
- Evidence of infringement
- Proof of consumer confusion or harm
- LOA matching the trademark

## Fair Use Doctrine

When implementing validation or review workflows, understand that these uses are typically NOT actionable:

**Fair Trademark Use:**
- News reporting and commentary
- Product reviews and comparative advertising
- Parody and criticism
- Compatibility claims
- Identifying customers/partners (minimal logo use)

**Nominative Fair Use Requirements:**
- Accurate reference to trademark owner
- No implied endorsement/sponsorship
- No easier alternative to refer to owner/products
- Only necessary amount of trademark used

## Bulk Reporting Capabilities

Support bulk submission (up to 10 URLs) for these platforms:
- Facebook
- Instagram
- Scribd
- GitBook
- Teachable
- Telegram

**Requirements:**
- Same platform
- Same brand/person targeted
- Similar/identical attack pattern
- One primary URL + up to 9 additional URLs in comments
- Each URL must be submitted as separate incident
- Report as "social" incident type

**Note:** Bulk reporting NOT available for domain-level takedowns

## Important Takedown Limitations

When building status indicators or user messaging, note these cases typically CANNOT be taken down:

- Empty websites without typosquatting
- Parked domains with typosquatting (monitor instead)
- Tutorial/guide websites (legal ad-supported content)
- Legitimate product sales (First Sale Doctrine)
- Fair Use content
- Content not violating platform policies
- Legitimate businesses with TM/CR disputes
- Doxxing cases
- Public domain information
- Non-typosquatting domains with TM violations (content removal only)

## Escalation Paths

### ICANN Escalations
- Applicable for .com, .org, .net (NOT ccTLDs like .sa, .ru, .io)
- Requires clear infringement evidence
- Must wait 72 hours after initial report
- Resolution time: ~1 month
- Use as last resort before UDRP or legal action

### UDRP (Uniform Domain-Name Dispute Resolution Policy)
- Legal framework for domain disputes
- Requires TM registration
- Costs money (no refund on failure)
- Timeline: 14-30 days
- Requires proof of unfair usage or intent

## Platform-Specific Notes

### GitHub
Require file name, repository path, specific lines of code, and violation explanation

### LinkedIn
Cannot remove pre-made pages (claim ownership instead)
Can remove false "Experience" section details
Individual posts rarely removable unless explicit policy violation

### TikTok
Requires legitimate profile (mandatory)
Will only act on infringing posts, not profiles with brand name alone

### Twitter/X
Impersonation requires 2+ of: display name, profile description, impersonating post
Username not considered for impersonation

### Telegram
Low success rate for brand impersonation/phishing
Requires overwhelming evidence
Only prioritizes severe violations (illegal content)

### YouTube
Evidence requirements vary by attack type (phishing, scams, DMCA, TM infringement)
May need timestamps for specific video segments

## Development Considerations

When implementing the reporting interface:

1. **Form Validation:** Implement client-side validation for required evidence based on incident type
2. **File Uploads:** Support screenshots, email headers (.eml files), and document uploads
3. **Timezone Handling:** Always capture timezone for time-sensitive evidence
4. **URL Normalization:** Store full URLs including paths and parameters
5. **Multi-Evidence Support:** Allow multiple screenshots and supporting documents per incident
6. **LOA Management:** Implement secure storage and association of Letters of Authorization
7. **Status Tracking:** Build workflow for initial report → analyst review → evidence requests → takedown attempts → escalations
8. **Platform Detection:** Auto-detect platform from URLs and suggest relevant evidence requirements
9. **Bulk Submission:** Special handling for multi-URL submissions with validation rules
10. **Evidence Completeness Scoring:** Help users understand evidence strength before submission

## Compliance and Legal

- Never process takedowns without proper authorization
- Respect DMCA safe harbor provisions
- Maintain audit trail of all takedown requests
- Handle trademark registrations securely
- Implement proper data retention policies for evidence
- Consider GDPR/privacy implications for user-submitted evidence

## Testing Considerations

When writing tests, consider:
- Evidence validation for each incident type
- Platform-specific requirement enforcement
- Bulk submission limits and validation
- File upload security (file type validation, size limits, malware scanning)
- Timezone conversion accuracy
- URL parsing and validation
- Form completeness checking before submission
