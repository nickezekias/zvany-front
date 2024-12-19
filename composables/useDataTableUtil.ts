/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Ref } from 'vue'

interface Payload {
  deleteId?: Ref<string>
  editData?: Ref<any | null>
  newData?: any | Array<any>
  objects: Ref<Array<any>>
}

export function useDataTableUtil() {
  function updateObjectsList(payload: Payload) {
    // update edited item data
    if (payload.editData && payload.newData) {
      for (let i = 0; i < payload.objects.value.length; i++) {
        if (payload.editData.value.id == payload.objects.value[i].id) {
          payload.objects.value.splice(i, 1, payload.newData)
        }
      }
    }

    // add new array of items to list
    else if (!payload.editData && payload.newData && Array.isArray(payload.newData)) {
      for (let i = 0; i < payload.newData.length; i++) {
        payload.objects.value.unshift(payload.newData[i])
      }
    }

    // add new item to list
    else if (!payload.editData && payload.newData && !Array.isArray(payload.newData)) {
      payload.objects.value.unshift(payload.newData)
    }

    // Remove deleted item from list
    if (payload.deleteId && payload.deleteId.value != '' && !payload.editData) {
      for (let j = 0; j < payload.objects.value.length; j++) {
        if (payload.deleteId.value == payload.objects.value[j].id) {
          payload.objects.value.splice(j, 1)
        }
      }
    }

    // Finish the list update by sorting items
    sortObjectsList(payload.objects)

  }

  return { updateObjectsList }
}

function sortObjectsList(objects: Ref<Array<any>>) {
  objects.value.sort((a: any, b: any) => {
    if (a.name > b.name) return 1
    else if (b.name > a.name) return -1
    return 0
  })
}