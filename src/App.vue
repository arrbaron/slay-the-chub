<template>
  <Nav />
  <header>
    <h1>Slay the Chub</h1>
  </header>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, provide, ref, Ref, onMounted } from "vue";
import Nav from "@/components/Nav.vue";
import * as exercisesJSON from "./data/exercises.json";
import IExercise from "./models/IExercise";

export default defineComponent({
  name: "App",
  components: { Nav },
  setup(): void {
    const exercises = ref(exercisesJSON.exercises);
    const completedExercises = ref([]) as Ref<IExercise[]>;

    const updateExercise = (updatedExercise: IExercise) => {
      exercises.value = exercises.value.map((exercise: IExercise) => {
        return exercise.id === updatedExercise.id ? updatedExercise : exercise;
      });
    };

    const savedCompletedExercises = () => {
      const parsedExercises = JSON.stringify(completedExercises.value);
      localStorage.setItem("completedExercises", parsedExercises);

      alert("saving");
    };

    const fetchCompletedExercies = () => {
      const exercisesJSON = localStorage.getItem("completedExercises");
      console.log(exercisesJSON);
      if (exercisesJSON) {
        completedExercises.value = JSON.parse(exercisesJSON);
      }
    };

    const addCompletedExercise = (exerciseId: string) => {
      const exercise = exercises.value.find(
        (ex: IExercise) => ex.id === exerciseId
      );
      if (!exercise) return;

      const exerciseHasBeenCompleted = completedExercises.value
        .map((ex: IExercise) => ex.id)
        .includes(exerciseId);

      if (exerciseHasBeenCompleted) {
        completedExercises.value = completedExercises.value.map(
          (ex: IExercise) => {
            return ex.id === exerciseId
              ? {
                  ...exercise,
                  repsCompleted: ex.repsCompleted + ex.repsInSet,
                }
              : ex;
          }
        );
      } else {
        completedExercises.value = [
          ...completedExercises.value,
          { ...exercise, repsCompleted: exercise.repsInSet },
        ];
      }

      savedCompletedExercises();
    };

    const clearCompletedExercises = () => {
      completedExercises.value = [];
      localStorage.removeItem("completedExercises");
    };

    onMounted(() => {
      fetchCompletedExercies();
    });

    provide("exercises", exercises);
    provide("completedExercises", completedExercises);
    provide("updateExercise", updateExercise);
    provide("addCompletedExercise", addCompletedExercise);
    provide("clearCompletedExercises", clearCompletedExercises);
  },
});
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.capitalize {
  text-transform: capitalize;
}
</style>
