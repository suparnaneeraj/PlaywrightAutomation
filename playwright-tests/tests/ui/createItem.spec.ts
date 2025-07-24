import { test, expect, Page } from '@playwright/test';
import { faker } from "@faker-js/faker";
import { DashboardPage } from '../../pages/dashboard';
import { LoginPage } from '../../pages/login';

let loginPage: LoginPage;
let dashboardPage: DashboardPage;
const itemToAdd = 'Item' + faker.string.alphanumeric(5);
const username = process.env.USERNAME!;
const password = process.env.PASSWORD!;
let newPage: Page;

test.describe("Create Functionality", () => {

    test.beforeEach(async ({ browser }) => {
        newPage = await browser.newPage();
        await newPage.goto('/');
        loginPage = new LoginPage(newPage);
        await loginPage.loginToApplication(username, password);
        dashboardPage = new DashboardPage(newPage);
        await expect(await dashboardPage.getDashboardPageTitle()).toHaveText('Dashboard');

    })

    test('should be able to create a Todo Item successfully', async () => {
        await dashboardPage.createToDoItem(itemToAdd);
        const itemFound = await dashboardPage.findItemInList(itemToAdd);
        expect(itemFound).toBeTruthy();
    })

    //This test would fail as the app will allow same items to add again and again
    test('should not be able to add same item again', async ({ page }) => {
        await dashboardPage.createToDoItem(itemToAdd);
        const itemFound = await dashboardPage.findItemInList(itemToAdd);
        expect(itemFound).toBeTruthy();
        //Add the same item again
        await dashboardPage.createToDoItem(itemToAdd);
        const secondItemFound = await dashboardPage.findItemInList(itemToAdd);
        expect(secondItemFound).toBeFalsy();
    })

    test.afterEach(async () => {
        await newPage.close();
    })

})
