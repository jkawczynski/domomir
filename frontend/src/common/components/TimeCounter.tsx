import { Box, CircularProgress, Typography } from "@mui/material";
import moment from "moment";
import { FunctionComponent, useEffect, useState } from "react";

const TimerCounterCog: FunctionComponent<{
  timeUnitElapsed: number;
  timeUnit: string;
}> = ({ timeUnitElapsed, timeUnit }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex", ml: 1 }}>
      <CircularProgress
        variant="determinate"
        value={(timeUnitElapsed / 60) * 100}
        color="secondary"
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${timeUnitElapsed}${timeUnit}`}</Typography>
      </Box>
    </Box>
  );
};

export const TimeCounter: FunctionComponent<{
  startFrom?: Date;
  endAt?: Date;
  label?: string;
  hideHours?: boolean;
  hideMinutes?: boolean;
  hideSeconds?: boolean;
}> = ({ startFrom, endAt, label, hideHours, hideMinutes, hideSeconds }) => {
  const difference = moment(endAt).diff(moment(startFrom), "seconds");
  const [secondsElapsed, setSecondsElapsed] = useState(difference % 60);
  const [minutesElapsed, setMinutesElapsed] = useState(
    Math.round(difference / 60) & 60
  );
  const [hoursElapsed, setHoursElapsed] = useState(
    Math.round(difference / 60 / 60)
  );

  const onSetMinutesElapsed = (prevMinutes: number) => {
    if (prevMinutes >= 60) {
      setHoursElapsed(hoursElapsed + 1);
    }
    return prevMinutes >= 60 ? 0 : prevMinutes + 1;
  };

  const onSetSecondsElapsed = (prevSeconds: number) => {
    if (prevSeconds >= 60) {
      setMinutesElapsed(onSetMinutesElapsed);
    }
    return prevSeconds >= 60 ? 0 : prevSeconds + 1;
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed(onSetSecondsElapsed);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <Box>
      {!!label && (
        <Typography component="div" variant="subtitle2" sx={{ mb: 1 }}>
          {label}
        </Typography>
      )}
      {!hideHours && (
        <TimerCounterCog timeUnitElapsed={hoursElapsed} timeUnit="h" />
      )}
      {!hideMinutes && (
        <TimerCounterCog timeUnitElapsed={minutesElapsed} timeUnit="m" />
      )}
      {!hideSeconds && (
        <TimerCounterCog timeUnitElapsed={secondsElapsed} timeUnit="s" />
      )}
    </Box>
  );
};
