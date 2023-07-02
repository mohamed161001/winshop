import { useFormik } from 'formik';
import * as yup from 'yup';
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import logo from "assets/LineTech 1.png";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { EmailOutlined } from "@mui/icons-material";
import Typography from '@mui/material/Typography';
import { useLogin } from 'hooks/useLogin';
import Alert from '@mui/material/Alert';

const Signin = () => {

    const validationSchema = yup.object({
        email: yup.string().email('L\'email est invalide').required('L\'email est obligatoire'),
        password: yup.string().required('Le mot de passe est obligatoire'),
        });

    const { login, isLoading, error } = useLogin();    
    console.log(error);
    
    
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async(values) => {
            await login(values.email, values.password);
        },
      });

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
                    <form onSubmit={formik.handleSubmit} noValidate>
                        <Grid item xs={12}>
                        <Typography variant="h6" mt={1}>E-mail</Typography>
                        <TextField
                          label="E-mail"
                          name="email"
                          fullWidth
                          margin="dense"
                          required
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          error={formik.touched.email && Boolean(formik.errors.email)}
                          helperText={formik.touched.email && formik.errors.email}
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
                        <Typography variant="h6" mt={1}>Mot de passe</Typography>
                        <TextField
                        label="Mot de passe"
                        name="password"
                        required
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        type="password" // set the type to password
                        fullWidth
                        margin="dense"
                         />
                        </Grid>
                        <Grid item xs={12} mt={2}>
                            <Button
                            type="submit"
                            variant="contained"
                            disabled={isLoading}
                            sx={{
                                backgroundColor: "#4B4EFC",
                                color: "white",
                                borderRadius: 2,
                                textTransform: "none",
                                "&:hover": {
                                  backgroundColor: "#3D40FF",
                                },
                                padding: "10px 20px",
                                width: "100%",
                              }}
                            >
                                Se connecter
                            </Button>
                        </Grid>
                        {error && <Alert 
                        severity="error"
                        sx={{
                            mt: 2,
                            width: "100%",
                        }}
                        >{error}</Alert>}
                        <Grid 
                        item
                        xs={12}
                        mt={1}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                          >
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
                        Vous n'avez pas de compte ?
                        <a
                         href="/signup"
                         > Créer un compte</a>
                       </Typography>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Container>
     );
}
 
export default Signin;