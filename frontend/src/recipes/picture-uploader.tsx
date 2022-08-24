import { FunctionComponent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { uploadPicture } from "../api/recipes.api";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import UploadIcon from "@mui/icons-material/Upload";

export const PictureUploader: FunctionComponent<{
  onFileSelect: Function;
  error?: string;
}> = ({ onFileSelect, error }) => {
  const [fileName, setFileName] = useState("");

  const mutation = useMutation(uploadPicture, {
    onSuccess: (response) => onFileSelect(response.data["file_id"]),
  });

  const onChange = (event) => {
    const file = event.target.files[0];
    setFileName(file.name);
    mutation.mutate(file);
  };

  return (
    <Stack direction="row" spacing={1}>
      <TextField
        label="Picture"
        sx={{ width: 1 }}
        disabled
        value={fileName}
        error={!!error}
        helperText={error}
      />
      <Button variant="contained" component="label" endIcon={<UploadIcon />}>
        Upload
        <input
          hidden
          accept="image/*"
          multiple
          type="file"
          onChange={onChange}
        />
      </Button>
    </Stack>
  );
};
