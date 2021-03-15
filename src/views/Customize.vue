<template>
  <section class="container">
    <ExerciseForm
      @setFormIsDirty="setFormIsDirty"
      :savedExercises="exercises"
      :formIsDirty="formIsDirty"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent, inject, ref, Ref } from "vue";
import ExerciseForm from "@/components/ExerciseForm.vue";
import IExercise from "@/models/IExercise";
import { NavigationGuardNext } from "vue-router";

export default defineComponent({
  name: "Customize",
  components: { ExerciseForm },
  beforeRouteLeave(_to, _from, next: NavigationGuardNext) {
    if (
      !this.formIsDirty ||
      (this.formIsDirty &&
        window.confirm(
          "You have unsaved changes! Are you sure you want to proceed?"
        ))
    ) {
      next();
    } else {
      next(false);
    }
  },
  setup() {
    /** Injected properties and methods */
    const exercises = inject("exercises") as Ref<IExercise[]>;

    /** Reactive properties */
    const formIsDirty = ref(false);

    /** Methods */
    const setFormIsDirty = (isDirty: boolean): void => {
      formIsDirty.value = isDirty;
    };

    return { exercises, formIsDirty, setFormIsDirty };
  },
});
</script>

<style scoped lang="scss">
section {
  display: flex;
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
