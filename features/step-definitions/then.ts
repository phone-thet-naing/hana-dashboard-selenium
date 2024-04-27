import { Then } from "@wdio/cucumber-framework"
import { expect, $ } from "@wdio/globals"
import DashboardPage from "../pageobjects/dashboard.page.js"
import { getCurrentDateTime, writeJSON } from "../../utility/util.js"
import caDashboardPage from "../pageobjects/ca-dashboard.page.js"

export interface NewData {
    time: string,
    interviewId: string,
    // request: string
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
    }

    writeJSON(newData);

    console.log('interview id => ', interviewId);
})

Then("I should be navigated to Interview Detail", async () => {
    await expect(await $(`h1*=Interview Result Details`)).toExist()

    // Get the interview id from link
    const currentUrl = await browser.getUrl();
    const interviewId = currentUrl.split('/')[currentUrl.split('/').length - 1];

    // Create JavaScript object
    const newData: NewData = {
        time: getCurrentDateTime(),
        interviewId: interviewId,
    }

    writeJSON(newData);
})

Then("I should see result interview with {}", async (input: string | number) => {
    const desiredElement = await $(`td*=${input}`);
    await expect(desiredElement).toExist();
})

Then("I should see {} option", async (option: string) => {
    const label = await $(`div*=${option}`);
    await expect(label).toExist();

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

Then("I should see a success alert", async () => {
    await (await DashboardPage.changeRequestSuccessAlert).waitForDisplayed({ timeout: 10000, timeoutMsg: "Change Request Success Message Was Not Found!" });
    await expect(await DashboardPage.changeRequestSuccessAlert).toBeDisplayed();
})

Then("the CA Review Form should appear", async () => {
    await expect(await DashboardPage.caReviewFormHeader).toBeDisplayed();
})

Then("I should be navigated to CA Dashboard", async () => {
    await expect(await DashboardPage.interviewResultDetailInCaDashboard).toExist();
})

Then("I should see the success message: {}", async (message) => {
    await expect(await $('div*=' + message)).toBeDisplayed();
})

Then("I should see success message for Query Insert", async () => {
    const successMsg = await $('img.icon.ic_s_success');
    await expect(successMsg).toExist();
})

Then("The screen should match the screen shot", async function () {

})

Then("I create CA Assessment", async () => {
    await caDashboardPage.createCAassessment();
    await browser.pause(5000);
})

Then("I approve data changes", async () => {
    const approveDataChangesBtn = await $('button[data-target="#approveConfirmBox"]');
    await approveDataChangesBtn.click();

    const approveButton = await $('button[type="submit"][form="update_form"].btn-approve[name="action"][value="approve"]');
    await approveButton.waitForExist();
    await approveButton.click();

    await browser.pause(2000);    
})

Then("I {} loan with {}", async (option, amount) => {
    console.table({option});
    const commentTextarea = await $('textarea[name="comment"]');
    const approveButton = await $('button[data-target="#approve-popup"]');  // Targets by data attribute value
    // const foApprovedAmountText = await $('#approve-popup > div > div > div.modal-body > div.form-group.first > div > p > b');
    const approveAmountInput = await $('#approve_amount');
    const agreeGroupButton = await $('#agreeGroupButton');
    
    // const value = await foApprovedAmountText.getValue();
    // const approvedAmount = parseInt(value.replace(",", ""));
    // console.table({ value });

    await commentTextarea.setValue("approve test, " + Date.now().toString());

    await approveButton.click();

    // await foApprovedAmountText.waitForExist();

    // console.table({ approvedAmount, numeral: approvedAmount });

    await approveAmountInput.setValue(amount);

    const disbursementDateInput = await $('input[name="last_disbursement_date"]');
    const repaymentDateInput = await $('input[name="approval_first_repayment_date"]');

    if (await disbursementDateInput.isDisplayed()) {
        await disbursementDateInput.click();
        await browser.pause(100);
        await repaymentDateInput.click();
        await browser.pause(100);
    }    

    await agreeGroupButton.click();

    await browser.pause(5000);
})

Then("I should get the interview ids back", async () => {
    const interviewIds = await browser.waitUntil(async () => {
        const elements = await $$('td[class="data-text"][data-decimals="0"]')

        if (elements.length < 3) {
            return 
        }

        return elements
    })

    if (interviewIds) {
        for (const [i, element] of interviewIds?.entries()) {
            console.log("interview ", i, " ", await element.getValue())
        }
    }

    await browser.pause(10 * 1000)
})

