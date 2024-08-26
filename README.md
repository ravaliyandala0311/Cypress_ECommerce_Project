<!--
    #/**
    # * @author Ravali
    # * Email: yandalaravali@gmail.com
    # * GitHub Page: https://rajat.github.io/
    # * LinkedIn: https://www.linkedin.com/in/ravali-yadav-yandala-454121135/
    # */
    #/***************************************************/
-->

---

# 💻 Test Automation Framework | web

[![Cypress](https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white)](https://www.cypress.io/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://js.org/index.html)

[![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)](https://code.visualstudio.com/)
[![Mochawesome Reports](https://img.shields.io/badge/Mochawesome%20Reports-<COLOR>?style=for-the-badge&logo=mochawesome&logoColor=white)](https://www.npmjs.com/package/cypress-mochawesome-reporter)
[![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/features/actions)

## 📑 Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Reporting](#reporting)
- [Contacts](#contacts)

## 📖 Introduction

This repository contains a Test Automation Framework built using Cypress and Javascript for automated testing

<!-- ## 🎥 Video Tutorial

<a href="https://www.youtube.com/watch?v=g0nG6aPbpl4&list=PLrBBHmoBFxBUu9G7haETpa0B03H9GnfKX"> <img src="https://img.youtube.com/vi/g0nG6aPbpl4/0.jpg" alt="Test Automation Framework | WEB | Cypress + JS" width="200"> </a>

Click on the image above to watch the tutorials. -->

## 🛠️ Prerequisites

- [![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/) (v21.0.0 or higher recommended)
- [![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/) (v9.5.1 or higher recommended)

## ▶️ Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/ravaliyandala0311/Cypress_ECommerce_Project.git

   ```

2. Navigate to the project directory:

   ```bash
   cd TestAutomationFramework_YT_Rajat_API_Cypress_JS
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## 🚀 Running Tests

```bash
npm run cy:open
```

## 📁 Project Structure

The tests follow a modular and maintainable structure:

```
|-- .github
|
|-- cypress
|     |-- e2e
|          |-- qaCodingChallenge
|                |-- adding_products_toCart.cy.js
|                |-- apply_promoCode.cy.js
|                |-- browsing_the_catalog.cy.js
                 |-- logIn_searchItems_logOut.cy.js
|                |-- registration.cy.js
|     |-- fixtures
|           |-- browseCatalog.json
|           |-- registration.json
|           |-- testData.json
|
|     |-- reports
|     |-- support
|          |-- page_objects
|                |-- CatalogsPage.js
|                |-- CheckOutPage.js
|                |-- HomePage.js
|                |-- ProductsPage.js
|                |-- RegistrationPage.js
|          |-- commands.js
|          |-- e2e.js
|-- .gitignore
|-- cypress.config.js
|-- cypress.env.json
|-- package.json
```

- `cypress/e2e`: Contains the actual test files.
- `cypress/fixtures`: Contains external files (example: user test data) that can be used to mock data during tests.
- `cypress/reports`: Contains the report for tests (Logs are attached).
- `cypress/support`: Contains custom commands and global configuration.
- `cypress/support/page_object`: Contains the Utilities that provides methods for asserting different conditions on web elements.

## ⚙️ Configuration

- Modify `cypress.config.js` for Cypress configuration settings.
- Customize `commands.js` and other files in `cypress/support` for reusable commands.

## 📊 Reporting

Mochawesome report (Logs are attached) is stored in the `cypress/reports` directory.

# Cypress E-commerce Tests

This repository contains Cypress tests for testing the E-commerce dummy website [https://www.boohoo.com/](https://www.boohoo.com/).

### Test Case 1: Validate User is Able to Login with Invalid Username and Password

- Test file: `cypress/e2e/login.spec.cy.js`
- Description: This test case aims to validate the behavior when a user attempts to log in using invalid credentials. It checks whether the system correctly displays an error message when the username and password are incorrect.

### Test Case 2: Validate User is Able to Login with Username and Password

- Test file: `cypress/e2e/login.spec.cy.js`
- Description: This test case verifies the functionality of logging in with valid credentials. It checks whether the user can successfully access the website by providing their correct username and password.

### Test Case 3: Adding Items to Cart and Checkout

- Test file: `cypress/e2e/checkout.spec.cy.js`
- Description: This test case adds items to the cart, proceeds to checkout, fills in checkout information, verifies the order summary, and completes the purchase.

### Test Case 4: Should sort products by price and continue shopping

- Test file: `cypress/e2e/checkout.spec.cy.js`
- Description: This test case verifies the functionality of sorting products by price in the online shopping application and then continuing shopping after adding an item to the cart.

Thanks for visiting my GitHub profile! 😊
