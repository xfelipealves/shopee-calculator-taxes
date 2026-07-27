# Shopee Fee Calculator

A small client-side calculator for estimating Shopee selling fees and the amount left from a sale. It can also work backwards from a desired net amount and estimate the product price needed to reach it.

The user interface is in Brazilian Portuguese and formats values as Brazilian reais (`BRL`). This project is not an official Shopee tool and does not connect to Shopee services.

## Product Overview

The calculator runs entirely in the browser. Enter a product price or a desired net amount, select the applicable options, and submit the form. Results include the product value, each applicable fee, total fees, net value, profit margin, and total fee percentage.

## Supported Calculations and Options

### Calculation modes

- **Product value:** starts with the selling price and calculates the estimated fees and net value.
- **Desired net value:** starts with the amount to receive and estimates the selling price required. This mode uses an iterative calculation and is an approximation.

### Fee rules implemented in the current JavaScript

- Standard commission: `12%` of the product value.
- Transaction fee: `2%` of the product value.
- Free Shipping Program: optional `6%` of the product value.
- Highlight Campaign: optional additional `2%` of the product value.
- Item fee for products priced at `R$ 8.00` or more: `R$ 4.00` per item, or `R$ 5.00` when the CPF seller option is selected.
- CPF seller option: labeled in the UI as a seller with more than 450 orders in 90 days; it changes the item fee from `R$ 4.00` to `R$ 5.00` for products priced at or above `R$ 8.00`.
- Products priced below `R$ 8.00`: the item fee is half of the product value instead of the fixed item fee.
- Quantity: multiplies the item fee and the total fee limit.
- Fee limit: total calculated fees are capped at `R$ 100.00` per item, so the cap is `R$ 100.00 x quantity` for the entered quantity.

The fee percentages and fixed amounts are hard-coded assumptions in `script.js`. The calculator displays the individual fee components, while the cap is applied to the total used for the net-value calculation.

## Local Usage

No build tool or package installation is required. A local HTTP server is recommended so the pages behave like a normally hosted static site.

```bash
git clone https://github.com/xfelipealves/shopee-calculator-taxes.git
cd shopee-calculator-taxes
python3 -m http.server 8000
```

Open [http://localhost:8000/](http://localhost:8000/) in a browser. To stop the server, press `Ctrl+C` in the terminal.

You can also open `index.html` directly, although the page loads Font Awesome from a CDN, so its icons require network access.

## Project Structure

```text
.
├── index.html   # Main calculator page
├── script.js    # Calculator logic and browser interactions
├── style.css    # Layout, visual styles, and responsive rules
├── test.html    # Intended browser-based test harness
└── README.md    # Project documentation
```

There is currently no package manager configuration, build pipeline, or server-side component in the repository.

## Browser Support

The application targets current browsers with support for standard ES6 JavaScript, the DOM, `Intl.NumberFormat`, CSS Grid, CSS Flexbox, and `input type="number"`. The stylesheet includes responsive layouts for smaller screens, including breakpoints at 768px and 480px.

The project is intended for current versions of Chrome, Edge, Firefox, and Safari. Older browsers may not support all of the JavaScript or CSS features used by the application.

## Limitations and Estimates

- Shopee fee rules, eligibility criteria, rates, thresholds, and limits may change. The values in this calculator are estimates based on the assumptions currently hard-coded in `script.js` and should be reviewed before use.
- Results are not an official quote, payout statement, tax calculation, or accounting advice.
- The application does not fetch current Shopee rates, seller account settings, order data, shipping data, or campaign terms from an API.
- The desired-net-value mode iterates up to five times and stops when it is within approximately one cent, so results near fee thresholds or the `R$ 100.00` cap can differ from the intended target.
- The calculator does not save calculation history, export reports, compare scenarios, or persist data between page loads.
- The UI accepts a quantity input, but the current JavaScript parses it as an integer. Use whole, positive item counts.
- `test.html` is a browser-based harness intended to cover product-value calculations, desired-net-value calculations, special cases, and validations. As currently written, it cannot run independently because `script.js` initializes the main calculator on every page and expects form elements that are absent from `test.html`. This integration issue must be fixed before treating the harness as a reliable test suite.

## Validation and Testing

For a lightweight static check, run:

```bash
node --check script.js
git diff --check
```

For manual validation, open `index.html`, try both calculation modes, toggle each option individually and in combination, test a product below `R$ 8.00`, test multiple items, and verify the fee cap with a high product value. Confirm that invalid or non-positive product and net-value inputs, and zero or negative quantity inputs, show an error.

The repository does not currently include an automated test runner. The cases embedded in `test.html` document expected scenarios, but the harness limitation described above means they are not currently a passing automated or standalone browser test suite.

## Contributing

Contributions are welcome. Before opening a pull request:

1. Keep the calculator behavior and documentation aligned with the actual source code.
2. Avoid presenting Shopee fee assumptions as guaranteed or current without verification.
3. Exercise the main page manually and run the lightweight static checks above.
4. Describe behavior changes and any changed fee assumptions in the pull request.

## License Status

This repository does not contain a `LICENSE` file. No specific open-source license is stated in the current repository; do not assume that the project is available under the MIT license.
