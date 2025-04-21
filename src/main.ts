import { createApp } from 'vue';
import App from './App.vue';
import router from './route';
import { vuetify } from './plugin/vuetify'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles' 
import { createPinia } from 'pinia';

const app = createApp(App)
const pinia = createPinia();

app.use(pinia)
app.use(router)
app.use(vuetify)
app.mount('#app')