"use client";

import useSWR from "swr";
import { fetcher } from "@/app/fetcher";
import { AuthActions } from "@/app/auth/utils";
import { useRouter } from "next/navigation";
import { Button, Card, Container } from "@mui/material";
import { useToast } from "../feature/Toast";

export default function Blogsite() {
  const router = useRouter();
  const { handleToast } = useToast();
  const { data: user } = useSWR("/auth/users/me", fetcher);

  const { logout, removeTokens } = AuthActions();

  const handleLogout = () => {
    logout()
      .res(() => {
        removeTokens();
        handleToast({type: "success", message: "Logged out successfully"})
        router.push("/");
      })
      .catch(() => {
        removeTokens();
        handleToast({type: "error", message: "Unexpected Error occured, please try again"});
        router.push("/");
      });
  };

  return (
    <Container sx={{p: 5}}>
      <Card sx={{ p: 5, width: '50%'}}>
        <h1 className="text-2xl font-bold mb-4">Hi, {user?.username}!</h1>
        <p className="mb-4">Your account details:</p>
        <ul className="mb-4">
          <li>Username: {user?.username}</li>
          <li>Email: {user?.email}</li>
        </ul>
        <Button
          onClick={handleLogout}
          variant="outlined"
          color="error"
        >
          Disconnect
        </Button>
      </Card>
    </Container>
  );
}