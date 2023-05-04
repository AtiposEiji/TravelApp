import { AxiosResponse } from "axios";
import apiClient from "../http-common";
import { Folder } from "../models/Folder";

export const GetFolders = async (userId: string | string[], authToken: string | undefined): Promise<AxiosResponse<Array<Folder>>> => {
    const headers = {
        "content-type": "application/json",
        "Authorization": `Bearer ${authToken}`
    };
    return await apiClient.get(`/api/v1/users/${userId}/folders`, { headers });
}

export const GetFolder = async (userId: string | string[], folderId: string | string[]): Promise<AxiosResponse<Folder>> => {
    return await apiClient.get(`/api/v1/users/${userId}/folders/${folderId}`);
}

export const PostFolder = async (formData: Object) => {
    return await apiClient.post(`/api/v1/folders`, formData);
}