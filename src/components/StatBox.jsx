import { Box, Typography, useTheme } from "@mui/material";
import ProgressCircle from "./ProgressCircle";
import { tokens } from "../theme";

const StatBox = ({ title, subtitle, progress, increase, icon }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px" p="12px 0" height='70px'>
      <Box display="flex"gap='10px'>
       
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {subtitle}
          </Typography>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.greenAccent[600] }}
          >
            {title}
          </Typography>
     
      </Box>
    </Box>
  );
};

export default StatBox;
