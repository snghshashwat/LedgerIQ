export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[color:var(--border-subtle)] bg-[color:var(--surface)] py-8">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 md:px-8">
        <div className="grid gap-8 md:grid-cols-4 mb-8">
          <div>
            <h3 className="font-semibold text-[color:var(--text-primary)]">
              Product
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-[color:var(--text-secondary)]">
              <li>
                <a
                  href="/dashboard"
                  className="transition-colors hover:text-[color:var(--text-primary)]"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/chat"
                  className="transition-colors hover:text-[color:var(--text-primary)]"
                >
                  AI Chat
                </a>
              </li>
              <li>
                <a
                  href="/insights"
                  className="transition-colors hover:text-[color:var(--text-primary)]"
                >
                  Insights
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-[color:var(--text-primary)]">
              Resources
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-[color:var(--text-secondary)]">
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-[color:var(--text-primary)]"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-[color:var(--text-primary)]"
                >
                  API Reference
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-[color:var(--text-primary)]"
                >
                  Community
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-[color:var(--text-primary)]">
              Legal
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-[color:var(--text-secondary)]">
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-[color:var(--text-primary)]"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-[color:var(--text-primary)]"
                >
                  Terms
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-[color:var(--text-primary)]"
                >
                  License
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-[color:var(--text-primary)]">
              Connect
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-[color:var(--text-secondary)]">
              <li>
                <a
                  href="https://github.com"
                  className="transition-colors hover:text-[color:var(--text-primary)]"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-[color:var(--text-primary)]"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-[color:var(--text-primary)]"
                >
                  Discord
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[color:var(--border-subtle)] pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-sm text-[color:var(--text-tertiary)]">
            © {currentYear} LedgerIQ. All rights reserved.
          </p>
          <p className="text-xs text-[color:var(--text-tertiary)]">
            Built with Next.js, React, and Recharts
          </p>
        </div>
      </div>
    </footer>
  );
}
