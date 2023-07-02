import { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import logo from "assets/LineTech 1.png";
import MobileStepper from "@mui/material/MobileStepper";
import { AddBusinessOutlined, EmailOutlined, PersonOutlined } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const steps = ["Etape 1", "Etape 2"];

const Signup = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  console.log(formData);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Container 
    maxWidth="sm"
    sx={{
      mt: 4 ,
      backgroundColor: "white",
      borderRadius: 2,
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      padding: "40px",
    }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
      <img src={logo} alt="logo" /*width="20%" height="auto"*/ style={{ maxWidth: "150px", height: "auto" }} />
      </Box>
      <MobileStepper
       variant="progress"
       steps={steps.length}
       position="static"
        activeStep={activeStep}
       sx={{ 
        py: 0.5 ,
       backgroundColor: "grey.100",
       borderRadius: 4,
       "& .MuiMobileStepper-progress": {
        backgroundColor: "#4B4EFC",
        },
        "& .MuiMobileStepper-progressActive": {
        backgroundColor: "#3D40FF",
        },
       }}
      />
      <Grid
       container 
       spacing={2}
        sx={{
          mt: 2,
          alignItems: "center",
          justifyContent: "center",
        }}
       >
        <Grid item xs={10}>
          {activeStep === 0 && (
            <>
              <Grid 
              Container 
              spacing={2} 
              >
              <Grid item xs={12}>
              <Typography variant="h6" mt={1}>Nom complet *</Typography>
              <TextField
                label="Nom Complet"
                name="fullName"
                onChange={handleChange}
                fullWidth
                margin="dense"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      < PersonOutlined />
                    </InputAdornment>
                  ),
                }}
              />
              </Grid>
              <Grid item xs={12}>
              <Typography variant="h6" mt={1}>E-mail *</Typography>
              <TextField
                label="E-mail"
                name="email"
                onChange={handleChange}
                fullWidth
                margin="dense"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      < EmailOutlined />
                    </InputAdornment>
                  ),
                }}
              />
              </Grid>
              <Grid item xs={12}>
              <Typography variant="h6" mt={1}>Mot de passe *</Typography>
              <TextField
              label="Mot de passe"
              name="password"
              type="password" // set the type to password
              onChange={handleChange}
             fullWidth
              margin="dense"
            />
              </Grid>
              </Grid>
            </>
          )}
          {activeStep === 1 && (
            <>
            <Grid 
              Container 
              spacing={2} 
              >
                <Grid item xs={12}>
              <Typography variant="h6">Nom de la Boutique *</Typography>
              <TextField
                label="Nom de la Boutique"
                name="name"
                onChange={handleChange}
                fullWidth
                margin="dense"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      < AddBusinessOutlined />
                    </InputAdornment>
                  ),
                }}
              />
              </Grid>
              <Grid item xs={12}>
              <Typography variant="h6" mt={2} mb={1}>Catégorie de la Boutique *</Typography>
          <FormControl fullWidth  sx={{ backgroundColor: "#f2f2f2" }} >
             <InputLabel id="category-label">
               Choisir une catégorie
              </InputLabel>
             <Select
               labelId="category-label"
               id="category"
               name="category"
               >
               <MenuItem value="">
               <em>Aucun</em>
             </MenuItem>
             <MenuItem value="Mode et vêtements">Mode et vêtements</MenuItem>
             <MenuItem value="Électronique grand public">Électronique grand public</MenuItem>
             <MenuItem value="Maison et jardin">Maison et jardin</MenuItem>
             <MenuItem value="Beauté et soins personnels">Beauté et soins personnels</MenuItem>
              <MenuItem value="Santé et bien-être">Santé et bien-être</MenuItem>
              <MenuItem value="Sports et loisirs">Sports et loisirs</MenuItem>
               <MenuItem value="Livres, musique et films">Livres, musique et films</MenuItem>
              <MenuItem value="Alimentation et boissons">Alimentation et boissons</MenuItem>
              <MenuItem value="Animaux de compagnie">Animaux de compagnie</MenuItem>
              <MenuItem value="Art et artisanat">Art et artisanat</MenuItem>
             <MenuItem value="Autre">Autre</MenuItem>
               </Select>
          </FormControl>
          </Grid>
          </Grid>
            </>
          )}
        </Grid>
        <Grid
         item xs={10}
          sx={{
          }}
         >
     <Grid container direction="column" alignItems="flex-end">
    <Button
      variant="contained"
      color="primary"
      onClick={handleNext}
      /*disabled={activeStep === steps.length - 1}*/
      sx={{
        backgroundColor: "#4B4EFC",
        color: "white",
        borderRadius: 2,
        textTransform: "none",
        "&:hover": {
          backgroundColor: "#3D40FF",
        },
        fontSize: "0.8rem",
        padding: "10px 20px",
        width: "100%",
      }}
    >
      {activeStep === steps.length - 1 ? "Créer ma boutique" : "Continuer"}
    </Button>
    {activeStep ===  0 && (
      <Typography variant="caption" 
      sx={{
         mt: 3,
          fontSize: "0.9rem",
          color: "grey.500",
          alignSelf: "center",
          "& a": {
            color: "#4B4EFC",
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
            },
          },
      }}>
        vous avez déjà un compte ? <a href="/signin">Se connecter</a>
      </Typography>
    )}
    {activeStep > 0 && (
      <Button
        variant="contained"
        color="secondary"
        onClick={handleBack}
        sx={{ marginTop: 2,
           /*marginLeft: 8,*/
           width: "100%",
           fontSize: "0.8rem",
           padding: "10px 20px",
           borderRadius: 2,
            textTransform: "none",
            backgroundColor: "#F2F2F2",
            color: "black",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#F2F2F2",
              boxShadow: "none",
            },
           }} 
      >
        Retour
      </Button>
    )}
  </Grid>
</Grid>
</Grid>
</Container>
  );
};

export default Signup;