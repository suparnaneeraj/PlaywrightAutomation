import { APIRequestContext } from "playwright-core";
let apiBaseURL=process.env.BASE_URL;
export class APIs{
    private apiRequest:APIRequestContext;
    constructor(request:APIRequestContext){
        this.apiRequest=request;
    }
    async loginAPI(userid:string , userPassword:string){
        const loginApiUrl=`${apiBaseURL}/login`;
        const loginPayload={
                username:userid,
                password:userPassword,
        };
        const loginResponse=await this.apiRequest.post(loginApiUrl,{
            data:loginPayload,
        });
       return loginResponse;
    }

    async createAPI(itemToAdd:string,token:string){
        const createApiUrl=`${apiBaseURL}/todos`;
        const createPayload={
            title:itemToAdd,
        };
        const header={
            Authorization:token,
        };
        const createApiResponse=await this.apiRequest.post(createApiUrl,{
            data:createPayload,
            headers:header,
        });
        return createApiResponse;
    }

    async getAPI(token:string){
        const getApiUrl=`${apiBaseURL}/todos`;
        const header={
            Authorization:token,
        }
        const getResponse=await this.apiRequest.get(getApiUrl,{
            headers:header,
        });
        return getResponse;
    }
    
    async editAPI(itemIdToEdit:string , token:string, newItem:string){
        const editApiUrl=`${apiBaseURL}/todos/${itemIdToEdit}`;
        const header={
            Authorization:token,
        };
        const editPayload={
            title:newItem,
        };
        const editResponse=await this.apiRequest.put(editApiUrl,{
            headers:header,
            data:editPayload,
        });
        return editResponse;
    }

    async deleteAPI(itemIdToDelete:string,token:string){
        const deleteApiUrl=`${apiBaseURL}/todos/${itemIdToDelete}`;
        const header={
            Authorization:token,
        };

        const deleteResponse=await this.apiRequest.delete(deleteApiUrl,{
            headers:header,
        });
        return deleteResponse;
    }
}