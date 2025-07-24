
import { Page } from "playwright";

export class LoginPage {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    async loginToApplication(username: string, password: string) {
        await this.page.goto('/');
        await this.page.getByLabel('Username').fill(username);
        await this.page.getByLabel('password').fill(password);
        await this.page.getByRole('button').click();
    }
    async getLoginValidationErrorMessage() {
        const loginErrorMessageLocator = this.page.locator('.MuiAlert-message');
        return loginErrorMessageLocator;
    }
}