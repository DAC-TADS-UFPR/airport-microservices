import axios, { AxiosError } from "axios";
import { SERVICE_CONFIG } from "../config/services";
import { IClient } from "../models/client/IClient";
import { IAuth } from "../models/user/IAuth";
import { UserType } from "../models/user/UserType";

export class ClientSagaOrchestatorator {    
    public constructor() {}
    
    public async createClient(clientData: IClient) {
        var clientId = null;
        try {
            const clientResponse = await axios.post(`${SERVICE_CONFIG.CLIENT.url}/`, clientData);
            clientId = clientResponse.data?.id;
            if(clientResponse.status !== 201) {
                return clientResponse;
            }
            const authRequest:IAuth = new IAuth(clientData.email, '1234' , clientData.name , clientId, UserType.CLIENT);
            console.log('auth create request:', authRequest);
            const authResponse = await axios.post(`${SERVICE_CONFIG.AUTH.url}`, authRequest);
            if(authResponse.status !== 201) {
                await axios.delete(`${SERVICE_CONFIG.CLIENT.url}/${clientId}`);
                return authResponse;
            }  
            return clientResponse;
        } catch (error) {
            if(clientId){
                await axios.delete(`${SERVICE_CONFIG.CLIENT.url}/${clientId}`);
            }
           
            const axiosError = error as AxiosError;
            console.error('Error during client creation:', axiosError.response?.data || axiosError.message);
            return {
                status: axiosError.response?.status || 500,
                data: axiosError.response?.data || { message: "Erro interno" },
            };
            
        }
        
    }
}