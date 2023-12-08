import { Then } from "@wdio/cucumber-framework"
import { expect } from "@wdio/globals"

Then("I should see {} title", async function (title) {
    await expect(await $('span[class="logo-lg"]')).toHaveText(title)
})

Then("I should see the {} warning", async function (warning) {
    await $(`strong=${warning}`).waitForDisplayed()
})