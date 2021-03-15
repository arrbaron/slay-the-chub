<template>
  <section class="container">
    <ExerciseForm :savedExercises="exercises" />
  </section>
</template>

<script lang="ts">
import { defineComponent, inject, Ref } from "vue";
import ExerciseForm from "@/components/ExerciseForm.vue";
import IExercise from "@/models/IExercise";

export default defineComponent({
  name: "Customize",
  components: { ExerciseForm },
  setup() {
    const exercises = inject("exercises") as Ref<IExercise[]>;

    return { exercises };
  },
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
</style>
