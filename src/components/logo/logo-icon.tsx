export function LogoIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="LedgerIQ logo"
    >
      <title>LedgerIQ Financial Intelligence</title>
      {/* Outer circle */}
      <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5" />

      {/* Ledger lines */}
      <line
        x1="6"
        y1="8"
        x2="18"
        y2="8"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <line
        x1="6"
        y1="12"
        x2="18"
        y2="12"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <line
        x1="6"
        y1="16"
        x2="18"
        y2="16"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      {/* Intelligence indicator - upward arrow/trend */}
      <path
        d="M12 14L10 16M12 14L14 16M12 14V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
