import AddIcon from "@mui/icons-material/Add";
import { useQuery } from "@tanstack/react-query";
import { FunctionComponent, useState } from "react";
import { useLocation } from "wouter";

import { APIError } from "../../api/common";
import { FullPageLoading } from "../../common/components";
import { getActiveTraining } from "../api";
import { Training } from "../api/models";
import { FitnessPage } from "../page";
import { TrainingAlreadyRunningMessage, TrainingPlansList } from "./components";

export const TrainingPlansPage: FunctionComponent = () => {
  const [, setLocation] = useLocation();
  const [activeTraining, setActiveTraining] = useState<Training>();

  const { isLoading } = useQuery<Training, APIError>(
    ["getActiveTraining"],
    getActiveTraining,
    {
      retry: 0,
      onSuccess: (data) => setActiveTraining(data),
      onError: () => setActiveTraining(undefined),
    }
  );

  if (isLoading) return <FullPageLoading />;

  const pageActions = [
    {
      icon: <AddIcon />,
      name: "Add new",
      onClick: () => setLocation("/plans/new"),
    },
  ];

  return (
    <FitnessPage title="Training plans" actions={pageActions}>
      {activeTraining && (
        <TrainingAlreadyRunningMessage training={activeTraining} />
      )}
      <TrainingPlansList disableStart={!!activeTraining} />
    </FitnessPage>
  );
};
