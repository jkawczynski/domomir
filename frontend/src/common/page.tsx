import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import Typography from "@mui/material/Typography";
import { FunctionComponent } from "react";
import { useLocation } from "wouter";

export type PageAction = {
  icon: React.ReactNode;
  onClick: Function;
  name: string;
};
export type SubNavigation = {
  path: string;
  name: string;
  icon: React.ReactNode;
};

const PageBottomNavigation: FunctionComponent<{
  subNavigation?: SubNavigation[];
}> = ({ subNavigation }) => {
  const [location, setLocation] = useLocation();
  if (!subNavigation) {
    return null;
  }

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        onChange={(event, newValue) => setLocation(newValue)}
        value={location}
      >
        {subNavigation.map((navigation) => (
          <BottomNavigationAction
            label={navigation.name}
            icon={navigation.icon}
            value={navigation.path}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

const PageActions: FunctionComponent<{
  actions?: PageAction[];
}> = ({ actions }) => {
  if (!actions) {
    return null;
  }
  return (
    <SpeedDial
      ariaLabel="Add"
      sx={{ position: "fixed", bottom: 30, right: 16 }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={() => action.onClick()}
        />
      ))}
    </SpeedDial>
  );
};

export const Page: FunctionComponent<{
  title?: string;
  children?: React.ReactNode;
  subNavigation?: SubNavigation[];
  actions?: PageAction[];
}> = ({ title, actions, children, subNavigation }) => {
  return (
    <Container>
      <Box pb={8}>
        <Typography mt={2} variant="h2">
          {title}
        </Typography>
        {children}
        <PageBottomNavigation subNavigation={subNavigation} />
      </Box>
      <PageActions actions={actions} />
    </Container>
  );
};
