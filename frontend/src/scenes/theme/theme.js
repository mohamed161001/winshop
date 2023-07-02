import Header from "components/header/Header";
import { Box, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import ColorPicker from "components/ColorPicker";
import { Formik, Form} from "formik";
import * as Yup from "yup";
import { Button } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Alert from "@mui/material/Alert";
import { useState } from "react";

const validationSchema = Yup.object().shape({
  navbarColor1: Yup.string().required("Couleur de la navbar 1 est requise"),
  navbarColor2: Yup.string().required("Couleur de la navbar 2 est requise"),
});

const initialValues = {
  navbarColor1: "#000000",
  navbarColor2: "#ffffff",
};

const Theme = () => {
  const handleSubmit = (values) => {
    console.log(values);
  };
  const [buttonClicked, setButtonClicked] = useState(false);

  return (
    <Box mt="1.5rem" mx="2.5rem">
      <FlexBetween>
  <Header
  title="Thème de votre boutique"
  subtitle="Personnalisez les couleurs de votre boutique"
   />
   {buttonClicked && (
          <Grid item xs={12}>
            <Alert severity="success" sx={{ mt: '1rem' }}>
              Vos modifications ont été enregistrées avec succès !
            </Alert>
          </Grid>
          )}
   </FlexBetween>
  <Box
    mt = "1rem"
    style={{
      /*backgroundColor: "white",*/
      borderRadius: "10px",
      /*boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",*/
      border : "1px solid #e0e0e0",
      padding: "1rem",
    }}
  >
    {/* <Typography variant="h6" mb="1rem">Les couleurs de l’en-tête</Typography> */}
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <Grid container spacing={1} pb={2}>
          <Grid 
          item xs={12}
           >
            <Typography 
            /*variant="h5" */
            mb="0.1rem"
             /*fontWeight="medium"*/
             sx =
              {{
                fontSize: "0.9rem",
                fontWeight: "bold",
              }}
             >Les couleurs de l’en-tête</Typography>
            </Grid>
            <Grid item xs={3.5}>
              <ColorPicker title="Arrière-plan de l’en-tête" defaultValue="#d4d1d1" />
              {errors.navbarColor1 && touched.navbarColor1 && (
                <Typography variant="body2" color="error">
                  {errors.navbarColor1}
                </Typography>
              )}
            </Grid>
            <Grid item xs={3.5}>
              <ColorPicker title="Couleur des boutons d’en-tête" defaultValue="#000000" />
              {errors.navbarColor2 && touched.navbarColor2 && (
                <Typography variant="body2" color="error">
                  {errors.navbarColor2}
                </Typography>
              )}
            </Grid>
            <Grid item xs={3.5}>
              <ColorPicker title="Bordure d’en-tête" defaultValue="#fb9393" />
              {errors.navbarColor2 && touched.navbarColor2 && (
                <Typography variant="body2" color="error">
                  {errors.navbarColor2}
                </Typography>
              )}
            </Grid>
            <Grid 
            item xs={12}
            >
            <Typography 
             mb="0.1rem"
              mt="0.5rem"
              sx =
              {{
                fontSize: "0.9rem",
                fontWeight: "bold",
              }}
              >Les couleurs du pied de page</Typography>
            </Grid>
            <Grid item xs={3.5}>
              <ColorPicker title="Arrière-plan du pied de page" defaultValue="#3e7fe9" />
              {errors.navbarColor2 && touched.navbarColor2 && (
                <Typography variant="body2" color="error">
                  {errors.navbarColor2}
                </Typography>
              )}
            </Grid>
            <Grid item xs={3.5}>
              <ColorPicker title="Couleur du texte du pied de page" defaultValue="#87ef6d" />
              {errors.navbarColor2 && touched.navbarColor2 && (
                <Typography variant="body2" color="error">
                  {errors.navbarColor2}
                </Typography>
              )}
            </Grid>
            <Grid item xs={3.5}>
              <ColorPicker title="Bordure de pied de page" defaultValue="#f52e2e" />
              {errors.navbarColor2 && touched.navbarColor2 && (
                <Typography variant="body2" color="error">
                  {errors.navbarColor2}
                </Typography>
              )}
            </Grid>
            <Grid 
            item xs={12}
            >
            <Typography 
             mb="0.1rem"
              mt="0.5rem"
              sx =
              {{
                fontSize: "0.9rem",
                fontWeight: "bold",
              }}
              >Les couleurs de la page du produit</Typography>
            </Grid>
            <Grid item xs={3.5}>
              <ColorPicker title="Couleur de l’arrière plan" defaultValue="#3e7fe9" />
              {errors.navbarColor2 && touched.navbarColor2 && (
                <Typography variant="body2" color="error">
                  {errors.navbarColor2}
                </Typography>
              )}
            </Grid>
            <Grid item xs={3.5}>
              <ColorPicker title="Couleur du texte" defaultValue="#87ef6d" />
              {errors.navbarColor2 && touched.navbarColor2 && (
                <Typography variant="body2" color="error">
                  {errors.navbarColor2}
                </Typography>
              )}
            </Grid>
            <Grid item xs={3.5}>
              <ColorPicker title="Couleur du texte des boutons" defaultValue="#f52e2e" />
              {errors.navbarColor2 && touched.navbarColor2 && (
                <Typography variant="body2" color="error">
                  {errors.navbarColor2}
                </Typography>
              )}
            </Grid>
            <Grid item xs={3.5}>
              <ColorPicker title="Couleur de l'arrière-plan des boutons" defaultValue="#f52e2e" />
              {errors.navbarColor2 && touched.navbarColor2 && (
                <Typography variant="body2" color="error">
                  {errors.navbarColor2}
                </Typography>
              )}
            </Grid>
            <Grid item xs={3.5}>
              <ColorPicker title="Couleur de la bordure des boutons" defaultValue="#f52e2e" />
              {errors.navbarColor2 && touched.navbarColor2 && (
                <Typography variant="body2" color="error">
                  {errors.navbarColor2}
                </Typography>
              )}
            </Grid>
            <Grid item xs={3.5}>
              <ColorPicker title="Couleur de l'arrière plan au Hover" defaultValue="#f52e2e" />
              {errors.navbarColor2 && touched.navbarColor2 && (
                <Typography variant="body2" color="error">
                  {errors.navbarColor2}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Button
              type="submit"
              variant="contained"
              onClick = {() => {
                setButtonClicked(true);
              }}
              sx={{
                backgroundColor: '#4B4EFC',
                color: 'white',
                borderRadius: 2,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#3D40FF',
                },
                fontSize: '0.7rem',
                padding: '13px 24px',
              }}
            >
              Enregistrer les modifications
            </Button>
        </Form>
      )}
    </Formik>
  </Box>
</Box>

  );
};

export default Theme;
