import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from './i18n'
import router from './router'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Lara from '@primevue/themes/lara'

import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'

import Tooltip from 'primevue/tooltip'

import StyleClass from 'primevue/styleclass'
import VeeValidatePlugin from './includes/validation'
import CKEditor from '@ckeditor/ckeditor5-vue'

import './assets/main.css'
import './assets/ck-content.css'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(i18n())
app.use(VeeValidatePlugin)
app.use(CKEditor)
app.use(ConfirmationService)
app.use(ToastService)

app.directive('styleclass', StyleClass)
app.directive('tooltip', Tooltip)

/*import { definePreset } from '@primeuix/themes';
import LaraOld3 from "./presets/lara";
const presetValues = definePreset(Lara, LaraOld3) 
*/

/* THEMING NOTE: Custom styled mode: Lara & Volt
To use a theme, npm install @primeuix/themes, 3 ways 
1. Styled mode: Lara/Wind etc
2. Unstyled mode: And No Styles present at all, just the components and use Volt for customizations
3. Custom styled mode: Lara & Volt: Use a Lara preset and import volt customization wherever needed.
import Button from 'volt/button' etc. 
*/
app.use(PrimeVue, {
  theme: {
    preset: Lara,
    options: {
      darkModeSelector: '.dark',
      ripple: true, // Enable ripple effect,
      cssLayer: {
        name: 'primevue',
        order: 'theme, base, primevue' //primevue layer is after theme and base, but before the other Tailwind layers such as utilities.
      }
    }
  }
})

//If totally unstyled PrimeVue components are needed, uncomment the following line
/*
app.use(PrimeVue, {
    unstyled: true
});*/
app.mount('#app')
