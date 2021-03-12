<template>
  <tr class="table-row">
    <template v-if="!isEditing">
      <td class="capitalize">{{ exercise.encounterType }}</td>
      <td class="capitalize">{{ exercise.exerciseType }}</td>
      <td>{{ exercise.repsCompleted }}</td>
    </template>
    <template v-else>
      <td class="capitalize">
        <input
          type="text"
          @input="updateValue('encounterType', $event.currentTarget.value)"
          :value="updatedExercise.encounterType"
          :placeholder="exercise.encounterType"
        />
      </td>
      <td class="capitalize">
        <input
          type="text"
          @input="updateValue('exerciseType', $event.currentTarget.value)"
          :value="updatedExercise.exerciseType"
          :placeholder="exercise.exerciseType"
        />
      </td>
      <td>
        <input
          @input="updateValue('repsCompleted', $event.currentTarget.value)"
          type="text"
          :value="updatedExercise.repsCompleted"
          :placeholder="exercise.repsCompleted"
        />
      </td>
    </template>
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
    isEditing: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["updateExercise"],
  setup(props, context) {
    const updatedExercise = ref(props.exercise);

    const updateValue = (key: string, value: string | number) => {
      updatedExercise.value = { ...updatedExercise.value, [key]: value };
    };

    const onUpdateExercise = () => {
      context.emit("updateExercise", updatedExercise.value);
    };

    return {
      updateValue,
      updatedExercise,
      onUpdateExercise,
    };
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
