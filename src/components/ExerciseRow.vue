<template>
  <tr class="table-row">
    <td class="capitalize">{{ exercise.encounterType }}</td>
    <td class="capitalize">{{ exercise.exerciseType }}</td>
    <td>{{ exercise.repsCompleted }}</td>
  </tr>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import IExercise from "@/models/IExercise";

export default defineComponent({
  name: "ExerciseRow",
  props: {
    exercise: {
      type: Object as PropType<IExercise>,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.table-row {
  position: relative;
}

.buttons {
  position: absolute;
  right: -13vw;
  top: 5px;
}
</style>
