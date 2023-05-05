import { defineComponent, ref } from "vue";
import InputText from "primevue/inputtext";
import { Skeletor } from "vue-skeletor";
import { UserLogin } from "../../services/LoginService";
import { router } from "../../routes";
import Cookies from "js-cookie";

export default defineComponent({
  name: "Login",
  components: {
    Skeletor,
    InputText
  },
  setup() {
    let formData = ref({
      email: "",
      password: "",
    });

    if (Cookies.get("authToken")) {
      router.push("/dashboard");
    }

    const submitForm = async () => {
      formData = JSON.parse(JSON.stringify(formData.value));
      const response = await UserLogin(formData);
      if (response.status === 200) {
        const token = response.data.token;
        Cookies.set("authToken", `${token}`);
        //@ts-ignore
        Cookies.set("userEmail", `${formData.email}`);
        router.push("/dashboard");
      } else {
        return;
      }
    };

    return {
      formData,
      submitForm
    };
  },
});
