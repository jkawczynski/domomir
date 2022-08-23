import { FunctionComponent } from "react";
import { useMutation } from "@tanstack/react-query";
import { uploadPicture } from "../api/recipes.api";

export const PictureUploader: FunctionComponent<{
  onFileSelect: Function;
  className?: string;
}> = ({ onFileSelect, className }) => {
  const mutation = useMutation(uploadPicture, {
    onSuccess: (response) => onFileSelect(response.data["file_id"]),
  });

  return (
    <div>
      <input
        type="file"
        className={className ? className : "form-control"}
        accept="image/jpeg, image/jpg"
        onChange={(e) => mutation.mutate(e.target.files[0])}
      />
    </div>
  );
};
