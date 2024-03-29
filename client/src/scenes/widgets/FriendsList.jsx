import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setFriends } from "state";

const FriendsList = ({ userId }) => {
	const dispatch = useDispatch();
	const { palette } = useTheme();
	const token = useSelector((state) => state.token);
	const friends = useSelector((state) => state.user.friends);

	const getFriends = async () => {
		const response = await fetch(
			`https://romance-server.onrender.com/users/${userId}/friends`,
			{
				method: "GET",
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		const data = await response.json();
		dispatch(setFriends({ friends: data }));
	};
	useEffect(() => {
		getFriends();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<WidgetWrapper>
			<Typography
				color={palette.neutral.dark}
				variant="h5"
				fontWeight="500"
				sx={{ mb: "1.5rem" }}
			>
				Friends
			</Typography>
			{friends.length === 0 ? (
				<Typography color={palette.neutral.medium}>No friends</Typography>
			) : (
				<Box display="flex" flexDirection="column" gap="1.5rem">
					{friends.map((friend) => (
						<Friend
							key={friend._id}
							userId={userId}
							friendId={friend._id}
							name={`${friend.firstName} ${friend.lastName}`}
							subtitle={friend.occupation}
							userPicturePath={friend.picturePath}
						/>
					))}
				</Box>
			)}
		</WidgetWrapper>
	);
};

export default FriendsList;
