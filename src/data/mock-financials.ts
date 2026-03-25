export type Quarter = "Q1 2024" | "Q2 2024" | "Q3 2024" | "Q4 2024" | "Q1 2025";

export type StatementType = "income" | "balance" | "cashflow";

export type Company = {
  id: string;
  name: string;
  sector: string;
  metrics: {
    revenue: number;
    profit: number;
    ebitda: number;
  };
  trend: Array<{
    quarter: Quarter;
    revenue: number;
    profit: number;
    ebitda: number;
  }>;
  statements: Record<
    StatementType,
    Array<{ lineItem: string; values: number[] }>
  >;
  insightCards: Array<{
    id: string;
    title: string;
    summary: string;
    details: string;
    confidence: number;
  }>;
};

export type RagChunk = {
  source: string;
  score: number;
  excerpt: string;
};

export type StaticRagScenario = {
  answer: string;
  retrieved: RagChunk[];
  memoryWrite: string;
};

export const quarters: Quarter[] = [
  "Q1 2024",
  "Q2 2024",
  "Q3 2024",
  "Q4 2024",
  "Q1 2025",
];

export const companies: Company[] = [
  {
    id: "apple",
    name: "Apple",
    sector: "Consumer Technology",
    metrics: { revenue: 91.2, profit: 23.1, ebitda: 30.4 },
    trend: [
      { quarter: "Q1 2024", revenue: 96.3, profit: 25.1, ebitda: 31.9 },
      { quarter: "Q2 2024", revenue: 90.8, profit: 23.9, ebitda: 30.6 },
      { quarter: "Q3 2024", revenue: 81.6, profit: 20.1, ebitda: 27.4 },
      { quarter: "Q4 2024", revenue: 88.2, profit: 21.8, ebitda: 28.8 },
      { quarter: "Q1 2025", revenue: 91.2, profit: 23.1, ebitda: 30.4 },
    ],
    statements: {
      income: [
        { lineItem: "Revenue", values: [96.3, 90.8, 81.6, 88.2, 91.2] },
        { lineItem: "Cost of Revenue", values: [56.1, 53.0, 49.8, 51.1, 52.5] },
        {
          lineItem: "Operating Income",
          values: [28.3, 26.2, 21.9, 24.0, 25.7],
        },
        { lineItem: "Net Income", values: [25.1, 23.9, 20.1, 21.8, 23.1] },
      ],
      balance: [
        {
          lineItem: "Cash & Equivalents",
          values: [62.0, 60.4, 58.2, 63.1, 65.4],
        },
        {
          lineItem: "Total Assets",
          values: [352.4, 349.6, 347.2, 353.0, 356.2],
        },
        {
          lineItem: "Total Liabilities",
          values: [287.1, 286.8, 285.9, 288.5, 289.4],
        },
        {
          lineItem: "Shareholders Equity",
          values: [65.3, 62.8, 61.3, 64.5, 66.8],
        },
      ],
      cashflow: [
        {
          lineItem: "Operating Cash Flow",
          values: [29.4, 27.8, 24.1, 26.0, 27.2],
        },
        { lineItem: "CapEx", values: [-2.4, -2.5, -2.7, -2.6, -2.8] },
        { lineItem: "Free Cash Flow", values: [27.0, 25.3, 21.4, 23.4, 24.4] },
        {
          lineItem: "Financing Cash Flow",
          values: [-14.2, -13.8, -12.4, -13.0, -13.6],
        },
      ],
    },
    insightCards: [
      {
        id: "a1",
        title: "Margin Compression in Q3",
        summary:
          "Gross margin dipped 120 bps in Q3 as hardware mix shifted toward lower ASP products.",
        details:
          "AI analysis suggests the primary driver was a temporary product cycle imbalance and higher logistics expense. Early Q1 recovery indicates normalization is underway.",
        confidence: 87,
      },
      {
        id: "a2",
        title: "Resilient Cash Generation",
        summary: "Free cash flow remained above $24B despite a softer quarter.",
        details:
          "Operating discipline and stable services contribution offset pressure from top-line volatility, preserving buyback and capex flexibility.",
        confidence: 92,
      },
    ],
  },
  {
    id: "tesla",
    name: "Tesla",
    sector: "Automotive & Energy",
    metrics: { revenue: 24.7, profit: 2.0, ebitda: 3.5 },
    trend: [
      { quarter: "Q1 2024", revenue: 23.3, profit: 2.1, ebitda: 3.8 },
      { quarter: "Q2 2024", revenue: 24.9, profit: 2.5, ebitda: 4.2 },
      { quarter: "Q3 2024", revenue: 24.1, profit: 1.7, ebitda: 3.3 },
      { quarter: "Q4 2024", revenue: 25.5, profit: 2.2, ebitda: 3.7 },
      { quarter: "Q1 2025", revenue: 24.7, profit: 2.0, ebitda: 3.5 },
    ],
    statements: {
      income: [
        { lineItem: "Revenue", values: [23.3, 24.9, 24.1, 25.5, 24.7] },
        { lineItem: "Cost of Revenue", values: [18.6, 19.7, 19.5, 20.3, 19.8] },
        { lineItem: "Operating Income", values: [2.4, 2.7, 2.0, 2.3, 2.1] },
        { lineItem: "Net Income", values: [2.1, 2.5, 1.7, 2.2, 2.0] },
      ],
      balance: [
        {
          lineItem: "Cash & Equivalents",
          values: [22.4, 23.1, 21.8, 22.9, 23.5],
        },
        {
          lineItem: "Total Assets",
          values: [105.0, 106.3, 106.8, 108.2, 109.1],
        },
        {
          lineItem: "Total Liabilities",
          values: [41.8, 42.1, 42.4, 42.9, 43.0],
        },
        {
          lineItem: "Shareholders Equity",
          values: [63.2, 64.2, 64.4, 65.3, 66.1],
        },
      ],
      cashflow: [
        { lineItem: "Operating Cash Flow", values: [3.6, 4.0, 3.2, 3.8, 3.4] },
        { lineItem: "CapEx", values: [-2.1, -2.4, -2.2, -2.3, -2.2] },
        { lineItem: "Free Cash Flow", values: [1.5, 1.6, 1.0, 1.5, 1.2] },
        {
          lineItem: "Financing Cash Flow",
          values: [0.4, -0.3, 0.1, -0.2, -0.4],
        },
      ],
    },
    insightCards: [
      {
        id: "t1",
        title: "Pricing Pressure vs Volume",
        summary:
          "Unit growth remains healthy, but ASP compression reduced gross profit conversion.",
        details:
          "The model highlights selective price actions and battery input costs as the largest contributors. Margins are expected to recover if energy storage mix increases.",
        confidence: 84,
      },
      {
        id: "t2",
        title: "Cash Buffer Still Strong",
        summary:
          "Balance sheet liquidity supports aggressive product roadmap investment.",
        details:
          "Even with lower free cash flow in Q3, cash reserves remain robust, limiting near-term financing risk.",
        confidence: 89,
      },
    ],
  },
  {
    id: "microsoft",
    name: "Microsoft",
    sector: "Enterprise Software",
    metrics: { revenue: 61.9, profit: 22.0, ebitda: 28.6 },
    trend: [
      { quarter: "Q1 2024", revenue: 56.5, profit: 20.0, ebitda: 26.2 },
      { quarter: "Q2 2024", revenue: 58.7, profit: 20.8, ebitda: 27.1 },
      { quarter: "Q3 2024", revenue: 60.3, profit: 21.4, ebitda: 27.9 },
      { quarter: "Q4 2024", revenue: 61.2, profit: 21.7, ebitda: 28.2 },
      { quarter: "Q1 2025", revenue: 61.9, profit: 22.0, ebitda: 28.6 },
    ],
    statements: {
      income: [
        { lineItem: "Revenue", values: [56.5, 58.7, 60.3, 61.2, 61.9] },
        { lineItem: "Cost of Revenue", values: [20.6, 21.2, 21.7, 22.1, 22.4] },
        {
          lineItem: "Operating Income",
          values: [26.9, 27.9, 28.6, 29.1, 29.6],
        },
        { lineItem: "Net Income", values: [20.0, 20.8, 21.4, 21.7, 22.0] },
      ],
      balance: [
        {
          lineItem: "Cash & Equivalents",
          values: [80.2, 81.4, 82.0, 83.1, 83.8],
        },
        {
          lineItem: "Total Assets",
          values: [411.2, 414.5, 417.0, 420.4, 423.1],
        },
        {
          lineItem: "Total Liabilities",
          values: [200.8, 202.0, 203.5, 204.1, 205.0],
        },
        {
          lineItem: "Shareholders Equity",
          values: [210.4, 212.5, 213.5, 216.3, 218.1],
        },
      ],
      cashflow: [
        {
          lineItem: "Operating Cash Flow",
          values: [26.7, 27.5, 28.0, 28.4, 28.8],
        },
        { lineItem: "CapEx", values: [-9.4, -9.8, -10.3, -10.1, -10.5] },
        { lineItem: "Free Cash Flow", values: [17.3, 17.7, 17.7, 18.3, 18.3] },
        {
          lineItem: "Financing Cash Flow",
          values: [-10.2, -10.6, -10.9, -11.1, -11.4],
        },
      ],
    },
    insightCards: [
      {
        id: "m1",
        title: "Cloud-Led Expansion",
        summary:
          "Revenue trajectory remains consistently up with stable margin leverage.",
        details:
          "The trend model attributes most upside to cloud and enterprise licensing renewals, with limited cyclicality in core demand.",
        confidence: 93,
      },
      {
        id: "m2",
        title: "AI Spend Discipline",
        summary:
          "CapEx growth continues, but free cash flow remains resilient.",
        details:
          "Large infra investments are being absorbed by high-margin software streams, preserving profitability while scaling AI capacity.",
        confidence: 90,
      },
    ],
  },
];

export const sampleChatPrompts = [
  "Why did revenue drop in Q3?",
  "Compare Apple vs Tesla margins",
  "What changed in operating cash flow this quarter?",
];

export const staticAiResponses: Record<string, string> = {
  "why did revenue drop in q3?":
    "Revenue declined in Q3 primarily due to softer device demand and temporary pricing pressure. Gross margin also compressed as lower-margin product mix increased.",
  "compare apple vs tesla margins":
    "Apple's latest EBITDA margin is approximately 33.3% versus Tesla at approximately 14.2%. Tesla's margin volatility is tied to pricing strategy and manufacturing ramp costs.",
  "what changed in operating cash flow this quarter?":
    "Operating cash flow increased modestly quarter-over-quarter for Microsoft and Apple, while Tesla saw a sequential decline tied to working capital swings.",
};

export const defaultAiResponse =
  "Based on the available filings and trend data, the largest changes appear related to pricing mix, cost discipline, and capital allocation timing. Ask a more specific company or quarter question for a deeper breakdown.";

export const defaultRagScenario: StaticRagScenario = {
  answer:
    "Static RAG summary: margin variance is mainly explained by revenue mix and operating cost timing. Narrow the question to a company and quarter for a tighter answer.",
  retrieved: [
    {
      source: "Analyst Notes / General",
      score: 0.77,
      excerpt:
        "Portfolio-wide variance is most sensitive to product mix and one-off cost timing events.",
    },
    {
      source: "Mock Filing Summary",
      score: 0.72,
      excerpt:
        "Management commentary emphasizes discipline in operating spend while preserving growth initiatives.",
    },
  ],
  memoryWrite:
    "Saved preference: user values variance explanations with direct line-item evidence.",
};

export const staticRagResponses: Record<string, StaticRagScenario> = {
  "why did revenue drop in q3?": {
    answer:
      "Revenue dipped in Q3 due to softer demand in lower-margin product lines and a temporary pricing reset. Services held relatively steady, limiting downside.",
    retrieved: [
      {
        source: "Apple Income Statement / Q3 2024",
        score: 0.93,
        excerpt:
          "Revenue moved from 90.8 to 81.6 while cost of revenue declined less proportionally, creating margin pressure.",
      },
      {
        source: "Segment Mix Commentary",
        score: 0.88,
        excerpt:
          "Lower ASP hardware mix increased in the quarter; premium mix recovered in following periods.",
      },
      {
        source: "Trend Model Snapshot",
        score: 0.82,
        excerpt:
          "Downside contribution: demand softness 54%, pricing actions 31%, FX and other 15%.",
      },
    ],
    memoryWrite:
      "Saved memory: prioritize quarter-over-quarter decomposition when user asks 'why' questions.",
  },
  "compare apple vs tesla margins": {
    answer:
      "Apple shows a structurally higher EBITDA margin in this static dataset, while Tesla exhibits wider quarter-to-quarter volatility tied to pricing and ramp costs.",
    retrieved: [
      {
        source: "KPI Snapshot / Apple",
        score: 0.91,
        excerpt:
          "Latest quarter EBITDA 30.4 on revenue 91.2, indicating margin resilience.",
      },
      {
        source: "KPI Snapshot / Tesla",
        score: 0.9,
        excerpt:
          "Latest quarter EBITDA 3.5 on revenue 24.7 with higher sensitivity to pricing moves.",
      },
      {
        source: "Volatility Lens",
        score: 0.79,
        excerpt:
          "Tesla margin range is broader across the last five quarters compared to Apple.",
      },
    ],
    memoryWrite:
      "Saved memory: user prefers benchmark-style comparisons with volatility context.",
  },
  "what changed in operating cash flow this quarter?": {
    answer:
      "Operating cash flow is stable-to-up for Apple and Microsoft, while Tesla softens sequentially in this mock set due to working-capital normalization.",
    retrieved: [
      {
        source: "Cash Flow / Apple",
        score: 0.89,
        excerpt:
          "Operating cash flow improved from 26.0 to 27.2 in the latest quarter.",
      },
      {
        source: "Cash Flow / Microsoft",
        score: 0.87,
        excerpt:
          "Operating cash flow increased from 28.4 to 28.8, maintaining trend consistency.",
      },
      {
        source: "Cash Flow / Tesla",
        score: 0.86,
        excerpt:
          "Operating cash flow shifted from 3.8 to 3.4, primarily linked to working-capital movement.",
      },
    ],
    memoryWrite:
      "Saved memory: include directional callouts by company when discussing cash flow shifts.",
  },
};

export function getCompanyById(companyId: string): Company | undefined {
  return companies.find((company) => company.id === companyId);
}
