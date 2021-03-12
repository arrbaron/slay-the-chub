<template>
  <div class="buttons">
    <button
      v-for="exercise in exercises"
      @click="onAddCompletedExercise(exercise.id)"
      :key="exercise.id"
      class="button"
    >
      <p>{{ exercise.encounterType }}</p>
      <p>{{ exercise.repsInSet }} {{ exercise.exerciseType }}</p>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, Ref } from "vue";
import IExercise from "@/models/IExercise";

export default defineComponent({
  name: "ExerciseButtons",
  components: {},
  setup() {
    const exercises = inject("exercises") as Ref<IExercise[]>;
    const addCompletedExercise = inject("addCompletedExercise") as any;

    const onAddCompletedExercise = (exerciseId: string): void => {
      addCompletedExercise(exerciseId);
    };

    return { exercises, onAddCompletedExercise };
  },
});
</script>

<style scoped lang="scss">
.button {
  min-height: 10rem;
  margin-right: 1rem;
  width: 40%;
  max-width: 200px;
  font-size: 1.2rem;

  p {
    margin-bottom: 0;
  }
}

@media only screen and (min-width: 768px) {
  .buttons {
    text-align: left;
  }
}
</style>

