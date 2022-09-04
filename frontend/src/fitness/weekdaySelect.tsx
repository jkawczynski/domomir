import { getTrainingPlans } from "../api/fitness.api";
import { FunctionComponent } from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

export const WeekdaySelect: FunctionComponent<{
  initialValue?: string;
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  const { isLoading, data } = useQuery(["getTrainingPlans", value], () =>
    getTrainingPlans(value)
  );

  const weekdays = [
    { value: "1", name: "Monday" },
    { value: "2", name: "Tuesday" },
    { value: "3", name: "Wednsday" },
    { value: "4", name: "Thursday" },
    { value: "5", name: "Friday" },
    { value: "6", name: "Saturday" },
    { value: "7", name: "Sunday" },
  ];
  return (
    <FormControl sx={{ minWidth: 120 }}>
      <InputLabel id="weekday-select">Weekday</InputLabel>
      <Select
        labelId="weekday-select"
        value={value}
        label="Weekday"
        onChange={(event) => onChange(event.target.value)}
        size="small"
      >
        {weekdays.map((weekday) => (
          <MenuItem key={weekday.value} value={weekday.value}>
            {weekday.name}
          </MenuItem>
        ))}
      </Select>
      {isLoading && <LinearProgress sx={{ mt: 2 }} />}
      {!!data?.length && (
        <FormHelperText>
          <Typography variant="caption" color="warning.main">
            Plan for this weekday already exists, you can see it here (TODO) or
            save to replace it.
          </Typography>
        </FormHelperText>
      )}
    </FormControl>
  );
};
