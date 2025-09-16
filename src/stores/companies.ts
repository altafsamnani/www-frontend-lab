import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  getCompanies,
  editCompany,
  postCompany,
  patchCompany,
  destroyCompany,
  recoverCompany,
  getCompanyOptions
} from '@/http/companies'
import type Company from '@/types/Company'
import type ResponseData from '@/types/ResponseData'

export const useCompanyStore = defineStore('companyStore', () => {
  const companies = ref([])
  const companiesExtra = ref([])
  const fetchAllCompanies = async (params: string[]) => {
    const response: ResponseData = await getCompanies(params)
    companies.value = response.data
    companiesExtra.value = response.extra
  }

  const company = ref([])
  const fetchEditCompany = async (id: string | string[]) => {
    const { data } = await editCompany(id)
    company.value = data
  }

  const createCompany = async (payload: Company) => {
    await postCompany(payload)
  }

  const updateCompany = async (id: string | string[], payload: Company) => {
    await patchCompany(id, payload)
  }

  const deleteCompany = async (id: string | string[]) => {
    await destroyCompany(id)
  }

  const restoreCompany = async (id: string | string[]) => {
    await recoverCompany(id)
  }

  const companyOptions = ref([])
  const fetchCompaniesOptions = async (search: string[]) => {
    const { data } = await getCompanyOptions({ search: search })
    companyOptions.value = data
  }

  return {
    companies,
    companiesExtra,
    company,
    companyOptions,
    fetchEditCompany,
    fetchAllCompanies,
    createCompany,
    updateCompany,
    deleteCompany,
    restoreCompany,
    fetchCompaniesOptions
  }
})