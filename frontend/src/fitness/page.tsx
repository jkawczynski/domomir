import { FunctionComponent } from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

import { Page, PageAction } from "../common/page";

const subNavigation = [
  { name: "Plans", path: "/plans", icon: <CalendarMonthIcon /> },
  { name: "Trainings", path: "/trainings", icon: <FitnessCenterIcon/> },
];

export const FitnessPage: FunctionComponent<{
  children?: React.ReactNode;
  actions?: PageAction[];
  title: string;
}> = ({ children, actions, title }) => {
  return (
    <Page title={title} actions={actions} subNavigation={subNavigation}>
      {children}
    </Page>
  );
};
