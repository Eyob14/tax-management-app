import './assets/main.scss'

// eslint-disable-next-line import/no-unresolved
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
// eslint-disable-next-line import/no-unresolved
import * as components from 'vuetify/components'
// eslint-disable-next-line import/no-unresolved
import * as labsComponents from 'vuetify/labs/components'
// eslint-disable-next-line import/no-unresolved
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
  components: {
    ...components,
    ...labsComponents
  },
  directives
})

const app = createApp(App)

app.use(router)
app.use(vuetify)
app.mount('#app')
