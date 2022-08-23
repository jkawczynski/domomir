import { FunctionComponent } from "react";
import { sendShutterCommand } from "../api/shutter.api";

const ShutterCommandButton: FunctionComponent<{
  command: string;
  name: string;
  btnClassName: string;
  disabled?: boolean;
}> = ({ command, name, btnClassName, disabled }) => (
  <button
    className={btnClassName}
    type="button"
    onClick={() => sendShutterCommand(command).then(() => {})}
    disabled={disabled}
  >
    {name}
  </button>
);

export const ShutterCommandButtons: FunctionComponent<{ disabled: boolean }> =
  ({ disabled }) => (
    <div className="row align-items-start">
      <div className="col-12">
        <div className="d-grid gap-4">
          <ShutterCommandButton
            btnClassName="btn btn-primary"
            command="u"
            name="Up"
            disabled={disabled}
          />
          <ShutterCommandButton
            btnClassName="btn btn-warning"
            command="s"
            name="Stop"
            disabled={disabled}
          />
          <ShutterCommandButton
            btnClassName="btn btn-primary"
            command="d"
            name="Down"
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
