import { computed, defineComponent } from "vue";
import Cookies from "js-cookie";
import { useRoute } from "vue-router";
import { useLocationStoreModule } from "../../../stores/LocationStoreModule";
import { router } from "../../../routes";
import { GetLocations } from "../../../services/LocationService";
import { LocationStateModel } from "../../../models/State/LocationStateModel";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

export default defineComponent({
    name: 'LocationList',
    components: {
        DataTable,
        Column
    },
    setup() {
        const locationsStore = useLocationStoreModule();
        const authToken: string | undefined = Cookies.get("authToken");
        const userEmail: string | undefined = Cookies.get("userEmail");
        const route = useRoute();

        if (!authToken) {
            router.push("/login");
        }

        const getLocations = (authToken: string | undefined) => {
            GetLocations(`${userEmail}`, route.params.folderId, authToken).then(({ data }) => {
                data.data.forEach((element) => {
                    const location = Object.assign(new LocationStateModel(), element);
                    if (!locationsStore.locations.LocationList.some((x) => x.id === location.id)) {
                        locationsStore.locations.LocationList.push(location);
                    }
                });
            });
        };

        getLocations(authToken);

        return {
            currentLocations: computed(() => locationsStore.locations.LocationList)
        }
    }
});
