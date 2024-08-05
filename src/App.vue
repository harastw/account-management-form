<template>
  <div id="firstLine">
    <span>Учётные записи &nbsp;&nbsp;</span>
    <AddUserButton @add-user="addUser" /><br>
  </div>
  <Attention />
  <UserList ref="userList" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Attention from './components/Attention.vue';
import UserList from './components/UserList.vue';
import AddUserButton from './components/AddUserButton.vue';

@Options({
  components: {
    Attention,
    UserList,
    AddUserButton
  },
})
export default class App extends Vue {
  addUser() {
    // Получаем доступ к методу дочернего компонента UserList
    (this.$refs.userList as any).addUser();
  }
}
</script>

<style lang="scss">
#firstLine {
  margin-bottom: 20px;
}

#app {
  max-width: 70%;
  max-width: 1000px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  margin-left: 60px;
}

</style>