import { computed, defineComponent} from "vue";
import Cookies from "js-cookie";
import { router } from "../../../routes";
import { FolderStateModel } from "../../../models/State/FolderStateModel";
import { GetFolders } from "../../../services/FolderService";
import { useFolderStoreModule } from "../../../stores/FolderStoreModule";

export default defineComponent({
    name: 'FolderList',
    setup() {
        const foldersStore = useFolderStoreModule();
        const authToken: string | undefined = Cookies.get("authToken");

        if(!authToken){
            if(!sessionStorage.getItem('isLoggedIn')){
                router.push("/login");
            }
        }

        const getFolders = (authToken: string | undefined ) => {
            GetFolders("645239296108c111e84fac98", authToken).then(({ data }) => {
              data.data.data.forEach((element) => {
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
