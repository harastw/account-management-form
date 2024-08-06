<template>
  <li class="user-item">
    <div class="form-group">
      <input 
        v-model="localUser.tag" 
        @input="updateUser('tag', localUser.tag)" 
        placeholder="Tag" 
        maxlength="20" />
    </div>

    <div class="form-group">
      <n-select
        v-model:value="localUser.type"
        @update:value="updateUser('type', $event)"
        :options="userTypes"
        placeholder="Выберите тип"
      />
    </div>

    <div class="form-group">
      <input 
        v-model="localUser.login" 
        @input="updateUser('login', localUser.login)" 
        placeholder="Login" 
        maxlength="20" />
    </div>

    <div class="form-group" v-if="localUser.type === 'Локальная'">
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
  type: 'LDAP' | 'Локальная';
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
      localUser: { ...this.user },
    };
  },
  methods: {
    updateUser(field: keyof User, value: string | null) {
      // Упрощаем, просто присваиваем значение полю
      this.localUser[field] = value as any;
      this.onUpdate(field, value);
    },
    removeUser() {
      this.onRemove();
    },
  },
  watch: {
    user: {
      handler(newUser) {
        this.localUser = { ...newUser };
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