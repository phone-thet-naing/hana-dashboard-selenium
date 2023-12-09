import { Then } from "@wdio/cucumber-framework"
import { expect, $ } from "@wdio/globals"

Then("I should see {} title", async function (title: string) {
    await expect(await $('span[class="logo-lg"]')).toHaveText(title)
})

Then("I should see the {} warning", async function (warning: string) {
    await $(`strong=${warning}`).waitForDisplayed()
})

Then("I should see {} label", async (label: string) => {
    await expect(await $(`h1*=${label}`)).toExist()
})

Then("I should see result interview with {}", async (input: string | number) => {
    const desiredElement = await $(`td*=${input}`)
    await expect(desiredElement).toExist()
})