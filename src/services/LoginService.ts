
import apiClient from "../http-common";

export const GetLogin = async (loginData: Object) => {
    return await apiClient.post(`/api/v1/users/login`, loginData);
}