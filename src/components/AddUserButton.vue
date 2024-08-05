<template>
    <n-button type="info" dashed @click="handleAddUser">Добавить пользователя</n-button>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { NButton } from 'naive-ui';
  
  export default defineComponent({
    components: {
        NButton
    },
    name: 'AddUserButton',
    methods: {
      handleAddUser() {
        // Эмитируем событие для родительского компонента
        this.$emit('add-user'); 
      }
    }
  });
  </script>
  
  <style>
  /* Ваши стили */
  </style>