type SkillIconProps = {
  id: string
  className?: string
}

/** Compact brand marks for the skills strip. One accent color keeps the row cohesive. */
export function SkillIcon({ id, className }: SkillIconProps) {
  const common = {
    className,
    viewBox: '0 0 48 48',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': true as const,
  }

  switch (id) {
    case 'python':
      return (
        <svg {...common}>
          <path
            d="M24 6c-7 0-6.5 3-6.5 3v3.5h6.7v1H14.2S10 12.8 10 20.8s2.8 8 2.8 8H18v-3.8s-.1-4.5 4.4-4.5h7.3s4.3.1 4.3-4.1V9.2S34.5 6 24 6Zm-3.8 2.2a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
            fill="currentColor"
            opacity="0.92"
          />
          <path
            d="M24 42c7 0 6.5-3 6.5-3v-3.5h-6.7v-1h10S38 35.2 38 27.2s-2.8-8-2.8-8H30v3.8s.1 4.5-4.4 4.5h-7.3s-4.3-.1-4.3 4.1v8.2S13.5 42 24 42Zm3.8-2.2a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"
            fill="currentColor"
            opacity="0.7"
          />
        </svg>
      )
    case 'javascript':
      return (
        <svg {...common}>
          <rect x="8" y="8" width="32" height="32" rx="6" fill="currentColor" />
          <path
            d="M21 31.5c0 2.5-1.5 3.7-3.7 3.7-1.9 0-3.1-1-3.7-2.2l2-1.2c.3.6.7 1.1 1.5 1.1.8 0 1.3-.3 1.3-1.6V22h2.6v9.5Zm7.4 3.7c-2.3 0-3.8-1.1-4.5-2.6l2-1.2c.4.8 1.1 1.4 2.2 1.4 1 0 1.6-.5 1.6-1.2 0-.8-.6-1.1-1.7-1.6l-.6-.2c-1.7-.7-2.8-1.7-2.8-3.6 0-1.8 1.4-3.2 3.6-3.2 1.6 0 2.7.5 3.5 1.9l-1.9 1.2c-.4-.7-.9-1-1.6-1-.7 0-1.2.4-1.2 1 0 .7.4 1 1.5 1.4l.6.3c2 .8 3.1 1.8 3.1 3.8 0 2.2-1.7 3.4-4 3.4Z"
            fill="#fff"
          />
        </svg>
      )
    case 'react':
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="3.2" fill="currentColor" />
          <ellipse
            cx="24"
            cy="24"
            rx="18"
            ry="7.5"
            stroke="currentColor"
            strokeWidth="2.2"
          />
          <ellipse
            cx="24"
            cy="24"
            rx="18"
            ry="7.5"
            stroke="currentColor"
            strokeWidth="2.2"
            transform="rotate(60 24 24)"
          />
          <ellipse
            cx="24"
            cy="24"
            rx="18"
            ry="7.5"
            stroke="currentColor"
            strokeWidth="2.2"
            transform="rotate(120 24 24)"
          />
        </svg>
      )
    case 'fastapi':
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="16" fill="currentColor" />
          <path
            d="M18 24.5h12M24 18.5v12"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'llm':
      return (
        <svg {...common}>
          <path
            d="M14 16h20a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H22l-6 5v-5h-2a4 4 0 0 1-4-4v-8a4 4 0 0 1 4-4Z"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <circle cx="18.5" cy="24" r="1.6" fill="currentColor" />
          <circle cx="24" cy="24" r="1.6" fill="currentColor" />
          <circle cx="29.5" cy="24" r="1.6" fill="currentColor" />
        </svg>
      )
    case 'rag':
      return (
        <svg {...common}>
          <path
            d="M12 34V16.5A2.5 2.5 0 0 1 14.5 14H22v20H14.5A2.5 2.5 0 0 1 12 31.5V34Z"
            fill="currentColor"
            opacity="0.55"
          />
          <path
            d="M22 34V14h11.5A2.5 2.5 0 0 1 36 16.5v15A2.5 2.5 0 0 1 33.5 34H22Z"
            fill="currentColor"
          />
          <path
            d="M16 20h3M16 24h3M26 20h6M26 24h6M26 28h4"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'langchain':
      return (
        <svg {...common}>
          <path
            d="M16 14h6v6h-6V14Zm10 0h6v6h-6V14ZM16 28h6v6h-6v-6Zm10 0h6v6h-6v-6Z"
            fill="currentColor"
            opacity="0.85"
          />
          <path
            d="M22 17h4M19 20v8M29 20v8M22 31h4"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'agents':
      return (
        <svg {...common}>
          <rect
            x="12"
            y="14"
            width="24"
            height="20"
            rx="6"
            stroke="currentColor"
            strokeWidth="2.4"
          />
          <circle cx="19" cy="24" r="2.2" fill="currentColor" />
          <circle cx="29" cy="24" r="2.2" fill="currentColor" />
          <path
            d="M20 30c1.2 1.2 2.6 1.8 4 1.8s2.8-.6 4-1.8"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M18 12v3M30 12v3"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'postgres':
      return (
        <svg {...common}>
          <ellipse cx="24" cy="14" rx="12" ry="5" stroke="currentColor" strokeWidth="2.2" />
          <path
            d="M12 14v12c0 2.8 5.4 5 12 5s12-2.2 12-5V14"
            stroke="currentColor"
            strokeWidth="2.2"
          />
          <path d="M12 22c0 2.8 5.4 5 12 5s12-2.2 12-5" stroke="currentColor" strokeWidth="2.2" />
        </svg>
      )
    case 'mongodb':
      return (
        <svg {...common}>
          <path
            d="M24 8c2 6 8 9.5 8 17 0 5-2.8 8.5-8 15-5.2-6.5-8-10-8-15 0-7.5 6-11 8-17Z"
            fill="currentColor"
          />
          <path d="M24 18v18" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case 'redis':
      return (
        <svg {...common}>
          <path
            d="M8 18l16-6 16 6-16 6L8 18Z"
            fill="currentColor"
            opacity="0.9"
          />
          <path d="M8 24l16 6 16-6" stroke="currentColor" strokeWidth="2.4" />
          <path d="M8 30l16 6 16-6" stroke="currentColor" strokeWidth="2.4" />
        </svg>
      )
    case 'aws':
      return (
        <svg {...common}>
          <path
            d="M12 28c4 4 10 6 18 4"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <path
            d="M16 18h4l2 8h-3l-.4-1.6h-3.2L15 26h-3l4-8Zm3 4.2.8 3.2h-1.6l.8-3.2ZM24 18h3.2c2.2 0 3.5 1.2 3.5 3.1 0 1.5-.8 2.5-2 2.9l2.3 4h-3.1l-2-3.7h-.7V26H24V18Zm3.1 4.5c.8 0 1.3-.4 1.3-1.2s-.5-1.2-1.3-1.2H27v2.4h.1Z"
            fill="currentColor"
          />
        </svg>
      )
    case 'docker':
      return (
        <svg {...common}>
          <path
            d="M8 26h28c0 5-5 8-12 8-9 0-14-4-16-8Z"
            fill="currentColor"
            opacity="0.85"
          />
          <path
            d="M14 22h4v4h-4v-4Zm6 0h4v4h-4v-4Zm6 0h4v4h-4v-4Zm-6-5h4v4h-4v-4Zm6 0h4v4h-4v-4Zm6 5h4v4h-4v-4Z"
            fill="currentColor"
          />
        </svg>
      )
    case 'git':
      return (
        <svg {...common}>
          <path
            d="M24.8 8.4 39.6 23.2a2.8 2.8 0 0 1 0 4L24.8 41.9a2.8 2.8 0 0 1-4 0L6.1 27.1a2.8 2.8 0 0 1 0-4L20.9 8.4a2.8 2.8 0 0 1 3.9 0Z"
            stroke="currentColor"
            strokeWidth="2.2"
          />
          <circle cx="24" cy="16" r="2.4" fill="currentColor" />
          <circle cx="24" cy="30" r="2.4" fill="currentColor" />
          <circle cx="31" cy="23" r="2.4" fill="currentColor" />
          <path d="M24 18.4V27.6M26 23h2.4" stroke="currentColor" strokeWidth="2.2" />
        </svg>
      )
    case 'pinecone':
      return (
        <svg {...common}>
          <path
            d="M24 8c6 8 10 14 10 20a10 10 0 1 1-20 0c0-6 4-12 10-20Z"
            fill="currentColor"
          />
          <path
            d="M24 18v14M20 24h8"
            stroke="#fff"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'mcp':
      return (
        <svg {...common}>
          <rect
            x="10"
            y="14"
            width="12"
            height="20"
            rx="3"
            stroke="currentColor"
            strokeWidth="2.2"
          />
          <rect
            x="26"
            y="14"
            width="12"
            height="20"
            rx="3"
            stroke="currentColor"
            strokeWidth="2.2"
          />
          <path
            d="M22 24h4"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'postman':
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="15" fill="currentColor" />
          <path
            d="M16 27c3 4 8 6 14 4M18 18c5-1 10 0 14 3"
            stroke="#fff"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <circle cx="20" cy="20" r="2" fill="#fff" />
        </svg>
      )
    case 'rest':
      return (
        <svg {...common}>
          <path
            d="M12 18h24v12H12V18Z"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M16 18v-3h16v3M18 24h12M18 28h8"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'html':
      return (
        <svg {...common}>
          <path d="M12 8h24l-2 28-10 4-10-4L12 8Z" fill="currentColor" />
          <path
            d="M18 16h12l-.6 8H24v3.5l3.2.9.8-4.4h3.4L30.6 32 24 34l-6.6-2-.8-10H24v-3h-6.6L18 16Z"
            fill="#fff"
          />
        </svg>
      )
    case 'css':
      return (
        <svg {...common}>
          <path d="M12 8h24l-2 28-10 4-10-4L12 8Z" fill="currentColor" />
          <path
            d="M18 16h12l-.5 6H24v3h5l-.7 8L24 34l-4.8-1.3-.4-4.2h3.2l.2 1.8L24 31l1.8-.5.3-3.5H19.4l-.6-7H24v-3h-6.4L18 16Z"
            fill="#fff"
          />
        </svg>
      )
    case 'prompt':
      return (
        <svg {...common}>
          <rect
            x="10"
            y="12"
            width="28"
            height="20"
            rx="4"
            stroke="currentColor"
            strokeWidth="2.2"
          />
          <path
            d="M16 20h8M16 26h14"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M30 18l4 4-4 4"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'tools':
      return (
        <svg {...common}>
          <path
            d="M28 12a8 8 0 0 0-8 8c0 1.4.4 2.7 1 3.8L12 33l3 3 9.2-9a8 8 0 0 0 3.8 1 8 8 0 0 0 0-16Z"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <circle cx="29" cy="19" r="2.2" fill="currentColor" />
        </svg>
      )
    case 'langgraph':
      return (
        <svg {...common}>
          <circle cx="14" cy="16" r="4" fill="currentColor" />
          <circle cx="34" cy="16" r="4" fill="currentColor" />
          <circle cx="24" cy="34" r="4" fill="currentColor" />
          <path
            d="M17.5 18.5 22 30M30.5 18.5 26 30M18 16h12"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'mysql':
      return (
        <svg {...common}>
          <path
            d="M14 30c2 4 6 6 10 6s8-2 10-6c-2-3-6-5-10-5s-8 2-10 5Z"
            fill="currentColor"
            opacity="0.75"
          />
          <path
            d="M16 18c1.5-4 4.5-7 8-7s6.5 3 8 7"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M18 24h12"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'minio':
      return (
        <svg {...common}>
          <path
            d="M12 30V18l12-6 12 6v12l-12 6-12-6Z"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M24 12v24M12 18l12 6 12-6"
            stroke="currentColor"
            strokeWidth="2.2"
          />
        </svg>
      )
    case 'faiss':
      return (
        <svg {...common}>
          <circle cx="18" cy="18" r="4" fill="currentColor" />
          <circle cx="32" cy="16" r="3" fill="currentColor" opacity="0.7" />
          <circle cx="30" cy="30" r="4" fill="currentColor" />
          <circle cx="16" cy="31" r="3" fill="currentColor" opacity="0.7" />
          <path
            d="M21 20l7 7M28 19l-8 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'opensearch':
      return (
        <svg {...common}>
          <circle
            cx="21"
            cy="21"
            r="10"
            stroke="currentColor"
            strokeWidth="2.4"
          />
          <path
            d="M29 29l7 7"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'ec2':
    case 'ecs':
    case 'vpc':
    case 'alb':
      return (
        <svg {...common}>
          <rect
            x="10"
            y="14"
            width="28"
            height="20"
            rx="3"
            stroke="currentColor"
            strokeWidth="2.2"
          />
          <path
            d="M16 20h16M16 26h10"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="34" cy="26" r="2" fill="currentColor" />
        </svg>
      )
    case 'numpy':
    case 'pandas':
    case 'matplotlib':
    case 'sklearn':
      return (
        <svg {...common}>
          <path
            d="M14 34V14h6l8 12V14h6v20h-6l-8-12v12h-6Z"
            fill="currentColor"
          />
        </svg>
      )
    case 'github':
      return (
        <svg {...common}>
          <path
            d="M24 10c-7.7 0-14 6.3-14 14 0 6.2 4 11.4 9.6 13.3.7.1 1-.3 1-.6v-2.2c-3.9.8-4.7-1.7-4.7-1.7-.6-1.6-1.5-2-1.5-2-1.3-.9.1-.9.1-.9 1.4.1 2.1 1.4 2.1 1.4 1.2 2.1 3.2 1.5 4 1.1.1-.9.5-1.5.9-1.8-3.1-.4-6.4-1.6-6.4-7 0-1.5.5-2.8 1.4-3.8-.1-.4-.6-1.8.1-3.7 0 0 1.2-.4 3.8 1.4a13 13 0 0 1 6.9 0c2.6-1.8 3.8-1.4 3.8-1.4.7 1.9.3 3.3.1 3.7.9 1 1.4 2.2 1.4 3.8 0 5.4-3.3 6.6-6.4 7 .5.4 1 1.3 1 2.6v3.9c0 .3.3.8 1 .6C34 35.4 38 30.2 38 24c0-7.7-6.3-14-14-14Z"
            fill="currentColor"
          />
        </svg>
      )
    case 'bitbucket':
      return (
        <svg {...common}>
          <path
            d="M12 14h24l-3 20H15l-3-20Z"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path d="M20 22h8l-1 8h-6l-1-8Z" fill="currentColor" />
        </svg>
      )
    case 'vscode':
      return (
        <svg {...common}>
          <path
            d="M12 16l10-6 14 6v16l-14 6-10-6V16Z"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M22 12v24M22 24l14-4M22 24l14 4"
            stroke="currentColor"
            strokeWidth="2.2"
          />
        </svg>
      )
    case 'jupyter':
      return (
        <svg {...common}>
          <circle cx="24" cy="12" r="3" fill="currentColor" />
          <circle cx="24" cy="36" r="3" fill="currentColor" />
          <ellipse
            cx="24"
            cy="24"
            rx="14"
            ry="7"
            stroke="currentColor"
            strokeWidth="2.2"
          />
          <ellipse
            cx="24"
            cy="24"
            rx="14"
            ry="7"
            stroke="currentColor"
            strokeWidth="2.2"
            transform="rotate(60 24 24)"
          />
          <ellipse
            cx="24"
            cy="24"
            rx="14"
            ry="7"
            stroke="currentColor"
            strokeWidth="2.2"
            transform="rotate(120 24 24)"
          />
        </svg>
      )
    default:
      return (
        <svg {...common}>
          <rect
            x="10"
            y="10"
            width="28"
            height="28"
            rx="8"
            fill="currentColor"
            opacity="0.14"
          />
          <rect
            x="10"
            y="10"
            width="28"
            height="28"
            rx="8"
            stroke="currentColor"
            strokeWidth="2"
          />
          <text
            x="24"
            y="28"
            textAnchor="middle"
            fill="currentColor"
            fontSize="12"
            fontFamily="IBM Plex Mono, monospace"
            fontWeight="700"
          >
            {id.slice(0, 2).toUpperCase()}
          </text>
        </svg>
      )
  }
}
