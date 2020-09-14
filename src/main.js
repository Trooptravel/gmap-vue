import {createApp, Vue} from 'vue'
import App from './app.vue'
import * as GmapVue from '../../src/main.js'
const app = createApp(App)

app.use(GmapVue, {
  installComponents: true,
  load: {
    key: 'AIzaSyDf43lPdwlF98RCBsJOFNKOkoEjkwxb5Sc',
    libraries: 'places'
  }
})

// json filter is now not bundled with vue
//Vue.filter('json', x => JSON.stringify(x))

// TODO: Should be analyzed when we start with the test issue
// eslint-disable-next-line no-new
new Vue({
  el: '#root',
  components: {
    myApp: App
  }
})
