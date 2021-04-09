import IExercise from "./IExercise";

interface IWorkout {
  exercises: IExercise[];
  date: string;
  id: string;
  dinosaur: number;
}

export default IWorkout;