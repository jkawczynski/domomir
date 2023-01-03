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
  skipped: z.boolean().optional(),
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
