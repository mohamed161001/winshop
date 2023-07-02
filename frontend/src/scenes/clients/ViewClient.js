import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import Header from 'components/header/Header';
import { useGetOrderQuery } from 'state/api';
import { useParams } from 'react-router-dom';
import { PersonOutlined , LocalPhoneOutlined ,EmailOutlined ,LocationOnOutlined } from '@mui/icons-material';
import InputAdornment from '@mui/material/InputAdornment';




const ViewClient = () => {
    const { orderId } = useParams();
    const { data: orderData } = useGetOrderQuery(orderId);

    const validationSchema = yup.object({
        name: yup.string().required('Le nom complet est obligatoire'),
        phone: yup.string().required('Le numéro de téléphone est obligatoire'),
        email: yup.string().required('L\'email est obligatoire'),
        address: yup.string().required('L\'adresse est obligatoire'),
    });


    const formik = useFormik({
        initialValues: {
            name: orderData?.fullName ?? '',
            phone: orderData?.phone ?? '',
            email: orderData?.email ?? '',
            address: orderData?.address ?? '',
            status: orderData?.status ?? '',
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log(values);
        },
        enableReinitialize: true
    });



    return ( 
        <Box m="1.5rem 2.5rem"
        style={{
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            padding: "1rem",
          }}
        >
            <Header title="Aperçu du client" />
            <form onSubmit={formik.handleSubmit} noValidate>
                <Grid container spacing={2}>
                <Grid item xs={6}>
              <TextField
                label="nom complet du client"
                placeholder="Tapper le nom du client"
                variant="outlined"
                disabled
                fullWidth
                sx={{ 
                    backgroundColor: 'white',
                    "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#000000",
                    },
                 }}
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      < PersonOutlined />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="numéro de téléphone du client"
                placeholder="Tapper le numéro de téléphone du client"
                variant="outlined"
                disabled
                fullWidth
                sx={{ 
                    backgroundColor: 'white',
                    "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#000000",
                    },
                 }}
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      < LocalPhoneOutlined />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6}>
            <TextField
                label="l'email du client"
                placeholder="Tapper l'email du client"
                variant="outlined"
                disabled
                fullWidth
                sx={{
                    backgroundColor: 'white',
                    "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#000000",
                    },
                 }}
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      < EmailOutlined />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6} mb={2}>
              <TextField
                label="l'adresse du client"
                placeholder="Tapper l'adresse du client"
                variant="outlined"
                disabled
                fullWidth
                sx={{ 
                    backgroundColor: 'white',
                    "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#000000",
                    },
                 }}
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      < LocationOnOutlined />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          </form>
        </Box>

     );
}
 
export default ViewClient;