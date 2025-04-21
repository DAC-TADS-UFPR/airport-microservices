import axios from "axios";
import { SERVICE_CONFIG } from "../config/services";
import { IClient } from "../models/client/IClient";

export class ClientService {
    public async create(employeeData : IClient): Promise<any> {
        const response = await axios.post(`${SERVICE_CONFIG.CLIENT.url}` ,employeeData);
        return response;
    }
}