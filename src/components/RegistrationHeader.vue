<script setup lang="ts">
import { defineProps } from 'vue'
import { NButton } from 'naive-ui'

const props = defineProps<{
  addNewUser: () => void
}>()
</script>

<template>
  <header id="firstLine">
    <span>Учётные записи &nbsp;&nbsp;</span>
    <n-button dashed type="info" @click="props.addNewUser">Добавить пользователя</n-button><br />
  </header>
</template>
