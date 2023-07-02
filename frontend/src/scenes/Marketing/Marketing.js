import Header from "components/header/Header";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import MarketingBox from "components/marketingBox/MarketingBox";
import { FacebookOutlined } from "@mui/icons-material";
import { Instagram } from "@mui/icons-material";
import { MarkEmailRead } from "@mui/icons-material";
import { Language } from "@mui/icons-material";


const Marketing = () => {
    return ( 
        <Box m="1.5rem 2.5rem">
           <Header title="Marketing"/>
           <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid 
              item
                xs={3}
               >
                <MarketingBox title="Facebook Ads"
                icon={<
                    FacebookOutlined
                    sx={{
                        color: "#3b5998",
                        fontSize: "2rem",
                        }}
                />}
                description="générer le texte d'une publicité Facebook en utilisant l'IA"
                navigation={"/marketing/facebook"}
                />
               </Grid> 
              <Grid 
              item
                xs={3}
               >
                <MarketingBox title="Instagram Ads"
                icon={<
                    Instagram
                    sx={{
                        color: "#C13584",
                        fontSize: "2rem",
                        }}
                />}
                description="générer le texte d'une publicité Instagram en utilisant l'IA"
                navigation={"/marketing/instagram"}
                />
               </Grid> 
              <Grid 
              item
                xs={3}
               >
                <MarketingBox title="Email"
                icon={<
                    MarkEmailRead
                    sx={{
                        color: "#EA4335",
                        fontSize: "2rem",
                        }}
                />}
                description="générer le contenu des emails envoyés à vos clients en utilisant l'IA"
                navigation={"/marketing/email"}
                />
               </Grid> 
              <Grid 
              item
                xs={3}
               >
                <MarketingBox title="Texte d'accueil "
                icon={<
                    Language
                    sx={{
                        color: "#4285F4",
                        fontSize: "2rem",
                        }}
                />}
                description="générer le texte d'accueil de votre site web en utilisant l'IA"
                navigation={"/marketing/website"}
                />
               </Grid> 

            </Grid>

        </Box>


     );
}
 
export default Marketing;