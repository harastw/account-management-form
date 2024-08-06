<template>
  <div>
    <h1>User List</h1>
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