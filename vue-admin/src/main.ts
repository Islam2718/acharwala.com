import { createApp } from 'vue'
import App from './App.vue'
import store from './store';
import router from './router'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import Select2 from 'vue3-select2-component';
/* add icons to the library */
library.add(fas, fab, far, faUserSecret);
const app = createApp(App);
app.use(store);
app.use(router);
app.component('SeLect2', Select2)
app.component('font-awesome-icon', FontAwesomeIcon).mount('#app');
