import { useI18n } from 'vue-i18n'
import type { HttpError } from '~/app/@types/common.interface'
import { getApiErrors } from '~/app/utils/helpers'

export const useAppStore = defineStore('appStore', () => {
  const toast = useToast()
  const { t } = useI18n()

  const toastAPIError = (error: HttpError, title = 'labels.operationFailure', ) => {
    toast.add({
      severity: 'error',
      summary: t(`${title}`),
      detail: t(`${getApiErrors(error)}`),
      life: 10000,
    })
  }

  const toastError = ( detail = '', title = 'labels.operationFailure') => {
    toast.add({
      severity: 'error',
      summary: t(`${title}`),
      detail: t(`${detail}`),
      life: 10000,
    })
  }

  const toastSuccess = ( detail = '', title = 'labels.operationSuccess') => {
    toast.add({
      severity: 'success',
      summary: t(`${title}`),
      detail: t(`${detail}`),
      life: 5000,
    })
  }

  return {
    toastAPIError,
    toastError,
    toastSuccess
  }
})
