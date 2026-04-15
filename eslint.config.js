import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import configPrettier from 'eslint-config-prettier/flat'

export default defineConfigWithVueTs(
  {
    files: ['**/*.{js,ts,vue}'],
  },

  ...pluginVue.configs['flat/essential'],

  vueTsConfigs.recommended,

  configPrettier,

  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-reserved-component-names': 'off',
    },
  }
)
