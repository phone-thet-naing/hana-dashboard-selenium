import { Then } from "@wdio/cucumber-framework"
import { expect, $ } from "@wdio/globals"
import DashboardPage from "../pageobjects/dashboard.page.js"
import { getCurrentDateTime, writeJSON } from "../../utility/util.js"

export interface NewData {
    time: string,
    interviewId: string,
    request: string
}

Then("I should see {} title", async function (title: string) {
    await expect(await $('span[class="logo-lg"]')).toHaveText(title)
})

Then("I should see the {} warning", async function (warning: string) {
    await $(`strong=${warning}`).waitForDisplayed()
})

Then("I should see {} heading", async (heading: string) => {
    await expect(await $(`h1*=${heading}`)).toExist()

    // Get the interview id from link
    const currentUrl = await browser.getUrl();
    const interviewId = currentUrl.split('/')[currentUrl.split('/').length - 1];

    // Create JavaScript object
    const newData: NewData = {
        time: getCurrentDateTime(),
        interviewId: interviewId,
        request: 'change_request'
    }

    writeJSON(newData);

    console.log(currentUrl, '\n', 'interview id => ', interviewId);
})

Then("I should see result interview with {}", async (input: string | number) => {
    const desiredElement = await $(`td*=${input}`);
    await expect(desiredElement).toExist();
})

Then("I should see {} option", async (option: string) => {
    const label = await $(`div*=${option}`)
    await expect(label).toExist()
})

Then("I should see a list of interviews", async () => {
    try {
        const interviewResultList = await browser.waitUntil(async () => {
            if (!(await DashboardPage.processAlert.isDisplayed())) {
                const itemList = await $$('tr');
                return itemList;
            }
            return false;
        })
    
        await expect(interviewResultList.length).toBeGreaterThanOrEqual(1);

        console.log('Interview count => ', interviewResultList.length);
    } catch (error) {
        console.log("Test failed due to ", error.message, '\n', error);

        throw error;
    }
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
    await expect(await interviewStatusFilter.getAttribute('title')).toBe(mapper[interviewStatus]);  
})