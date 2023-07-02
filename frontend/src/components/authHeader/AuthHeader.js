import { Box } from "@mui/material";
import Typography from "@mui/material";

const AuthHeader = ({title,subtitle}) => {
    return ( 
        <Box>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            mb:"20px"
          }}
        >
        {title}
        </Typography>
        <Typography
          variant="h5"
        >
        {subtitle}
        </Typography>

    </Box>
     );
}
 
export default AuthHeader;