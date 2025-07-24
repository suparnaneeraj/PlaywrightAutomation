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

    async findItemInList(itemName: string) {
        const heading = await this.page.getByRole('heading').textContent();
        const listItems = this.page.getByRole('listitem');
        let index: number;
        let present = false;
        for (index = 0; index < await listItems.count(); index++) {
            if (await listItems.nth(index).textContent() == itemName) {
                present = true;
                break;
            }
        }
        return present;
    }
    async editItemAndSave(itemAdded: string, newItemName: string) {
        const itemfield = this.page.getByLabel('Todo Title');
        const listItem = await this.getItemFromList(itemAdded);
        await listItem.getByTestId('EditIcon').click()
        await itemfield.clear();
        await itemfield.fill(newItemName);
        await this.page.getByRole('button', { name: 'Save' }).click();

    }
    async editItemAndCancel(itemAdded: string, newItemName: string) {
        const itemfield = this.page.getByLabel('Todo Title');
        const listItem = await this.getItemFromList(itemAdded);
        await listItem.getByTestId('EditIcon').click()
        await itemfield.clear();
        await itemfield.fill(newItemName);
        await this.page.getByRole('button', { name: 'Cancel' }).click();
    }

    async getItemAtAPosition(positionOfItem: number) {
        return this.page.getByRole('listitem').nth(positionOfItem);
    }

    async deleteItem(itemName: string) {
        const listItem = await this.getItemFromList(itemName);
        await listItem.getByTestId('DeleteIcon').click()
    }

    async getItemFromList(itemName: string) {
        return this.page.getByRole('listitem').filter({ has: this.page.locator('span', { hasText: itemName }) })
    }



}