"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FormBox, FormCard, FormContainer } from "../../foundation/FormLayout";
import { useForm } from "react-hook-form";
import { FormData } from ".";
import dataActions from "../../Blogsite/hooks";
import { useToast } from "../../feature/Toast";
import { Button, ButtonGroup, TextField } from "@mui/material";
import { ErrorMessage } from "@hookform/error-message";

const Page = ({ params }: { params: any }) => {
  const router = useRouter();
  const { handleToast } = useToast();
  const { updateBlog, fetchBlog } = dataActions();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    setValue,
  } = useForm<FormData>();

  const handleSubmitFunction = (data: FormData) => {
    updateBlog(params.blogId, {
      title: data.title,
      description: data.description,
    })
      .json(() => {
        handleToast({ type: "success", message: "Updated successfully " });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchBlog(params.blogId).res((r) => r.json());
        setValue("title", res.title);
        setValue("description", res.description);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <FormContainer>
      <FormCard>
        <form onSubmit={handleSubmit(handleSubmitFunction)}>
          <FormBox className="mb-4">
            <TextField
              focused
              fullWidth
              variant="outlined"
              label="Title"
              {...register("title", { required: "title is required" })}
              error={!!errors.title}
              helperText={<ErrorMessage errors={errors} name="title" />}
            />
          </FormBox>
          <TextField
            fullWidth
            variant="outlined"
            label="Write a description..."
            rows={5}
            focused
            multiline
            {...register("description", {
              required: "description is required",
            })}
            error={!!errors.description}
            helperText={<ErrorMessage errors={errors} name="description" />}
          />
          <ButtonGroup
            className="mb-2 mt-4 flex justify-end"
            variant="outlined"
          >
            <Button onClick={() => router.push("/Blogsite")}>Cancel</Button>
            <Button type="submit">Update</Button>
          </ButtonGroup>
        </form>
      </FormCard>
    </FormContainer>
  );
};

export default Page;
