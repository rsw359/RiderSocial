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
				src="https://res.cloudinary.com/dvdtehk9y/image/upload/v1692161287/GR015265.jpg"
				alt="advertisement"
				style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
			/>
			<FlexBetween>
				<Typography color={main}>Chappeau Bikes</Typography>
				<Typography color={medium}>ChappeauBikes.com</Typography>
			</FlexBetween>
			<Typography color={medium} m="0.5rem 0">
				New and Used High-End bikes, Reasonable Prices.
			</Typography>
		</WidgetWrapper>
	);
};

export default AdWidget;
