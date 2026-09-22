# AutomationExercise Selenium Test Suite

An end-to-end Selenium WebDriver test suite built against [automationexercise.com](https://automationexercise.com), a practice site designed for QA automation. Written in JavaScript using Mocha, Chai, and the Page Object Model.

## What this covers

Six test cases spanning the site's core user journey:

| # | Test | File |
|---|------|------|
| 1 | Successful login with valid credentials | `tests/loginTest.js` |
| 2 | Failed login with invalid credentials (negative test) | `tests/loginTest.js` |
| 3 | Product search and result verification | `tests/productTest.js` |
| 4 | Add products to cart, verify cart totals | `tests/cartTest.js` |
| 5 | Full checkout flow (cart → payment → confirmation) | `tests/checkoutTest.js` |
| 6 | Contact form submission | `tests/contactTest.js` |

## Architecture

The project follows the **Page Object Model (POM)**: each page of the site has its own class encapsulating locators and the actions available on that page. Tests describe *what* should happen; page objects handle *how*.

```
project/
├── config/
│   └── config.js          # baseURL + credentials (from .env)
├── pages/
│   ├── LoginPage.js
│   ├── ProductsPage.js
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   └── ContactPage.js
├── tests/
│   ├── loginTest.js
│   ├── productTest.js
│   ├── cartTest.js
│   ├── checkoutTest.js
│   └── contactTest.js
└── .env                    # not committed — see Setup below
```

## Setup

1. Clone the repo and install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the project root (this is git-ignored and won't come from the repo):
   ```
   TEST_EMAIL=your-test-account-email
   TEST_PASSWORD=your-test-account-password
   ```

3. Run the full suite:
   ```bash
   npm test
   ```

   Or run an individual test file:
   ```bash
   npx mocha tests/loginTest.js
   ```

4. View the HTML test report at `mochawesome-report/report.html` after a run.

## Notable engineering decisions and bugs solved

Building this surfaced several real-world Selenium challenges worth calling out:

**Page load hang.** The site's ad/tracker scripts occasionally never fired the `load` event, causing Selenium's default `'normal'` page load strategy to hang indefinitely. Fixed by switching to `'eager'` (waits for DOM ready, not full resource load) plus an explicit `pageLoad` timeout as a safety net.

**Hover-dependent add-to-cart buttons.** The "Add to Cart" buttons only became genuinely interactable after a real mouse hover — a native Selenium `.click()` failed with "element not interactable" even when the button reported `isDisplayed() === true`. Fixed by simulating a real hover via `driver.actions().move()` before clicking.

**Duplicate DOM elements.** The product grid contained hidden duplicate button elements sharing the same CSS class. Naive indexing into `findElements()` results could grab a non-functional duplicate. Fixed by filtering to visible, unique-`data-product-id` buttons before indexing.

**Checkout redirect timing.** The payment success message briefly appears before the page auto-redirects to `/payment_done/<order_id>`. Waiting for the message element directly caused a race condition. Fixed by waiting for the URL change instead.

**Native browser alert on contact form.** Submitting the contact form triggers a native `window.confirm()` dialog before the actual submission completes — handled via `driver.wait(until.alertIsPresent())` and `alert.accept()`.

**Cross-run test isolation.** Since the cart is tied to a real backend account, leftover items from a previous run could cause the "empty cart" test to fail on a fresh run. Fixed by having that test actively clear the cart before asserting, rather than assuming a pristine starting state.

**Credential security.** Login credentials are loaded from a `.env` file via `dotenv` rather than hardcoded, with `.env` excluded from version control.

## Tech stack

- [Selenium WebDriver](https://www.selenium.dev/) (JavaScript)
- [Mocha](https://mochajs.org/) test runner
- [Chai](https://www.chaijs.com/) assertions
- [Mochawesome](https://github.com/adamgruber/mochawesome) HTML reporting
- [dotenv](https://github.com/motdotla/dotenv) for environment configuration