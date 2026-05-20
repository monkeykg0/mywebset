export type RepayType = 'equal-payment' | 'equal-principal'

// 5年期以上LPR，数据截至2026年5月
export const CURRENT_LPR = 3.50

// 公积金贷款利率
export const FUND_RATE_FIRST = 2.85  // 首套公积金利率
export const FUND_RATE_SECOND = 3.325 // 二套公积金利率

export interface CityPreset {
  city: string
  firstBp: number   // 首套基点，负数表示减
  secondBp: number  // 二套基点
  firstDownRatio: number   // 首套房最低首付比例 (如 0.15)
  secondDownRatio: number  // 二套房最低首付比例 (如 0.15 或 0.20)
}

export const CITY_PRESETS: CityPreset[] = [
  { city: '北京',   firstBp: -45, secondBp: -5,  firstDownRatio: 0.15, secondDownRatio: 0.20 },
  { city: '上海',   firstBp: -45, secondBp: -5,  firstDownRatio: 0.15, secondDownRatio: 0.20 },
  { city: '广州',   firstBp: -60, secondBp: -60, firstDownRatio: 0.15, secondDownRatio: 0.15 },
  { city: '深圳',   firstBp: -45, secondBp: -5,  firstDownRatio: 0.15, secondDownRatio: 0.20 },
  { city: '杭州',   firstBp: -50, secondBp: -30, firstDownRatio: 0.15, secondDownRatio: 0.15 },
  { city: '南京',   firstBp: -60, secondBp: -60, firstDownRatio: 0.15, secondDownRatio: 0.15 },
  { city: '成都',   firstBp: -60, secondBp: -60, firstDownRatio: 0.15, secondDownRatio: 0.15 },
  { city: '武汉',   firstBp: -60, secondBp: -60, firstDownRatio: 0.15, secondDownRatio: 0.15 },
  { city: '西安',   firstBp: -60, secondBp: -60, firstDownRatio: 0.15, secondDownRatio: 0.15 },
  { city: '重庆',   firstBp: -60, secondBp: -60, firstDownRatio: 0.15, secondDownRatio: 0.15 },
  { city: '天津',   firstBp: -55, secondBp: -5,  firstDownRatio: 0.15, secondDownRatio: 0.15 },
  { city: '苏州',   firstBp: -60, secondBp: -60, firstDownRatio: 0.15, secondDownRatio: 0.15 },
  { city: '郑州',   firstBp: -60, secondBp: -60, firstDownRatio: 0.15, secondDownRatio: 0.15 },
  { city: '长沙',   firstBp: -60, secondBp: -60, firstDownRatio: 0.15, secondDownRatio: 0.15 },
  { city: '自定义', firstBp:   0, secondBp:   0, firstDownRatio: 0.15, secondDownRatio: 0.15 },
]

// LPR + 基点 → 实际年利率（%）
export function lprToRate(lpr: number, bp: number): number {
  return Math.max(0, lpr + bp / 100)
}

export function bpLabel(bp: number): string {
  if (bp === 0) return 'LPR'
  return bp > 0 ? `LPR+${bp}bp` : `LPR${bp}bp`
}

export interface MonthlyResult {
  month: number
  payment: number
  principal: number
  interest: number
  remaining: number
}

export function calcEqualPayment(principal: number, annualRate: number, months: number) {
  if (annualRate === 0) return { monthly: principal / months, total: principal, totalInterest: 0 }
  const r = annualRate / 100 / 12
  const monthly = (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1)
  const total = monthly * months
  return { monthly, total, totalInterest: total - principal }
}

export function calcEqualPrincipalSchedule(principal: number, annualRate: number, months: number): MonthlyResult[] {
  const r = annualRate / 100 / 12
  const monthlyPrincipal = principal / months
  const result: MonthlyResult[] = []
  let remaining = principal
  for (let i = 1; i <= months; i++) {
    const interest = remaining * r
    const payment = monthlyPrincipal + interest
    remaining -= monthlyPrincipal
    result.push({ month: i, payment, principal: monthlyPrincipal, interest, remaining: Math.max(0, remaining) })
  }
  return result
}

export function calcEqualPaymentSchedule(principal: number, annualRate: number, months: number): MonthlyResult[] {
  const r = annualRate / 100 / 12
  const { monthly } = calcEqualPayment(principal, annualRate, months)
  const result: MonthlyResult[] = []
  let remaining = principal
  for (let i = 1; i <= months; i++) {
    const interest = remaining * r
    const p = monthly - interest
    remaining -= p
    result.push({ month: i, payment: monthly, principal: p, interest, remaining: Math.max(0, remaining) })
  }
  return result
}

export function calcPrepay(
  remaining: number,
  annualRate: number,
  remainMonths: number,
  prepayAmount: number,
  type: 'reduce-payment' | 'reduce-term'
) {
  const newPrincipal = remaining - prepayAmount
  if (type === 'reduce-payment') {
    const res = calcEqualPayment(newPrincipal, annualRate, remainMonths)
    return { monthly: res.monthly, months: remainMonths, totalInterest: res.totalInterest }
  } else {
    const r = annualRate / 100 / 12
    const { monthly: oldMonthly } = calcEqualPayment(remaining, annualRate, remainMonths)
    const newMonths = Math.ceil(Math.log(oldMonthly / (oldMonthly - newPrincipal * r)) / Math.log(1 + r))
    const res = calcEqualPayment(newPrincipal, annualRate, newMonths)
    return { monthly: oldMonthly, months: newMonths, totalInterest: res.totalInterest }
  }
}

export function fmt(n: number) {
  return n.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
