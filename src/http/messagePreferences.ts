import { api } from './apiInstances'
import type { AxiosResponse } from 'axios'
import type { MessagePreferenceInput } from '@/types/MessagePreference'

export const getMessagePreferences = (): Promise<AxiosResponse> => api.get('/message-preferences')

export const saveMessagePreferences = (
  preferences: MessagePreferenceInput[]
): Promise<AxiosResponse> => api.put('/message-preferences', { preferences })
