import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FormData } from "./index.d";
import { AuthActions } from "@/app/auth/utils";
import { useToast } from "../Toast";
import {
  Box,
  Button,
  Card,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { FormBox, FormCard, FormContainer } from "@/app/foundation/FormLayout";
import { AccountCircle, Email, Key } from "@mui/icons-material";
import { useHandleErrors } from "@/app/auth/hooks";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();
  const { register: registerUser } = AuthActions();
  const router = useRouter();
  const { handleToast } = useToast();
  const handleSubmitFunction = (data: FormData) => {
    registerUser(data.email, data.username, data.password)
      .json(() => {
        router.push("/");
        handleToast({ type: "success", message: "Registered successfully" });
      })
      .catch((err) => {
        setError("root", {
          type: "manual",
          message: err.json.detail,
        });

        handleToast({ type: "error", message: useHandleErrors(err.json) });
      });
  };

  return (
    <FormContainer>
      <FormCard>
        <Typography variant="h4" align="center">
          REGISTER
        </Typography>
        <form onSubmit={handleSubmit(handleSubmitFunction)}>
          <FormBox>
            <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              fullWidth
              required
              variant="standard"
              label="Username"
              {...register("username", { required: "username is required" })}
              error={!!errors.username}
              helperText={errors.username && "username is required"}
            />
          </FormBox>
          <FormBox>
            <Email sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              fullWidth
              required
              variant="standard"
              label="Email"
              type="email"
              {...register("email", { required: "email is required" })}
              error={!!errors.email}
              helperText={errors.email && "email is required"}
            />
          </FormBox>
          <FormBox>
            <Key sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              fullWidth
              required
              variant="standard"
              label="Password"
              type="password"
              {...register("password", { required: "password is required" })}
              error={!!errors.password}
              helperText={errors.password && "password is required"}
            />
          </FormBox>
          <Box className="text-center mt-6">
            <Button type="submit">Register</Button>
          </Box>
        </form>
        <Box className="text-center mt-3">
          <Button onClick={() => router.push("/")}>
            Already have an account?
          </Button>
        </Box>
      </FormCard>
    </FormContainer>
  );
};

export default Register;
