"use client";

import useSWR from "swr";
import { fetcher } from "@/app/fetcher";
import { AuthActions } from "@/app/auth/utils";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Grid,
  IconButton,
} from "@mui/material";
import { useToast } from "../feature/Toast";
import { Add } from "@mui/icons-material";
import dataActions from "./hooks";
import { useEffect, useState } from "react";
import BlogItem from "./foundation/BlogItem";
import { AVATAR_URL } from "../config";

export default function Blogsite() {
  const [data, setData] = useState([]);
  const router = useRouter();
  const { handleToast } = useToast();
  const { data: user } = useSWR("/auth/users/me", fetcher);
  const { logout, removeTokens } = AuthActions();
  const { fetchData } = dataActions();

  useEffect(() => {
    const handleFetchData = async () => {
      const res = await fetchData().res((r) => r.json());
      setData(res);
    };
    handleFetchData().catch(console.error);
  }, [fetchData]);

  const handleLogout = () => {
    logout()
      .res(() => {
        removeTokens();
        handleToast({
          type: "success",
          message: `See you again, ${user?.username}!`,
        });
        router.push("/");
      })
      .catch(() => {
        removeTokens();
        handleToast({
          type: "error",
          message: "Unexpected Error occured, please try again",
        });
        router.push("/");
      });
  };

  const handleDelete = (id: number) => {
    setData((items) => items.filter((item: any) => item.id !== id));
  };

  const avatarUrl = `${AVATAR_URL}/set/${user?.username}.svg`;
  return (
    <Container
      sx={{
        p: {
          xs: 1,
          sm: 5,
        },
      }}
    >
      <Card
        sx={{
          p: 5,
          width: {
            xs: "100%",
            md: "50%",
          },
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">Hi, {user?.username}!</h1>
            <Avatar alt={user?.username} src={avatarUrl} className="mr-2 w-20 h-20" />
          </div>
          <Button onClick={handleLogout} variant="outlined" color="error">
            Disconnect
          </Button>
        </Box>
      </Card>
      <Card sx={{ mt: 4, p: 5 }}>
        <div className="mt-2 mb-2">
          <Button onClick={() => router.push("/add")} startIcon={<Add />}>
            Write new post
          </Button>
        </div>
        <Grid container spacing={2} alignItems="center">
          {!data ? (
            <p> None found </p>
          ) : (
            data.map((item: any) => (
              <Grid item key={item.id} xs={12} md={6}>
                <BlogItem
                  id={item.id}
                  owner={item.owner}
                  title={item.title}
                  description={item.description}
                  onEdit={() => router.push(`/update/${item.id}`)}
                  onDelete={handleDelete}
                />
              </Grid>
            ))
          )}
        </Grid>
      </Card>
    </Container>
  );
}
