import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from './i18n'
import router from './router'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Lara from '@primevue/themes/lara';
import TreeSelect from 'primevue/treeselect'
import Datepicker from 'primevue/datepicker'
import Select from 'primevue/select'
import MultiSelect from 'primevue/multiselect'
import Tree from 'primevue/tree'
import Button from 'primevue/button'
import ToggleButton from 'primevue/togglebutton'
import SplitButton from 'primevue/splitbutton'
import Menu from 'primevue/menu'
import TieredMenu from 'primevue/tieredmenu'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Password from 'primevue/password'
import Textarea from 'primevue/textarea'
import Checkbox from 'primevue/checkbox'
import ToggleSwitch from 'primevue/toggleswitch'
import InputMask from 'primevue/inputmask'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Divider from 'primevue/divider'
import Dialog from 'primevue/dialog'
import ConfirmDialog from 'primevue/confirmdialog'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import Popover from 'primevue/popover'
import Toast from 'primevue/toast'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
import Tabs from 'primevue/tabs'
import Skeleton from 'primevue/skeleton'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Paginator from 'primevue/paginator'
import Image from 'primevue/image'
import PickList from 'primevue/picklist'
import Tooltip from 'primevue/tooltip'
import FloatLabel from 'primevue/floatlabel'

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
app
.component('TreeSelect', TreeSelect)
.component('Tree', Tree)
.component('Datepicker', Datepicker)
.component('Select', Select)
.component('MultiSelect', MultiSelect)
.component('Button', Button)
.component('ToggleButton', ToggleButton)
.component('SplitButton', SplitButton)
.component('Menu', Menu)
.component('TieredMenu', TieredMenu)
.component('InputText', InputText)
.component('InputNumber', InputNumber)
.component('Password', Password)
.component('Checkbox', Checkbox)
.component('Textarea', Textarea)
.component('ToggleSwitch', ToggleSwitch)
.component('InputMask', InputMask)
.component('InputGroup', InputGroup)
.component('InputGroupAddon', InputGroupAddon)
.component('Divider', Divider)
.component('ConfirmDialog', ConfirmDialog)
.component('Dialog', Dialog)
.component('Tag', Tag)
.component('Card', Card)
.component('Popover', Popover)
.component('Toast', Toast)
.component('Tabs', Tabs)
.component('Skeleton', Skeleton)
.component('DataTable', DataTable)
.component('Column', Column)
.component('Paginator', Paginator)
.component('Image', Image)
.component('PickList', PickList)
.component('FloatLabel', FloatLabel)

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
            cssLayer: {
                name: 'primevue',
                order: 'theme, base, primevue'
            },
            darkModeSelector: '.dark',
        }
    }
}); 

//If totally unstyled PrimeVue components are needed, uncomment the following line
/*
app.use(PrimeVue, {
    unstyled: true
});*/
app.mount('#app')
