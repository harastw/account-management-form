<template>
  <div>
    <h1>User List</h1>
    <AddUser @user-added="addUser"/>
    <ul>
      <li v-for="(user, index) in users" :key="index" style="display: flex; align-items: center; margin-bottom: 8px;">
        <div style="display: flex; flex-direction: column;">
          <label style="margin-bottom: 4px;">Метки</label>
          <input v-model="user.tag" @input="updateUser(index, 'tag', user.tag)" placeholder="Tag" style="margin-bottom: 8px;"/>
        </div>

        <div style="display: flex; flex-direction: column;">
          <label style="margin-bottom: 4px;">Тип записи</label>
          <n-select
            v-model:value="user.type"
            @update:value="updateUser(index, 'type', $event)"
            :options="userTypes"
            placeholder="Выберите тип"
            style="margin-bottom: 8px;"
          />
        </div>

        <div style="display: flex; flex-direction: column;">
          <label style="margin-bottom: 4px;">Логин</label>
          <input v-model="user.login" @input="updateUser(index, 'login', user.login)" placeholder="Login" style="margin-bottom: 8px;"/>
        </div>

        <div style="display: flex; flex-direction: column;">
          <label v-if="user.type === 'Локальная'" style="margin-bottom: 4px;">Пароль</label>
          <n-input
            v-if="user.type === 'Локальная'"
            type="password"
            v-model:value="user.password"
            @update:value="updateUser(index, 'password', $event)"
            placeholder="Введите пароль"
            style="margin-bottom: 8px;"
          />
        </div>

        <button @click="removeUser(index)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { NInput, NSelect } from 'naive-ui';
import AddUser from './AddUser.vue';

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
    AddUser, // регистрируем компонент
  },
  name: 'UserList',
  setup() {
    const userTypes = [
      { label: 'LDAP', value: 'LDAP' },
      { label: 'Локальная', value: 'Локальная' },
    ];

    const users = reactive<User[]>([
      { tag: 'XXX', type: 'Локальная', login: 'Значение', password: 'qwe' },
      { tag: 'Значение', type: 'LDAP', login: 'Значение', password: null },
    ]);

    const addUser = (newUser: User) => {
      users.push(newUser);
    };

    const updateUser = (index: number, field: keyof User, value: string | null) => {
      if (field === 'password' && value === '') {
        value = null; // Если пароль пустой, сохраняем как null
      }
      users[index][field] = value as any;

      // Если тип пользователя изменяется на LDAP, сбрасываем пароль
      if (field === 'type' && value === 'LDAP') {
        users[index].password = null;
      }
    };

    const removeUser = (index: number) => {
      users.splice(index, 1);
    };

    return {
      users,
      addUser,
      updateUser,
      userTypes,
      removeUser,
    };
  },
});
</script>

<style lang="scss" scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  align-items: flex-start; 
}
</style>