import FlexBetween from "components/FlexBetween";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";


const MarketingBox = ({title,icon,description,navigation}) => {

    const navigate = useNavigate();

    return ( 
        <Box
        gridColumn="span 2"
        gridRow="span 1"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        p="1.25rem 1rem"
        flex="1 1 100%"
        backgroundColor="white"
        borderRadius="0.55rem"
        onClick={() => navigate(navigation)}
        sx={{
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
            cursor: "pointer",
            "&:hover": {
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                },
            }}
         >
        <FlexBetween>
          <Typography variant="h6"
           sx={{ 
            color: "black",
            fontSize: "0.9rem",
          }}
          >
            {title}
          </Typography>
          {icon}
          </FlexBetween>
          <Typography
           mt={1}
            sx={{
                color: "grey",
                fontSize: "0.6rem",
            }}
          >{description}</Typography>
      </Box>
     );
}
 
export default MarketingBox;