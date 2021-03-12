import { ref, PropType } from 'vue';

import * as exercisesJSON from '../data/exercises.json';
import IExercise from '../models/IExercise';


const exercisesService = () => {
  const exercises = ref(exercisesJSON.exercises);
  const dog = ref(1);

  const updateExercise = (updatedExercise: any) => {
    console.log('updating!!!', updatedExercise)
    exercises.value = exercises.value.map((exercise: any) => {
      return exercise.id === updatedExercise.id ? updatedExercise : exercise;
    })

    console.log(exercises.value.find((exercise) => exercise.id === updatedExercise.id))
  }

  return { exercises, updateExercise, dog };
}

export default exercisesService;