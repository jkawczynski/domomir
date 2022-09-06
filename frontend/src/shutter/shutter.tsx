import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { useQuery } from "@tanstack/react-query";
import { FunctionComponent } from "react";

import { getShutterIpAddress, getShutterStatus } from "../api/shutter.api";
import { Page } from "../common/page";
import { Spinner } from "../common/spinner";
import { ShutterCommandButtons } from "./shutter-command-button";

export const OfflineShutterInfo: FunctionComponent = () => {
  return (
    <Box mt={2}>
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "error.main" }}>
            <ErrorIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Offline"
          secondary="Couldn't connect to a shutter"
        />
      </ListItem>
    </Box>
  );
};

export const OnlineShutterInfo: FunctionComponent<{
  proxyAddress: string;
}> = ({ proxyAddress }) => {
  const { data, isError, isLoading } = useQuery(
    ["getShutterStatus", proxyAddress],
    () => getShutterStatus(proxyAddress),
    { refetchInterval: 1000 }
  );
  if (!data && isLoading) return <Spinner />;
  if (isError) return <OfflineShutterInfo />;

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
          secondary={`Position: ${data.shutter.currentPos.position}%`}
        />
      </ListItem>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <ShutterCommandButtons
            proxyAddress={proxyAddress}
            disabled={isError}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export const Shutter: FunctionComponent = () => {
  const { isError, data } = useQuery(["shutteAddr"], getShutterIpAddress);

  if (!data) return <Spinner />;
  if (isError) return <OfflineShutterInfo />;

  return (
    <Page title="Shutter">
      <OnlineShutterInfo proxyAddress={data.proxy_address} />
    </Page>
  );
};
