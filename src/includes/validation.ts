import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure
} from 'vee-validate'
import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  alpha_num as alphaNum,
  email,
  min_value as minVal,
  max_value as maxVal,
  confirmed,
  not_one_of as excluded,
  integer,
  numeric
} from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
import nl from '@vee-validate/i18n/dist/locale/nl.json'

// Custom validation messages
const customMessages = {
  en: {
    ...en,
    messages: {
      ...en.messages,
      phone: 'The {field} field must be a valid phone number (e.g., +31 123456789 or 0123456789)'
    }
  },
  nl: {
    ...nl,
    messages: {
      ...nl.messages,
      phone: 'Het {field} veld moet een geldig telefoonnummer zijn (bijv. +31 123456789 of 0123456789)'
    }
  }
}

export default {
  install(app) {
    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
    app.component('ErrorMessage', ErrorMessage)

    defineRule('required', required)
    defineRule('tos', required)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('alpha_spaces', alphaSpaces)
    defineRule('alpha_num', alphaNum)
    defineRule('email', email)
    defineRule('min_value', minVal)
    defineRule('max_value', maxVal)
    defineRule('passwords_mismatch', confirmed)
    defineRule('excluded', excluded)
    defineRule('country_excluded', excluded)
    defineRule('integer', integer)
    defineRule('numeric', numeric)
    
    // Custom phone number validation rule
    defineRule('phone', (value) => {
      if (!value || value.length === 0) {
        return true // Allow empty values
      }
      // Dutch phone number format: +31 or 0 followed by digits, with optional spaces, hyphens, or dots
      // Clean the value by removing spaces, hyphens, and dots
      const cleanValue = value.replace(/[\s\-\.]/g, '')
      
      // Check for valid Dutch phone number patterns:
      // - Mobile: +31 6 or 06 followed by 8 digits
      // - Landline: +31 followed by area code and number, or 0 followed by area code and number
      const phoneRegex = /^(\+31|0)[1-9]\d{8,9}$/
      
      return phoneRegex.test(cleanValue)
    })

    configure({
      generateMessage: localize(customMessages),
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true
    })
  }
}
