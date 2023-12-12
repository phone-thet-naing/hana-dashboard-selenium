import { Given } from "@wdio/cucumber-framework"

import DashboardPage from "../pageobjects/dashboard.page.js"

Given("I am on login page", async () => {
    await DashboardPage.goToDashboard()
})

Given("I am in Interview Results page", async function () {
    await DashboardPage.goToDashboard()
    await DashboardPage.login("dadmin", "Hana123")
})

Given("I am on the dashboard page", async () => {
    console.info("I am on the dashboard page")
    const title = "Hana Finance"
    await expect(await $('span[class="logo-lg"]')).toHaveText(title);
})

Given("I have successfully logged in with {} and {}", async (username, password) => {
    await DashboardPage.goToDashboard()
    await DashboardPage.login(username, password)
})