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
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { AccountCircle, Key } from "@mui/icons-material";
import { useToast } from "../Toast";
import { FormBox, FormCard, FormContainer } from "@/app/foundation/FormLayout";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();
  const { handleToast } = useToast();
  const router = useRouter();
  const { login, storeToken } = AuthActions();

  const handleSubmitFunction = (data: FormData) => {
    login(data.username, data.password)
      .json((json) => {
        storeToken(json.access, "access");
        storeToken(json.refresh, "refresh");
        handleToast({ type: "success", message: "Logged in!" });
        router.push("Blogsite");
      })
      .catch((err) => {
        setError("root", { type: "manual", message: err.json.detail });
        handleToast({ type: "error", message: err.json.detail });
      });
  };
  return (
    <FormContainer className="max-w-md">
      <FormCard>
        <Box className="mt-3 text-left">
          <Typography variant="h5" fontWeight='bold'>
            Sign in to your account
          </Typography>
          <Button onClick={() => router.push("/auth/register")}>
            <span className="text-gray-500">New user?</span> &nbsp; Register here
          </Button>
        </Box>
        <form onSubmit={handleSubmit(handleSubmitFunction)}>
          <FormBox>
            <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              fullWidth
              required
              variant="standard"
              id="username-field"
              label="Username"
              {...register("username", { required: true })}
              error={!!errors.username}
              helperText={errors.username && "username is required"}
            />
          </FormBox>
          <FormBox>
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
              helperText={!!errors.password && "password is required"}
            />
          </FormBox>
          <Box className="text-center mt-6">
            <Button fullWidth variant="contained" type="submit">Login</Button>
          </Box>
        </form>
      </FormCard>
    </FormContainer>
  );
};

export default Login;
