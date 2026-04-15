import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from './i18n'
import router from './router'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import TreeSelect from 'primevue/treeselect'
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
import InputMask from 'primevue/inputmask'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Divider from 'primevue/divider'
import Dialog from 'primevue/dialog'
import ConfirmDialog from 'primevue/confirmdialog'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import Badge from 'primevue/badge'
import BadgeDirective from 'primevue/badgedirective'
import Toast from 'primevue/toast'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
import TabMenu from 'primevue/tabmenu'
import Skeleton from 'primevue/skeleton'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Paginator from 'primevue/paginator'
import Image from 'primevue/image'
import PickList from 'primevue/picklist'
import StyleClass from 'primevue/styleclass'
import Tooltip from 'primevue/tooltip'
import AutoComplete from 'primevue/autocomplete'
import VeeValidatePlugin from './includes/validation'
import PanelMenu from 'primevue/panelmenu'
import CKEditor from '@ckeditor/ckeditor5-vue'

import Calendar from 'primevue/calendar'
import Dropdown from 'primevue/dropdown'
import InputSwitch from 'primevue/inputswitch'
import OverlayPanel from 'primevue/overlaypanel'

/*
import DatePicker from "primevue/datepicker";
import Select from "primevue/select";
import ToggleSwitch from 'primevue/toggleswitch';
import Popover from 'primevue/overlaypanel'; 
*/

//import 'ckeditor5/ckeditor5.css'
//import 'ckeditor5-premium-features/ckeditor5-premium-features.css'
import './assets/main.css'
import './assets/ck-content.css'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(i18n())
app.use(VeeValidatePlugin)
app.component('TreeSelect', TreeSelect)
app.component('Tree', Tree)

app.component('MultiSelect', MultiSelect)
app.component('Button', Button)
app.component('ToggleButton', ToggleButton)
app.component('SplitButton', SplitButton)
app.component('Menu', Menu)
app.component('TieredMenu', TieredMenu)
app.component('InputText', InputText)
app.component('InputNumber', InputNumber)
app.component('Password', Password)
app.component('Checkbox', Checkbox)
app.component('Textarea', Textarea)
app.component('InputMask', InputMask)
app.component('InputGroup', InputGroup)
app.component('InputGroupAddon', InputGroupAddon)
app.component('Divider', Divider)
app.component('ConfirmDialog', ConfirmDialog)
app.component('Dialog', Dialog)
app.component('Tag', Tag)
app.component('Badge', Badge)
app.directive('badge', BadgeDirective)
app.component('Card', Card)
app.component('Toast', Toast)
app.component('TabMenu', TabMenu)
app.component('Skeleton', Skeleton)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Paginator', Paginator)
app.component('Image', Image)
app.component('PickList', PickList)
app.component('AutoComplete', AutoComplete)

app.component('Calendar', Calendar)
app.component('Dropdown', Dropdown)
app.component('InputSwitch', InputSwitch)
app.component('OverlayPanel', OverlayPanel)

/*
app.component("DatePicker", DatePicker);
app.component("Select", Select);
app.component("ToggleSwitch", ToggleSwitch);
app.component("Popover", Popover);
*/

app.directive('tooltip', Tooltip)
app.component('PanelMenu', PanelMenu)
app.directive('styleclass', StyleClass)
app.use(CKEditor)

app.use(ConfirmationService)
app.use(ToastService)

import { definePreset } from '@primeuix/themes'
import Lara from '@primevue/themes/lara'
//import LaraOld3 from "./presets/lara";

//const presetValues = definePreset(Lara, LaraOld3)
app.use(PrimeVue, {
  theme: {
    preset: Lara,
    options: {
      darkModeSelector: '.dark',
      ripple: true, // Enable ripple effect,
      cssLayer: {
        name: 'primevue',
        order: 'theme, base, primevue', //primevue layer is after theme and base, but before the other Tailwind layers such as utilities.
      },
    },
  },
})

app.mount('#app')
