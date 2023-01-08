import { Typography } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import { FunctionComponent } from "react";

export const RecipeDescription: FunctionComponent<{
  value?: string;
  onChange?: () => void;
  error?: string;
}> = ({ value, onChange, error }) => {
  const tinyMceConfig = {
    menubar: false, 
    statusbar: false,
  };
  return (
    <>
      <Typography variant="h6">Description:</Typography>
      <Editor
        init={tinyMceConfig}
        value={value}
        onEditorChange={onChange}
      />
      {error && <Typography variant="caption">{error}</Typography>}
    </>
  );
};
