import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'
import './styles/main.scss'

const app = createApp(App);

app.use(router).mount('#app');
