import { Given } from "@wdio/cucumber-framework"

import DashboardPage from "../pageobjects/dashboard.page.js"

Given("I am on login page", async () => {
    await DashboardPage.goToDashboard()
})