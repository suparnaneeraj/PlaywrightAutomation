import { test, expect, Page } from "@playwright/test"
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
let page: Page;

test.describe("Edit functionality", () => {

    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto('/');
        loginPage = new LoginPage(page);
        await loginPage.loginToApplication(username, password);
        await expect(page.getByRole('heading')).toHaveText('Dashboard');
        dashboardPage = new DashboardPage(page);
        await dashboardPage.createToDoItem(itemToAdd);
    })

    test('should be able to edit an item successfully', async () => {
        await dashboardPage.editItemAndSave(itemToAdd, updatedItemName);
        await expect(await dashboardPage.getDashboardPageTitle()).toHaveText('Dashboard')
        const itemFound = await dashboardPage.findItemInList(updatedItemName);
        expect(itemFound).toBeTruthy();
    })

    test('should not update item when cancel is clicked', async () => {
        await dashboardPage.editItemAndCancel(itemToAdd, updatedItemName);
        const itemFound = await dashboardPage.findItemInList(updatedItemName);
        expect(itemFound).toBeFalsy();
    })

    test.afterEach(async () => {
        await page.close();
    })

})