 <template>
  <div class="workout">
    <h4>{{ workout.date }}</h4>
    <div class="exercises">
      <span
        v-for="exercise in workout.exercises"
        :key="exercise.id"
        class="exercise"
      >
        {{ exercise.exerciseType }} x {{ exercise.repsCompleted }}
      </span>
    </div>
  </div>
</template>
 
<script lang="ts">
import { defineComponent, PropType } from "vue";
import IWorkout from "@/models/IWorkout";

export default defineComponent({
  name: "Workout",
  props: {
    workout: {
      type: Object as PropType<IWorkout>,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.workout {
  margin-bottom: 2rem;
}

.exercises {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.exercise {
  margin-right: 2rem;
  flex-basis: 35%;
}

@media only screen and (min-width: 768px) {
  .exercise {
    margin-right: 2rem;
    flex-basis: 20%;
  }
}
</style>
