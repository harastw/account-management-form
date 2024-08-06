<template>
  <div>
    <h1>User List</h1>
    <div class="form-group">
      <label>Метки</label>
      <label>Тип записи</label>
      <label>Логин</label>
      <label>Пароль</label>
    </div>
    <ul>
      <UserItem
        v-for="(user, index) in users"
        :key="index"
        :user="user"
        :userTypes="userTypes"
        :onUpdate="(field, value) => updateUser(index, field, value)"
        :onRemove="() => removeUser(index)"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from '../store';
// import AddUser from './AddUser.vue';
import UserItem from './UserItem.vue';

export default defineComponent({
  components: {
    // AddUser,
    UserItem,
  },
  name: 'UserList',
  setup() {
    const userStore = useUserStore();

    const userTypes = [
      { label: 'LDAP', value: 'LDAP' },
      { label: 'Локальная', value: 'Локальная' },
    ];

    const addUser = (newUser) => {
      userStore.addUser(newUser);
    };

    const updateUser = (index, field, value) => {
      userStore.updateUser(index, field, value);
    };

    const removeUser = (index) => {
      userStore.removeUser(index);
    };

    return {
      users: userStore.users,
      addUser,
      updateUser,
      userTypes,
      removeUser,
    };
  },
});
</script>


<style lang="scss" scoped>
.form-group {
  display: flex;
  justify-content: space-between; /* Разделение заголовков по ширине */
  margin-bottom: 16px; /* Добавляем расстояние между строками заголовка и списком */
  margin-left: 50px;
  margin-right: 150px;
}
</style>