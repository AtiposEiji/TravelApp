import { defineComponent } from "vue";
import Cookies from "js-cookie";
import FolderList from "../../components/Folder/List/index.vue";
import { router } from "../../routes";

export default defineComponent({
    name: 'Dashboard',
    components: {
        FolderList
    },
    setup() {
        const authToken: string | undefined = Cookies.get("authToken");

        if(!authToken){
            if(!sessionStorage.getItem('isLoggedIn')){
                router.push("/login");
            }
        }

        return {
        }
    }
});
