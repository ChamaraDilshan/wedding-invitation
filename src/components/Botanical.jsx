// Simple hand-drawn-style line art, echoing the floral corner illustrations
// in the reference invitation. Pure decoration — aria-hidden.

export function BotanicalTopRight({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 260"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <path d="M170 10 C 165 60, 150 90, 130 130 C 115 160, 110 200, 120 250" />
      <ellipse cx="150" cy="55" rx="10" ry="16" transform="rotate(30 150 55)" />
      <ellipse cx="128" cy="95" rx="9" ry="14" transform="rotate(60 128 95)" />
      <ellipse cx="118" cy="150" rx="8" ry="13" transform="rotate(90 118 150)" />
      <circle cx="170" cy="15" r="3" />
      <circle cx="160" cy="30" r="2" />
    </svg>
  )
}

export function BotanicalBottomLeft({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 300"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <path d="M10 40 C 30 20, 55 15, 60 40 C 65 65, 40 70, 25 55" />
      <path d="M40 60 C 60 90, 70 130, 60 170 C 55 195, 40 210, 20 220" />
      <path d="M60 170 C 90 165, 110 175, 120 195" />
      <path d="M50 190 C 70 200, 85 215, 90 235" />
      <circle cx="118" cy="197" r="2.5" />
      <circle cx="123" cy="203" r="2" />
      <circle cx="88" cy="237" r="2.5" />
    </svg>
  )
}
