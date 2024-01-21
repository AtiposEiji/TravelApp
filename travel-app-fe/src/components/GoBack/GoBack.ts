import { defineComponent} from "vue";
import { router } from "../../routes";

export default defineComponent({
    name: 'GoBack',
    setup() {

        const goBack = () => {
            router.go(-1);
          };

        return {
            goBack
        }
    }
});
