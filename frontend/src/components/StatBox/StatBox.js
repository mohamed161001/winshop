import { Box, Typography} from "@mui/material";
import FlexBetween from "components/FlexBetween";

const StatBox = ({ title, value,increase, icon}) => {
    return ( 
        <Box
          gridColumn="span 3"
          gridRow="span 1"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          p="1.25rem 1rem"
          flex="1 1 100%"
          backgroundColor="white"
          borderRadius="10px"
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.05)"
        >
            <FlexBetween >
                <Typography 
                variant="subtitle1" 
                color="black"
                sx={{
                    fontWeight: 600,
                    fontSize: "0.9rem",
                }}
                >
                    {title}
                </Typography>
                {icon}
            </FlexBetween>
            <Typography 
            variant="h5"
             color="textPrimary"
                sx={{
                    fontWeight: 600,
                    fontSize: "1.3rem",
                }}
             >
                {value}
            </Typography>
            <Typography
            variant="subtitle1"
            color="textSecondary"
            sx={{
                fontWeight: 500,
                fontSize: "0.8rem",
                color: "green",
            }}
            >
                {increase}
            </Typography>
        </Box>
     );
}
 
export default StatBox;