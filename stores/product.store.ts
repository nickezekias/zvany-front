import Obj from '@/app/models/product.model'
import useApiFetch from '~/composables/useApiFetch'
import type { DBGetQueryFilter } from '~/app/@types/account.interface'
import { getQueryFromFilter } from '~/app/utils/helpers'
import { useDataTableUtil } from '@/composables/useDataTableUtil'

export const useProductStore = defineStore('productStore', () => {
  const objects: Ref<Obj[]> = ref([])
  const obj: Ref<Obj | null> = ref(null)
  const url = '/api/v1/products'

  const { updateObjectsList } = useDataTableUtil()

  /*
   *     ACTIONS
   */
  async function getAll(filter?: DBGetQueryFilter): Promise<void> {
    if (!filter) {
      filter = {
        itemsPerPage: -1,
        sortBy: ['product.name'],
      }
    }

    const query = getQueryFromFilter(filter)

    const { data, error } = await useApiFetch(`${url}${query}`)

    if (!error.value && data.value) {
      // @ts-expect-error undefined data type
      objects.value = data.value.data.map((obj: Obj) => Obj.fromObject(obj))
    }
  }

  async function get(id: string): Promise<void> {
    const { data, error } = await useApiFetch(`${url}/${id}`)

    if (!error.value && data.value) {
      // @ts-expect-error undefined data type
      obj.value = Obj.fromObject(data.value.data)
    }
  }

  async function create(data: Obj) {
    const { data: responseData, error } = await useApiFetch(`${url}`, {
      method: 'POST',
      body: data,
    })

    if (!error.value && responseData.value) {
      // @ts-expect-error undefined data type
      const obj = Obj.fromObject(responseData.value.data)
      updateObjectsList({ newData: obj, objects })
    }
  }

  async function update(data: Obj) {
    const { data: responseData, error } = await useApiFetch(`${url}/${data.id}?_method=PUT`, {
      method: 'POST',
      body: data,
    })

    if (!error.value && responseData.value) {
      // @ts-expect-error undefined data type
      const obj = Obj.fromObject(responseData.value.data)
      updateObjectsList({ editData: ref(data), newData: obj, objects })
    }
  }

  async function destroy(id: string) {
    const { data, error } = await useApiFetch(`${url}/${id}`, {
      method: 'DELETE',
    })

    if (!error.value && data.value) {
      updateObjectsList({ deleteId: ref(id), objects })
    }
  }

  return {
    obj,
    objects,
    create,
    update,
    destroy,
    get,
    getAll,
  }
})
