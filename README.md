<!--
    #/**
    # * @author Ravali
    # * Email: yandalaravali@gmail.com
    # * GitHub Page: https://github.com/ravaliyandala0311?tab=repositories
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

## 📑 Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Reporting](#reporting)
- [TestCases overview](#TestCase-overview)

## 📖 Introduction

This repository contains a Test Automation Framework built using Cypress and Javascript for automated testing

<!-- ## 🎥 Video Tutorial

<a href="https://www.youtube.com/watch?v=g0nG6aPbpl4&list=PLrBBHmoBFxBUu9G7haETpa0B03H9GnfKX"> <img src="https://img.youtube.com/vi/g0nG6aPbpl4/0.jpg" alt="Test Automation Framework | WEB | Cypress + JS" width="200"> </a>

Click on the image above to watch the tutorials. -->

## 🛠️ Prerequisites

- [![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/) (v21.0.0)
- [![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/) (v10.8.2)

## ▶️ Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/ravaliyandala0311/Cypress_ECommerce_Project.git

   ```

2. Navigate to the project directory:

   ```bash
   cd CypressDemo
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
|                |-- addingProductsToCart.cy.js
|                |-- applyPromoCode.cy.js
|                |-- browsingTheCatalog.cy.js
                 |-- logInSearchItemslogOut.cy.cy.js
|                |-- registration.cy.js
|     |-- fixtures
|           |-- browseCatalog.json
|           |-- registration.json
|           |-- testData.json
|
|     |-- support
|          |-- page_objects
|                |-- CatalogsPage.js
|                |-- CheckOutPage.js
|                |-- HomePage.js
|                |-- PageLogin.js
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
- `cypress/cypress.env.json`: Contains the base url and username,Password .
- `cypress/support/page_object`: Contains the Utilities that provides methods for asserting different conditions on web elements.

## ⚙️ Configuration

- Modify `cypress.config.js` for Cypress configuration settings.
- Customize `cypress/support` for reusable commands.

## 📊 Reporting

Mochawesome report (Logs are attached) is stored in the `cypress/reports` directory.

## To run Test reports

```
 npm run cy:headed "cypress\e2e\qaCodingChallenge\*.cy.js"

```

## TestCase-overview

# Cypress E-commerce Tests

This repository contains Cypress tests for testing the E-commerce website [https://www.boohoo.com/](https://www.boohoo.com/).

`Note: On this website, logging in triggers an image captcha that cannot be automated. I used cy.pause() to manually resolve the captcha, then click the resume button to continue`

### Test Case 1: Verify user cannot register with an already registered email

- Test file: `cypress/e2e/qaCodingChallenge/registration.cy.js`
- Description: This test case aims to validate the behavior when a user attempts to registrate with already existing emailId. It checks whether the system correctly displays an error message as "Looks like you already have an account with us. Please try logging in or use a different email address".

### Test Case 2: Validate User is Able to Login with Username and Password and verify to search a product and do Logout

- Test file: `cypress/e2e/qaCodingChallenge/logInSearchItemslogOut.cy.js`
- Description: This test case verifies the functionality of logging in with valid credentials. It checks whether the user can successfully access the website by providing their correct username and password and search for a product, and log out of the website successfully

### Test Case 3: Adding productss to Cart and Checkout

- Test file: `cypress/e2e/qaCodingChallenge/addingProductsToCart.cy.js`
- Description: This test case adds items to the cart, proceeds to checkout, verifies the order summary amount on the products

### Test Case 4: Applying Promocode to the Products

- Test file: `cypress/e2e/qaCodingChallenge/applyPromoCode.cy.js`
- Description: This test case verifies the application of a Promo code and verify the cart total, and check the promo code discount

### Test Case 5: Browse the Catalog and verify products Should sort by price

- Test file: `cypress/e2e/qaCodingChallenge/browsingTheCatalog.cy.js`
- Description: This test case verifies the functionality of sorting products by price in the online shopping application but here In the website it is having some bug, it is not sorting as expected.

Thanks for visiting my GitHub profile! 😊
