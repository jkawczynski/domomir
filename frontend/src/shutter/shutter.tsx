import { FunctionComponent, useState } from "react";
import { Spinner } from "../common/spinner";
import { Page } from "../common/page";
import { useQuery } from "@tanstack/react-query";
import { ShutterCommandButtons } from "./shutter-command-button";
import { getShutterStatus } from "../api/shutter.api";

export const ShutterStatus: FunctionComponent<{ onStatusLoaded?: Function }> =
  ({ onStatusLoaded }) => {
    const { isError, data } = useQuery(["shutter-status"], getShutterStatus, {
      refetchInterval: 1000,
    });

    if (!data) return <Spinner />;
    if (isError) return <span>Error loading shutter status</span>;

    if (onStatusLoaded) {
      onStatusLoaded(data);
    }

    return (
      <p className="card-text">
        <b>Status:</b>
        <span className="text-success"> Online</span>
        <br />
        <b>Position: </b>
        <span id="position"> {data.currentPos.position}</span>%
      </p>
    );
  };

export const Shutter: FunctionComponent = () => {
  const [isStatusLoaded, setIsStatusLoaded] = useState(false);

  return (
    <Page title="Shutter">
        <ShutterStatus onStatusLoaded={() => setIsStatusLoaded(true)} />
      <ShutterCommandButtons disabled={!isStatusLoaded} />
    </Page>
  );
};
