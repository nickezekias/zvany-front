<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const model: any = defineModel();
const props = defineProps<{
  id: string;
  dateFormat?: string;
  disabled?: boolean;
  errorHelpLabel: string;
  isError: boolean;
  label: string;
  manualInput?: boolean;
  maxDate?: Date;
  minDate?: Date;
  readonly?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectionMode: any;
  showButtonBar?: boolean;
}>();
</script>

<template>
  <PrimeFloatLabel>
    <PrimeDatePicker
      v-model="model"
      class="w-full shadow-none"
      :dateFormat="props.dateFormat"
      :disabled="props.disabled"
      :invalid="props.isError"
      :id="props.id"
      :manualInput="props.manualInput"
      :maxDate="props.maxDate"
      :minDate="props.minDate"
      :readonly="props.readonly"
      :selectionMode="props.selectionMode"
      :showButtonBar="props.showButtonBar"
    />
    <label :class="props.isError ? 'nikk-invalid' : ''" :for="props.id">{{
      $t(`${props.label}`)
    }}</label>
    <small v-if="props.isError" :id="`${props.id}-help`" class="nikk-invalid">
      {{ $t(`${props.errorHelpLabel}`) }}
    </small>
  </PrimeFloatLabel>
</template>
