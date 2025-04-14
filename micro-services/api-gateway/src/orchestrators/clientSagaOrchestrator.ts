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
    
    public async createClient(clientData: IClient): Promise<any> {
        console.log('Client create request:', clientData);
        const authRequest:IAuth = new IAuth(clientData.id, clientData.email, clientData.password , UserType.CLIENT);
        const clientResponse = await axios.post(`${SERVICE_CONFIG.CLIENT.url}/create`, clientData);
        const clientId = clientResponse.data?.id;
        if(clientResponse.status !== 201) {
            return clientResponse.data;
        }
        const authResponse = await axios.post(`${SERVICE_CONFIG.AUTH.url}`, authRequest);
        if(authResponse.status !== 201) {
            await axios.delete(`${SERVICE_CONFIG.CLIENT.url}/${clientId}`);
            return authResponse.data;
        }  
        return authResponse.data;
    }
}