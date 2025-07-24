import test, { expect } from '@playwright/test';
import { LoginPage } from '../../pages/login';
import { DashboardPage } from '../../pages/dashboard';
const username = process.env.USERNAME!;
const password = process.env.PASSWORD!;
let loginPage: LoginPage;
let dashboardPage: DashboardPage;
test.describe('Login Functionality', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/login');
        await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
        loginPage = new LoginPage(page);
    })

    test('should throw error on login with invalid credentials', async () => {
        await loginPage.loginToApplication('user3', '1234');
        const loginErrorMessageLocator = await loginPage.getLoginValidationErrorMessage();
        await expect(loginErrorMessageLocator).toHaveText('Invalid username or password');
    })

    test('should be able to login successfully with valid credentials', async ({ page }) => {
        await loginPage.loginToApplication(username, password);
        dashboardPage = new DashboardPage(page);
        const dashboardPageTitle = await dashboardPage.getDashboardPageTitle();
        await expect(dashboardPageTitle).toHaveText('Dashboard');
    })
})