import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const ExtendedFriends = ({ friendId, name, subtitle, userPicturePath }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { _id } = useSelector((state) => state.user);
	const token = useSelector((state) => state.token);
	const friends = useSelector((state) => state.user.friends);

	const { palette } = useTheme();
	const light = palette.primary.light;
	const dark = palette.primary.dark;
	const main = palette.neutral.main;
	const medium = palette.neutral.medium;

	// const isFriend = friends.find((friend) => friend._id === friendId);

	// const patchFriend = async () => {
	// 	const response = await fetch(
	// 		`http://localhost:3001/users/${_id}/${friendId}`,
	// 		{
	// 			method: "PATCH",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 				Authorization: `Bearer ${token}`,
	// 			},
	// 		}
	// 	);
	// 	const data = await response.json();
	// 	dispatch(setFriends({ friends: data }));
	// };
	return (
		<FlexBetween>
			<FlexBetween gap="1rem">
				<UserImage image={userPicturePath} size="55px" />
				<Box
					onClick={() => {
						navigate(`/profile/${friendId}`);
						navigate(0); //workaround for react-router-dom bug
					}}
				>
					<Typography
						color={main}
						variant="h5"
						fontWeight="500"
						sx={{
							"&:hover": {
								cursor: "pointer",
								color: light,
							},
						}}
					>
						{name}
					</Typography>
					<Typography color={medium} fontSize="0.75rem">
						{subtitle}
					</Typography>
				</Box>
			</FlexBetween>
		</FlexBetween>
	);
};

export default ExtendedFriends;
