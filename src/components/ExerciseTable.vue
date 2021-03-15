<template>
  <div class="table">
    <h2>Completed Exercises</h2>
    <div class="buttons">
      <button
        @click="onClearCompletedExercises"
        :disabled="completedExercises.length < 1"
        class="button button-clear"
        href="#"
      >
        Reset
      </button>
    </div>
    <table>
      <thead>
        <tr>
          <th>Encounter</th>
          <th>Exercise</th>
          <th>Reps</th>
        </tr>
      </thead>
      <tbody>
        <ExerciseRow
          v-for="exercise in completedExercises"
          :exercise="exercise"
          :key="exercise.id"
        />
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, Ref } from "vue";
import IExercise from "@/models/IExercise";
import ExerciseRow from "@/components/ExerciseRow.vue";

export default defineComponent({
  name: "ExerciseTable",
  components: { ExerciseRow },
  setup() {
    /** Injected properties and methods */
    const completedExercises = inject("completedExercises") as Ref<IExercise[]>;
    const clearCompletedExercises = inject("clearCompletedExercises") as any;

    /** Methods */
    const onClearCompletedExercises = () => {
      if (window.confirm("Reset all completed exercises?")) {
        clearCompletedExercises();
      }
    };

    return {
      completedExercises,
      onClearCompletedExercises,
    };
  },
});
</script>

<style scoped lang="scss">
.table {
  margin: 5rem 0 10rem 0;
}

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
