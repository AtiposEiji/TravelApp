import { computed, defineComponent } from "vue";
import Cookies from "js-cookie";
import { router } from "../../../routes";
import { FolderStateModel } from "../../../models/State/FolderStateModel";
import { GetFolders } from "../../../services/FolderService";
import { useFolderStoreModule } from "../../../stores/FolderStoreModule";
import TravelSVG from "../../../svg/Travel/index.vue";

export default defineComponent({
  name: 'FolderList',
  components: {
    TravelSVG
  },
  setup() {
    const foldersStore = useFolderStoreModule();
    const authToken: string | undefined = Cookies.get("authToken");
    const userEmail: string | undefined = Cookies.get("userEmail");

    if (!authToken) {
      router.push("/login");
    }

    const getFolders = (authToken: string | undefined) => {
      GetFolders(`${userEmail}`, authToken).then(({ data }) => {
        data.data.forEach((element) => {
          const folder = Object.assign(new FolderStateModel(), element);
          if (!foldersStore.folders.FolderList.some((x) => x.id === folder.id)) {
            foldersStore.folders.FolderList.push(folder);
          }
        });
      });
    };

    getFolders(authToken);

    return {
      currentFolders: computed(() => foldersStore.folders.FolderList)
    }
  }
});