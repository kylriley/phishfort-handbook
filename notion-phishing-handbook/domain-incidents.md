# Domain Incidents

Attacks using malicious or deceitful domains are a significant portion of what we deal with in the brand protection environment. A single domain can host multiple types of violations, and depending on the violation, the required evidence might change.

> 💡 **Tip**
>
> **Most Important**: Provide steps to reproduce the attack (Live Proof) so our analysts can easily access the domain and gather further information.

---

## Essential Evidence for All Domain Cases

When reporting a domain incident, provide:

### 1. Direct Links with Evidence

Provide links with evidence of the infringement, such as:

- Payment tracking numbers leading to pages with violations.
- Specific paths showing malicious content.
- Direct URLs to phishing forms.

### 2. Screenshots

Screenshots showing:

- Phishing forms or other harmful content.
- **Full URL visible** in the address bar.
- **Date and time visible** (important for verification).

### 3. Context About the Case

Describe:

- How it was discovered.
- Where it was found (search engine, email, social media, etc.).
- Device and browser used.
- Location/IP used to access.
- Any other relevant details.

### 4. Geo-Fencing Information

If you suspect the attack is geo-fenced (only visible from certain locations), also provide:

- Browser used.
- Geographic location.
- Device type (desktop/mobile).
- IP address if available.

---

## Quick Summary: Minimum Evidence Required

> ✅ **Checklist**
>
> For all domain-related cases, you must provide:
>
> 1. **Full URL** (e.g., `www.example.com/attack1/brand2`)
> 2. **Screenshots** showing the infringement with date, time, and full URL
> 3. **Case description** (context, how found, relevant details)
> 4. **Location, device, and browser** used to observe the attack

Once submitted, an analyst may contact you for additional details if necessary.

---

## Types of Domain-Related Incidents

### 1. Website Brand Impersonation

This occurs when the domain **pretends to be** the victim's brand, for example, by claiming to be the "official" website.

#### Evidence Required:

- ✅ Screenshots of the webpage showing brand assets and the full URL.
- ✅ Screenshots of any statements from the attacker claiming to represent the brand.
- ✅ Context about how users might be confused.

> 📘 **Note**
>
> See [Evidence Guidelines](evidence-guidelines) for what constitutes strong impersonation evidence vs. mere brand mention.

---

### 2. Email Attacks Using Similar Domains

It's crucial to differentiate between:

#### A. Malicious Domains Registered for Attacks

Example: `support@exampleattack.com`

**Takedown target**: The domain itself (through the Registrar)

#### B. Attacks Through Legitimate Mail Services

Example: `supportbrand@gmail.com`

**Takedown target**: The account (through the platform, e.g., Gmail)

#### Evidence Required:

- ✅ **Email headers** (mandatory) - See [Email Attacks](email-attacks) guide
- ✅ Screenshots of the email (optional but helpful).

> ⚠️ **Warning**
>
> **Important**: Never forward emails for evidence. Always extract the original email headers. Forwarding replaces the headers with new ones, destroying the evidence.

---

### 3. Typosquats or Similar Domains Only

**Typosquats** are domains that mimic legitimate ones to gain legitimacy (e.g., `g00gle.com` instead of `google.com`).

> ⚠️ **Warning**
>
> Typosquats alone are **aggravating factors** in impersonation cases, but typosquats **without malicious content** are not enough to execute a takedown.

#### When Typosquats CAN Be Taken Down:

- When combined with malicious content.
- When combined with brand impersonation.
- When combined with phishing activity.
- Some registrars may act on non-generic typosquats with clear trademark violations.

#### When Typosquats CANNOT Be Taken Down:

- Parked pages with no content.
- Generic word combinations.
- Legitimate business with historic footprint.
- Fair use scenarios ([Fair Use](legal/fair-use)).

---

## ICANN Escalations

If a domain registrar is unresponsive, cases can be escalated to **ICANN** (Internet Corporation for Assigned Names and Numbers).

> 📘 **Note**
>
> **ICANN Coverage**: ICANN regulates common TLDs like .com, .org, .net.
>
> **NOT Covered**: Country code TLDs (ccTLDs) like .sa, .ru, .fr, .io

### Requirements to Escalate to ICANN:

1. ✅ Clear infringement evidence (screenshots, URLs, phishing proof).
2. ✅ Case reported through Registrar's proper channels.
3. ✅ Minimum **72 hours** have passed since initial report.

### ICANN Escalation Timeline:

- ICANN contacts registrar **up to 3 times**.
- **15 days** wait after each communication.
- Total resolution time: **~1 month average**.
- If unsuccessful, consider [ICANN & UDRP](legal/icann-udrp) or legal action.

> ⚠️ **Warning**
>
> **Last Resort**: ICANN escalations should be used as a last resort when standard takedown processes fail.

[ICANN & UDRP](legal/icann-udrp)

---

## Alternative Legal Pathways

### UDRP (Uniform Domain-Name Dispute Resolution Policy)

For cases involving trademark disputes over domain names, UDRP proceedings may be necessary.

**Key considerations**:

- Requires trademark registration.
- Additional cost (no refund on failure).
- Timeline: 14-30 days.
- Requires proof of bad faith registration or unfair usage.

[ICANN & UDRP](legal/icann-udrp)

---

## Domain vs. Other Incident Types

Not sure if your case is a domain incident? Here are related incident types:

- **Email-based attacks**: [Email Attacks](email-attacks)
- **Social media impersonation**: [Social Media](social-media)
- **Malicious apps**: [APK Cases](other-platforms/apk)
- **Search results**: [Search Engines](other-platforms/search-engines)
- **Ads impersonation**: [Google Ads](other-platforms/google-ads)

---

## Related Resources

- [Evidence Guidelines](evidence-guidelines)
- [Trademark & Copyright](legal/trademark-copyright)
- [Fair Use](legal/fair-use)
- [ICANN & UDRP](legal/icann-udrp)

[Return to Home](./)
