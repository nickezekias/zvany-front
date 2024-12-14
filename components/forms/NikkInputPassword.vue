<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const model: any = defineModel();

const props = defineProps<{
  id: string;
  disabled?: boolean;
  errorHelpLabel: string;
  feedback?: boolean;
  label: string;
  readonly?: boolean;
  toggleMask: boolean;
  isError: boolean;
}>();
</script>

<template>
  <div>
    <PrimeFloatLabel variant="on">
      <PrimePassword
        v-model="model"
        :disabled="props.disabled"
        :invalid="props.isError"
        :inputId="props.id"
        :readonly="props.readonly"
        :toggleMask="props.toggleMask"
        :feedback="props.feedback"
        fluid
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

<style scoped></style>
