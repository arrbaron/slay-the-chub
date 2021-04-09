<template>
  <section class="container">
    <Workout
      v-for="workout in completedWorkouts"
      :workout="workout"
      :key="workout.id"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import IWorkout from "@/models/IWorkout";
import Workout from "@/components/Workout.vue";

export default defineComponent({
  name: "History",
  components: { Workout },

  setup() {
    /** Injected properties and methods */
    const completedWorkouts = inject("completedWorkouts") as IWorkout[];

    return { completedWorkouts };
  },
});
</script>

