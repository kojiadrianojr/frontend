"use client";

import useSWR from "swr";
import { useEffect, useState } from "react";
import { fetcher } from "@/app/fetcher";
import { AuthActions } from "@/app/auth/utils";
import { useRouter } from "next/navigation";
import { Avatar, Box, Button, Card, Container, Grid } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useToast } from "../feature/Toast";
import dataActions from "./hooks";
import BlogItem from "./foundation/BlogItem";
import { AVATAR_URL } from "../config";
import SearchFilterSort from "../foundation/Filters";

export default function Blogsite() {
  const { logout, removeTokens } = AuthActions();
  const { fetchData } = dataActions();
  const router = useRouter();
  const { handleToast } = useToast();

  const [fetchedData, setFetchedData] = useState([]);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [sort, setSort] = useState<string>("");

  const { data: user } = useSWR("/auth/users/me", fetcher);
  const avatarUrl = `${AVATAR_URL}/set/${user?.username}.svg`;

  useEffect(() => {
    const handleFetchData = async () => {
      try {
        const response = await fetchData().res((r) => r.json());
        setData(response);
        setFetchedData(response);
        console.log("data:", response);
      } catch (err) {
        console.error(err);
      }
    };
    handleFetchData();
  }, []);

  const onSearch = (q: string) => setQuery(q);
  const onFilter = (q: string) => setFilter(q);
  const onSort = (q: string) => setSort(q);

  //  For handling search
  useEffect(() => {
    const handleSearch = () => {
      if (!query) {
        setData(fetchedData);
      }
      const q = query.toLowerCase();
      const res = fetchedData.filter((item: any) => {
        return (
          item?.owner.toLowerCase().includes(q) ||
          item?.title.toLowerCase().includes(q) ||
          item?.description.toLowerCase().includes(q)
        );
      });
      setData(res);
    };
    handleSearch();
  }, [query]);

  //  For handling filter
  useEffect(() => {
    const handleFilter = () => {
      switch (filter) {
        case "mine":
          const res = fetchedData.filter(
            (item: any) => item.owner === user?.username
          );
          setData(res);
          break;
        default:
          setData(fetchedData);
          break;
      }
    };
    handleFilter();
  }, [filter]);

  // For handling sort
  useEffect(() => {
    const compareDates = (
      arg1: { [key: string]: string },
      arg2: { [key: string]: string }
    ) => {
      const date1: any = new Date(arg1.created);
      const date2: any = new Date(arg2.created);

      return date1 - date2;
    };

    const handleSort = () => {
      let res;
      switch (sort) {
        case "recent":
          res = [...data].sort(compareDates).reverse();
          setData(res);
          break;
        case "oldest":
          res = [...data].sort(compareDates);
          setData(res);
          break;
        case "content":
          res = [...data].sort(
            (a: { [key: string]: string }, b: { [key: string]: string }) =>
              a.description.localeCompare(b.description)
          );
          setData(res);
          break;
        default:
          setData(fetchedData);
          break;
      }
    };
    handleSort();
  }, [sort]);

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
    setFetchedData((items) => items.filter((item: any) => item.id !== id));
  };
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
            md: "40%",
          },
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">Hi, {user?.username}!</h1>
            <Avatar
              alt={user?.username}
              src={avatarUrl}
              className="mr-2 w-20 h-20"
            />
          </div>
          <Button onClick={handleLogout} variant="outlined" color="error">
            Disconnect
          </Button>
        </Box>
      </Card>
      <Card sx={{ mt: 4, p: 5 }}>
        <SearchFilterSort
          onSearch={onSearch}
          onFilter={onFilter}
          onSort={onSort}
        />
      </Card>
      <Card sx={{ mt: 4, p: 5 }}>
        <div className="mt-2 mb-2">
          <Button onClick={() => router.push("/add")} startIcon={<Add />}>
            Write new post
          </Button>
        </div>
        <Grid container spacing={2} alignItems="baseline">
          {data &&
            data.map((item: any) => (
              <Grid item key={item.id} xs={12} md={6}>
                <BlogItem
                  id={item.id}
                  owner={item.owner}
                  title={item.title}
                  created={item.created}
                  description={item.description}
                  onEdit={() => router.push(`/update/${item.id}`)}
                  onDelete={handleDelete}
                />
              </Grid>
            ))}
        </Grid>
      </Card>
    </Container>
  );
}
