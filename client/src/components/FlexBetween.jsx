import { Box } from "@mui/material";
import { styled } from "@mui/system";

// This is a styled version of the mui Box component that will be used in many places across the app.
const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;
