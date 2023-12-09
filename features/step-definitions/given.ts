import { Given } from "@wdio/cucumber-framework"

import DashboardPage from "../pageobjects/dashboard.page.js"

Given("I am on login page", async () => {
    await DashboardPage.goToDashboard()
})

Given("I am in Interview Results page", async function () {
    await DashboardPage.goToDashboard()
    await DashboardPage.login("dadmin", "Hana123")
})