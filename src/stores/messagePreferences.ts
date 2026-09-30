import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getMessagePreferences, saveMessagePreferences } from '@/http/messagePreferences'
import type { MessagePreference, MessagePreferenceInput } from '@/types/MessagePreference'

export const useMessagePreferencesStore = defineStore('messagePreferences', () => {
  const preferences = ref<MessagePreference[]>([])

  const fetchPreferences = async () => {
    const { data } = await getMessagePreferences()
    preferences.value = data
    return data
  }

  const savePreferences = async (preferenceList: MessagePreferenceInput[]) => {
    await saveMessagePreferences(preferenceList)
  }

  return {
    preferences,
    fetchPreferences,
    savePreferences,
  }
})
