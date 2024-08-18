<script setup lang="ts">
import { ref } from 'vue'
import RegistrationAttention from './components/RegistrationAttention.vue'
import RegistrationHeader from './components/RegistrationHeader.vue'
import UserList from './components/UserList.vue'
import UserClass from './UserClass' // Импортируйте ваш класс UserClass

const users = ref<UserClass[]>([new UserClass(), new UserClass(), new UserClass()])

const addNewUser = () => {
  const user = new UserClass()
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
