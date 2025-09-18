export type Num = number | null | undefined;
const n = (v: Num, def = 0) => (Number.isFinite(+v!) ? +v! : def);
const round = (v: number, dp = 3) => +parseFloat(String(v)).toFixed(dp);

/** NFA & % finance */
export function calcNfa(assetCost: Num, downPayment: Num) {
  const a = n(assetCost),
    d = n(downPayment);
  return a - d;
}
export function calcDownFromPercent(assetCost: Num, percentOfFinance: Num) {
  const a = n(assetCost),
    p = n(percentOfFinance);
  return a * (1 - p / 100);
}
export function calcPercentFromDown(assetCost: Num, downPayment: Num) {
  const a = n(assetCost),
    d = n(downPayment);
  return a > 0 ? ((a - d) / a) * 100 : 0;
}

/** RV */
export function calcRvAmount(nfa: Num, rvPercent: Num) {
  return round(n(nfa) * (n(rvPercent) / 100));
}
export function calcRvPercent(nfa: Num, rvAmount: Num) {
  const base = n(nfa);
  return round(base > 0 ? (n(rvAmount) / base) * 100 : 0);
}

/** Provision */
export function calcProvisionAmount(
  nfa: Num,
  rvAmount: Num,
  provisionPercent: Num
) {
  const denom = n(nfa) - n(rvAmount);
  return round(denom > 0 ? (n(provisionPercent) / 100) * denom : 0);
}
export function calcProvisionPercent(
  nfa: Num,
  rvAmount: Num,
  provisionAmount: Num
) {
  const denom = n(nfa) - n(rvAmount);
  return round(denom > 0 ? (n(provisionAmount) / denom) * 100 : 0);
}

/** Periodic interest (30/360) */
export function calcPeriodInterestRate(
  annualRatePercent: Num,
  periodMonthCount: Num
) {
  const annual = n(annualRatePercent) / 100;
  const m = n(periodMonthCount);
  return m ? (annual * m * 365) / 360 / 12 : 0;
}

/** Reserve */
export function calcReservePaymentAmount(
  reserveCount: Num,
  rent: Num,
  assetCost: Num,
  insuranceRate: Num,
  periodMonthCount: Num
) {
  const m = n(periodMonthCount);
  if (!m) return 0;
  const othersIncome = (n(assetCost) * n(insuranceRate) * m) / 12;
  const denom = n(rent) + othersIncome;
  return round(denom ? (denom * n(reserveCount)) / m : 0);
}

export function calcReservePaymentCount(
  reserveAmount: Num,
  rent: Num,
  assetCost: Num,
  insuranceRate: Num,
  periodMonthCount: Num
) {
  const m = n(periodMonthCount);
  if (!m) return 0;
  const othersIncome = (n(assetCost) * n(insuranceRate) * m) / 12;
  const denom = n(rent) + othersIncome;
  return denom ? Math.floor((n(reserveAmount) * m) / denom) : 0;
}
