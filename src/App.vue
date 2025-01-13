<script lang="ts">
import { defineComponent } from "vue";
import HomeView from "./views/HomeView.vue";

export default defineComponent({
  name: "App",
  components: {
    HomeView,
  }
})
</script>

<template>
  <div id="app">
    <header>
      <h1>Random Color Generator</h1>
    </header>
    <main>
      <HomeView />
    </main>
    <footer>
      <p>&copy; 2025 Random Color Generator App</p>
    </footer>
  </div>
</template>

<style scoped>
#app {
  text-align: center;
  font-family: Arial, sans-serif;
  line-height: 1.6;
}

header {
  background-color: #f4f4f4;
  padding: 20px 0;
  margin-bottom: 20px;
}

header h1 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

main {
  padding: 20px;
}

footer {
  margin-top: 40px;
  font-size: 14px;
  color: #666;
}
</style>
