import assert from 'node:assert/strict';
import test from 'node:test';
import { calculate, MAX_MONEY, parseDecimal, priceForProfit } from '../.test-build/calculator.js';

const demo = { cost: 3200, packaging: 250, quantity: 1, commission: 1200,
  transaction: 200, extra: 600, fixedFee: 400, feeCap: 10000 };
const free = { cost: 0, packaging: 0, quantity: 1, commission: 0,
  transaction: 0, extra: 0, fixedFee: 0, feeCap: null };

test('demo separates revenue after fees from profit after costs', () => {
  const result = calculate(7990, demo);
  assert.equal(result.fees, 1998);
  assert.equal(result.netRevenue, 5992);
  assert.equal(result.profit, 2542);
  assert.equal(result.gross - result.fees - result.productCost - result.packagingCost, result.profit);
});

test('rounds the combined rate per unit, including half-cent ties', () => {
  const result = calculate(5, { ...free, commission: 500, transaction: 500, quantity: 3 });
  assert.equal(result.percentageFees, 3); // 0.5 cents per unit rounds to 1, then × 3.
  assert.equal(result.gross, 15);
  assert.equal(result.netRevenue, 12);
  assert.equal(calculate(4, { ...free, commission: 1000 }).fees, 0);
});

test('quantity multiplies revenue, every fee, product cost and packaging', () => {
  const single = calculate(7990, demo);
  const batch = calculate(7990, { ...demo, quantity: 3 });
  for (const key of ['gross', 'fees', 'percentageFees', 'fixedFees', 'netRevenue', 'productCost', 'packagingCost', 'profit']) {
    assert.equal(batch[key], single[key] * 3, key);
  }
  assert.equal(batch.margin, single.margin);
});

test('cap reduction reconciles the breakdown; disabling it restores full fees', () => {
  const capped = calculate(100000, { ...demo, quantity: 2 });
  assert.equal(capped.fees, 20000);
  assert.equal(capped.capDiscount, 20800);
  assert.equal(capped.percentageFees + capped.fixedFees - capped.capDiscount, capped.fees);
  assert.equal(calculate(100000, { ...demo, quantity: 2, feeCap: null }).fees, 40800);
});

test('zero costs, rates, fixed fee and cap are valid; zero price is invalid', () => {
  assert.equal(calculate(1, free).profit, 1);
  assert.equal(calculate(100, { ...demo, feeCap: 0 }).fees, 0);
  assert.equal(priceForProfit(0, free).unitPrice, 1);
  assert.throws(() => calculate(0, free));
});

test('loss remains negative and is not described as net revenue', () => {
  const result = calculate(1000, demo);
  assert.equal(result.netRevenue, 400);
  assert.equal(result.profit, -3050);
  assert.equal(result.margin, -305);
});

test('inverse finds the lowest cent price, for both unit and batch targets', () => {
  assert.equal(priceForProfit(2500, demo).unitPrice, 7937);
  for (const quantity of [1, 3, 10000]) {
    for (const target of [0, 1, 2500, 100000]) {
      const input = { ...demo, quantity };
      const result = priceForProfit(target, input);
      assert.ok(result.profit >= target);
      assert.ok(result.unitPrice === 1 || calculate(result.unitPrice - 1, input).profit < target);
    }
  }
});

test('inverse stays minimal across cap boundary and rejects unreachable targets', () => {
  for (const target of [36449, 36450, 36451, 200000]) {
    const result = priceForProfit(target, demo);
    assert.ok(result.profit >= target);
    assert.ok(calculate(result.unitPrice - 1, demo).profit < target);
  }
  assert.throws(() => priceForProfit(1, { ...free, cost: MAX_MONEY }));
});

test('parsing accepts decimal comma/dot and zero without floating-point drift', () => {
  for (const [text, cents] of [['0', 0], [' 32,00 ', 3200], ['2.50', 250], ['0.29', 29], ['1', 100]]) {
    assert.equal(parseDecimal(text, 'Amount', MAX_MONEY), cents);
  }
  for (const text of ['', '-1', '1,000', '1.000,00', '1e3', 'NaN', 'Infinity', '1000000.01']) {
    assert.throws(() => parseDecimal(text, 'Amount', MAX_MONEY), text);
  }
});

test('rejects invalid quantities, unsafe money and rates totaling 100 percent', () => {
  for (const quantity of [0, -1, 1.5, 10001, NaN]) assert.throws(() => calculate(100, { ...free, quantity }));
  for (const cost of [-1, 0.5, MAX_MONEY + 1, Infinity]) assert.throws(() => calculate(100, { ...free, cost }));
  assert.throws(() => calculate(100, { ...free, commission: 9999, transaction: 1 }));
  assert.throws(() => calculate(100, { ...free, commission: -1 }));
  assert.throws(() => priceForProfit(-1, free));
  assert.ok(Number.isSafeInteger(calculate(MAX_MONEY, { ...free, quantity: 10000 }).gross));
});
