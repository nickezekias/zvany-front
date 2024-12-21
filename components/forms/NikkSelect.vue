<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const model = defineModel();
const props = defineProps<{
  disable?: boolean;
  errorHelpLabel?: string;
  id: string;
  isError?: boolean;
  label: string;
  loading?: boolean;
  optionLabel?: string;
  optionValue?: string;
  options: Array<unknown>;
  placeholder?: string;
  readonly?: boolean;
}>();
const { t } = useI18n()
</script>

<template>
  <div>
    <PrimeFloatLabel variant="on">
      <PrimeSelect
        :id="props.id"
        v-model="model"
        class="w-full"
        :invalid="props.isError"
        :label="t(`${props.label}`)"
        :loading="props.loading"
        :option-label="props.optionLabel"
        :option-value="props.optionValue"
        :options="props.options"
        :readonly="props.readonly"
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
