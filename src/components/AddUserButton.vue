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
      // Create a new user object with default values
      const newUser = {
        tag: '',              // Initial value for the tag
        type: 'LDAP',        // Default value for the type
        login: '',           // Initial value for the login
        password: null       // Initial value for the password
      };

      // Emit the new user object to the parent component
      this.$emit('add-user', newUser); 
    }
  }
});
</script>

<style>
/* Ваши стили */
</style>