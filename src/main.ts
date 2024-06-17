import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from './i18n'
import router from './router'
import App from './App.vue'
import PrimeVue from "primevue/config";
import TreeSelect from "primevue/treeselect";
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";
import MultiSelect from 'primevue/multiselect';
import Tree from "primevue/tree";
import Button from 'primevue/button';
import ToggleButton from 'primevue/togglebutton';
import SplitButton from 'primevue/splitbutton';
import Menu from 'primevue/menu';
import TieredMenu from 'primevue/tieredmenu';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Password from 'primevue/password';
import Textarea from 'primevue/textarea';
import Checkbox from 'primevue/checkbox';
import InputSwitch from 'primevue/inputswitch';
import InputMask from 'primevue/inputmask';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Divider from 'primevue/divider';
import Dialog from 'primevue/dialog';
import ConfirmDialog from 'primevue/confirmdialog';
import Card from 'primevue/card';
import Tag from 'primevue/tag';
import OverlayPanel from 'primevue/overlaypanel';
import Toast from 'primevue/toast';
import Lara from "./presets/lara";
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import TabMenu from 'primevue/tabmenu';
import Skeleton from 'primevue/skeleton';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Paginator from 'primevue/paginator';
import Image from 'primevue/image';
import PickList from 'primevue/picklist';
import Tooltip from 'primevue/tooltip';
import VeeValidatePlugin from './includes/validation'
import CKEditor from '@ckeditor/ckeditor5-vue';

import './assets/main.css'
import './assets/ck-content.css';

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(i18n())
app.use(VeeValidatePlugin)
app.component("TreeSelect", TreeSelect);
app.component("Tree", Tree);
app.component("Calendar", Calendar);
app.component("Dropdown", Dropdown);
app.component("MultiSelect", MultiSelect);
app.component("Button", Button);
app.component("ToggleButton", ToggleButton);
app.component("SplitButton", SplitButton);
app.component("Menu", Menu);
app.component("TieredMenu", TieredMenu);
app.component("InputText", InputText);
app.component("InputNumber", InputNumber);
app.component("Password", Password);
app.component("Checkbox", Checkbox);
app.component("Textarea", Textarea);
app.component("InputSwitch", InputSwitch);
app.component("InputMask", InputMask);
app.component("InputGroup", InputGroup);
app.component("InputGroupAddon", InputGroupAddon);
app.component("Divider", Divider);
app.component("ConfirmDialog", ConfirmDialog);
app.component("Dialog", Dialog);
app.component("Tag", Tag);
app.component("Card", Card);
app.component("OverlayPanel", OverlayPanel);
app.component("Toast", Toast);
app.component("TabMenu", TabMenu);
app.component("Skeleton", Skeleton);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("Paginator", Paginator);
app.component("Image", Image);
app.component("PickList", PickList);

app.directive('tooltip', Tooltip);
app.use( CKEditor )

app.use(ConfirmationService);
app.use(ToastService);
app.use(PrimeVue, { unstyled: true, pt: Lara });
app.mount('#app')
