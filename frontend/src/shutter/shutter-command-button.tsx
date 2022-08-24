import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { FunctionComponent } from "react";

import { sendShutterCommand } from "../api/shutter.api";

const ShutterCommandButton: FunctionComponent<{
  command: string;
  name: string;
  color: string;
  disabled?: boolean;
}> = ({ command, name, color, disabled }) => (
  <Button
    color={color}
    variant="outlined"
    onClick={() => sendShutterCommand(command).then(() => {})}
    disabled={disabled}
  >
    {name}
  </Button>
);

export const ShutterCommandButtons: FunctionComponent<{
  disabled: boolean;
}> = ({ disabled }) => (
  <Stack mt={2} spacing={2}>
    <ShutterCommandButton
      color="secondary"
      command="u"
      name="Up"
      disabled={disabled}
    />
    <ShutterCommandButton
      color="error"
      command="s"
      name="Stop"
      disabled={disabled}
    />
    <ShutterCommandButton
      color="secondary"
      command="d"
      name="Down"
      disabled={disabled}
    />
  </Stack>
);
