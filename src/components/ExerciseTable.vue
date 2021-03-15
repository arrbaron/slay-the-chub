<template>
  <div class="table">
    <h2>Completed Exercises</h2>
    <div class="buttons">
      <button
        @click="onClearCompletedExercises"
        class="button button-clear"
        href="#"
      >
        Clear
      </button>
    </div>
    <table>
      <thead>
        <tr>
          <th>Encounter Type</th>
          <th>Exercise</th>
          <th>Reps Completed</th>
        </tr>
      </thead>
      <tbody>
        <ExerciseRow
          v-for="exercise in completedExercises"
          @updateExercise="updateExercise"
          :exercise="exercise"
          :key="exercise.id"
          :isEditing="isEditing"
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
    const completedExercises = inject("completedExercises") as Ref<IExercise[]>;
    const updateExercise = inject("updateExercise");
    const clearCompletedExercises = inject("clearCompletedExercises") as any;

    const onClearCompletedExercises = () => clearCompletedExercises();

    const isEditing = ref(false);

    return {
      completedExercises,
      updateExercise,
      onClearCompletedExercises,
      isEditing,
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
