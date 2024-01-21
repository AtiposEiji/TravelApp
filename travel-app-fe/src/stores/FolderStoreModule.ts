import { defineStore } from "pinia";
import { FolderGlobalModel } from "../models/State/Global/FolderGlobalModel";

export const useFolderStoreModule = defineStore("folder", {
  state: () => {
    return {
      folders: new FolderGlobalModel(),
    };
  },
});
