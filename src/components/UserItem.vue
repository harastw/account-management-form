<template>
  <li class="user-item">
    <div class="form-group">
      <label>Метки</label>
      <input 
        v-model="localUser.tag" 
        @input="updateUser('tag', localUser.tag)" 
        placeholder="Tag" 
        maxlength="20" />
    </div>

    <div class="form-group">
      <label>Тип записи</label>
      <n-select
        v-model:value="localUser.type"
        @update:value="updateUser('type', $event)"
        :options="userTypes"
        placeholder="Выберите тип"
      />
    </div>

    <div class="form-group">
      <label>Логин</label>
      <input 
        v-model="localUser.login" 
        @input="updateUser('login', localUser.login)" 
        placeholder="Login" 
        maxlength="20" />
    </div>

    <div class="form-group" v-if="localUser.type === 'Локальная'">
      <label>Пароль</label>
      <n-input
        type="password"
        v-model:value="localUser.password"
        @update:value="updateUser('password', $event)"
        placeholder="Введите пароль"
        maxlength="20" />
    </div>

    <button class="remove-button" @click="removeUser">Remove</button>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { NInput, NSelect } from 'naive-ui';

interface User {
  tag: string;
  type: 'LDAP' | 'Локальная'; // This field should always have a valid value
  login: string;
  password: string | null;
}

export default defineComponent({
  components: {
    NInput,
    NSelect,
  },
  name: 'UserItem',
  props: {
    user: {
      type: Object as PropType<User>,
      required: true,
    },
    userTypes: {
      type: Array as PropType<{ label: string; value: string }[]>,
      required: true,
    },
    onRemove: {
      type: Function,
      required: true,
    },
    onUpdate: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      localUser: { ...this.user }, // Create a local copy for mutation
    };
  },
  methods: {
    updateUser(field: keyof User, value: string | null) {
      // Restrict updates based on field
      if (field === 'type' && (value !== 'LDAP' && value !== 'Локальная')) {
        // Invalid type value, do not proceed
        return;
      }

      if (field === 'type' && value === null) {
        // Optionally handle null case for type, if necessary
        return;
      }

      // Assign only if the value is valid for the corresponding field
      this.localUser[field] = value as any; // Type assertion to bypass TS check
      this.onUpdate(field, value); // Notify parent about change
    },
    removeUser() {
      this.onRemove(); // Notify parent to remove user
    },
  },
  watch: {
    user: {
      handler(newUser) {
        this.localUser = { ...newUser }; // Sync local state with prop
      },
      deep: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.user-item {
  display: flex;
  align-items: flex-start; /* Изменено для лучшего отображения элементов */
  margin-bottom: 8px;

  .form-group {
    display: flex;
    flex-direction: column;
    margin-right: 16px;
    width: 200px; /* Установите ширину для всех form-group */
    
    label {
      margin-bottom: 4px;
    }

    input,
    n-select {
      width: 100%; /* Задаем ширину равной родительскому элементу */
      margin-bottom: 8px;
    }
  }

  .remove-button {
    margin-left: 8px;
    background-color: #ff4d4f; /* Красный цвет фона */
    color: white; /* Цвет текста */
    border: none; /* Без границы */
    padding: 8px 16px; /* Отступы для кнопки */
    cursor: pointer; /* Курсор-указатель при наведении */
    border-radius: 4px; /* Скругленные углы */

    &:hover {
      background-color: #d33; /* Темнее красный при наведении */
    }
  }
}
</style>