import { FunctionComponent, useState } from "react";
import { Spinner } from "../common/spinner";
import { Page } from "../common/page";
import { useQuery } from "@tanstack/react-query";
import { ShutterCommandButtons } from "./shutter-command-button";
import { getShutterStatus } from "../api/shutter.api";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import CheckIcon from "@mui/icons-material/Check";
import Grid from "@mui/material/Grid";

export const ShutterStatus: FunctionComponent<{
  status: any;
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
      <ShutterStatus status={data} />
      <Grid container spacing={2}>
        <Grid item xs={10} md={6}>
          <ShutterCommandButtons disabled={isError} />
        </Grid>
      </Grid>
    </Page>
  );
};
