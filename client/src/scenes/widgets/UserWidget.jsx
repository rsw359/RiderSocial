import {
	ManageAccountsOutlined,
	EditOutlined,
	LocationOnOutlined,
	WorkOutlineOutlined,
	PedalBikeOutlined,
} from "@mui/icons-material";

import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, picturePath }) => {
	const [user, setUser] = useState(null);
	const { palette } = useTheme();
	const navigate = useNavigate();
	const token = useSelector((state) => state.token);
	const dark = palette.neutral.dark;
	const medium = palette.neutral.medium;
	const main = palette.neutral.main;

	const getUser = async () => {
		const response = await fetch(`http://localhost:3001/users/${userId}`, {
			method: "GET",
			headers: { Authorization: `Bearer ${token}` },
		});
		const data = await response.json();
		setUser(data);
	};

	useEffect(() => {
		getUser();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	if (!user) {
		return null;
	}

	const {
		firstName,
		lastName,
		location,
		occupation,
		viewedProfile,
		impressions,
		friends,
	} = user;

	return (
		<WidgetWrapper>
			{/* FIRST ROW */}
			<FlexBetween
				gap="0.5rem"
				pb="1.1rem"
				onClick={() => navigate(`/profile/${userId}`)}
			>
				<FlexBetween gap="1rem">
					<UserImage image={picturePath} />
					<Box>
						<Typography
							variant="h4"
							color={dark}
							fontWeight="500"
							sx={{
								"&:hover": {
									color: palette.primary.light,
									cursor: "pointer",
								},
							}}
						>
							{firstName} {lastName}
						</Typography>
						<Typography color={medium}>{friends.length} friends</Typography>
					</Box>
				</FlexBetween>
				<ManageAccountsOutlined />
			</FlexBetween>

			<Divider />

			{/* SECOND ROW */}
			<Box p="1rem 0">
				<Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
					<LocationOnOutlined fontSize="large" sx={{ color: main }} />
					<Typography color={medium}>{location}</Typography>
				</Box>
				<Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
					<WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
					<Typography color={medium}>{occupation}</Typography>
				</Box>
				<Divider />
				<Box display="flex" alignItems="center" gap="1rem" mt="1rem">
					<PedalBikeOutlined fontSize="large" sx={{ color: main }} />
					<Typography color={medium}>{occupation}</Typography>
				</Box>
			</Box>
			<Divider />

			{/* THIRD ROW */}

			{/* FOURTH ROW */}
			<Box p="1rem 0">
				<Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
					Strava Account
				</Typography>

				<FlexBetween gap="1rem" mb="0.5rem">
					<FlexBetween gap="1rem">
						<img
							src="https://res.cloudinary.com/dvdtehk9y/image/upload/c_scale,e_sharpen:1000,w_25/v1694393861/strava_plfvkk.png"
							alt="strava logo"
						/>
						<Box>
							<Typography color={main} fontWeight="500">
								Strava
							</Typography>
							<Typography color={medium}>Link</Typography>
						</Box>
					</FlexBetween>
					<EditOutlined sx={{ color: main }} />
				</FlexBetween>
			</Box>
		</WidgetWrapper>
	);
};

export default UserWidget;
