import useSWR from "swr";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import moment from "moment";
import { Props } from "./index.d";
import { Delete, Edit } from "@mui/icons-material";
import { fetcher } from "@/app/fetcher";
import dataActions from "../../hooks";
import { AVATAR_URL } from "@/app/config";

const BlogItem = (props: Props) => {
  const { data: user } = useSWR("/auth/users/me", fetcher);
  const { id, owner, title, description, onEdit, onDelete, created} = props;
  const { deleteBlog } = dataActions();
  //  This is just for using avatarURL
  const avatarUrl = `${AVATAR_URL}/set/${owner}.svg`;
  return (
    <Card sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
      <CardContent sx={{ padding: (theme) => theme.spacing(2) }}>
        <Typography variant="h5">{title}</Typography>
        <Typography fontSize="0.7em" variant="subtitle1" color="textSecondary">{moment(created).calendar()}</Typography>
        <Box sx={{ display: "flex", alignItems: "center", p: 1, mb: 2 }}>
          <Avatar alt={owner} src={avatarUrl} className="mr-2" />
          <Typography variant="h5" gutterBottom>
            {owner}
          </Typography>
        </Box>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      {owner === user?.username && (
        <CardActions className="blog-item-actions">
          <IconButton onClick={onEdit}>
            <Edit />
          </IconButton>
          <IconButton onClick={onDelete}>
            <Delete
              onClick={() => {
                // deleteBlog(id);
                onDelete(id);
              }}
            />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
};

export default BlogItem;
