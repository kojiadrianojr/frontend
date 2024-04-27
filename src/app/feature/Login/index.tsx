import React from "react";
import { useForm } from "react-hook-form";
import { AuthActions } from "../../auth/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FormData } from "./index.d";
import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { AccountCircle, Key } from "@mui/icons-material";
import { API_URL } from "@/app/config";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();
  const router = useRouter();
  const { login, storeToken } = AuthActions();

  const handleSubmitFunction = (data: FormData) => {
    login(data.username, data.password)
      .json((json) => {
        storeToken(json.access, "access");
        storeToken(json.refresh, "refresh");

        router.push("blogsite");
      })
      .catch((err) => {
        setError("root", { type: "manual", message: err.json.detail });
      });
  };
  return (
    <Container
      component="div"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card raised sx={{ p: 5, width: "50vw" }}>
        <Typography variant="h4" align="center">
          Login to your account
        </Typography>
        <Box component="form" onSubmit={handleSubmit(handleSubmitFunction)}>
          <Box
            sx={{ display: "flex", alignItems: "flex-end" }}
            className="mt-3"
          >
            <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              fullWidth
              required
              variant="standard"
              id="email-field"
              label="username"
              {...register("username", { required: true })}
              error={!!errors.username}
              helperText={errors.username && "Email is required"}
            />
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "flex-end" }}
            className="mt-3"
          >
            <Key sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              fullWidth
              required
              variant="standard"
              id="password-field"
              label="Password"
              type="password"
              {...register("password", { required: true })}
              error={!!errors.password}
              helperText={!!errors.password && "Password is required"}
            />
          </Box>
          <Box className="text-center mt-6">
            <Button type="submit">Login</Button>
          </Box>
          {errors.root && (
            <span className="text-xs text-red-600">{errors.root.message}</span>
          )}
        </Box>
        <div className="mt-3 text-center">
          <Link
            href="/auth/password/reset-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </Card>
    </Container>
  );
};

export default Login;
