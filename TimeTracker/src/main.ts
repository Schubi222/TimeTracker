import './assets/styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {faCircleChevronUp,  faHouse, faChartPie, faTable, faGear, faTrash, faPencil, faX, faFloppyDisk,
        faCirclePlus} from "@fortawesome/free-solid-svg-icons";
/* add icons to the library */
library.add(faCircleChevronUp, faHouse, faChartPie, faTable, faGear, faTrash, faPencil, faX, faFloppyDisk,
            faCirclePlus)

const vuetify = createVuetify({
    components,
    directives,
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.component('font-awesome-icon', FontAwesomeIcon)


app.mount('#app')
