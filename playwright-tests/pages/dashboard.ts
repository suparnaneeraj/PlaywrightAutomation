import { Page } from "playwright";

export class DashboardPage {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    async getDashboardPageTitle() {
        const dashboardPageTitle = this.page.getByRole('heading');
        return dashboardPageTitle;
    }

    async createToDoItem(itemName: string) {
        await this.page.getByLabel('New Todo').fill(itemName);
        await this.page.getByRole('button', { name: 'Add' }).click();
    }

    async checkItemInToDosList(itemName: string) {
        const listItems = await this.page.getByRole('listitem').allTextContents();
        if (listItems.includes(itemName)) {
            return true;
        }
        else {
            return false;
        }
    }

    async getPositionOfItem(itemName: string) {
        const listItems = this.page.getByRole('listitem');
        let position = 0;
        for (const item of await listItems.all()) {
            if (await item.textContent() != itemName) {
                position++;
            }
            else {
                break;
            }
        }
        return position;
    }
    async editItemAndSave(itemPosition: number, newItemName: string) {
        const itemfield = this.page.getByLabel('Todo Title');
        await this.page.getByTestId('EditIcon').nth(itemPosition).click()
        await itemfield.clear();
        await itemfield.fill(newItemName);
        await this.page.getByRole('button', { name: 'Save' }).click();

    }
    async editItemAndCancel(itemPosition: number, newItemName: string) {
        const itemfield = this.page.getByLabel('Todo Title');
        await this.page.getByTestId('EditIcon').nth(itemPosition).click();
        await itemfield.clear();
        await itemfield.fill(newItemName);
        await this.page.getByRole('button', { name: 'Cancel' }).click();
    }

    async getItemAtAPosition(positionOfItem: number) {
        return this.page.getByRole('listitem').nth(positionOfItem);
    }

    async deleteItem(itemPosition: number) {
        await this.page.getByTestId('DeleteIcon').nth(itemPosition).click();
    }

}