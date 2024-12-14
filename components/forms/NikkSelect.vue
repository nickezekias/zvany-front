<script setup lang="ts">
const model = defineModel();
const props = defineProps<{
  disable?: boolean;
  errorHelpLabel?: string;
  id: string;
  isError?: boolean;
  loading?: boolean;
  optionLabel?: string;
  optionValue?: string;
  options: Array<unknown>;
  placeholder?: string;
  readonly?: boolean;
}>();
</script>

<template>
  <div>
    <PrimeSelect
      v-model="model"
      class="w-full"
      :invalid="props.isError"
      :loading="props.loading"
      :optionLabel="props.optionLabel"
      :optionValue="props.optionValue"
      :options="props.options"
      :placeholder="props.placeholder"
      :readonly="props.readonly"
    />
    <small v-if="props.isError" :id="`${props.id}-help`" class="nikk-invalid">
      {{ $t(`${props.errorHelpLabel}`) }}
    </small>
  </div>
</template>
