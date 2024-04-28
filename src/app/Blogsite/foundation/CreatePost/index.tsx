import { FormBox, FormCard, FormContainer } from "@/app/foundation/FormLayout";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { fetcher } from "@/app/fetcher";
import { ErrorMessage } from "@hookform/error-message";
import {
  Button,
  ButtonGroup,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useToast } from "@/app/feature/Toast";
import { FormData } from "./index.d";
import dataActions from "../../hooks";
import { handleErrors } from "@/app/auth/hooks";

export default function CreatePost() {
  const router = useRouter();
  const { handleToast } = useToast();
  const { postBlog } = dataActions();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const { data: user } = useSWR("/auth/users/me", fetcher);
  const handleSubmitFunction = (data: FormData) => {
    postBlog({
      owner: user?.username,
      title: data.title,
      description: data.description,
    })
      .json(() => {
        reset();
        handleToast({ type: "success", message: "Thanks for posting!"})
      })
      .catch((err) => {

        setError("root", {
          type: "manual",
          message: err.json.detail,
        });
        // handleToast({ type: "error", message: });
      });
  };
  return (
    <FormContainer>
      <FormCard>
        <form onSubmit={handleSubmit(handleSubmitFunction)}>
          <FormBox className="mb-4">
            <TextField
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
            <Button type="submit">Post</Button>
          </ButtonGroup>
        </form>
      </FormCard>
    </FormContainer>
  );
}
