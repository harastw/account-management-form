<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import RegistrationAttention from './components/RegistrationAttention.vue'
import RegistrationHeader from './components/RegistrationHeader.vue'
import UserList from './components/UserList.vue'
import UserClass from './UserClass' // Импортируйте ваш класс UserClass
import { useUsersStore } from './usersStore'

const user1 = new UserClass('worker-manager', 'Локальная', 'bigbossggwp1995', 'qwerty1234')
const user2 = new UserClass('worker-intern', 'LDAP', 'ugabuga227', '123')
const user3 = new UserClass('sweet', 'Локальная', 'nyashka_kitty1990', 'qwerty1234')
const users = ref<UserClass[]>([user1, user2, user3])

const correctUsers = ref<UserClass[]>([])

// Загрузка данных из локального хранилища при монтировании компонента
onMounted(() => {
  const storedCorrectUsers = localStorage.getItem('counter')
  if (storedCorrectUsers) {
    try {
      const parsedUsers = JSON.parse(storedCorrectUsers) as UserClass[]
      correctUsers.value = parsedUsers
      usersStore.UpdateUsers(parsedUsers) // Если вам нужно обновить магазин
    } catch (error) {
      console.error('Ошибка при парсинге данных из localStorage:', error)
    }
  }
})

const addNewUser = () => {
  const user = new UserClass('worker', 'LDAP', '', '')
  users.value.push(user)
}

const removeUser = (index: number) => {
  users.value.splice(index, 1)
}

const usersStore = useUsersStore()

const addCorrectUser = (user: UserClass) => {
  if (!correctUsers.value.find((u) => u.tag === user.tag)) {
    correctUsers.value.push(user)
    usersStore.UpdateUsers(correctUsers.value)
  }
}

watch(
  () => usersStore.$state,
  (state) => {
    localStorage.setItem('counter', JSON.stringify(state.correctUsers))
  },
  { deep: true }
)
</script>

<template>
  <div id="All">
    <RegistrationHeader :addNewUser="addNewUser" />

    <main>
      <RegistrationAttention />
      <UserList :users="users" :removeUser="removeUser" :addCorrectUser="addCorrectUser" />
    </main>
  </div>
  <li v-for="(user, index) in correctUsers" :key="index">
    {{ user.tag }}
  </li>
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
