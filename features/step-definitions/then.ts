import { Then } from "@wdio/cucumber-framework"
import { expect, $ } from "@wdio/globals"
import DashboardPage from "../pageobjects/dashboard.page.js"

Then("I should see {} title", async function (title: string) {
    await expect(await $('span[class="logo-lg"]')).toHaveText(title)
})

Then("I should see the {} warning", async function (warning: string) {
    await $(`strong=${warning}`).waitForDisplayed()
})

Then("I should see {} heading", async (heading: string) => {
    await expect(await $(`h1*=${heading}`)).toExist()
})

Then("I should see result interview with {}", async (input: string | number) => {
    const desiredElement = await $(`td*=${input}`)
    await expect(desiredElement).toExist()
    // await browser.pause(5000)
})

Then("I should see {} option", async (option: string) => {
    const label = await $(`div*=${option}`)
    await expect(label).toExist()
})

Then("I should see a list of interviews", async () => {
    const interviewResultList = await browser.waitUntil(async () => {
        if (!(await DashboardPage.processAlert.isDisplayed())) {
            const itemList = await $$('tr');
            return itemList;
        }
        return false;
    })

    await expect(interviewResultList.length).toBeGreaterThanOrEqual(1);
    await browser.pause(3000);
})

Then("The interview status should be {}", async (interviewStatus) => {
    const mapper = {
        pending: "Pending",
        change_request: "Change Request",
        updated: "Updated",
        ca_reviewed: "CA Reviewed",
        approve: "Approve",
        reject: "Reject",
        undo_ngasaya: "Undo NgaSaYa"
    }
    
    const interviewStatusFilter = await DashboardPage.interviewStatusFilter;
    console.log("selected value => ", await interviewStatusFilter.getAttribute("title"));
    await expect(await interviewStatusFilter.getAttribute('titlee')).toBe(mapper[interviewStatus]);    
})