import { AxiosResponse } from "axios";
import apiClient from "../http-common";
import { LocationResponse } from "../models/Response/LocationResponse";


export const GetLocations = async (userEmail: string | string[], folderId: string | string[], authToken: string | undefined): Promise<AxiosResponse<LocationResponse>> => {
    const headers = {
        "content-type": "application/json",
        "Authorization": `Bearer ${authToken}`
    };
    return await apiClient.get(`/api/v1/users/${userEmail}/folders/${folderId}/locations`, { headers });
}

export const PostLocation = async (formData: Object, userEmail: string | string[], folderId: string | string[], authToken: string | undefined) => {
    const headers = {
        "content-type": "application/json",
        "Authorization": `Bearer ${authToken}`
    };
    return await apiClient.post(`api/v1/users/${userEmail}/folders/${folderId}/locations`, formData, { headers });
}