// Integer cents and basis points (100 bp = 1%). No DOM dependency.
export const MAX_MONEY = 100_000_000;
export const MAX_QUANTITY = 10_000;
export interface PricingInput {
  cost: number; packaging: number; quantity: number;
  commission: number; transaction: number; extra: number;
  fixedFee: number; feeCap: number | null;
}
export interface Result {
  unitPrice: number; gross: number; percentageFees: number;
  fixedFees: number; capDiscount: number; fees: number;
  netRevenue: number; productCost: number; packagingCost: number;
  profit: number; margin: number;
}
export function parseDecimal(value: string, label: string, max: number): number {
  const normalized = value.trim().replace(',', '.');
  if (!/^\d+(?:\.\d{1,2})?$/.test(normalized)) throw new Error(`${label}: use um número positivo ou zero, com até duas casas decimais, sem separador de milhares.`);
  const [whole, fraction = ''] = normalized.split('.');
  const result = Number(whole) * 100 + Number(fraction.padEnd(2, '0'));
  if (!Number.isSafeInteger(result) || result > max) throw new Error(`${label}: valor acima do limite permitido.`);
  return result;
}
export function validate(input: PricingInput) {
  for (const value of [input.cost, input.packaging, input.fixedFee, ...(input.feeCap === null ? [] : [input.feeCap])]) {
    if (!Number.isSafeInteger(value) || value < 0 || value > MAX_MONEY) throw new Error('Custos e taxas devem ser centavos inteiros entre zero e R$ 1 milhão.');
  }
  if (!Number.isInteger(input.quantity) || input.quantity < 1 || input.quantity > MAX_QUANTITY) throw new Error('Quantidade: use um inteiro entre 1 e 10.000.');
  const rates = [input.commission, input.transaction, input.extra];
  if (rates.some(rate => !Number.isInteger(rate) || rate < 0) || rates.reduce((a, b) => a + b, 0) >= 10_000) throw new Error('A soma das taxas percentuais deve ser menor que 100%.');
}
export function calculate(unitPrice: number, input: PricingInput): Result {
  validate(input);
  if (!Number.isSafeInteger(unitPrice) || unitPrice < 1 || unitPrice > MAX_MONEY) throw new Error('Preço: use de R$ 0,01 a R$ 1 milhão por unidade.');
  // Round the combined percentage fee once per unit, then multiply.
  const percentageUnit = Math.round(unitPrice * (input.commission + input.transaction + input.extra) / 10_000);
  const uncappedUnit = percentageUnit + input.fixedFee;
  const feeUnit = input.feeCap === null ? uncappedUnit : Math.min(uncappedUnit, input.feeCap);
  const gross = unitPrice * input.quantity;
  const fees = feeUnit * input.quantity;
  const productCost = input.cost * input.quantity;
  const packagingCost = input.packaging * input.quantity;
  const netRevenue = gross - fees;
  const profit = netRevenue - productCost - packagingCost;
  return { unitPrice, gross, percentageFees: percentageUnit * input.quantity,
    fixedFees: input.fixedFee * input.quantity, capDiscount: (uncappedUnit - feeUnit) * input.quantity,
    fees, netRevenue, productCost, packagingCost, profit, margin: profit / gross * 100 };
}
// Lowest cent-denominated unit price reaching total profit; rounding may exceed target.
export function priceForProfit(target: number, input: PricingInput): Result {
  validate(input);
  if (!Number.isSafeInteger(target) || target < 0 || target > MAX_MONEY) throw new Error('Lucro desejado: use de zero a R$ 1 milhão por lote.');
  if (calculate(MAX_MONEY, input).profit < target) throw new Error('Meta inviável no limite de R$ 1 milhão por unidade. Reduza custos, taxas ou a meta.');
  let low = 1;
  let high = MAX_MONEY;
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (calculate(mid, input).profit >= target) high = mid;
    else low = mid + 1;
  }
  return calculate(low, input);
}
export const currency = (cents: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100);
export const percent = (value: number) => `${value.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 2 })}%`;
