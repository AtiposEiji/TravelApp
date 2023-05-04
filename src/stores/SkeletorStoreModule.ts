import { defineStore } from "pinia";

export const useSkeletorStoreModule = defineStore("skeletor", {
  state: () => {
    return {
      isLoading: false,
      requestsPending: 0
    };
  },
  getters: {
    // automatically infers the return type as a number
    showSkeletor(state) {
      state.isLoading = true;
    },
    hideSkeletor(state) {
        state.isLoading = false;
    }
  }
});
