"use client";

import { useCallback, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { companies, quarters, type Company } from "@/data/mock-financials";

function getCSSVariable(name: string): string {
  if (typeof window === "undefined") return "#000000";
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

type DashboardScene = {
  id: string;
  appName: string;
  sheetName: string;
  headline: string;
  kpis: Array<{ label: string; value: string }>;
  filters: string[];
  divisionShare: Array<{ label: string; value: number; color: string }>;
  monthlyRevenue: number[];
  monthlyMargin: number[];
  ranking: Array<{ label: string; value: number }>;
};

type CompareMetric =
  | "revenue"
  | "profit"
  | "ebitda"
  | "ebitdaMargin"
  | "operatingCashFlow";

type KnowledgeNode = {
  id: string;
  label: string;
  kind: "company" | "metric" | "driver";
  x: number;
  y: number;
  color: string;
};

type KnowledgeEdge = {
  source: string;
  target: string;
  relation: string;
};

const dashboardScenes: DashboardScene[] = [
  {
    id: "financial-reporting",
    appName: "Finance Toolkit",
    sheetName: "Financial Reporting",
    headline: "Financial Reporting",
    kpis: [
      { label: "Revenue", value: "$427.3M" },
      { label: "Operating Margin", value: "18.4%" },
      { label: "Profit", value: "$78.9M" },
    ],
    filters: ["Expense Type", "Corporate Entity", "Region", "Month"],
    divisionShare: [
      { label: "Customized Credit", value: 78, color: "#2f4a93" },
      { label: "Capital Solutions", value: 12, color: "#6da4db" },
      { label: "Hedge Fund", value: 6, color: "#2f7e45" },
      { label: "Other", value: 4, color: "#dbc86a" },
    ],
    monthlyRevenue: [27, 64, 35, 28, 34, 35, 30, 46, 41, 33, 39, 51],
    monthlyMargin: [2, 4, 3, 6, 1, 2, -1, -4, 19, 6, 5, 4],
    ranking: [
      { label: "C2888811", value: 2113852 },
      { label: "C3335390", value: 1391830 },
      { label: "C4002477", value: 1205992 },
      { label: "C2720267", value: 648496 },
      { label: "C3289011", value: 569593 },
    ],
  },
  {
    id: "cashflow-irr",
    appName: "Finance Toolkit",
    sheetName: "Cash Flow Valuation / IRR",
    headline: "Cash Flow Valuation / IRR",
    kpis: [
      { label: "Investment Amount", value: "$1.3M" },
      { label: "# of Investments", value: "299" },
      { label: "IRR", value: "5.80%" },
    ],
    filters: ["Investment Type", "Region", "Legal Entity", "Deal Size"],
    divisionShare: [
      { label: "Real Assets", value: 60, color: "#ede3a0" },
      { label: "Equipment", value: 40, color: "#7d2a00" },
    ],
    monthlyRevenue: [22, 45, 46, 23, 46, 92, 23, 34, 28, 44, 31, 24],
    monthlyMargin: [5, 6, 6, 5, 6, 5, 4, 6, 5, 6, 5, 5],
    ranking: [
      { label: "West", value: 602000 },
      { label: "Central", value: 584000 },
      { label: "NE", value: 572000 },
      { label: "SE", value: 546000 },
      { label: "North", value: 520000 },
    ],
  },
  {
    id: "margin-analysis",
    appName: "Consumer Bank 360",
    sheetName: "Margin Analysis",
    headline: "Margin Analysis",
    kpis: [
      { label: "Current Balance", value: "$14,014M" },
      { label: "Customers", value: "537,829" },
      { label: "Avg Margin", value: "5.31%" },
    ],
    filters: ["Credit Score", "Loan Category", "Deal Size", "Term"],
    divisionShare: [
      { label: "West", value: 37, color: "#f08a1c" },
      { label: "South", value: 25, color: "#c55d05" },
      { label: "Central", value: 20, color: "#9f4200" },
      { label: "Northeast", value: 18, color: "#7e3300" },
    ],
    monthlyRevenue: [68, 54, 43, 50, 48, 46, 44, 52, 56, 61, 58, 63],
    monthlyMargin: [4, 5, 5, 4, 6, 6, 5, 5, 6, 5, 5, 6],
    ranking: [
      { label: "West", value: 6860000 },
      { label: "South", value: 3460000 },
      { label: "Central", value: 2410000 },
      { label: "Northeast", value: 1240000 },
      { label: "Other", value: 620000 },
    ],
  },
];

const knowledgeNodes: KnowledgeNode[] = [
  {
    id: "apple",
    label: "Apple",
    kind: "company",
    x: 15,
    y: 25,
    color: "#2f80ed",
  },
  {
    id: "tesla",
    label: "Tesla",
    kind: "company",
    x: 15,
    y: 55,
    color: "#2d9f76",
  },
  {
    id: "microsoft",
    label: "Microsoft",
    kind: "company",
    x: 15,
    y: 85,
    color: "#d8832f",
  },
  {
    id: "revenue",
    label: "Revenue",
    kind: "metric",
    x: 50,
    y: 25,
    color: "#2f67a1",
  },
  {
    id: "ebitda",
    label: "EBITDA",
    kind: "metric",
    x: 50,
    y: 55,
    color: "#176a59",
  },
  {
    id: "cashflow",
    label: "Operating CF",
    kind: "metric",
    x: 50,
    y: 85,
    color: "#8c5b20",
  },
  {
    id: "pricing",
    label: "Pricing",
    kind: "driver",
    x: 84,
    y: 20,
    color: "#7d58c2",
  },
  {
    id: "mix",
    label: "Product Mix",
    kind: "driver",
    x: 84,
    y: 45,
    color: "#7d58c2",
  },
  {
    id: "cost",
    label: "Cost Discipline",
    kind: "driver",
    x: 84,
    y: 70,
    color: "#7d58c2",
  },
  {
    id: "capex",
    label: "CapEx",
    kind: "driver",
    x: 84,
    y: 90,
    color: "#7d58c2",
  },
];

const knowledgeEdges: KnowledgeEdge[] = [
  { source: "apple", target: "revenue", relation: "reports" },
  { source: "apple", target: "ebitda", relation: "reports" },
  { source: "apple", target: "cashflow", relation: "reports" },
  { source: "tesla", target: "revenue", relation: "reports" },
  { source: "tesla", target: "ebitda", relation: "reports" },
  { source: "tesla", target: "cashflow", relation: "reports" },
  { source: "microsoft", target: "revenue", relation: "reports" },
  { source: "microsoft", target: "ebitda", relation: "reports" },
  { source: "microsoft", target: "cashflow", relation: "reports" },
  { source: "revenue", target: "pricing", relation: "sensitive_to" },
  { source: "revenue", target: "mix", relation: "sensitive_to" },
  { source: "ebitda", target: "mix", relation: "driven_by" },
  { source: "ebitda", target: "cost", relation: "driven_by" },
  { source: "cashflow", target: "cost", relation: "depends_on" },
  { source: "cashflow", target: "capex", relation: "depends_on" },
];

const metricOptions: Array<{
  value: CompareMetric;
  label: string;
  unit: string;
}> = [
  { value: "revenue", label: "Revenue", unit: "USD billions" },
  { value: "profit", label: "Profit", unit: "USD billions" },
  { value: "ebitda", label: "EBITDA", unit: "USD billions" },
  { value: "ebitdaMargin", label: "EBITDA Margin", unit: "%" },
  {
    value: "operatingCashFlow",
    label: "Operating Cash Flow",
    unit: "USD billions",
  },
];

function getOperatingCashFlow(company: Company): number[] {
  const row = company.statements.cashflow.find(
    (item) => item.lineItem === "Operating Cash Flow",
  );
  return row ? row.values : quarters.map(() => 0);
}

function getMetricSeries(company: Company, metric: CompareMetric): number[] {
  if (metric === "operatingCashFlow") {
    return getOperatingCashFlow(company);
  }

  if (metric === "ebitdaMargin") {
    return company.trend.map((point) => (point.ebitda / point.revenue) * 100);
  }

  return company.trend.map((point) => point[metric]);
}

function formatMetric(value: number, metric: CompareMetric): string {
  if (metric === "ebitdaMargin") {
    return `${value.toFixed(1)}%`;
  }
  return `$${value.toFixed(1)}B`;
}

function formatMoney(value: number): string {
  return `$${new Intl.NumberFormat("en-US").format(Math.round(value))}`;
}

export function DashboardClient() {
  const [selectedSceneId, setSelectedSceneId] = useState(dashboardScenes[0].id);
  const [activeTab, setActiveTab] = useState<"analysis" | "story">("analysis");
  const [leftCompanyId, setLeftCompanyId] = useState(companies[0].id);
  const [rightCompanyId, setRightCompanyId] = useState(companies[2].id);
  const [compareMetric, setCompareMetric] = useState<CompareMetric>("revenue");
  const [focusedNodeId, setFocusedNodeId] = useState("revenue");
  const [isChartReady] = useState(true); // Charts ready immediately for rendering
  const [filterValues, setFilterValues] = useState({
    expenseType: "",
    corporateEntity: "",
    region: "",
    month: "",
  });

  const scene = useMemo(
    () =>
      dashboardScenes.find((item) => item.id === selectedSceneId) ??
      dashboardScenes[0],
    [selectedSceneId],
  );

  const leftCompany = useMemo(
    () =>
      companies.find((company) => company.id === leftCompanyId) ?? companies[0],
    [leftCompanyId],
  );

  const rightCompany = useMemo(
    () =>
      companies.find((company) => company.id === rightCompanyId) ??
      companies[1],
    [rightCompanyId],
  );

  // Helper function with distinct datasets for each filter combination
  const getMonthlyDataForFilters = useCallback(
    (expenseType: string, entity: string) => {
      // Completely different datasets for different expense types - ~50-100% variation
      type DataSet = Array<{ month: string; revenue: number; margin: number }>;

      const datasets: Record<string, Record<string, DataSet>> = {
        "cost-of-revenue": {
          "entity-1": [
            { month: "M1", revenue: 95, margin: 32 },
            { month: "M2", revenue: 118, margin: 38 },
            { month: "M3", revenue: 102, margin: 35 },
            { month: "M4", revenue: 110, margin: 36 },
            { month: "M5", revenue: 125, margin: 40 },
            { month: "M6", revenue: 128, margin: 42 },
            { month: "M7", revenue: 115, margin: 38 },
            { month: "M8", revenue: 132, margin: 44 },
            { month: "M9", revenue: 140, margin: 46 },
            { month: "M10", revenue: 125, margin: 41 },
            { month: "M11", revenue: 138, margin: 45 },
            { month: "M12", revenue: 155, margin: 50 },
          ],
          "entity-2": [
            { month: "M1", revenue: 52, margin: 18 },
            { month: "M2", revenue: 65, margin: 22 },
            { month: "M3", revenue: 48, margin: 16 },
            { month: "M4", revenue: 58, margin: 20 },
            { month: "M5", revenue: 72, margin: 25 },
            { month: "M6", revenue: 68, margin: 23 },
            { month: "M7", revenue: 55, margin: 19 },
            { month: "M8", revenue: 75, margin: 26 },
            { month: "M9", revenue: 82, margin: 28 },
            { month: "M10", revenue: 70, margin: 24 },
            { month: "M11", revenue: 78, margin: 27 },
            { month: "M12", revenue: 92, margin: 31 },
          ],
          "entity-3": [
            { month: "M1", revenue: 68, margin: 22 },
            { month: "M2", revenue: 82, margin: 28 },
            { month: "M3", revenue: 75, margin: 25 },
            { month: "M4", revenue: 88, margin: 29 },
            { month: "M5", revenue: 95, margin: 32 },
            { month: "M6", revenue: 92, margin: 31 },
            { month: "M7", revenue: 78, margin: 26 },
            { month: "M8", revenue: 105, margin: 35 },
            { month: "M9", revenue: 112, margin: 37 },
            { month: "M10", revenue: 98, margin: 33 },
            { month: "M11", revenue: 108, margin: 36 },
            { month: "M12", revenue: 125, margin: 42 },
          ],
          "entity-4": [
            { month: "M1", revenue: 35, margin: 10 },
            { month: "M2", revenue: 42, margin: 12 },
            { month: "M3", revenue: 38, margin: 11 },
            { month: "M4", revenue: 45, margin: 13 },
            { month: "M5", revenue: 52, margin: 15 },
            { month: "M6", revenue: 48, margin: 14 },
            { month: "M7", revenue: 40, margin: 12 },
            { month: "M8", revenue: 58, margin: 17 },
            { month: "M9", revenue: 65, margin: 19 },
            { month: "M10", revenue: 55, margin: 16 },
            { month: "M11", revenue: 62, margin: 18 },
            { month: "M12", revenue: 75, margin: 22 },
          ],
        },
        "operating-expense": {
          "entity-1": [
            { month: "M1", revenue: 45, margin: 8 },
            { month: "M2", revenue: 52, margin: 10 },
            { month: "M3", revenue: 48, margin: 9 },
            { month: "M4", revenue: 55, margin: 11 },
            { month: "M5", revenue: 62, margin: 12 },
            { month: "M6", revenue: 58, margin: 11 },
            { month: "M7", revenue: 50, margin: 10 },
            { month: "M8", revenue: 68, margin: 13 },
            { month: "M9", revenue: 75, margin: 15 },
            { month: "M10", revenue: 65, margin: 13 },
            { month: "M11", revenue: 72, margin: 14 },
            { month: "M12", revenue: 85, margin: 17 },
          ],
          "entity-2": [
            { month: "M1", revenue: 28, margin: 4 },
            { month: "M2", revenue: 35, margin: 6 },
            { month: "M3", revenue: 32, margin: 5 },
            { month: "M4", revenue: 38, margin: 6 },
            { month: "M5", revenue: 45, margin: 8 },
            { month: "M6", revenue: 42, margin: 7 },
            { month: "M7", revenue: 35, margin: 6 },
            { month: "M8", revenue: 52, margin: 9 },
            { month: "M9", revenue: 58, margin: 10 },
            { month: "M10", revenue: 48, margin: 8 },
            { month: "M11", revenue: 55, margin: 9 },
            { month: "M12", revenue: 68, margin: 12 },
          ],
          "entity-3": [
            { month: "M1", revenue: 38, margin: 6 },
            { month: "M2", revenue: 45, margin: 8 },
            { month: "M3", revenue: 42, margin: 7 },
            { month: "M4", revenue: 50, margin: 9 },
            { month: "M5", revenue: 58, margin: 10 },
            { month: "M6", revenue: 55, margin: 10 },
            { month: "M7", revenue: 48, margin: 8 },
            { month: "M8", revenue: 65, margin: 12 },
            { month: "M9", revenue: 72, margin: 13 },
            { month: "M10", revenue: 62, margin: 11 },
            { month: "M11", revenue: 70, margin: 12 },
            { month: "M12", revenue: 82, margin: 15 },
          ],
          "entity-4": [
            { month: "M1", revenue: 18, margin: 2 },
            { month: "M2", revenue: 22, margin: 3 },
            { month: "M3", revenue: 20, margin: 2 },
            { month: "M4", revenue: 25, margin: 4 },
            { month: "M5", revenue: 30, margin: 5 },
            { month: "M6", revenue: 28, margin: 4 },
            { month: "M7", revenue: 24, margin: 3 },
            { month: "M8", revenue: 35, margin: 6 },
            { month: "M9", revenue: 40, margin: 7 },
            { month: "M10", revenue: 35, margin: 6 },
            { month: "M11", revenue: 38, margin: 6 },
            { month: "M12", revenue: 48, margin: 8 },
          ],
        },
        capex: {
          "entity-1": [
            { month: "M1", revenue: 250, margin: 45 },
            { month: "M2", revenue: 280, margin: 52 },
            { month: "M3", revenue: 260, margin: 48 },
            { month: "M4", revenue: 290, margin: 54 },
            { month: "M5", revenue: 320, margin: 60 },
            { month: "M6", revenue: 310, margin: 58 },
            { month: "M7", revenue: 270, margin: 50 },
            { month: "M8", revenue: 340, margin: 64 },
            { month: "M9", revenue: 370, margin: 70 },
            { month: "M10", revenue: 330, margin: 62 },
            { month: "M11", revenue: 360, margin: 68 },
            { month: "M12", revenue: 400, margin: 76 },
          ],
          "entity-2": [
            { month: "M1", revenue: 120, margin: 18 },
            { month: "M2", revenue: 145, margin: 24 },
            { month: "M3", revenue: 130, margin: 20 },
            { month: "M4", revenue: 158, margin: 26 },
            { month: "M5", revenue: 180, margin: 30 },
            { month: "M6", revenue: 168, margin: 28 },
            { month: "M7", revenue: 142, margin: 22 },
            { month: "M8", revenue: 198, margin: 32 },
            { month: "M9", revenue: 220, margin: 37 },
            { month: "M10", revenue: 190, margin: 31 },
            { month: "M11", revenue: 210, margin: 35 },
            { month: "M12", revenue: 248, margin: 41 },
          ],
          "entity-3": [
            { month: "M1", revenue: 170, margin: 28 },
            { month: "M2", revenue: 205, margin: 35 },
            { month: "M3", revenue: 188, margin: 32 },
            { month: "M4", revenue: 220, margin: 38 },
            { month: "M5", revenue: 245, margin: 42 },
            { month: "M6", revenue: 232, margin: 40 },
            { month: "M7", revenue: 205, margin: 35 },
            { month: "M8", revenue: 270, margin: 46 },
            { month: "M9", revenue: 295, margin: 51 },
            { month: "M10", revenue: 258, margin: 44 },
            { month: "M11", revenue: 280, margin: 48 },
            { month: "M12", revenue: 320, margin: 56 },
          ],
          "entity-4": [
            { month: "M1", revenue: 85, margin: 10 },
            { month: "M2", revenue: 105, margin: 14 },
            { month: "M3", revenue: 95, margin: 12 },
            { month: "M4", revenue: 118, margin: 16 },
            { month: "M5", revenue: 135, margin: 18 },
            { month: "M6", revenue: 128, margin: 17 },
            { month: "M7", revenue: 108, margin: 14 },
            { month: "M8", revenue: 152, margin: 20 },
            { month: "M9", revenue: 170, margin: 23 },
            { month: "M10", revenue: 148, margin: 20 },
            { month: "M11", revenue: 162, margin: 22 },
            { month: "M12", revenue: 190, margin: 26 },
          ],
        },
        depreciation: {
          "entity-1": [
            { month: "M1", revenue: 15, margin: 2 },
            { month: "M2", revenue: 18, margin: 3 },
            { month: "M3", revenue: 16, margin: 2 },
            { month: "M4", revenue: 20, margin: 3 },
            { month: "M5", revenue: 23, margin: 4 },
            { month: "M6", revenue: 22, margin: 3 },
            { month: "M7", revenue: 19, margin: 3 },
            { month: "M8", revenue: 26, margin: 4 },
            { month: "M9", revenue: 29, margin: 5 },
            { month: "M10", revenue: 25, margin: 4 },
            { month: "M11", revenue: 28, margin: 5 },
            { month: "M12", revenue: 32, margin: 5 },
          ],
          "entity-2": [
            { month: "M1", revenue: 8, margin: 1 },
            { month: "M2", revenue: 10, margin: 1 },
            { month: "M3", revenue: 9, margin: 1 },
            { month: "M4", revenue: 12, margin: 2 },
            { month: "M5", revenue: 14, margin: 2 },
            { month: "M6", revenue: 13, margin: 2 },
            { month: "M7", revenue: 11, margin: 1 },
            { month: "M8", revenue: 16, margin: 2 },
            { month: "M9", revenue: 18, margin: 3 },
            { month: "M10", revenue: 16, margin: 2 },
            { month: "M11", revenue: 17, margin: 3 },
            { month: "M12", revenue: 20, margin: 3 },
          ],
          "entity-3": [
            { month: "M1", revenue: 12, margin: 2 },
            { month: "M2", revenue: 14, margin: 2 },
            { month: "M3", revenue: 13, margin: 2 },
            { month: "M4", revenue: 16, margin: 3 },
            { month: "M5", revenue: 18, margin: 3 },
            { month: "M6", revenue: 17, margin: 3 },
            { month: "M7", revenue: 15, margin: 2 },
            { month: "M8", revenue: 20, margin: 3 },
            { month: "M9", revenue: 22, margin: 4 },
            { month: "M10", revenue: 20, margin: 3 },
            { month: "M11", revenue: 21, margin: 4 },
            { month: "M12", revenue: 25, margin: 4 },
          ],
          "entity-4": [
            { month: "M1", revenue: 5, margin: 1 },
            { month: "M2", revenue: 6, margin: 1 },
            { month: "M3", revenue: 6, margin: 1 },
            { month: "M4", revenue: 7, margin: 1 },
            { month: "M5", revenue: 8, margin: 1 },
            { month: "M6", revenue: 8, margin: 1 },
            { month: "M7", revenue: 7, margin: 1 },
            { month: "M8", revenue: 10, margin: 2 },
            { month: "M9", revenue: 11, margin: 2 },
            { month: "M10", revenue: 10, margin: 2 },
            { month: "M11", revenue: 11, margin: 2 },
            { month: "M12", revenue: 13, margin: 2 },
          ],
        },
      };

      return (
        datasets[expenseType]?.[entity] ||
        datasets["cost-of-revenue"]["entity-1"]
      );
    },
    [],
  );

  const getDivisionShareForFilters = useCallback((region: string) => {
    // Completely different division share breakdowns per region
    type DivisionData = Array<{ label: string; value: number; color: string }>;

    const regionDatasets: Record<string, DivisionData> = {
      "north-america": [
        { label: "Customized Credit", value: 45, color: "#2f4a93" },
        { label: "Capital Solutions", value: 35, color: "#6da4db" },
        { label: "Hedge Fund", value: 15, color: "#2f7e45" },
        { label: "Other", value: 5, color: "#dbc86a" },
      ],
      europe: [
        { label: "Customized Credit", value: 25, color: "#2f4a93" },
        { label: "Capital Solutions", value: 20, color: "#6da4db" },
        { label: "Hedge Fund", value: 40, color: "#2f7e45" },
        { label: "Other", value: 15, color: "#dbc86a" },
      ],
      "asia-pacific": [
        { label: "Customized Credit", value: 60, color: "#2f4a93" },
        { label: "Capital Solutions", value: 22, color: "#6da4db" },
        { label: "Hedge Fund", value: 10, color: "#2f7e45" },
        { label: "Other", value: 8, color: "#dbc86a" },
      ],
    };

    return regionDatasets[region] || regionDatasets["north-america"];
  }, []);

  const revenueMarginChartData = useMemo(() => {
    return getMonthlyDataForFilters(
      filterValues.expenseType || "cost-of-revenue",
      filterValues.corporateEntity || "entity-1",
    );
  }, [
    filterValues.expenseType,
    filterValues.corporateEntity,
    getMonthlyDataForFilters,
  ]);

  const filteredDivisionShare = useMemo(() => {
    return getDivisionShareForFilters(filterValues.region || "north-america");
  }, [filterValues.region, getDivisionShareForFilters]);

  const comparisonData = useMemo(() => {
    const leftSeries = getMetricSeries(leftCompany, compareMetric);
    const rightSeries = getMetricSeries(rightCompany, compareMetric);

    return quarters.map((quarter, index) => ({
      quarter,
      left: Number(leftSeries[index].toFixed(2)),
      right: Number(rightSeries[index].toFixed(2)),
    }));
  }, [leftCompany, rightCompany, compareMetric]);

  const latestComparison = comparisonData[comparisonData.length - 1];
  const latestDelta = Number(
    (latestComparison.left - latestComparison.right).toFixed(2),
  );

  const connectedIds = useMemo(() => {
    const ids = new Set<string>([focusedNodeId]);
    knowledgeEdges.forEach((edge) => {
      if (edge.source === focusedNodeId || edge.target === focusedNodeId) {
        ids.add(edge.source);
        ids.add(edge.target);
      }
    });
    return ids;
  }, [focusedNodeId]);

  const focusedNode =
    knowledgeNodes.find((node) => node.id === focusedNodeId) ??
    knowledgeNodes[0];

  const storyNotes = useMemo(() => {
    const leftStart = comparisonData[0].left;
    const leftEnd = latestComparison.left;
    const rightStart = comparisonData[0].right;
    const rightEnd = latestComparison.right;

    return [
      `${leftCompany.name} moved from ${formatMetric(leftStart, compareMetric)} to ${formatMetric(leftEnd, compareMetric)} across the available quarters.`,
      `${rightCompany.name} moved from ${formatMetric(rightStart, compareMetric)} to ${formatMetric(rightEnd, compareMetric)} over the same window.`,
      `Current gap: ${latestDelta >= 0 ? `${leftCompany.name} leads by` : `${rightCompany.name} leads by`} ${formatMetric(Math.abs(latestDelta), compareMetric)}.`,
    ];
  }, [
    comparisonData,
    leftCompany.name,
    rightCompany.name,
    compareMetric,
    latestComparison,
    latestDelta,
  ]);

  const colors = useMemo(
    () => ({
      accent1: getCSSVariable("--metric-accent-1"),
      accent2: getCSSVariable("--metric-accent-2"),
      accent3: getCSSVariable("--metric-accent-3"),
      accent4: getCSSVariable("--metric-accent-4"),
      grid: getCSSVariable("--chart-grid"),
    }),
    [],
  );

  return (
    <section className="page-enter overflow-hidden rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--surface)]">
      <div className="flex items-center gap-2 bg-[color:var(--surface-strong)] px-4 py-2">
        <span className="h-2.5 w-2.5 rounded-full border border-[color:var(--border-subtle)]" />
        <span className="h-2.5 w-2.5 rounded-full border border-[color:var(--border-subtle)]" />
        <span className="h-2.5 w-2.5 rounded-full border border-[color:var(--border-subtle)]" />
        <p className="ml-3 text-xs font-medium tracking-wide text-[color:var(--text-secondary)]">
          {scene.appName}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[color:var(--border-subtle)] bg-[color:var(--surface-muted)] px-4 py-2">
        <div className="flex items-center gap-4 text-sm">
          <button
            type="button"
            onClick={() => setActiveTab("analysis")}
            className={`border-b-2 pb-1 font-semibold ${
              activeTab === "analysis"
                ? "border-[color:var(--metric-accent-3)] text-[color:var(--text-primary)]"
                : "border-transparent text-[color:var(--text-secondary)]"
            }`}
          >
            Analysis
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("story")}
            className={`border-b-2 pb-1 font-semibold ${
              activeTab === "story"
                ? "border-[color:var(--metric-accent-3)] text-[color:var(--text-primary)]"
                : "border-transparent text-[color:var(--text-secondary)]"
            }`}
          >
            Story
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={scene.id}
            onChange={(event) => setSelectedSceneId(event.target.value)}
            className="rounded border border-[color:var(--border-subtle)] bg-[color:var(--surface)] px-2 py-1 text-sm text-[color:var(--text-primary)] outline-none"
          >
            {dashboardScenes.map((item) => (
              <option key={item.id} value={item.id}>
                {item.sheetName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-[color:var(--metric-highlight)] px-4 py-3 text-xl text-[color:var(--metric-highlight-text)]">
        {scene.headline}
      </div>

      {activeTab === "analysis" ? (
        <div className="grid gap-4 px-4 py-4 md:grid-cols-3">
          {scene.kpis.map((kpi) => (
            <article
              key={kpi.label}
              className="rounded-lg border border-[color:var(--border-subtle)] bg-[color:var(--surface)] px-4 py-3 text-center"
            >
              <p className="text-sm text-[color:var(--text-secondary)]">
                {kpi.label}
              </p>
              <p className="mt-1 text-4xl font-light text-[color:var(--metric-accent-1)]">
                {kpi.value}
              </p>
            </article>
          ))}
        </div>
      ) : null}

      {activeTab === "analysis" ? (
        <div className="grid gap-4 px-4 pb-4 lg:grid-cols-[220px_1fr]">
          <aside className="space-y-3 rounded-lg border border-[color:var(--border-subtle)] bg-[color:var(--surface-muted)] p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[color:var(--text-tertiary)]">
              Selections
            </p>
            <select
              value={filterValues.expenseType}
              onChange={(e) =>
                setFilterValues({
                  ...filterValues,
                  expenseType: e.target.value,
                })
              }
              className="w-full rounded border border-[color:var(--border-subtle)] bg-[color:var(--surface)] px-3 py-2 text-sm text-[color:var(--text-primary)] outline-none transition-colors focus:border-[color:var(--metric-accent-1)]"
            >
              <option value="">Select Expense Type</option>
              <option value="cost-of-revenue">Cost of Revenue</option>
              <option value="operating-expense">Operating Expense</option>
              <option value="capex">CapEx</option>
              <option value="depreciation">Depreciation</option>
            </select>
            <select
              value={filterValues.corporateEntity}
              onChange={(e) =>
                setFilterValues({
                  ...filterValues,
                  corporateEntity: e.target.value,
                })
              }
              className="w-full rounded border border-[color:var(--border-subtle)] bg-[color:var(--surface)] px-3 py-2 text-sm text-[color:var(--text-primary)] outline-none transition-colors focus:border-[color:var(--metric-accent-1)]"
            >
              <option value="">Select Entity</option>
              <option value="entity-1">Entity A</option>
              <option value="entity-2">Entity B</option>
              <option value="entity-3">Entity C</option>
              <option value="entity-4">Entity D</option>
            </select>
            <select
              value={filterValues.region}
              onChange={(e) =>
                setFilterValues({ ...filterValues, region: e.target.value })
              }
              className="w-full rounded border border-[color:var(--border-subtle)] bg-[color:var(--surface)] px-3 py-2 text-sm text-[color:var(--text-primary)] outline-none transition-colors focus:border-[color:var(--metric-accent-1)]"
            >
              <option value="">Select Region</option>
              <option value="north-america">North America</option>
              <option value="europe">Europe</option>
              <option value="asia-pacific">Asia Pacific</option>
              <option value="latam">Latin America</option>
            </select>
            <select
              value={filterValues.month}
              onChange={(e) =>
                setFilterValues({ ...filterValues, month: e.target.value })
              }
              className="w-full rounded border border-[color:var(--border-subtle)] bg-[color:var(--surface)] px-3 py-2 text-sm text-[color:var(--text-primary)] outline-none transition-colors focus:border-[color:var(--metric-accent-1)]"
            >
              <option value="">Select Month</option>
              <option value="01">January</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
            <button
              onClick={() =>
                setFilterValues({
                  expenseType: "",
                  corporateEntity: "",
                  region: "",
                  month: "",
                })
              }
              className="w-full rounded bg-[color:var(--metric-highlight)] px-3 py-2 text-xs font-medium text-[color:var(--metric-highlight-text)] transition-opacity hover:opacity-90"
            >
              Clear Filters
            </button>
          </aside>

          <div className="space-y-4">
            <div className="grid gap-4 xl:grid-cols-2">
              <article className="rounded-lg border border-[color:var(--border-subtle)] bg-[color:var(--surface)] p-4">
                <h3 className="text-base font-semibold text-[color:var(--text-primary)]">
                  Revenue by Division
                </h3>
                <p className="text-xs text-[color:var(--text-tertiary)]">
                  Hover segments for distribution detail
                </p>
                <div className="mt-3 h-[280px] w-full">
                  {isChartReady ? (
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={filteredDivisionShare}
                          dataKey="value"
                          nameKey="label"
                          innerRadius={56}
                          outerRadius={96}
                          paddingAngle={2}
                        >
                          {filteredDivisionShare.map((entry) => (
                            <Cell key={entry.label} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full w-full animate-pulse rounded bg-[color:var(--surface-muted)]" />
                  )}
                </div>
              </article>

              <article className="rounded-lg border border-[color:var(--border-subtle)] bg-[color:var(--surface)] p-4">
                <h3 className="text-base font-semibold text-[color:var(--text-primary)]">
                  Revenue vs Operating Margin %
                </h3>
                <p className="text-xs text-[color:var(--text-tertiary)]">
                  Interactive monthly combination chart
                </p>
                <div className="mt-3 h-[280px] w-full">
                  {isChartReady ? (
                    <ResponsiveContainer>
                      <ComposedChart data={revenueMarginChartData}>
                        <CartesianGrid
                          stroke="var(--chart-grid)"
                          strokeDasharray="3 3"
                        />
                        <XAxis
                          dataKey="month"
                          tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
                        />
                        <YAxis
                          yAxisId="left"
                          tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
                        />
                        <YAxis
                          yAxisId="right"
                          orientation="right"
                          tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
                        />
                        <Tooltip />
                        <Legend />
                        <Bar
                          yAxisId="left"
                          dataKey="revenue"
                          fill={colors.accent1}
                          name="Revenue"
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="margin"
                          stroke={colors.accent4}
                          strokeWidth={2.2}
                          name="Margin %"
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full w-full animate-pulse rounded bg-[color:var(--surface-muted)]" />
                  )}
                </div>
              </article>
            </div>

            <article className="rounded-lg border border-[color:var(--border-subtle)] bg-[color:var(--surface)] p-4">
              <h3 className="text-base font-semibold text-[color:var(--text-primary)]">
                Company Compare
              </h3>
              <div className="mt-3 grid gap-3 md:grid-cols-4">
                <select
                  value={leftCompany.id}
                  onChange={(event) => setLeftCompanyId(event.target.value)}
                  className="rounded border border-[color:var(--border-subtle)] bg-[color:var(--surface-muted)] px-3 py-2 text-sm text-[color:var(--text-primary)]"
                >
                  {companies.map((company) => (
                    <option key={`left-${company.id}`} value={company.id}>
                      Left: {company.name}
                    </option>
                  ))}
                </select>
                <select
                  value={rightCompany.id}
                  onChange={(event) => setRightCompanyId(event.target.value)}
                  className="rounded border border-[color:var(--border-subtle)] bg-[color:var(--surface-muted)] px-3 py-2 text-sm text-[color:var(--text-primary)]"
                >
                  {companies.map((company) => (
                    <option key={`right-${company.id}`} value={company.id}>
                      Right: {company.name}
                    </option>
                  ))}
                </select>
                <select
                  value={compareMetric}
                  onChange={(event) =>
                    setCompareMetric(event.target.value as CompareMetric)
                  }
                  className="rounded border border-[color:var(--border-subtle)] bg-[color:var(--surface-muted)] px-3 py-2 text-sm text-[color:var(--text-primary)]"
                >
                  {metricOptions.map((metric) => (
                    <option key={metric.value} value={metric.value}>
                      {metric.label}
                    </option>
                  ))}
                </select>
                <div className="rounded border border-[color:var(--border-subtle)] bg-[color:var(--surface-muted)] px-3 py-2 text-xs text-[color:var(--text-secondary)]">
                  Latest delta:{" "}
                  {formatMetric(Math.abs(latestDelta), compareMetric)} (
                  {latestDelta >= 0 ? leftCompany.name : rightCompany.name}{" "}
                  leads)
                </div>
              </div>

              <div className="mt-3 h-[300px] w-full">
                {isChartReady ? (
                  <ResponsiveContainer>
                    <LineChart data={comparisonData}>
                      <CartesianGrid
                        stroke="var(--chart-grid)"
                        strokeDasharray="3 3"
                      />
                      <XAxis
                        dataKey="quarter"
                        tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
                      />
                      <YAxis
                        tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
                      />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="left"
                        stroke={colors.accent1}
                        strokeWidth={2.3}
                        name={leftCompany.name}
                      />
                      <Line
                        type="monotone"
                        dataKey="right"
                        stroke={colors.accent2}
                        strokeWidth={2.3}
                        name={rightCompany.name}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full w-full animate-pulse rounded bg-[color:var(--surface-muted)]" />
                )}
              </div>
              <p className="mt-2 text-xs text-[color:var(--text-tertiary)]">
                Unit:{" "}
                {
                  metricOptions.find((metric) => metric.value === compareMetric)
                    ?.unit
                }
              </p>
            </article>

            <div className="grid gap-4 xl:grid-cols-2">
              <article className="rounded-lg border border-[color:var(--border-subtle)] bg-[color:var(--surface)] p-4">
                <h3 className="text-base font-semibold text-[color:var(--text-primary)]">
                  Top Rankings
                </h3>
                <div className="mt-3 h-[260px] w-full">
                  {isChartReady ? (
                    <ResponsiveContainer>
                      <BarChart
                        data={scene.ranking}
                        layout="vertical"
                        margin={{ left: 12, right: 12 }}
                      >
                        <CartesianGrid
                          stroke="var(--chart-grid)"
                          strokeDasharray="3 3"
                        />
                        <XAxis
                          type="number"
                          tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
                        />
                        <YAxis
                          type="category"
                          dataKey="label"
                          tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
                          width={86}
                        />
                        <Tooltip
                          formatter={(value) => formatMoney(Number(value))}
                        />
                        <Bar dataKey="value" fill={colors.accent1} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full w-full animate-pulse rounded bg-[color:var(--surface-muted)]" />
                  )}
                </div>
              </article>

              <article className="rounded-lg border border-[color:var(--border-subtle)] bg-[color:var(--surface)] p-4">
                <h3 className="text-base font-semibold text-[color:var(--text-primary)]">
                  Knowledge Graph
                </h3>
                <p className="text-xs text-[color:var(--text-tertiary)]">
                  Click nodes to trace metric and driver relationships.
                </p>
                <div className="mt-3 rounded border border-[color:var(--border-subtle)] bg-[color:var(--surface-muted)] p-2">
                  <svg
                    viewBox="0 0 100 100"
                    className="h-[220px] w-full"
                    suppressHydrationWarning
                  >
                    {knowledgeEdges.map((edge) => {
                      const source = knowledgeNodes.find(
                        (node) => node.id === edge.source,
                      );
                      const target = knowledgeNodes.find(
                        (node) => node.id === edge.target,
                      );
                      if (!source || !target) {
                        return null;
                      }
                      const isActive =
                        source.id === focusedNodeId ||
                        target.id === focusedNodeId;
                      return (
                        <line
                          key={`${edge.source}-${edge.target}`}
                          x1={source.x}
                          y1={source.y}
                          x2={target.x}
                          y2={target.y}
                          stroke={isActive ? colors.accent1 : colors.grid}
                          strokeWidth={isActive ? 1.6 : 0.8}
                          opacity={isActive ? 1 : 0.65}
                          suppressHydrationWarning
                        />
                      );
                    })}
                    {knowledgeNodes.map((node) => (
                      <g
                        key={node.id}
                        onClick={() => {
                          setFocusedNodeId(node.id);
                          // Map metric nodes to CompareMetric
                          if (node.kind === "metric") {
                            if (node.id === "revenue")
                              setCompareMetric("revenue");
                            else if (node.id === "ebitda")
                              setCompareMetric("ebitda");
                            else if (node.id === "cashflow")
                              setCompareMetric("operatingCashFlow");
                          }
                        }}
                        className="cursor-pointer"
                      >
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={connectedIds.has(node.id) ? 3.8 : 3}
                          fill={node.color}
                          stroke={
                            node.id === focusedNodeId ? "#0b1c33" : "white"
                          }
                          strokeWidth={node.id === focusedNodeId ? 1.2 : 0.7}
                          opacity={connectedIds.has(node.id) ? 1 : 0.55}
                        />
                        <text
                          x={node.x + 4.5}
                          y={node.y + 0.8}
                          fontSize="3.2"
                          fill={getCSSVariable("--text-primary")}
                          suppressHydrationWarning
                        >
                          {node.label}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
                <p className="mt-2 text-xs text-[color:var(--text-secondary)]">
                  Focus:{" "}
                  <span className="font-medium">{focusedNode.label}</span> (
                  {focusedNode.kind})
                </p>
              </article>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 px-4 py-4 xl:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-lg border border-[color:var(--border-subtle)] bg-[color:var(--surface)] p-4">
            <h3 className="text-base font-semibold text-[color:var(--text-primary)]">
              Executive Story
            </h3>
            <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
              {scene.headline} combines mock operational trends and financial
              outcomes. The current narrative is generated from the selected
              company pair and comparison metric.
            </p>
            <div className="mt-3 space-y-2">
              {storyNotes.map((note) => (
                <p
                  key={note}
                  className="rounded border border-[color:var(--border-subtle)] bg-[color:var(--surface-hover)] px-3 py-2 text-sm text-[color:var(--text-primary)]"
                >
                  {note}
                </p>
              ))}
            </div>
          </article>

          <article className="rounded-lg border border-[color:var(--border-subtle)] bg-[color:var(--surface)] p-4">
            <h3 className="text-base font-semibold text-[color:var(--text-primary)]">
              Story Timeline
            </h3>
            <div className="mt-3 h-[250px] w-full">
              {isChartReady ? (
                <ResponsiveContainer>
                  <LineChart data={comparisonData}>
                    <CartesianGrid
                      stroke="var(--chart-grid)"
                      strokeDasharray="3 3"
                    />
                    <XAxis
                      dataKey="quarter"
                      tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
                    />
                    <YAxis
                      tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
                    />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="left"
                      stroke={colors.accent1}
                      strokeWidth={2.3}
                      name={leftCompany.name}
                    />
                    <Line
                      type="monotone"
                      dataKey="right"
                      stroke={colors.accent2}
                      strokeWidth={2.3}
                      name={rightCompany.name}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full animate-pulse rounded bg-[color:var(--surface-muted)]" />
              )}
            </div>
            <p className="mt-2 text-xs text-[color:var(--text-tertiary)]">
              Story updates automatically when you change companies or metric in
              Analysis.
            </p>
          </article>
        </div>
      )}
    </section>
  );
}
