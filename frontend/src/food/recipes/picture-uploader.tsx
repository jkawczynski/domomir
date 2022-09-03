import UploadIcon from "@mui/icons-material/Upload";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useMutation } from "@tanstack/react-query";
import React, { FunctionComponent, useState } from "react";

import { uploadPicture } from "../../api/recipes.api";

export const PictureUploader: FunctionComponent<{
  onFileSelect: Function;
  error?: string;
}> = ({ onFileSelect, error }) => {
  const [fileName, setFileName] = useState("");

  const mutation = useMutation(uploadPicture, {
    onSuccess: (response) => {
      onFileSelect(response.data["file_id"]);
      setFileName(response.data["file_name"]);
    },
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    const file = event.target.files[0];
    mutation.mutate(file);
  };

  const uploadError = mutation?.error as { message: string };

  return (
    <Stack spacing={0}>
      <Stack direction="row" spacing={1}>
        <TextField
          label="Picture"
          sx={{ width: 1 }}
          disabled
          size="small"
          value={fileName}
          error={!!error || mutation.isError}
          helperText={error || uploadError?.message}
        />
        <Button size="small" variant="contained" component="label">
          <UploadIcon />
          <input
            hidden
            accept="image/*"
            multiple
            type="file"
            onChange={onChange}
            disabled={mutation.isLoading}
          />
        </Button>
      </Stack>
      {mutation.isLoading ? <LinearProgress sx={{mt: 1}}/> : null}
    </Stack>
  );
};
