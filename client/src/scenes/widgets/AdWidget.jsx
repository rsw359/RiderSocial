import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdWidget = () => {
	const { palette } = useTheme();
	const dark = palette.neutral.dark;
	const main = palette.neutral.main;
	const medium = palette.neutral.medium;

	return (
		<WidgetWrapper>
			<FlexBetween>
				<Typography variant="h5" color={dark} fontWeight="500">
					Sponsored Content
				</Typography>
				<Typography color={medium}> Create Ad</Typography>
			</FlexBetween>
			<img
				width="100%"
				height="100%"
				src="http://localhost:3001/assets/info4.jpeg"
				alt="advertisement"
				style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
			/>
			<FlexBetween>
				<Typography color={main}>Mika Cosmetics</Typography>
				<Typography color={medium}>mikacosmetics.com</Typography>
			</FlexBetween>
			<Typography color={medium} m="0.5rem 0">
				Your pathway to a more beautiful you with quality skincare products by
				Mika Cosmetics.
			</Typography>
		</WidgetWrapper>
	);
};

export default AdWidget;
