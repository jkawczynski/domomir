import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";

import { LoginData, LoginSchema } from "./api";

export const LoginForm: FunctionComponent<{
  onSubmit: (loginData: LoginData) => void;
  loginError: string;
  isLoading: boolean;
}> = ({ onSubmit, loginError, isLoading }) => {
  const { formState, handleSubmit, register } = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
  });
  const { errors, isSubmitting } = formState;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit((user) => onSubmit(user))}
      noValidate
      sx={{ mt: 1 }}
    >
      <TextField
        label="Username"
        margin="normal"
        fullWidth
        autoFocus
        error={!!errors?.username?.message || !!loginError}
        helperText={errors?.username?.message}
        disabled={isLoading}
        {...register("username")}
      />
      <TextField
        label="Password"
        margin="normal"
        fullWidth
        type="password"
        error={!!errors?.password?.message || !!loginError}
        helperText={errors?.password?.message}
        disabled={isLoading}
        {...register("password")}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={isSubmitting || isLoading}
      >
        Sign In
      </Button>
      <Typography color="error" component="h3">
        {loginError}
      </Typography>
    </Box>
  );
};
