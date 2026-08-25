import { api, baseApi } from './apiInstances'
import type { AxiosResponse } from 'axios'

// Public, token-addressed lookup — uses the interceptor-free instance so an
// invalid/expired link surfaces as a handled not-found state rather than the
// global error toast or auth-logout redirect.
export const getRmaOfferByToken = (token: string): Promise<AxiosResponse> =>
  baseApi.get(`/rma-offers/${token}`, {
    headers: { Accept: 'application/vnd.osec.default.v1+json' },
  })

export const respondRmaOffer = (
  token: string,
  payload: { choice: 'accepted' | 'declined'; customerRef?: string | null; wantsReturn?: boolean }
): Promise<AxiosResponse> => api.post(`/rma-offers/${token}/respond`, payload)
