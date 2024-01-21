import { Folder } from "../Folder";

export interface FolderResponse {
    status: string;
    results: number;
    data: Folder[];
  }