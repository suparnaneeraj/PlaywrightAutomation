import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../pages/login';
import { DashboardPage } from '../../pages/dashboard';
import { faker } from "@faker-js/faker";

let loginPage: LoginPage;
let dashboardPage: DashboardPage;
const username = process.env.USERNAME!;
const password = process.env.PASSWORD!;
let itemPosition: number;
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
        itemPosition = await dashboardPage.getPositionOfItem(itemToAdd);
    })

    test('should be able to delete item successfully', async () => {
        await dashboardPage.deleteItem(itemPosition);
        let itemDeleted = itemToAdd;
        const item = await dashboardPage.getItemAtAPosition(itemPosition)
        console.log(item);
        expect(await dashboardPage.getItemAtAPosition(itemPosition)).not.toBe(itemToAdd);
    })

    test.afterEach(async () => {
        await page.close();
    })

})