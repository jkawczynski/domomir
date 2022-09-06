import z from "zod";
import {
  TrainingExerciseSchema,
  TrainingPlanExerciseSchema,
  TrainingPlanSchema,
  TrainingSchema,
} from "./schemas";

export type TrainingPlan = z.infer<typeof TrainingPlanSchema>;
export type TrainingPlanExercise = z.infer<typeof TrainingPlanExerciseSchema>;
export type Training = z.infer<typeof TrainingSchema>;
export type TrainingExercise = z.infer<typeof TrainingExerciseSchema>;
