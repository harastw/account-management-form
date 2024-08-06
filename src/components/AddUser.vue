<template>
  <div id="tagCenter">
    <div id="tagColumn">
      <label for="tag">Метки</label>
      <input v-model="newUser.tag" placeholder="Tag" />
    </div>

    <div id="typeDiv">
      <label for="type">Тип записи</label>
      <n-select
        v-model:value="newUser.type"
        :options="userTypes"
        @update:value="(value) => newUser.type = value"
        placeholder="Выберите тип"
      />
    </div>

    <div class="miniPadding">
      <label for="login">Логин</label>
      <input v-model="newUser.login" placeholder="Login" />
    </div>

    <div class="miniPadding" v-if="newUser.type === 'Локальная'">
      <label for="password">Пароль</label>
      <n-input
        type="password"
        v-model:value="newUser.password"
        @update:value="(value) => newUser.password = value"
        placeholder="Введите пароль"
      />
    </div>

    <button @click="submitUser">Добавить</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import NSelect from 'naive-ui';
import NInput from 'naive-ui';

export default defineComponent({
  components: {
    NSelect,
    NInput,
  },
  setup(_, { emit }) { // Изменили props на _ в аргументах
    const newUser = reactive({
      tag: '',
      type: 'LDAP',
      login: '',
      password: '',
    });

    const userTypes = [
      { label: 'LDAP', value: 'LDAP' },
      { label: 'Локальная', value: 'Локальная' },
    ];

    const submitUser = () => {
      emit('user-added', { ...newUser }); // Отправляем нового пользователя обратно в родительский компонент
      // Сброс полей после добавления
      newUser.tag = '';
      newUser.type = 'LDAP';
      newUser.login = '';
      newUser.password = '';
    };

    return {
      newUser,
      userTypes,
      submitUser,
    };
  },
});
</script>

<style lang="scss" scoped>

#typeDiv {
  display: flex;
  flex-direction: column; 
  margin-right: 8px;
}

#tagCenter {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

#tagColumn {
  display: flex;
  flex-direction: column;
  margin-right: 8px;
}

.miniPadding {
  display: flex;
  flex-direction: column;
  margin-right: 8px;
}

</style>
