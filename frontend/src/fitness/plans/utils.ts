import { TrainingPlan } from "../api/models";

const weekdays = [...Array(7).keys()].map((i: number) => String(i + 1));

const getNextAvailableWeekday = (plans: TrainingPlan[]) => {
  const availableWeekdays = weekdays.filter(
    (weekday) => !plans.find((plan) => plan.weekday === weekday)
  );
  if (availableWeekdays.length) {
    return availableWeekdays[0];
  }
  // TODO: disable creating new if there are no weekdays available
  return "1";
};

export { getNextAvailableWeekday };
