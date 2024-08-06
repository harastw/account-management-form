import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

interface User {
  tag: string;
  type: 'LDAP' | 'Локальная';
  login: string;
  password: string | null;
}

export const useUserStore = defineStore('userStore', () => {
  const users = ref<User[]>([]);

  // Загружаем пользователей из localStorage
  const loadUsers = () => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      users.value = JSON.parse(storedUsers);
    }
  };

  // Сохраняем пользователей в localStorage
  const saveUsers = () => {
    localStorage.setItem('users', JSON.stringify(users.value));
  };

  // Слежение за изменениями в users
  watch(users, saveUsers, { deep: true });

  const addUser = (newUser: User) => {
    users.value.push(newUser);
  };

  const updateUser = (index: number, field: keyof User, value: string | null) => {
    if (field === 'password' && value === '') {
      value = null; // Если пароль пустой, сохраняем как null
    }
    users.value[index][field] = value as any;

    // Если тип пользователя изменяется на LDAP, сбрасываем пароль
    if (field === 'type' && value === 'LDAP') {
      users.value[index].password = null;
    }
  };

  const removeUser = (index: number) => {
    users.value.splice(index, 1);
  };

  // Инициализация
  loadUsers();

  return { users, addUser, updateUser, removeUser };
});