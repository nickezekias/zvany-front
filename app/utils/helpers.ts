import type { DBGetQueryFilter } from '../@types/account.interface';
import type { HttpError } from '../@types/common.interface'

const getApiErrors = (errorPayload: HttpError, title = '') => {
  const errorMessage = 'backend.errors.http500'
  let error = errorPayload;
  if (errorPayload.value) {
    error = errorPayload.value
  } else if (errorPayload._value) {
    error = errorPayload._value
  }

  // Display custom error onLogin and getAuthenticatedUser fails
  if ('Fetch User' === error.name) {
    return 'backend.errors.auth.getAuthUserFailedMessage'
  }

  // http 404, 422,...
  if (!error.response) {
    if (error && error.config) {
      console.error(title, `API ${error.config.url} not found`)
      console.error(title, error.data)
    } else {
      console.error(title, `API ${error.request} not found`)
      console.error(title, error.data)
    }
    console.log(Object.getOwnPropertyNames(error))
    console.error(error.message)
    if (error.statusCode == 422) {
      return error.data.message
    }
    return error.message
  }

  // Console Log laravel stack errors
  if (import.meta.env.MODE === 'development') {
    // console.error(error.status)
    // console.error(error.request)
    console.error("ERROR_OPTIONS", error.options)
    console.error("ERROR_DATA", error.data)
    console.error("ERROR_RESPONSE", error.response)
  }
  // nested laravel model resource objects data errors
  if (error.response._data && error.response._data.errors) {
    // return error.response._data.errors
    return error.response._data.message
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

function getQueryFromFilter(filter: DBGetQueryFilter): string {
  let query = '?'
  if (filter && filter.itemsPerPage) {
    query += `itemsPerPage=${filter.itemsPerPage}`
  }
  if (filter && filter.page) {
    query += `&page=${filter.page}`
  }
  if (filter && filter.sortBy) {
    const sortBy = filter.sortBy
    for (let index = 0; index < sortBy.length; index++) {
      if (index === 0) {
        query += `&sortBy=${sortBy[index]}`
      } else {
        query += `,${sortBy[index]}`
      }
    }
  }
  if (filter && filter.sortDesc) {
    const filterBy = filter.sortDesc
    for (let index = 0; index < filterBy.length; index++) {
      if (index === 0) {
        query += `&sortDesc=${filterBy[index]}`
      } else {
        query += `,${filterBy[index]}`
      }
    }
  }
  return query
}

export { getApiErrors, getImageSrc, getQueryFromFilter }
