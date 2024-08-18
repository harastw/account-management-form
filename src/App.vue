<script setup lang="ts">
import { ref } from 'vue'
import RegistrationAttention from './components/RegistrationAttention.vue'
import RegistrationHeader from './components/RegistrationHeader.vue'
import UserList from './components/UserList.vue'
import UserClass from './UserClass' // Импортируйте ваш класс UserClass

const user1 = new UserClass('worker-manager', 'Локальная', 'bigbossggwp1995', 'qwerty1234')
const user2 = new UserClass('worker-intern', 'LDAP', 'ugabuga227', '123')
const user3 = new UserClass('sweet', 'Локальная', 'nyashka_kitty1990', 'qwerty1234')
const users = ref<UserClass[]>([user1, user2, user3])

const addNewUser = () => {
  const user = new UserClass('worker', 'LDAP', '', '')
  users.value.push(user)
}
const removeUser = (index: number) => {
  users.value.splice(index, 1)
}
</script>

<template>
  <div id="All">
    <RegistrationHeader :addNewUser="addNewUser" />

    <main>
      <RegistrationAttention />
      <UserList :users="users" :removeUser="removeUser" />
    </main>
  </div>
</template>

<style scoped>
#firstLine {
  margin-bottom: 20px;
}

#All {
  max-width: 70%;
  max-width: 1000px;
  font-family: Helvetica, Arial, sans-serif;
  margin-top: 60px;
  margin-left: 60px;
}
</style>
