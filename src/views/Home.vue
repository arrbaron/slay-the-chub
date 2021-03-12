<template>
  <section class="home container">
    <ExerciseButtons />
    <ExerciseTable />
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ExerciseButtons from "../components/ExerciseButtons.vue";
import ExerciseTable from "../components/ExerciseTable.vue";

export default defineComponent({
  name: "Home",
  components: { ExerciseTable, ExerciseButtons },
});
</script>

<style scoped lang="scss">
p {
  display: flex;
  height: 100px;
  background: cornflowerblue;
}

.column:nth-of-type(2n) {
  p {
    background: gainsboro;
  }
}

.capitalize {
  text-transform: capitalize;
}
</style>
