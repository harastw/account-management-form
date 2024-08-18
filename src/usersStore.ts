import { defineStore } from 'pinia'
import { ref } from 'vue'
import UserClass from './UserClass'

export const useUsersStore = defineStore('user', () => {
  const correctUsers = ref<UserClass[]>([])

  const UpdateUsers = (users: UserClass[]) => {
    correctUsers.value = users
  }

  return {
    correctUsers,
    UpdateUsers
  }
})
