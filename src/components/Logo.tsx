export function Logo() {
  return (
    <svg
      viewBox="0 0 300 340"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer dark blue hexagon */}
      <path
        d="M 150 20 L 260 80 L 260 200 L 150 260 L 40 200 L 40 80 Z"
        fill="#003DA5"
        rx="20"
      />

      {/* Inner white hexagon with red border */}
      <path
        d="M 150 40 L 242 92 L 242 188 L 150 240 L 58 188 L 58 92 Z"
        fill="white"
        stroke="#C41E3A"
        strokeWidth="5"
        strokeLinejoin="round"
      />

      {/* Red rocket body */}
      <path
        d="M 150 70 L 155 95 L 152 100 L 150 110 L 148 100 L 145 95 Z"
        fill="#C41E3A"
      />

      {/* Rocket tip */}
      <path
        d="M 150 50 L 155 70 L 145 70 Z"
        fill="#C41E3A"
      />

      {/* Rocket fins */}
      <path
        d="M 145 100 L 140 120 L 148 110 Z"
        fill="#C41E3A"
      />
      <path
        d="M 155 100 L 160 120 L 152 110 Z"
        fill="#C41E3A"
      />

      {/* Gray triangle */}
      <path
        d="M 145 110 L 150 130 L 155 110 Z"
        fill="#A9A9A9"
      />

      {/* Red curved line */}
      <path
        d="M 110 115 Q 150 100 190 115"
        stroke="#C41E3A"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />

      {/* TEAM text */}
      <text
        x="150"
        y="155"
        fontSize="28"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        textAnchor="middle"
        fill="#C41E3A"
        letterSpacing="4"
      >
        TEAM
      </text>

      {/* MECO text */}
      <text
        x="150"
        y="195"
        fontSize="56"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        fontStyle="italic"
        textAnchor="middle"
        fill="#003DA5"
        letterSpacing="2"
      >
        MECO
      </text>

      {/* Red line below MECO */}
      <line x1="95" y1="205" x2="205" y2="205" stroke="#C41E3A" strokeWidth="4" strokeLinecap="round" />

      {/* 8324 text */}
      <text
        x="150"
        y="235"
        fontSize="32"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        textAnchor="middle"
        fill="#C41E3A"
        letterSpacing="3"
      >
        8324
      </text>
    </svg>
  );
}
