import {
	ChatBubbleOutlineOutlined,
	FavoriteBorderOutlined,
	FavoriteOutlined,
	ShareOutlined,
	DeleteOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const PostWidget = ({
	postId,
	postUserId,
	name,
	description,
	location,
	picturePath,
	userPicturePath,
	likes,
	comments,
}) => {
	const [isComments, setIsComments] = useState(false);
	const dispatch = useDispatch();
	const token = useSelector((state) => state.token);
	const loggedInUserId = useSelector((state) => state.user._id);
	const isLiked = Boolean(likes[loggedInUserId]); //sets islked to true if the current user has liked the post as a bool
	const likeCount = Object.keys(likes).length; //grabs the number of likes by the number of keys in the likes object

	const { palette } = useTheme();
	const primary = palette.primary.main;
	const main = palette.primary.main;

	const patchLike = async () => {
		const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userId: loggedInUserId }),
		});
		const updatedPost = await response.json();
		dispatch(setPost({ post: updatedPost }));
	};

	const handleDelete = async () => {
		try {
			if (!token || loggedInUserId !== postUserId) {
				// Unauthorized: User is not logged in or not the author of the post
				console.error("Unauthorized to delete this post.");
				return;
			}

			const response = await fetch(`http://localhost:3001/posts/${postId}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});

			if (response.ok) {
				// Post deleted successfully, update UI as needed
				dispatch(setPost({ post: null }));
			} else {
				// Handle the case where the deletion request failed
				console.error("Failed to delete post");
			}
		} catch (error) {
			console.error("Error deleting post:", error);
		}
	};

	return (
		<WidgetWrapper m="2.5rem">
			<Friend
				friendId={postUserId}
				name={name}
				subtitle={location}
				userPicturePath={userPicturePath}
			/>
			<Typography color={main} sx={{ mt: "1rem" }}>
				{description}
			</Typography>
			{picturePath && (
				<img
					width="100%"
					height="100%"
					alt="post"
					style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
					src={picturePath}
				/>
			)}
			<FlexBetween sx={{ mt: "0.25rem" }}>
				<FlexBetween gap="1rem">
					{/* This is where the like button is */}
					<FlexBetween gap="0.3rem">
						<IconButton onClick={patchLike}>
							{isLiked ? (
								<FavoriteOutlined sx={{ color: primary }} />
							) : (
								<FavoriteBorderOutlined />
							)}
						</IconButton>
						<Typography color={main}>{likeCount}</Typography>
					</FlexBetween>
					{/* This is where the comment button is */}
					<FlexBetween gap="0.3rem">
						<IconButton onClick={() => setIsComments(!isComments)}>
							<ChatBubbleOutlineOutlined />
						</IconButton>
						<Typography>{comments.length}</Typography>
					</FlexBetween>
				</FlexBetween>
				{/* This is where the delete button is */}

				{/* This is where the share button is */}
				<FlexBetween gap="0.3rem">
					<IconButton onClick={handleDelete}>
						<DeleteOutlined />
					</IconButton>
					<IconButton>
						<ShareOutlined />
					</IconButton>
				</FlexBetween>
			</FlexBetween>
			{isComments && (
				<Box mt="0.5rem">
					{comments.map((comment, i) => (
						<Box key={`${name}-${i}`}>
							<Divider />
							<Typography sx={{ color: main, m: "0.5rem", pl: "1rem" }}>
								{comment}
							</Typography>
						</Box>
					))}
					<Divider />
				</Box>
			)}
		</WidgetWrapper>
	);
};

export default PostWidget;
