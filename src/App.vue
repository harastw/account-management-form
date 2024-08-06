<template>
  <div id="firstLine">
    <span>Учётные записи &nbsp;&nbsp;</span>
    <AddUserButton @add-user="addUser" /><br>
  </div>
  <Attention />
  <UserList @add-user="addUser" ref="userList" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Attention from './components/Attention.vue';
import UserList from './components/UserList.vue';
import AddUserButton from './components/AddUserButton.vue';
import { useUserStore } from './store';

@Options({
  components: {
    Attention,
    UserList,
    AddUserButton,
  },
})
export default class App extends Vue {
  userStore = useUserStore();

  addUser(newUser) {
    this.userStore.addUser(newUser);
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
  margin-top: 60px;
  margin-left: 60px;
}
</style>
