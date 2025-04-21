import axios from "axios";
import { SERVICE_CONFIG } from "../config/services";
export class ClientService {
    async create(employeeData) {
        const response = await axios.post(`${SERVICE_CONFIG.CLIENT.url}`, employeeData);
        return response;
    }
}
