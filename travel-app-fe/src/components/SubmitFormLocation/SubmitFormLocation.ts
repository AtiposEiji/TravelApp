import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { defineComponent, ref } from "vue";
import { router } from "../../routes";
import Cookies from "js-cookie";
import GoBack from "../GoBack/index.vue";
import { useRoute } from "vue-router";
import { PostLocation } from "../../services/LocationService";

export default defineComponent({
    name: 'SubmitFormLocation',
    components: {
        GoBack,
        InputText,
        Button
    },
    setup() {
        const route = useRoute();
        const formDataLocation = ref({
            name: "",
            description: "",
            tag: "",
            location: {
                coordinates: []
            }
        });
        const authToken: string | undefined = Cookies.get('authToken');
        const userEmail: string | undefined = Cookies.get("userEmail");

        if (!authToken) {
            if (!sessionStorage.getItem('isLoggedIn')) {
                router.push("/login");
            }
        }

        const submitLocationForm = async () => {
            const folderData = JSON.parse(JSON.stringify(formDataLocation.value));
            await PostLocation(folderData, `${userEmail}`, route.params.folderId, authToken);
            router.push(`/folder/${route.params.folderId}`);
        };

        return {
            submitLocationForm: submitLocationForm,
            formDataLocation: formDataLocation
        }
    }
});
