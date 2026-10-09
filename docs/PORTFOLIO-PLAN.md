# Pricing in Perspective — Portfolio Plan

## Purpose

Turn the original static Shopee fee calculator into a demonstrable local pricing tool: understand revenue after fees, subtract modeled costs and compare alternatives. Demonstrate React, TypeScript, integer monetary modeling and a responsive interface without connecting real accounts.

## Original delivery and preserved resources

The original checkout contained README, index.html, script.js, style.css and test.html, with no build dependencies. Its useful behaviors included direct and inverse calculations, immediate updates, a fee breakdown and BRL formatting. Historical assumptions were 12% commission, 2% transaction, optional 6% shipping and 2% campaign, R$4/R$5 fixed fees, half-price item fees below R$8 and a R$100 cap. These are historical code assumptions, not verified current platform rules.

Quantity previously multiplied the fixed fee and cap without multiplying revenue or percentage fees. The former profit margin omitted costs. Inverse pricing used up to five iterations. The archived test harness depended on missing form elements and remains a historical reference.

The initial upgrade was prepared in the existing `portfolio-pricing-calculator` sibling checkout on October 8, 2026. All files were preserved in commit `4220fc1` and fast-forwarded into the default `master` checkout on October 9, 2026. Subsequent maintenance takes place directly on the default branch. No new worktree or branch was created.

## Delivered stages

1. Preserve the prior page as `legacy.html` with a visible archive warning; retain script.js, style.css and test.html.
2. Provide a pure calculation engine with integer cents, basis points, explicit limits, batch quantity, costs and fees per unit, and inverse pricing for profit after costs.
3. Provide a React + TypeScript + Vite interface with two modes, reconciled financial breakdown, editable rates/cap, up to four immutable scenario snapshots, removal and a fictional example.
4. Integrate into the default checkout, add meaningful calculation tests, translate documentation and register canonical portfolio preferences in AGENTS.md.
5. Verify the production build and the local application flow; push normally and verify CI without deploying publicly.

## Design decisions retained

The initial delivery used the frontend-design skill. The palette uses cool background `#edf2f6`, white surfaces, text `#243746`, petroleum `#164e63`, profit `#147568` and fees `#cc953c`. Typography uses local Avenir Next/Avenir with Segoe UI fallbacks and no remote font requests.

The workbench places editing on the left, results on the right and comparison below. Small screens use a single column and a horizontally scrollable comparison table. A revenue allocation bar complements textual values; losses have their own text and color. A continuous financial breakdown avoids repeated metric cards and makes reconciliation explicit.

## Acceptance and verification

- React + strict TypeScript runs locally without credentials.
- Product cost, packaging, quantity, percentages, fixed fee and cap are editable.
- Direct pricing and inverse batch profit targets distinguish net revenue from profit.
- Decimal comma/point parsing and BRL formatting retain exact cents; invalid input blocks saving.
- Up to four snapshots remain unchanged when inputs change; removal frees capacity and reset preserves comparison.
- The preset explicitly disclaims current Shopee rates and external connections.
- Historical assets and calculation semantics are documented.
- `npm test`: 10 passing behavioral tests for rounding, revenue/profit, quantity, caps, zero values, losses, minimal inverse prices, parsing and limits.
- `npm run build`: TypeScript check and Vite production build passed on October 9, 2026, using Vite 7.3.7; 30 modules transformed.
- `git diff --check`: passed before delivery commits.
- Local Orca browser checks exercised input updates, profit inversion, snapshots, comparison capacity, removal, zero values, errors, loss, cap changes, quantity and reload behavior. Buttons required Orca DOM activation because typed click/key commands did not activate them in the tested embedded tab. Actual desktop (1361 × 948) and narrow-screen (390 × 844) viewport captures were reviewed. The narrow viewport had document width 390 with no page-level horizontal overflow. Physical pointer/keyboard, real mobile-device and screen-reader testing remain open.

The October 8 preparation did not add or execute tests because that earlier task excluded them; the October 9 integration explicitly authorized tests and replaces that limitation. Earlier preparation checks included build/typecheck, original JavaScript syntax and static reviews; those historical observations are not evidence of current marketplace rates.

A coordinator follow-up authorized a minimal Node 22 GitHub Actions workflow after confirming there were no existing workflows or commit checks. The workflow runs locked installation, the behavioral suite, typecheck/build and a runtime dependency audit on pushes, pull requests and manual dispatch; it does not deploy.

## Fictional demonstration

1. Load the example: product R$32.00, packaging R$2.50, one unit priced at R$79.90, 20% combined rates and R$4.00 fixed fee. Fees R$19.98, net revenue R$59.92, profit R$25.42.
2. Save “Current price”. Set R$69.90 and save “Promotion”: profit R$17.42.
3. Choose “Quero um lucro”, target R$25.00: minimum unit price R$79.37, modeled profit R$25.00. Save “Profit target”.
4. Set quantity to 3: the target remains total batch profit. In direct mode at R$79.90, batch net revenue is R$179.76 and profit R$76.26.
5. Edit fees or disable the cap to discuss sensitivity; earlier snapshots remain unchanged. Save four scenarios, check the limit, remove one and verify capacity returns.
6. Test zero costs/fees, zero price and quantity validation, a loss, and reload clearing the comparison.

## Limitations and follow-up

No Shopee connection, current-rate lookup, backend, persistence or export. The preset uses 12% + 2% + 6%, R$4 fixed and R$100 cap only as demonstration data. Historical below-R$8 and CPF options remain exclusively in the archive. Only product and packaging costs are modeled; seller-paid shipping, taxes, advertising, returns and operating expenses are omitted. Real platforms can use different bases or rounding orders. This is not fiscal advice.

The original demo on loopback port 5173 belongs to the preserved sibling checkout and remains running. The integration used an isolated production preview on port 5174; it does not deploy publicly. The archived HTML is available through the development server, not included in the production build.

README artwork is assigned to the coordinator's later task. Actual desktop and narrow-screen screenshots are saved in `docs/screenshots/` with English captions. No substitute artwork was created. An optional short demo of comparison and inverse pricing, plus pointer/keyboard and real-device checks, remain open. Any generated README art must be labeled as illustration and kept distinct from actual interface screenshots. No new documentation translation remains pending.

The repo has no LICENSE file; do not assume MIT licensing. AGENTS.md is the canonical instruction file for future portfolio work.
