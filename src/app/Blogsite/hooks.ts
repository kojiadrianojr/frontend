import wretch from "wretch";
import { api } from "../config";

const fetchData = () => {
  return api.get("/api/blog/");
};

const deleteBlog = (id: number) => {
  return api.url(`/api/blog/${id}`).delete();
};

const fetchBlog = (id: number) => api.get(`/api/blog/${id}/`);
const updateBlog = (
  id: number,
  data: { title: string; description: string }
) => {
  return api.url(`/api/blog/${id}/`).patch(data);
};

const postBlog = (payload: {
  owner: string;
  title: string;
  description: string;
}) => {
  return api.post(payload, "/api/blog/");
};

const dataActions = () => {
  return {
    fetchData,
    deleteBlog,
    postBlog,
    fetchBlog,
    updateBlog
  };
};

export default dataActions;
