import { ref, PropType } from 'vue';

import * as exercisesJSON from '../data/exercises.json';


const exercisesService = () => {
  const exercises = ref(exercisesJSON.exercises);
  const dog = ref(1);

  const updateExercise = (updatedExercise: any) => {
    exercises.value = exercises.value.map((exercise: any) => {
      return exercise.id === updatedExercise.id ? updatedExercise : exercise;
    })

  }

  return { exercises, updateExercise, dog };
}

export default exercisesService;