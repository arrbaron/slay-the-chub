<template>
  <Nav />
  <header>
    <h1>Slay the Chub</h1>
  </header>
  <router-view />
  <footer></footer>
</template>

<script lang="ts">
import { defineComponent, provide, ref, Ref, onMounted } from "vue";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";

import Nav from "@/components/Nav.vue";
import * as exercisesJSON from "./data/exercises.json";
import IExercise from "./models/IExercise";

export default defineComponent({
  name: "App",
  components: { Nav },
  setup(): void {
    /** Reactive properties */
    const exercises = ref(exercisesJSON.exercises) as any;
    const completedExercises = ref([]) as Ref<IExercise[]>;
    const completedWorkouts = ref([]) as any;

    /** Methods */
    const updateExercise = (updatedExercise: IExercise) => {
      exercises.value = exercises.value.map((exercise: IExercise) => {
        return exercise.id === updatedExercise.id ? updatedExercise : exercise;
      });
    };

    const saveCompletedExercises = () => {
      const parsedExercises = JSON.stringify(completedExercises.value);
      localStorage.setItem("completedExercises", parsedExercises);
    };

    const fetchFromStorage = () => {
      const completedExercisesJSON = localStorage.getItem("completedExercises");
      if (completedExercisesJSON) {
        completedExercises.value = JSON.parse(completedExercisesJSON);
      }

      const exercisesJSON = localStorage.getItem("exercises");
      if (exercisesJSON) {
        exercises.value = JSON.parse(exercisesJSON);
      }

      const workoutsJSON = localStorage.getItem("workouts");
      if (workoutsJSON) {
        completedWorkouts.value = JSON.parse(workoutsJSON);
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

      saveCompletedExercises();
    };

    const clearCompletedExercises = () => {
      completedExercises.value = [];
      localStorage.removeItem("completedExercises");
    };

    const saveExercises = (savedExercises: IExercise[]) => {
      exercises.value = savedExercises;
      const parsedExercises = JSON.stringify(savedExercises);
      localStorage.setItem("exercises", parsedExercises);
    };

    const saveWorkout = (exercises: any) => {
      const id = uuidv4();

      completedWorkouts.value = [
        ...completedWorkouts.value,
        {
          exercises: exercises.value,
          date: format(new Date(), "Pp"),
          id,
        },
      ];

      const parsedWorkouts = JSON.stringify(completedWorkouts.value);
      localStorage.setItem("workouts", parsedWorkouts);
      clearCompletedExercises();
    };

    /** Lifecycle hooks */
    onMounted(() => {
      fetchFromStorage();
    });

    /** Provided properties and methods */
    provide("exercises", exercises);
    provide("completedExercises", completedExercises);
    provide("completedWorkouts", completedWorkouts);
    provide("updateExercise", updateExercise);
    provide("addCompletedExercise", addCompletedExercise);
    provide("clearCompletedExercises", clearCompletedExercises);
    provide("saveExercises", saveExercises);
    provide("saveWorkout", saveWorkout);
  },
});
</script>


<style lang="scss">
:root {
  --ironclad-color: #9d3133;
  --silent-color: #4c7f3a;
  --defect-color: #296c94;
  --watcher-color: #5a397a;
  --theme-color: var(--ironclad-color);
}

html,
body {
  max-width: 100%;
  overflow-x: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 2rem 0;
}

.capitalize {
  text-transform: capitalize;
}

.button {
  height: 6rem;
  touch-action: manipulation;
  background: var(--theme-color);
}

.button-clear {
  color: var(--theme-color) !important;
}

@media only screen and (min-width: 768px) {
  #app {
    padding: 1rem 0;
  }

  .button {
    height: 5rem;
  }
}
</style>
