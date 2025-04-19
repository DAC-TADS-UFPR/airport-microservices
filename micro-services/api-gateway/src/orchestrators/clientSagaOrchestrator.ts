import axios from "axios";
import { SERVICE_CONFIG } from "../config/services";
import { IClient } from "../models/client/IClient";
import { IAuth } from "../models/user/IAuth";
import { UserType } from "../models/user/UserType";

export class ClientSagaOrchestatorator {    
    private static instance: ClientSagaOrchestatorator;
    private constructor() {}
    
    public static getInstance(): ClientSagaOrchestatorator {
        if (!ClientSagaOrchestatorator.instance) {
        ClientSagaOrchestatorator.instance = new ClientSagaOrchestatorator();
        }
        return ClientSagaOrchestatorator.instance;
    }
    
    public async createClient(clientData: IClient) {
        console.log('Client create request:', clientData);
        const clientResponse = await axios.post(`${SERVICE_CONFIG.CLIENT.url}`, clientData);
        const clientId = clientResponse.data?.id;
        if(clientResponse.status !== 200) {
            return clientResponse;
        }
        const authRequest:IAuth = new IAuth(clientData.email, clientData.password , UserType.CLIENT);
        console.log('Auth create request:', authRequest);
        const authResponse = await axios.post(`${SERVICE_CONFIG.AUTH.url}/create`, authRequest);
        if(authResponse.status !== 201) {
            await axios.delete(`${SERVICE_CONFIG.CLIENT.url}/${clientId}`);
            return authResponse;
        }  
        return authResponse;
    }
}