<script setup lang="ts">
import UserItem from './UserItem.vue'
import { defineProps } from 'vue'
import UserClass from '../UserClass'

const props = defineProps<{
  users: UserClass[]
  removeUser: (index: number) => void
  addCorrectUser: (user: UserClass) => void
}>()
</script>

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
      <li v-for="(user, index) in users" :key="index">
        <UserItem
          :user="user"
          :on-remove="() => removeUser(index)"
          :add-correct-user="addCorrectUser"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.form-group {
  display: flex;
  justify-content: space-between; /* Разделение заголовков по ширине */
  margin-bottom: 16px; /* Добавляем расстояние между строками заголовка и списком */
  margin-left: 50px;
  margin-right: 150px;
}
</style>
