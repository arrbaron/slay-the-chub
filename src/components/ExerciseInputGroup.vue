<template>
  <fieldset>
    <button @click="onRemoveExercise()" class="delete-button">
      <img src="../assets/icons/delete.png" />
    </button>
    <div class="input-group">
      <label for="encounterType">Encounter</label>
      <input
        @input="onUpdateExercise('encounterType', $event.currentTarget.value)"
        :value="exercise.encounterType"
        type="text"
        placeholder="e.g. Enemy"
        id="encounterType"
      />
    </div>
    <div class="input-group">
      <label for="exerciseType">Exercise</label>
      <input
        @input="onUpdateExercise('exerciseType', $event.currentTarget.value)"
        :value="exercise.exerciseType"
        type="text"
        placeholder="e.g. Push ups"
        id="exerciseType"
      />
    </div>
    <div class="input-group">
      <label for="repsInSet">Reps</label>
      <input
        @input="
          onUpdateExercise(
            'repsInSet',
            parseInt($event.currentTarget.value, 10)
          )
        "
        :value="exercise.repsInSet"
        type="number"
        placeholder="0"
        id="repsInSet"
      />
    </div>
  </fieldset>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ExerciseInputGroup",
  props: {
    exercise: {
      type: Object,
      required: true,
    },
  },
  emits: ["removeExercise", "updateExercise"],
  setup(props, context) {
    const onRemoveExercise = (): void => {
      context.emit("removeExercise", props.exercise.id);
    };

    const onUpdateExercise = (key: string, value: any): void => {
      context.emit("updateExercise", { ...props.exercise, [key]: value });
    };

    return { onRemoveExercise, onUpdateExercise };
  },
});
</script>

<style scoped lang="scss">
fieldset {
  display: flex;
  align-items: flex-end;
  position: relative;

  width: 85%;
}

.delete-button {
  background-color: transparent;
  border: none;
  position: absolute;
  right: -7rem;
  bottom: 0;

  img {
    width: 24px;
    height: 24px;
  }
}

@media only screen and (min-width: 768px) {
  fieldset {
    width: 100%;
  }

  .delete-button {
    left: -7rem;
  }
}
</style>

