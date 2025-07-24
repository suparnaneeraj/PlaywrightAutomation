import {test,expect, APIRequestContext} from '@playwright/test';
import { faker } from "@faker-js/faker";
import { APIs } from '../../apis/apis';
let apiRequest:APIRequestContext;
let apis:APIs;
let itemToAdd='Item'+faker.string.alphanumeric(5);
let itemtoUpdate='Item'+faker.string.alphanumeric(5);
let token:string
let itemId:string;
let invalidItemName="";
let invalidToken='InvalidToken';
test.beforeAll(async({browser})=>{
    apiRequest=(await browser.newContext()).request;
    apis=new APIs(apiRequest);
    const loginResponse=await apis.loginAPI(process.env.USERNAME!,process.env.PASSWORD!);
    await expect(loginResponse).toBeOK();
    token=(await loginResponse.json()).token;
    const createItemResponse=await apis.createAPI(itemToAdd,token);
    await expect(createItemResponse).toBeOK();
    itemId=(await createItemResponse.json()).id;
})
test('should receive successful response on editing To do with valid details',async()=>{
    const editResponse=await apis.editAPI(itemId,token,itemtoUpdate);
    await expect(editResponse).toBeOK();
    const editResponseBody=await editResponse.json();
    expect(editResponseBody.id).toBe(itemId);
    expect(editResponseBody.title).toBe(itemtoUpdate);
})

test('should receive error response on editing To do with invalid item name',async()=>{
    const editResponse=await apis.editAPI(itemId,token,invalidItemName);
    await expect(editResponse).not.toBeOK();
    expect(editResponse.status()).toBe(400);
})
test('should return error response when incorrect token is used',async()=>{
    const editResponse=await apis.editAPI(itemId,invalidToken,itemtoUpdate);
    await expect(editResponse).not.toBeOK();
    expect(editResponse.status()).toBe(401);
})
