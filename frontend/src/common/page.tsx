import { FunctionComponent } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

type PageAction = {
  icon: React.ReactNode;
  onClick: Function;
  name: string;
};

export const Page: FunctionComponent<{
  title?: string;
  actions?: PageAction[];
  children?: React.ReactNode;
}> = ({ title, actions, children }) => {
  function renderActions() {
    if (!actions) {
      return;
    }
    return (
      <SpeedDial
        ariaLabel="Add"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
    );
  }
  return (
    <Container>
      <Typography mt={2} variant="h2">
        {title}
      </Typography>
      {children}
      {renderActions()}
    </Container>
  );
};
