import { test, expect } from '@playwright/test';
import { faker } from "@faker-js/faker";
import { DashboardPage } from '../../pages/dashboard';
import { LoginPage } from '../../pages/login';
let loginPage: LoginPage;
let dashboardPage: DashboardPage;
const itemToAdd = 'Item' + faker.string.alphanumeric(5);
const username = process.env.USERNAME!;
const password = process.env.PASSWORD!;
test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
    await loginPage.loginToApplication(username, password);
    await expect(page.getByRole('heading')).toHaveText('Dashboard');

})
test('should be able to create a Todo Item successfully', async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.createToDoItem(itemToAdd);
    await expect(page.getByRole('listitem').last()).toHaveText(itemToAdd);
})


// test('should not be able to add same item again',async({page})=>{
//     dashboardPage=new DashboardPage(page);
//      await dashboardPage.createToDoItem(itemToAdd);
//     const listItems=await dashboardPage.getAllItemsList();
//     expect(listItems).toContainEqual(itemToAdd);
// })
