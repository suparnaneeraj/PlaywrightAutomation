import {test,expect, APIRequestContext} from '@playwright/test';
import { APIs } from '../../apis/apis';
import { faker } from '@faker-js/faker';
let apiRequest:APIRequestContext;
let apis:APIs;
let itemToAdd='Item'+faker.string.alphanumeric(5);
let token:string;
let itemId:string;
let invalidToken='InvalidToken';
test.beforeAll(async({browser})=>{
    apiRequest=(await browser.newContext()).request;
    apis=new APIs(apiRequest);
    const loginResponse=await apis.loginAPI(process.env.USERNAME!,process.env.PASSWORD!);
    await expect(loginResponse).toBeOK();
    token=(await loginResponse.json()).token;
    const createAPIResponse=await apis.createAPI(itemToAdd,token);
    await expect(createAPIResponse).toBeOK();
    itemId=(await createAPIResponse.json()).id;
})
test('should receive successful response on fetching the to do list',async()=>{
    const getResponse=await apis.getAPI(token);
    await expect(getResponse).toBeOK();
    const getResponseBody= (await getResponse.body()).toString();
    expect(getResponseBody).toContain(itemToAdd);
    expect(getResponseBody).toContain(itemId);
})
test('should return error response when incorrect token is used',async()=>{
    const getResponse=await apis.getAPI(invalidToken);
    await expect(getResponse).not.toBeOK();
    expect(getResponse.status()).toBe(401);
})
