import { AxiosResponse } from "axios";
import apiClient from "../http-common";
import { FolderResponse } from "../models/Response/FolderResponse";


export const GetFolders = async (userEmail: string | string[], authToken: string | undefined): Promise<AxiosResponse<FolderResponse>> => {
    const headers = {
        "content-type": "application/json",
        "Authorization": `Bearer ${authToken}`
    };
    return await apiClient.get(`/api/v1/users/${userEmail}/folders`, { headers });
}

export const DeleteFolders = async (folderId: string | string[], authToken: string | undefined) => {
    const headers = {
        "content-type": "application/json",
        "Authorization": `Bearer ${authToken}`
    };
    return await apiClient.delete(`/api/v1/folders/${folderId}`, { headers });
}