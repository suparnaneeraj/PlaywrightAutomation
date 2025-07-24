import { test, expect, APIRequestContext } from '@playwright/test';
import { APIs } from '../../apis/apis';
import { faker } from '@faker-js/faker';

let apiRequest: APIRequestContext;
let itemName = 'Item' + faker.string.alphanumeric(5);
let apis: APIs;
let token: string;
let invalidItem = "";
let invalidToken = 'tokenInvalid';

test.describe("Create item API tests", () => {

    test.beforeAll(async ({ browser }) => {
        apiRequest = (await browser.newContext()).request;
        apis = new APIs(apiRequest);
        const loginResponse = await apis.loginAPI(process.env.USERNAME!, process.env.PASSWORD!);
        token = (await loginResponse.json()).token;
    })

    test('should receive successful response when valid item is added', async () => {
        const createItemResponse = await apis.createAPI(itemName, token);
        await expect(createItemResponse).toBeOK()
        const createItemResponseBody = await createItemResponse.json();
        expect(createItemResponseBody.id).not.toBeNull();
    })

    test('should receive error response when empty item is added', async () => {
        const createItemResponse = await apis.createAPI(invalidItem, token);
        await expect(createItemResponse).not.toBeOK();
    })

    test('should return error response when incorrect token is used', async () => {
        const createItemResponse = await apis.createAPI(itemName, invalidToken);
        await expect(createItemResponse).not.toBeOK();
        expect(createItemResponse.status()).toBe(401);
    })

})
