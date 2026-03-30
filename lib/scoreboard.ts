import { formatUnits } from "viem";

export const APP_TRACKING_ID = "app-024";
export const APP_NAME = "score-board";
export const SCORE_BOARD_ADDRESS =
  "0x66c64246714E1A999fF7124e0Cf9381B96b9356C" as const;

export const scoreBoardAbi = [
  {
    inputs: [{ internalType: "uint256", name: "newScore", type: "uint256" }],
    name: "setScore",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "score",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export type ScoreTrend = "surging" | "steady" | "latest" | "qualified";

export type ScoreEntry = {
  id: string;
  address: `0x${string}`;
  alias: string;
  score: number;
  rank: number;
  trend: ScoreTrend;
  lane: string;
  checkpoint: string;
  submittedAt: string;
};

export const mockLeaderboard: ScoreEntry[] = [
  {
    id: "finish-alpha",
    address: "0xB4513f61CFd66bA8bA4A40eF5DcB721b5a2bA012",
    alias: "Solar Dash",
    score: 980,
    rank: 1,
    trend: "surging",
    lane: "Lane A1",
    checkpoint: "Final heat",
    submittedAt: "2 min ago",
  },
  {
    id: "finish-orbit",
    address: "0x4e7c8ab82dDd965f79f6D438aeD7829D6588bAc3",
    alias: "Orbit Run",
    score: 940,
    rank: 2,
    trend: "latest",
    lane: "Lane B2",
    checkpoint: "Sprint split",
    submittedAt: "6 min ago",
  },
  {
    id: "finish-vector",
    address: "0x1C86c3661B722735DfF6f928B20A8D3Ab8f0a19e",
    alias: "Vector Pace",
    score: 905,
    rank: 3,
    trend: "steady",
    lane: "Lane C4",
    checkpoint: "Heat board",
    submittedAt: "9 min ago",
  },
  {
    id: "finish-flare",
    address: "0x7A78C2f34D8136bc3B4a9780C063405d9159F0D1",
    alias: "Flare Unit",
    score: 870,
    rank: 4,
    trend: "qualified",
    lane: "Lane D1",
    checkpoint: "Gate lock",
    submittedAt: "14 min ago",
  },
  {
    id: "finish-rift",
    address: "0x1e9854566110D9aA7B33451fb0d26395139FA0B4",
    alias: "Rift Drive",
    score: 845,
    rank: 5,
    trend: "latest",
    lane: "Lane E3",
    checkpoint: "Fast sector",
    submittedAt: "20 min ago",
  },
];

export function shortenAddress(address?: string | null) {
  if (!address) return "No wallet";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatScore(value: bigint | number | null | undefined) {
  if (value === null || value === undefined) return "0";
  const numeric = typeof value === "bigint" ? Number(value) : value;
  return Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(numeric);
}

export function buildUserEntry(address?: `0x${string}` | undefined, onchainScore?: bigint): ScoreEntry {
  const normalized = address?.toLowerCase();
  const existing = mockLeaderboard.find((entry) => entry.address.toLowerCase() === normalized);

  if (existing) {
    const score = onchainScore ? Number(onchainScore) : existing.score;
    return { ...existing, score };
  }

  const score = onchainScore ? Number(onchainScore) : 0;
  const ahead = mockLeaderboard.filter((entry) => entry.score > score).length;

  return {
    id: normalized ? `wallet-${normalized.slice(2, 8)}` : "wallet-empty",
    address: address ?? "0x0000000000000000000000000000000000000000",
    alias: normalized ? "Connected Racer" : "Guest Lane",
    score,
    rank: score > 0 ? ahead + 1 : mockLeaderboard.length + 1,
    trend: score > 0 ? "latest" : "steady",
    lane: "Lane U1",
    checkpoint: score > 0 ? "Live board" : "Ready zone",
    submittedAt: score > 0 ? "Now" : "Awaiting post",
  };
}

export function getLeaderboardWithUser(address?: `0x${string}` | undefined, onchainScore?: bigint) {
  const userEntry = buildUserEntry(address, onchainScore);
  const merged = [...mockLeaderboard];
  const exists = merged.some((entry) => entry.address.toLowerCase() === userEntry.address.toLowerCase());

  if (!exists && userEntry.score > 0) {
    merged.push(userEntry);
  }

  return merged.sort((a, b) => b.score - a.score).map((entry, index) => ({ ...entry, rank: index + 1 }));
}

export function getScoreEntryById(id: string, address?: `0x${string}` | undefined, onchainScore?: bigint) {
  return getLeaderboardWithUser(address, onchainScore).find((entry) => entry.id === id);
}

export function getLatestScoreId(address?: `0x${string}` | undefined, onchainScore?: bigint) {
  return buildUserEntry(address, onchainScore).id;
}

export function getTrendLabel(trend: ScoreTrend) {
  switch (trend) {
    case "surging":
      return "Surging";
    case "steady":
      return "Steady";
    case "latest":
      return "Latest";
    case "qualified":
      return "Ranked";
    default:
      return "Ready";
  }
}

export function getRankTone(rank: number) {
  if (rank === 1) return "first";
  if (rank <= 3) return "top";
  return "field";
}

export function getScoreDeltaText(score: number) {
  if (score >= 950) return "+24 pace";
  if (score >= 900) return "+12 pace";
  if (score >= 850) return "+5 pace";
  if (score > 0) return "+1 pace";
  return "Waiting";
}

export function getScoreMeter(score: number) {
  return Math.min(100, Math.max(6, Math.round((score / 1000) * 100)));
}

export function formatCompactScore(value: bigint | number) {
  const numeric = typeof value === "bigint" ? Number(formatUnits(value, 0)) : value;
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(numeric);
}
