import {test,expect} from '@playwright/test';
import { APIs } from '../../apis/apis';
const username=process.env.USERNAME!;
const password=process.env.PASSWORD!;
const invalid_username='wronguser';
const invalid_password='wrongpassword';
test.describe('Login API Tests',()=>{
    test('should get a successful login response for valid credentials',async({page})=>{
        const apis=new APIs(page.request);
        const loginResponse=await apis.loginAPI(username,password);
        await expect(loginResponse).toBeOK()
        const loginResponseBody=await loginResponse.json();
        expect(loginResponseBody.token).not.toBeNull();
    })

     test('should get a error login response for invalid credentials',async({page})=>{
        const apis=new APIs(page.request);
        const loginResponse=await apis.loginAPI(invalid_username,invalid_password);
        await expect(loginResponse).not.toBeOK()
        expect(loginResponse.status()).toBe(401);
        const loginResponseBody=await loginResponse.json();
        expect(loginResponseBody).toHaveProperty("error");
    })
})

