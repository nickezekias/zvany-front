<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const model = defineModel() as Ref<boolean>
const emit = defineEmits(['cancel', 'confirmed'])
const props = defineProps<{ loading: boolean }>()
const { t } = useI18n()



</script>

<template>
  <PrimeDialog v-model:visible="model" modal class="w-25rem">
    <template #container>
      <div class="p-4">
        <div class="mb-4">
          <span class="text-xl md:text-3xl font-bold">{{
            t('features.product.deleteProduct')
          }}</span>
        </div>
  
        <PrimeMessage severity="error">
          {{ $t('features.product.confirmDeleteMessage') }}
        </PrimeMessage>
  
        <div class="col-12 mt-5">
          <div class="flex justify-content-end gap-4">
            <PrimeButton size="large" severity="secondary" :label="$t('labels.cancel')" @click="emit('cancel')" />
            <PrimeButton
              :label="$t('labels.delete')"
              :loading="props.loading"
              size="large"
              severity="danger"
              @click="emit('confirmed')"
            />
          </div>
        </div>
      </div>
    </template>
  </PrimeDialog>
</template>
