import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { FunctionComponent } from "react";

import { sendShutterCommand } from "../api/shutter.api";

const ShutterCommandButton: FunctionComponent<{
  name: string;
  color: "secondary" | "error";
  disabled?: boolean;
  onClick: () => void;
}> = ({ name, color, disabled, onClick }) => (
  <Button
    color={color}
    variant="outlined"
    disabled={disabled}
    onClick={onClick}
  >
    {name}
  </Button>
);

export const ShutterCommandButtons: FunctionComponent<{
  disabled: boolean;
  proxyAddress: string;
}> = ({ disabled, proxyAddress }) => (
  <Stack mt={2} spacing={2}>
    <ShutterCommandButton
      color="secondary"
      name="Up"
      disabled={disabled}
      onClick={() => sendShutterCommand(proxyAddress, "u")}
    />
    <ShutterCommandButton
      color="error"
      name="Stop"
      disabled={disabled}
      onClick={() => sendShutterCommand(proxyAddress, "s")}
    />
    <ShutterCommandButton
      color="secondary"
      name="Down"
      disabled={disabled}
      onClick={() => sendShutterCommand(proxyAddress, "d")}
    />
  </Stack>
);
