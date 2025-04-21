import axios from "axios";
import { SERVICE_CONFIG } from "../config/services";
import { IAuth } from "../models/user/IAuth";
import { UserType } from "../models/user/UserType";
export class ClientSagaOrchestatorator {
    constructor() { }
    async createClient(clientData) {
        console.log('Client create request:', clientData);
        console.log('url', `${SERVICE_CONFIG.CLIENT.url}`);
        const clientResponse = await axios.post(`${SERVICE_CONFIG.CLIENT.url}`, clientData);
        console.log('Client create clientResponse:', clientResponse);
        const clientId = clientResponse.data?.id;
        if (clientResponse.status !== 201) {
            return clientResponse;
        }
        const authRequest = new IAuth(clientData.email, clientData.password, UserType.CLIENT);
        console.log('Auth create request:', authRequest);
        const authResponse = await axios.post(`${SERVICE_CONFIG.AUTH.url}/create`, authRequest);
        if (authResponse.status !== 201) {
            await axios.delete(`${SERVICE_CONFIG.CLIENT.url}/${clientId}`);
            return authResponse;
        }
        return authResponse;
    }
}
