<template>
  <div id="attention">
    <div class="circle">?</div>
    <span>Для создание нескольких меток для одной пары логин/пароль используйте разделитель;</span>
  </div>
</template>

<style scoped>
#attention {
  margin-bottom: 20px;
  height: 50px;

  display: flex;
  justify-content: center; /* Center items horizontally */
  align-items: center;

  background-color: rgb(191, 226, 255);
  margin-bottom: 20px;
}

.circle {
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 50%;
  border: 1px solid black;
}
</style>
