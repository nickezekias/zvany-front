<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const model: any = defineModel()
const props = defineProps<{
  id: string
  disabled?: boolean
  errorHelpLabel: string
  label: string
  readonly?: boolean
  type: string
  isError: boolean
}>()
</script>

<template>
  <div>
    <PrimeFloatLabel variant="on">
      <PrimeInputText
        :id="props.id"
        v-model="model"
        class="w-full border shadow-none"
        :disabled="props.disabled"
        :invalid="props.isError"
        :readonly="props.readonly"
        :type="type"
      />
      <label :class="props.isError ? 'nikk-invalid' : ''" :for="props.id">{{
        $t(`${props.label}`)
      }}</label>
    </PrimeFloatLabel>
    <small v-if="props.isError" :id="`${props.id}-help`" class="nikk-invalid">
      {{ $t(`${props.errorHelpLabel}`) }}
    </small>
  </div>
</template>
