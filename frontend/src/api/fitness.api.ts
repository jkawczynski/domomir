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

export type TrainingPlan = z.infer<typeof TrainingPlanSchema>;
export type TrainingPlanExercise = z.infer<typeof TrainingPlanExerciseSchema>;

export const getTrainingPlans = async (weekday?: string) => {
  const params = { weekday: weekday };
  const response = await authApi.get<TrainingPlan[]>(
    "api/fitness/training_plans/",
    { params }
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
