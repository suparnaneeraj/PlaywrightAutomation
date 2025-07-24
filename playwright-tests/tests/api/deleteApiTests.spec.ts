import {test,expect, APIRequestContext} from '@playwright/test';
import { APIs } from '../../apis/apis';
import { faker } from '@faker-js/faker';
let apiRequest:APIRequestContext;
let apis:APIs;
let token:string;
let itemName='Item'+faker.string.alphanumeric(5);
let itemId:string;
let invalidToken='Invalidtoken';
test.beforeAll(async({browser})=>{
    apiRequest=(await browser.newContext()).request;
    apis=new APIs(apiRequest);
    const loginResponse=await apis.loginAPI(process.env.USERNAME!,process.env.PASSWORD!);
    token=(await loginResponse.json()).token;
    const createAPIResponse=await apis.createAPI(itemName,token);
    itemId=(await createAPIResponse.json()).id;
})
test('should receive successful response on deleting valid item',async()=>{
    const deleteResponse=await apis.deleteAPI(itemId,token);
    await expect(deleteResponse).toBeOK();
})
test('should return error response when incorrect token is used',async()=>{
    const deleteResponse=await apis.deleteAPI(itemId,invalidToken);
    await expect(deleteResponse).not.toBeOK();
    expect(deleteResponse.status()).toBe(401);
})
