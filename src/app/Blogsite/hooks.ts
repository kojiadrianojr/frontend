import wretch from "wretch";
import { api } from "../config";
import { AuthActions } from "../auth/utils";

const retrieveToken = (type: string) => {
  const { getToken } = AuthActions();
  return getToken(type);
};

const fetchData = () => {
  const accessToken = retrieveToken("access");
  return api.auth(`Bearer ${accessToken}`).get("/api/blog/");
};

const deleteBlog = (id: number) => {
  const accessToken = retrieveToken("access");
  return api.auth(`Bearer ${accessToken}`).url(`/api/blog/${id}`).delete();
};

const fetchBlog = (id: number) => {
  const accessToken = retrieveToken("access");
  return api.auth(`Bearer ${accessToken}`).get(`/api/blog/${id}/`);
};

const updateBlog = (
  id: number,
  data: { title: string; description: string }
) => {
  const accessToken = retrieveToken("access");
  return api.auth(`Bearer ${accessToken}`).url(`/api/blog/${id}/`).patch(data);
};

const postBlog = (payload: {
  owner: string;
  title: string;
  description: string;
}) => {
  const accessToken = retrieveToken("access");
  return api.auth(`Bearer ${accessToken}`).post(payload, "/api/blog/");
};

const dataActions = () => {
  return {
    fetchData,
    deleteBlog,
    postBlog,
    fetchBlog,
    updateBlog,
  };
};

export default dataActions;
