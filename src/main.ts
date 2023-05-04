import { createApp } from 'vue'
import { createPinia } from 'pinia';
import { router } from './routes';
import { Skeletor } from 'vue-skeletor';
import { useSkeletorStoreModule } from "./stores/SkeletorStoreModule";
import App from './App.vue'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice';
import './style.css' 
import 'vue-skeletor/dist/vue-skeletor.css';
import 'primevue/resources/themes/tailwind-light/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css';                          //icons

const app = createApp(App);
const pinia = createPinia();

app.use(pinia).use(PrimeVue).use(router).use(ToastService).mount('#app')
app.component(Skeletor.name, Skeletor);

const skeletor = useSkeletorStoreModule();

export const showSkeletor = (): void => {
    skeletor.showSkeletor;
}

export const hideSkeletor = (): void => {
    skeletor.hideSkeletor;
}