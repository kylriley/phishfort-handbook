import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-6 pt-4 pb-4 border-t border-gray-200">
      <div className="flex flex-col gap-6">
        {/* Top row: Links and Social Icons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Policy Links */}
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm list-none">
            <li>
              <Link
                href="https://phishfort.com/privacy-policy/"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="https://phishfort.com/terms-and-conditions"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Takedown Terms of Service
              </Link>
            </li>
            <li>
              <Link
                href="https://phishfort.com/terms-of-use/"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                MSP Terms of Service
              </Link>
            </li>
          </ul>

          {/* Social Media Icons */}
          <ul className="flex items-center gap-4 list-none">
            <li>
              <a
                href="https://bsky.app/profile/phishfort.bsky.social"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Visit PhishFort on BlueSky (opens in a new tab)"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  role="img"
                  aria-label="BlueSky"
                >
                  <path d="M19.36 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.64-4.96z"/>
                </svg>
                <span className="sr-only">PhishFort on BlueSky</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/@phishfort"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Visit PhishFort on Youtube (opens in a new tab)"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  role="img"
                  aria-label="Youtube"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span className="sr-only">PhishFort on Youtube</span>
              </a>
            </li>
            <li>
              <a
                href="https://x.com/PhishFort"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Visit PhishFort on X (opens in a new tab)"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  role="img"
                  aria-label="X"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span className="sr-only">PhishFort on X</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/company/phishfort/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Visit PhishFort on Linkedin (opens in a new tab)"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  role="img"
                  aria-label="Linkedin"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="sr-only">PhishFort on Linkedin</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Bottom row: Copyright */}
        <div className="text-center text-sm text-gray-600">
          © {currentYear} PhishFort. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

