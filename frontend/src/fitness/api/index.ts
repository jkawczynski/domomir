import { authApi } from "../../api/auth.api";
import { Training, TrainingExercise, TrainingPlan } from "./models";

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

export const updateTraining = async (training: Training) => {
  const response = await authApi.patch<Training>(
    `api/fitness/trainings/${training.id}/`,
    training
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

export const removeTraining = async (id: number) => {
  const response = await authApi.delete(`api/fitness/trainings/${id}/`);
  return response.data;
};
