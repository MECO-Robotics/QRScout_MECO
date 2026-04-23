export function Logo() {
  return (
    <svg
      viewBox="0 0 200 220"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer dark blue hexagon */}
      <g>
        {/* Hexagon shape */}
        <path
          d="M 100 10 L 150 40 L 150 120 L 100 150 L 50 120 L 50 40 Z"
          fill="#003DA5"
        />

        {/* Inner white hexagon with red border */}
        <path
          d="M 100 25 L 140 50 L 140 110 L 100 135 L 60 110 L 60 50 Z"
          fill="white"
          stroke="#C41E3A"
          strokeWidth="3"
        />
      </g>

      {/* Red rocket */}
      <g>
        {/* Rocket body (red) */}
        <path
          d="M 100 40 L 100 50 L 95 60 L 100 65 L 105 60 L 100 50 Z"
          fill="#C41E3A"
        />
        {/* Rocket tip */}
        <path
          d="M 100 30 L 102 40 L 98 40 Z"
          fill="#C41E3A"
        />
      </g>

      {/* Gray/dark triangle below rocket */}
      <g>
        <path
          d="M 95 65 L 100 75 L 105 65 Z"
          fill="#808080"
        />
      </g>

      {/* Red horizontal line */}
      <g>
        <line x1="70" y1="78" x2="130" y2="78" stroke="#C41E3A" strokeWidth="2" />
      </g>

      {/* TEAM text in red */}
      <text
        x="100"
        y="95"
        fontSize="16"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        textAnchor="middle"
        fill="#C41E3A"
        letterSpacing="2"
      >
        TEAM
      </text>

      {/* MECO text in dark blue, larger */}
      <text
        x="100"
        y="118"
        fontSize="32"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        textAnchor="middle"
        fill="#003DA5"
        letterSpacing="1"
      >
        MECO
      </text>

      {/* Red underline below MECO */}
      <line x1="70" y1="123" x2="130" y2="123" stroke="#C41E3A" strokeWidth="2" />

      {/* 8324 team number in red */}
      <text
        x="100"
        y="140"
        fontSize="18"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        textAnchor="middle"
        fill="#C41E3A"
        letterSpacing="2"
      >
        8324
      </text>
    </svg>
  );
}
