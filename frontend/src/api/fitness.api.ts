import { authApi } from "./auth.api";
import z from "zod";

const transformZeroToNull = (val: number | undefined) => {
  if (!val || val === 0) {
    return undefined;
  }
  return val;
};

export const TrainingPlanExerciseSchema = z.object({
  order: z.number(),
  name: z.string().min(1, { message: "Cannot be empty" }),
  sets: z.preprocess((val) => Number(val), z.number().gt(0)),
  reps: z
    .preprocess((val) => Number(val), z.number().optional())
    .transform((val) => transformZeroToNull(val)),
  starting_weight: z
    .preprocess((val) => Number(val), z.number().optional())
    .transform((val) => transformZeroToNull(val)),
});

export const TrainingPlanSchema = z.object({
  id: z.number().optional(),
  owner: z.string().optional(),
  weekday: z.string(),
  weekday_verbose: z.string().optional(),
  description: z.string().optional(),
  exercises: z
    .array(TrainingPlanExerciseSchema)
    .nonempty({ message: "At least one exercise is required" }),
});

export const TrainingExerciseSchema = z.object({
  id: z.number(),
  name: z.string(),
  started: z.date().optional(),
  completed: z.date().optional(),
  set_number: z.number(),
  reps: z
    .preprocess((val) => Number(val), z.number().optional())
    .transform((val) => transformZeroToNull(val)),
  weight: z
    .preprocess((val) => Number(val), z.number().optional())
    .transform((val) => transformZeroToNull(val)),
});

export const TrainingSchema = z.object({
  id: z.number(),
  started: z.date(),
  completed: z.date().optional(),
  description: z.string(),
  owner: z.string(),
  exercises: z.array(TrainingExerciseSchema),
  training_plan: TrainingPlanSchema,
});

export type TrainingPlan = z.infer<typeof TrainingPlanSchema>;
export type TrainingPlanExercise = z.infer<typeof TrainingPlanExerciseSchema>;
export type Training = z.infer<typeof TrainingSchema>;
export type TrainingExercise = z.infer<typeof TrainingExerciseSchema>;

export const getTrainingPlans = async () => {
  const response = await authApi.get<TrainingPlan[]>(
    "api/fitness/training_plans/"
  );
  return response.data;
};

export const getTrainingPlanById = async (id: string) => {
  const response = await authApi.get<TrainingPlan>(
    `api/fitness/training_plans/${id}/`
  );
  return response.data;
};

export const createTrainingPlan = async (plan: TrainingPlan) => {
  const response = await authApi.post<TrainingPlan>(
    "api/fitness/training_plans/",
    plan
  );
  return response.data;
};

export const editTrainingPlan = async (plan: TrainingPlan) => {
  const response = await authApi.put<TrainingPlan>(
    `api/fitness/training_plans/${plan.id}/`,
    plan
  );
  return response.data;
};

export const startTraining = async (plan: TrainingPlan) => {
  const response = await authApi.post<Training>(
    `api/fitness/training_plans/${plan.id}/start_training/`
  );
  return response.data;
};

export const getActiveTraining = async () => {
  const response = await authApi.get<Training>(
    "api/fitness/trainings/get_active/"
  );
  return response.data;
};

export const getTrainings = async () => {
  const response = await authApi.get<Training[]>("api/fitness/trainings/");
  return response.data;
};

export const getTrainingById = async (id: string) => {
  const response = await authApi.get<Training>(`api/fitness/trainings/${id}/`);
  return response.data;
};

export const updateTraining = async (exercise: Training) => {
  const response = await authApi.patch<Training>(
    `api/fitness/trainings/${exercise.id}/`,
    exercise
  );
  return response.data;
};

export const updateTrainingExercise = async (exercise: TrainingExercise) => {
  const response = await authApi.patch<TrainingExercise>(
    `api/fitness/training_exercises/${exercise.id}/`,
    exercise
  );
  return response.data;
};
