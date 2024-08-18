<script setup lang="ts">
import { NInput, NSelect, NButton, NForm } from 'naive-ui'
import { ref, defineProps } from 'vue'
import UserClass from '../UserClass'

const props = defineProps<{
  user: UserClass
  onRemove: () => void
}>()

const options = [
  { label: 'LDAP', value: 'LDAP' },
  { label: 'Локальная', value: 'Локальная' }
]
const form = ref(props.user)
const isError = ref(false)
const validateInput = () => {
  isError.value = form.value.password.length < 8
}
</script>

<template>
  <li class="user-item">
    <div class="form-group">
      <n-input
        placeholder="Tag"
        maxlength="20"
        v-model="form.tag"
        :default-value="props.user.tag"
      />
    </div>

    <div class="form-group">
      <n-select
        placeholder="Выберите тип"
        v-model="form.type"
        :options="options"
        :default-value="props.user.type"
      />
    </div>

    <div class="form-group">
      <n-input
        placeholder="Login"
        maxlength="20"
        v-model="form.login"
        :default-value="props.user.login"
      />
    </div>

    <n-form :model="form" class="form-group">
      <n-input
        type="password"
        placeholder="Введите пароль"
        maxlength="20"
        v-model:value="form.password"
        :default-value="props.user.password"
        @input="validateInput"
        :status="isError ? 'error' : 'success'"
      />
      <span v-if="isError" style="color: red">Пароль должен быть не менее 8 символов</span>
    </n-form>

    <div>
      <n-button type="error" @click="onRemove">Remove</n-button>
    </div>
  </li>
</template>

<style scoped>
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

    n-input,
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
