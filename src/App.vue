<script setup lang="ts">
import { ref } from 'vue'
import RegistrationAttention from './components/RegistrationAttention.vue'
import RegistrationHeader from './components/RegistrationHeader.vue'
import UserList from './components/UserList.vue'
import UserClass from './UserClass' // Импортируйте ваш класс UserClass

const users = ref<UserClass[]>([new UserClass(), new UserClass(), new UserClass()])
const newUser = ref({
  tag: '',
  type: '',
  login: '',
  password: ''
})

const addNewUser = () => {
  const user = new UserClass()
  user.tag = newUser.value.tag
  user.type = newUser.value.type
  user.login = newUser.value.login
  user.password = newUser.value.password

  users.value.push(user)

  // Сброс значений
  newUser.value.tag = ''
  newUser.value.type = ''
  newUser.value.login = ''
  newUser.value.password = ''
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
      <UserList :users="users" :removeUser="removeUser" :newUser="newUser" />
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
