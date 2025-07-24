import { test, expect } from "@playwright/test"
import { LoginPage } from "../../pages/login";
import { faker } from "@faker-js/faker";
import { DashboardPage } from "../../pages/dashboard";

let loginPage: LoginPage;
let dashboardPage: DashboardPage;
const itemToAdd = 'Item' + faker.string.alphanumeric(5);
const updatedItemName = 'Item' + faker.string.alphanumeric(5);
const username = process.env.USERNAME!;
const password = process.env.PASSWORD!;
let itemPosition: number;
test.describe("Edit functionality", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        loginPage = new LoginPage(page);
        await loginPage.loginToApplication(username, password);
        await expect(page.getByRole('heading')).toHaveText('Dashboard');
        dashboardPage = new DashboardPage(page);
        await dashboardPage.createToDoItem(itemToAdd);
        itemPosition = await dashboardPage.getPositionOfItem(itemToAdd);
    })

    test('should be able to edit an item successfully', async () => {
        await dashboardPage.editItemAndSave(itemPosition, updatedItemName);
        await expect(await dashboardPage.getItemAtAPosition(itemPosition)).toHaveText(updatedItemName);
    })

    test('should not update item when cancel is clicked', async () => {
        await dashboardPage.editItemAndCancel(itemPosition, updatedItemName);
        await expect(await dashboardPage.getItemAtAPosition(itemPosition)).not.toHaveText(updatedItemName);
    })

})