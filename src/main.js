import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import Toaster from '@meforma/vue-toaster';
import { createVbPlugin } from 'vue3-plugin-bootstrap5'
import { Tooltip } from 'bootstrap'
import './assets/main.css'

let vbPlugin = createVbPlugin({ Tooltip })

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toaster)
app.use(vbPlugin)

app.mount('#app')
