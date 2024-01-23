import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { defineComponent, ref } from "vue";
import { router } from "../../routes";
import Cookies from "js-cookie";
import { PostFolder } from "../../services/FolderService";

export default defineComponent({
    name: 'SubmitFormFolder',
    components: {
        InputText,
        Button
    },
    setup() {
        const formDataFolder = ref({
            name: "",
        });
        const authToken: string | undefined = Cookies.get('authToken');

        if (!authToken) {
            if (!sessionStorage.getItem('isLoggedIn')) {
                router.push("/login");
            }
        }

        const submitFolderForm = async () => {
            const folderData = JSON.parse(JSON.stringify(formDataFolder.value));
            await PostFolder(folderData, authToken);
            router.push("/dashboard");
        };

        return {
            submitFolderForm,
            formDataFolder
        }
    }
});
