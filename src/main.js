//import Vue from 'vue'
import App from './App.vue'
import { createApp } from 'vue'
//import VueHighlightJS from 'vue-highlight.js'

/**
 * Import datepicker and define component
 */

import VuePersianDatetimePicker from './picker/VueDatetimeJs.vue'
const app = createApp(App)

app.component('date-picker', VuePersianDatetimePicker)
import Card from './components/card.vue'
app.component('card', Card)

app.mount('#app')

// import vIcon from 'vue-icon'
// Vue.use(vIcon, 'v-icon')

/*
 * Use Vue Highlight.js
 */
//Vue.use(VueHighlightJS)
//import 'highlight.js/styles/atom-one-dark-reasonable.css'

/**
 * Define some global variables
 */
app.config.globalProperties.$prefix = 'vpd-' //shorted to reduce the css size

app.config.ignoredElements = ['date-picker']



// import './assets/scss/app.scss'
// new Vue({
//   el: '#app',
//   router,
//   render: h => h(App)
// })
