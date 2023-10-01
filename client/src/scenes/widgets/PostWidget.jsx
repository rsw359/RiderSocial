import {
	ChatBubbleOutlineOutlined,
	FavoriteBorderOutlined,
	FavoriteOutlined,
	ShareOutlined,
	DeleteOutlined,
} from "@mui/icons-material";
import {
	Box,
	Divider,
	IconButton,
	Typography,
	useTheme,
	InputBase,
	Button,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import { setPosts } from "state";

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
	isProfile,
}) => {
	const [isComments, setIsComments] = useState(false);
	const [isCommenting, setIsCommenting] = useState(false);
	const [comment, setComment] = useState("");
	const dispatch = useDispatch();
	const token = useSelector((state) => state.token);
	const loggedInUserId = useSelector((state) => state.user._id);
	const commenter = useSelector((state) => state.user.firstName);
	const isLiked = Boolean(likes[loggedInUserId]); //sets islked to true if the current user has liked the post as a bool
	const likeCount = Object.keys(likes).length; //grabs the number of likes by the number of keys in the likes object
	const toggleCommentBox = () => setIsCommenting(!isCommenting); //toggles the comment box
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

	const postComment = async () => {
		try {
			const response = await fetch(
				`http://localhost:3001/posts/${postId}/comments`,
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ comment: `${commenter} says: ${comment}` }),
				}
			);

			if (response.ok) {
				const updatedPost = await response.json();
				dispatch(setPost({ post: updatedPost }));
			} else {
				console.error("Failed to add comment");
			}
		} catch (err) {
			console.error("Error adding comment:", err);
		}

		toggleCommentBox();
	};

	const handleDelete = async () => {
		try {
			if (!token || loggedInUserId !== postUserId) {
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
				if (isProfile) {
					const updatedResponse = await fetch(
						`http://localhost:3001/posts/${postUserId}/posts`,
						{
							method: "GET",
							headers: {
								Authorization: `Bearer ${token}`,
								"Content-Type": "application/json",
							},
						}
					);
					const updatedPosts = await updatedResponse.json();
					dispatch(setPosts({ posts: updatedPosts }));
				} else {
					const updatedResponse = await fetch("http://localhost:3001/posts", {
						method: "GET",
						headers: {
							Authorization: `Bearer ${token}`,
							"Content-Type": "application/json",
						},
					});
					const updatedPosts = await updatedResponse.json();
					dispatch(setPosts({ posts: updatedPosts }));
				}
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
				isProfile={isProfile}
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
						<Typography sx={{ color: primary }}>{comments.length}</Typography>
					</FlexBetween>
				</FlexBetween>
				{/* This is where the delete button is */}

				<FlexBetween gap="0.3rem">
					{loggedInUserId === postUserId && (
						<IconButton onClick={handleDelete}>
							<DeleteOutlined />
						</IconButton>
					)}
					{/* This is where the share button is */}
					<IconButton>
						<ShareOutlined />
					</IconButton>
				</FlexBetween>
			</FlexBetween>
			{/* This is where the comment box is */}
			{isComments && (
				<Box mt="0.5rem">
					<Typography
						sx={{
							color: main,
							m: "0.5rem",
							pl: "1rem",
							fontSize: "15px",
							cursor: "pointer",
							textDecoration: "underline",
						}}
						onClick={toggleCommentBox}
					>
						Add a new comment
					</Typography>
					{isCommenting && (
						<Box>
							<InputBase
								placeholder="Add a comment..."
								onChange={(event) => setComment(event.target.value)}
								value={comment}
								sx={{
									width: "80%",
								}}
							/>

							<Button
								onClick={postComment}
								sx={{
									color: palette.background.alt,
									backgroundColor: palette.primary.main,
									borderRadius: "3rem",
									height: "1.5rem",
								}}
							>
								Submit
							</Button>
						</Box>
					)}
					{/* This is where all comments are */}
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
