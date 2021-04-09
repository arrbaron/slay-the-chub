<template>
  <nav id="nav">
    <router-link class="router-link" to="/home">Slay it :)</router-link>
    <router-link class="router-link" to="/customize">Customize >:)</router-link>
    <router-link class="router-link" to="/history">History</router-link>
    <router-link class="router-link" to="/why">:\ Why?</router-link>
  </nav>
  <ThemePicker />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ThemePicker from "@/components/ThemePicker.vue";

export default defineComponent({
  name: "Nav",
  components: { ThemePicker },
});
</script>

<style scoped lang="scss">
#nav {
  padding: 10px;
  .router-link:nth-of-type(2) {
    margin-left: 1vw;
  }

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

