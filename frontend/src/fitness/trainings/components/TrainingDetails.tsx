import { Box, Button, ButtonGroup, Grid, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import { FunctionComponent } from "react";

import { TimeCounter } from "../../../common/components/TimeCounter";
import { Training, TrainingExercise } from "../../api/models";

const headers = ["Exercise", "Set number", "Time spent", "Weight", "Reps"];

const ExerciseRow: FunctionComponent<{ exercise: TrainingExercise }> = ({
  exercise,
}) => {
  const timeSpent = moment
    .duration(moment(exercise.started).diff(moment(exercise.completed)))
    .humanize(false, { ss: 1 });
  return (
    <TableRow
      key={exercise.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {exercise.name}
      </TableCell>
      <TableCell align="right">{exercise.set_number}</TableCell>
      <TableCell align="right">{timeSpent}</TableCell>
      <TableCell align="right">{exercise.weight}</TableCell>
      <TableCell align="right">{exercise.reps}</TableCell>
    </TableRow>
  );
};

export const TrainingDetails: FunctionComponent<{ training: Training }> = ({
  training,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell align={index > 0 ? "right" : undefined}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {training.exercises.map((exercise) => (
            <ExerciseRow exercise={exercise} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const RunningTrainingDetails: FunctionComponent<{
  training: Training;
  onDelete: () => void;
}> = ({ training, onDelete }) => {
  return (
    <Box mt={2}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography>Workout time:</Typography>
        </Grid>
        <Grid item xs={8}>
          <TimeCounter startFrom={training.started} />
        </Grid>
        <Grid item xs={4}>
          <Typography>Actions:</Typography>
        </Grid>
        <Grid item xs={8}>
          <ButtonGroup variant="contained">
            <Button color="error" size="small" onClick={onDelete}>
              Stop and Discard
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Box>
  );
};
