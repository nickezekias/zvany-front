<script setup lang="ts">
import type { ModelRef } from 'vue';

type InputMode = "decimal" | "currency" | undefined

const model: ModelRef<number | undefined | null> = defineModel()
const props = defineProps<{
  id: string
  currency?: string
  disabled?: boolean
  errorHelpLabel: string
  label: string
  locale?: string
  max?: number
  min?: number
  mode?: InputMode
  readonly?: boolean
  showButtons?: boolean
  isError: boolean
}>()
</script>

<template>
  <div>
    <PrimeFloatLabel variant="on">
      <PrimeInputNumber
        :id="props.id"
        v-model="model"
        button-layout="horizontal"
        class="w-full shadow-none"
        :currency="props.currency"
        :disabled="props.disabled"
        :invalid="props.isError"
        fluid
        :locale="props.locale"
        :max="props.max"
        :min="props.min"
        :mode="props.mode"
        :readonly="props.readonly"
        :show-buttons="props.showButtons"
      >
        <template v-if="props.showButtons" #incrementicon>
          <span class="pi pi-plus" />
        </template>
        <template v-if="props.showButtons" #decrementicon>
          <span class="pi pi-minus" />
        </template>
      </PrimeInputNumber>
      <label :class="props.isError ? 'nikk-invalid' : ''" :for="props.id">{{
        $t(`${props.label}`)
      }}</label>
    </PrimeFloatLabel>
    <small v-if="props.isError" :id="`${props.id}-help`" class="nikk-invalid">
      {{ $t(`${props.errorHelpLabel}`) }}
    </small>
  </div>
</template>
