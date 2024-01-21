import { defineStore } from "pinia";
import { LocationGlobalModel } from "../models/State/Global/LocationGlobalModel";

export const useLocationStoreModule = defineStore("location", {
  state: () => {
    return {
        locations: new LocationGlobalModel(),
    };
  },
});
