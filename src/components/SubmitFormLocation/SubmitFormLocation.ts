import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { defineComponent, ref } from "vue";
import { router } from "../../routes";
import Cookies from "js-cookie";
import { PostFolder } from "../../services/FolderService";
import GoBack from "../GoBack/index.vue";

export default defineComponent({
    name: 'SubmitFormLocation',
    components: {
        GoBack,
        InputText,
        Button
    },
    setup() {
        const formDataLocation = ref({
            name: "",
        });
        const authToken: string | undefined = Cookies.get('authToken');

        if (!authToken) {
            if (!sessionStorage.getItem('isLoggedIn')) {
                router.push("/login");
            }
        }

        const submitLocationForm = async () => {
            const folderData = JSON.parse(JSON.stringify(formDataLocation.value));
            await PostFolder(folderData, authToken);
            router.push("/dashboard");
        };

        return {
            submitFolderForm: submitLocationForm,
            formDataFolder: formDataLocation
        }
    }
});
