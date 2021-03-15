<template>
  <section class="container">
    <div class="row">
      <div class="column">
        <p>Because I said so!</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Why",
  components: {},
});
</script>

<style scoped lang="scss">
p {
  display: flex;
  height: 100px;
  background: cornflowerblue;
}
</style>
