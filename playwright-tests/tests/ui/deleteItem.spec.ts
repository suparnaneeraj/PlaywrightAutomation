import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../pages/login';
import { DashboardPage } from '../../pages/dashboard';
import { faker } from "@faker-js/faker";

let loginPage: LoginPage;
let dashboardPage: DashboardPage;
const username = process.env.USERNAME!;
const password = process.env.PASSWORD!;

let page: Page;
let itemToAdd = 'Item' + faker.string.alphanumeric(5);

test.describe('Delete Functionality', () => {

    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto('/');
        loginPage = new LoginPage(page);
        await loginPage.loginToApplication(username, password);
        dashboardPage = new DashboardPage(page);
        await dashboardPage.createToDoItem(itemToAdd);
        const itemFound = await dashboardPage.findItemInList(itemToAdd);
        expect(itemFound).toBeTruthy();

    })

    test('should be able to delete item successfully', async () => {
        await dashboardPage.deleteItem(itemToAdd);
        const itemFound = await dashboardPage.findItemInList(itemToAdd);
        expect(itemFound).toBeFalsy();
    })

    test.afterEach(async () => {
        await page.close();
    })

})