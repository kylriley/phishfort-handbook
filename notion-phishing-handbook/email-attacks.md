# Email Attacks

To execute takedowns of phishing emails or malicious email addresses, we need the **original email headers**. This is the single most important piece of evidence for email-based attacks.

---

## Why Email Headers Are Critical

Every Internet email message is made up of two parts:
1. **The Header** - Technical routing and authentication information
2. **The Body** - The visible message content

### What Email Headers Contain

A full and valid email header provides a detailed log of:
- The network path taken by the message.
- Mail servers involved in transmission.
- Authentication results (SPF, DKIM, DMARC).
- Sender IP addresses.
- Timestamps for each hop.
- Routing information.

> ⚠️ **Warning**
>
> **Critical**: Your email client usually hides the full header or displays only basic lines like From, To, Date, and Subject. You must extract the **complete raw headers**.

---

## Common Mistake: Don't Forward Emails!

> 🚨 **Danger**
>
> **Never** forward emails as evidence!
>
> Every time you forward an email, the email headers are **replaced** with new ones. This destroys the original evidence we need to trace the attack.

### Instead, Extract the Raw Headers

The process varies by email client, but generally:

1. Open the email.
2. Look for options like:
   - "Show Original".
   - "View Source".
   - "Message Source".
   - "Raw Message".
   - "View Headers".
3. Copy the complete raw text.
4. Save as a `.eml` or `.txt` file.

> 💡 **Tip**
>
> **For detailed instructions** on how to extract headers from your specific email client, see our [Email Headers Guide](#) or search online for "[Your Email Client] view email headers".

---

## Evidence Required for Email Attacks

### Mandatory Evidence

✅ **Email Headers (Raw/Original)**
- Must be from the original email (not forwarded).
- Complete headers from start to finish.
- Preferably saved as `.eml` file.
- Can also be provided as text format.

### Optional But Helpful Evidence

- Screenshots of the email showing:
  - Sender information.
  - Subject line.
  - Email body with malicious content.
  - Any embedded links or attachments.
  - Date and time received.

- Context about the attack:
  - How widespread is the campaign.
  - Number of recipients affected.
  - Type of scam (credential theft, malware, BEC, etc.).

---

## Types of Email Attacks

### 1. Phishing Using Malicious Domains

**Example**: `support@exampleattack.com`

The attacker registered a domain specifically for the attack.

**Takedown Target**: The domain itself (through Registrar)

**Evidence Needed**:
- Email headers showing the malicious domain.
- Screenshots of the email.
- Context about the phishing attempt.

[Also report as Domain Incident →](domain-incidents)

---

### 2. Phishing Using Legitimate Services

**Example**: `supportbrand@gmail.com`

The attacker uses a legitimate email service (Gmail, Yahoo, Outlook, etc.) to send phishing emails.

**Takedown Target**: The email account (through the platform)

**Evidence Needed**:
- Email headers showing the account.
- Screenshots of the email.
- Proof of impersonation or malicious intent.

---

### 3. Business Email Compromise (BEC)

Sophisticated attacks where the attacker impersonates executives or business partners.

**Evidence Needed**:
- Email headers.
- Proof of impersonation (comparing to legitimate executive emails).
- Context about financial requests or data theft attempts.
- Letter of Authorization if impersonating specific individuals.

---

### 4. Malware Distribution

Emails containing malicious attachments or links.

**Evidence Needed**:
- Email headers.
- Screenshot of the email (without opening attachments).
- Hash of the malicious file (if safely obtained).
- VirusTotal report (if available).

> 🚨 **Danger**
>
> **Never open suspicious attachments**. If you need to analyze them, use a sandboxed environment or send to security team.

---

## Distinguishing Email Attack Types

| Attack Type | Sender Address | Takedown Via | Primary Evidence |
|-------------|----------------|--------------|------------------|
| **Malicious Domain** | Custom domain registered for attack. | Domain registrar. | Headers + Domain info. |
| **Compromised Account** | Legitimate service (Gmail, Yahoo). | Email platform. | Headers + Impersonation proof. |
| **Spoofed Email** | Forged sender (fails SPF/DKIM). | ISP/Email provider. | Headers showing failed auth. |
| **Compromised Server** | Legitimate but hacked server. | Hosting provider. | Headers + Server info. |

---

## What Happens After Submission

Once you submit an email attack with proper headers:

1. **Analysis**: Our analysts examine the headers to identify:
   - Originating IP address.
   - Mail servers used.
   - Authentication failures.
   - Related infrastructure.

2. **Identification**: We determine the proper takedown target:
   - Domain registrar.
   - Email service provider.
   - Hosting provider.
   - ISP.

3. **Takedown Request**: We submit to the appropriate authority with:
   - Your evidence.
   - Our analysis.
   - Legal justification (LOA, TM registration, etc.).

4. **Follow-up**: We may contact you for:
   - Additional evidence.
   - Clarification on context.
   - Letter of Authorization.

---

## Email Header Examples

### What Good Headers Look Like

```
Received: from mail.example.com (mail.example.com [203.0.113.1])
    by mx.google.com with ESMTP id abc123
    for <victim@company.com>
    Fri, 21 Nov 2025 12:00:00 -0800 (PST)
Received-SPF: fail (google.com: domain of attacker@malicious.com does not designate 203.0.113.1 as permitted sender)
Authentication-Results: mx.google.com;
    dkim=fail (signature verification failed);
    spf=fail (sender IP is 203.0.113.1)
From: "Customer Support" <attacker@malicious.com>
To: victim@company.com
Subject: Urgent: Account Verification Required
```

### Red Flags in Headers

- ❌ SPF fail or softfail.
- ❌ DKIM authentication failure.
- ❌ DMARC policy failures.
- ❌ Mismatched sender domains.
- ❌ IP addresses from suspicious countries.
- ❌ Multiple forwarding hops through unusual servers.

---

## Additional Resources for Email Security

### Letter of Authorization (LOA)

For email attacks impersonating your organization, you'll need a Letter of Authorization allowing PhishFort to act on your behalf.

The LOA should include:
- Company registration information.
- Trademark/Copyright registrations.
- Authorization for PhishFort to submit takedown requests.
- List of domains and brands being protected.

[Learn more about LOA requirements →](legal/trademark-copyright)

---

## Related Incident Types

Email attacks often occur alongside other attack vectors:

- **Domains used in emails**: [Domain Incidents →](domain-incidents)
- **Phishing pages linked in emails**: [Domain Incidents →](domain-incidents)
- **Social media impersonation**: [Social Media →](social-media)
- **Phone number in email**: [Phone Attacks →](phone-attacks)

---

## Need Help?

If you're having trouble extracting email headers or aren't sure what information to provide, contact our support team. It's better to ask than to submit incomplete evidence.

### Quick Links

- [Evidence Guidelines →](evidence-guidelines)
- [Domain Incidents →](domain-incidents)
- [Getting Started →](getting-started)
- [Return to Home →](./)
