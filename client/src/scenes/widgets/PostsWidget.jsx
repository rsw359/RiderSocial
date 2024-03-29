import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget.jsx";

const PostsWidget = ({ userId, isProfile = false }) => {
	const dispatch = useDispatch();
	const posts = useSelector((state) => state.posts); //redux store list of posts
	const token = useSelector((state) => state.token); //redux store token

	const getPosts = async () => {
		const response = await fetch("https://romance-server.onrender.com/posts", {
			method: "GET",
			headers: { Authorization: `Bearer ${token}` },
		});
		const data = await response.json();
		dispatch(setPosts({ posts: data }));
	};

	const getUserPosts = async () => {
		const response = await fetch(
			`https://romance-server.onrender.com/posts/${userId}/posts`,
			{
				method: "GET",
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		const data = await response.json();
		dispatch(setPosts({ posts: data }));
	};

	useEffect(() => {
		if (isProfile) {
			getUserPosts();
		} else {
			getPosts();
		}
	}, []); //eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			{posts
				.slice()
				.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
				.map(
					({
						_id,
						userId,
						firstName,
						lastName,
						description,
						location,
						picturePath,
						userPicturePath,
						likes,
						comments,
					}) => (
						<PostWidget
							key={_id}
							postId={_id}
							postUserId={userId}
							name={`${firstName} ${lastName}`}
							description={description}
							location={location}
							picturePath={picturePath}
							userPicturePath={userPicturePath}
							likes={likes}
							comments={comments}
							isProfile={isProfile}
						/>
					)
				)}
		</>
	);
};

export default PostsWidget;
