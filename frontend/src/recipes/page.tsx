import { Link, useLocation } from "wouter";
import { FunctionComponent } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AddIcon from "@mui/icons-material/Add";

export const RecipesMenuItem: FunctionComponent<{
  name: string;
  path: string;
}> = ({ name, path }) => {
  const [location, _] = useLocation();
  const isActive = location.startsWith(path);
  return (
    <Link
      className={
        isActive
          ? "list-group-item list-group-item-action active"
          : "list-group-item list-group-item-action"
      }
      href={path}
    >
      {name}
    </Link>
  );
};

export const RecipesMenu: FunctionComponent = () => {
  return (
    <ul className="list-group mt-2">
      <RecipesMenuItem name="Recipes list" path="/list" />
      <RecipesMenuItem name="Tags" path="/tags" />
    </ul>
  );
};

const actions = [{ icon: <AddIcon />, name: "Add new recipe" }];

export const RecipesPage: FunctionComponent<{
  title: string;
  pageButtons?: React.ReactNode[];
  children?: React.ReactNode;
}> = ({ title, pageButtons, children }) => {
  return (
    <Container>
      <Typography mt={2} variant="h2">
        {title}
      </Typography>
      {children}
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
          />
        ))}
      </SpeedDial>
    </Container>
  );
};
