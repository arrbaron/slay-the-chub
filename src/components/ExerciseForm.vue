<template>
  <form>
    <ExerciseInputGroup
      v-for="exercise in exercises"
      @removeExercise="removeExercise"
      @updateExercise="updateExercise"
      :exercise="exercise"
      :key="exercise.id"
    />

    <div class="form-footer">
      <div class="buttons">
        <button @click="addNewExercise($event)" class="button">
          Add Exercise
        </button>
        <button
          @click="onSaveExercises($event)"
          :disabled="!formIsValid || !formIsDirty"
          type="submit"
          class="button"
        >
          Save
        </button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, inject, computed } from "vue";
import { v4 as uuidv4 } from "uuid";
import ExerciseInputGroup from "@/components/ExerciseInputGroup.vue";
import IExercise from "@/models/IExercise";

export default defineComponent({
  name: "ExerciseForm",
  components: { ExerciseInputGroup },
  props: {
    savedExercises: {
      type: Object as PropType<IExercise[]>,
      required: true,
    },
    formIsDirty: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["setFormIsDirty"],
  setup(props, context) {
    /** Injected properties and methods */
    const saveExercises = inject("saveExercises") as any;
    const completedExercises = inject("completedExercises") as any;
    const clearCompletedExercises = inject("clearCompletedExercises") as any;

    /** Reactive properties */
    const exercises = ref(props.savedExercises);

    /** Methods */
    const formIsValid = computed(() => {
      return exercises.value.every((exercise: IExercise) => {
        return (
          exercise.encounterType &&
          exercise.exerciseType &&
          exercise.repsInSet &&
          typeof exercise.repsInSet === "number"
        );
      });
    });

    const addNewExercise = (e: Event): void => {
      e.preventDefault();

      const emptyExerciseGroup = {
        encounterType: "",
        exerciseType: "",
        repsInSet: 0,
        repsCompleted: 0,
        id: uuidv4(),
      };

      exercises.value = [...exercises.value, emptyExerciseGroup];

      const footerElement = document.querySelector("footer");
      if (footerElement) {
        footerElement.scrollIntoView();
      }
    };

    const removeExercise = (id: string): void => {
      context.emit("setFormIsDirty", true);

      exercises.value = exercises.value.filter(
        (exercise: IExercise) => exercise.id !== id
      );
    };

    const updateExercise = (updatedExercise: IExercise): void => {
      context.emit("setFormIsDirty", true);

      exercises.value = exercises.value.map((exercise: IExercise) => {
        return exercise.id === updatedExercise.id ? updatedExercise : exercise;
      });
    };

    const onSaveExercises = (e: Event): void => {
      e.preventDefault();

      if (completedExercises.value.length > 0) {
        if (
          !window.confirm(
            "Saving these changes will clear your completed exercises. Are you sure you want to proceed?"
          )
        ) {
          return;
        }
      }

      context.emit("setFormIsDirty", false);
      saveExercises(exercises.value);
      clearCompletedExercises();
    };

    return {
      exercises,
      formIsValid,
      addNewExercise,
      removeExercise,
      updateExercise,
      onSaveExercises,
    };
  },
});
</script>

<style scoped lang="scss">
form {
  margin: 0 auto;
}

.form-footer {
  width: 100%;
  display: flex;
  justify-content: center;
}

.buttons {
  width: 100%;
  button {
    display: block;
    width: 100%;
  }
}

@media only screen and (min-width: 768px) {
  .buttons {
    display: flex;
    width: fit-content;

    button {
      width: 25rem;
      max-width: 150px;
      margin: 0 2.5rem;
    }
  }
}
</style>