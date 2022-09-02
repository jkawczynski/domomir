import { FunctionComponent } from "react";
import CottageIcon from "@mui/icons-material/Cottage";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginData, LoginSchema } from "../api/auth.api";

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
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <CottageIcon />
        </Avatar>
        <Typography component="h2" variant="h5">
          Sign in to Domomir
        </Typography>
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
      </Box>
    </Container>
  );
};
