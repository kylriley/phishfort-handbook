#!/usr/bin/env python3
import re
import os
import glob

# Define the base directory
base_dir = "/Users/work/Documents/dev/phishfort-reporting-page/notion-phishing-handbook"

# Mapping for human-readable link text
link_text_mapping = {
    "domain-incidents": "Domain Incidents",
    "evidence-guidelines": "Evidence Guidelines",
    "getting-started": "Getting Started",
    "email-attacks": "Email Attacks",
    "phone-attacks": "Phone Attacks",
    "social-media": "Social Media",
    "messaging": "Messaging Platforms",
    "fair-use": "Fair Use",
    "icann-udrp": "ICANN & UDRP",
    "trademark-copyright": "Trademark & Copyright",
    "apk": "APK Cases",
    "browser-extensions": "Browser Extensions",
    "ip-reporting": "IP Reporting",
    "google-ads": "Google Ads",
    "search-engines": "Search Engines",
    "bulk-reporting": "Bulk Reporting",
    "fake-news": "Fake News",
    "whatsapp": "WhatsApp",
    "telegram": "Telegram",
    "discord": "Discord",
    "facebook": "Facebook",
    "twitter": "Twitter",
    "tiktok": "TikTok",
    "linkedin": "LinkedIn",
    "youtube": "YouTube",
    "github": "GitHub",
    "gitbook": "GitBook",
    "scribd": "Scribd",
    "scams": "Scams",
    "legal": "Legal",
    "other-platforms": "Other Platforms",
    "special-cases": "Special Cases",
}

def get_human_readable_text(path):
    """Convert a path to human-readable text"""
    # Handle ./ and ../
    if path in ["./", "../", "."]:
        return "Home"

    # Remove ./ and ../ prefixes and file extensions
    path = path.replace("./", "").replace("../", "").replace(".md", "")

    # If it's a path with /, get the last part
    if "/" in path:
        parts = path.split("/")
        # Try to get meaningful text from the path
        last_part = parts[-1]
        if last_part in link_text_mapping:
            return link_text_mapping[last_part]
        # Otherwise capitalize and clean up
        return last_part.replace("-", " ").title()

    # Single path component
    if path in link_text_mapping:
        return link_text_mapping[path]

    # Default: capitalize and clean up
    return path.replace("-", " ").title()

def fix_links_in_file(filepath):
    """Fix all link formats in a given file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Pattern 1: "Text → path" or "Text→path"
    content = re.sub(
        r'([^[\]]+?)\s*→\s*([\w\-/.]+)',
        lambda m: f"[{get_human_readable_text(m.group(2))}]({m.group(2)})",
        content
    )

    # Pattern 2: "Text (path)" but NOT if already in markdown link format
    # Avoid matching things that are already [text](path)
    content = re.sub(
        r'(?<!\])\(([a-z\-]+(?:/[a-z\-]+)?)\)(?!\()',
        lambda m: f"[{get_human_readable_text(m.group(1))}]({m.group(1)})",
        content
    )

    # Pattern 3: Standalone "→ path" (with leading arrow)
    content = re.sub(
        r'^→\s*([\w\-/.]+)$',
        lambda m: f"[{get_human_readable_text(m.group(1))}]({m.group(1)})",
        content,
        flags=re.MULTILINE
    )

    # Pattern 4: "Learn more → path" or similar
    content = re.sub(
        r'Learn more(?:\s+about\s+[^→]+?)?\s*→\s*([\w\-/.]+)',
        lambda m: f"[{get_human_readable_text(m.group(1))}]({m.group(1)})",
        content,
        flags=re.IGNORECASE
    )

    # Pattern 5: "[Text →](path)" - remove arrow from existing markdown links
    content = re.sub(
        r'\[([^\]]+?)\s*→\s*\]\(([^)]+)\)',
        lambda m: f"[{m.group(1).strip()}]({m.group(2)})",
        content
    )

    # Only write if content changed
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

# Find all markdown files
md_files = glob.glob(os.path.join(base_dir, "**/*.md"), recursive=True)

fixed_count = 0
for filepath in md_files:
    if fix_links_in_file(filepath):
        fixed_count += 1
        print(f"Fixed: {filepath}")

print(f"\nTotal files fixed: {fixed_count}")
