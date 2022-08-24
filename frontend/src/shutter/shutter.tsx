import CheckIcon from "@mui/icons-material/Check";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { useQuery } from "@tanstack/react-query";
import { FunctionComponent } from "react";

import { ShutterStatus, getShutterStatus } from "../api/shutter.api";
import { Page } from "../common/page";
import { Spinner } from "../common/spinner";
import { ShutterCommandButtons } from "./shutter-command-button";

export const ShutterStatusInfo: FunctionComponent<{
  status: ShutterStatus;
}> = ({ status }) => {
  return (
    <Box mt={2}>
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "success.main" }}>
            <CheckIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Online"
          secondary={`Position: ${status.currentPos.position}%`}
        />
      </ListItem>
    </Box>
  );
};

export const Shutter: FunctionComponent = () => {
  const { isError, data } = useQuery(["shutter-status"], getShutterStatus, {
    refetchInterval: 1000,
  });

  if (!data) return <Spinner />;
  if (isError) return <span>Error loading shutter status</span>;

  return (
    <Page title="Shutter">
      <ShutterStatusInfo status={data} />
      <Grid container spacing={2}>
        <Grid item xs={10} md={6}>
          <ShutterCommandButtons disabled={isError} />
        </Grid>
      </Grid>
    </Page>
  );
};
