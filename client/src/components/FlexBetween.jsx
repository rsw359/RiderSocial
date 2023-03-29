import { Box } from "@mui/material";
import { styled } from "@mui/system";

// This is a styled component that is used in many places in the app.
const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;
