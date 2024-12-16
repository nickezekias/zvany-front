import type { HttpError } from '../@types/common.interface'

const getApiErrors = (error: HttpError, title = '') => {
  const errorMessage = 'backend.errors.http500'

  // Display custom error onLogin and getAuthenticatedUser fails
  if ('Fetch User' === error.name) {
    return 'backend.errors.auth.getAuthUserFailedMessage'
  }

  // http 404
  if (!error.response) {
    if (error && error.config) {
      console.error(title, `API ${error.config.url} not found`)
    } else {
      console.error(title, `API ${error.request} not found`)
    }
    return 'backend.errors.http404'
  }

  // Console Log laravel stack errors
  if (import.meta.env.MODE === 'development') {
    console.error(title, error.response._data)
    console.error(title, error.response.status)
    console.error(title, error.response.headers)
  }
  // nested laravel model resource objects data errors
  if (error.response._data && error.response._data.errors) {
    return error.response._data.errors
  }

  // show custom controller error messages for errors other than http 500
  if (error.response.status != 500) {
    return error.response._data
  }

  return errorMessage
}

function getImageSrc(url: string) {
  const imgUrl = `${import.meta.env.VITE_API_BASE_URL}`
  return `${imgUrl}/${url}`
}

export { getApiErrors, getImageSrc }
