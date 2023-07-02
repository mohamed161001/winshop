import { Typography , Box } from "@mui/material";

const Header = ({title , subtitle}) => {

    return ( 
        <Box>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                mb:"5px"
              }}
            >
            {title}
            </Typography>
            <Typography
              mt={1}
              sx={{
                  color: "grey",
                  fontSize: "0.8rem",
              }}
            >
            {subtitle}
            </Typography>

        </Box>

     );
}
 
export default Header;