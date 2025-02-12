<script setup lang="ts">
import type Obj from '~/app/models/product.model';

const props = defineProps<{
  obj: Obj
}>()
</script>
<template>
  <div class="flex flex-col gap-2 cursor-pointer">
    <div class="product-img bg-gray-50 h-48"/>
    <div class="product-tags text-gray-300 text-xs">
      {{ props.obj.categories }}
    </div>
    <span class="product-name font-medium">
      {{ props.obj.name }}
    </span>
    <span class="product-price font-bold">
      {{ props.obj.price }}
    </span>
  </div>
</template>
