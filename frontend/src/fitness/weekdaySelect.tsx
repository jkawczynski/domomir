import { getTrainingPlans, TrainingPlan } from "../api/fitness.api";
import { FunctionComponent, useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

const WEEKDAYS = [
  { value: "1", name: "Monday", disabled: false },
  { value: "2", name: "Tuesday", disabled: false },
  { value: "3", name: "Wednsday", disabled: false },
  { value: "4", name: "Thursday", disabled: false },
  { value: "5", name: "Friday", disabled: false },
  { value: "6", name: "Saturday", disabled: false },
  { value: "7", name: "Sunday", disabled: false },
];

export const WeekdaySelect: FunctionComponent<{
  initialValue?: string;
  value: string;
  onChange: (value: string) => void;
}> = ({ initialValue, value, onChange }) => {
  const { isLoading, isError, data } = useQuery(["getTrainingPlans"], () =>
    getTrainingPlans()
  );

  if (isLoading) return <LinearProgress sx={{ mt: 2 }} />;
  if (!data && isError) {
    return (
      <Typography color="error" variant="caption">
        Error with Weekday select, please reload the page
      </Typography>
    );
  }

  const weekdays = WEEKDAYS.map((weekday) => {
    const plan = data.find((plan) => plan.weekday === weekday.value);
    if (initialValue && plan?.weekday === initialValue) {
      return weekday;
    }
    weekday.disabled = plan != null;
    return weekday;
  });

  return (
    <FormControl sx={{ minWidth: 120 }}>
      <InputLabel id="weekday-select">Weekday</InputLabel>
      <Select
        labelId="weekday-select"
        value={value}
        label="Weekday"
        disabled={isLoading}
        onChange={(event) => onChange(event.target.value)}
        size="small"
      >
        {weekdays.map((weekday) => (
          <MenuItem
            key={weekday.value}
            value={weekday.value}
            disabled={weekday.disabled}
          >
            {weekday.name}
          </MenuItem>
        ))}
      </Select>
      {isLoading && <LinearProgress sx={{ mt: 2 }} />}
    </FormControl>
  );
};
