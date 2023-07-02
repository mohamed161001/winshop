import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import Header from 'components/header/Header';
import { useGetOrderQuery } from 'state/api';
import { useParams } from 'react-router-dom';
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { useUpdateOrderMutation } from 'state/api';
import { useNavigate } from 'react-router-dom';
import {TableContainer , Table , TableHead , TableBody , TableRow , TableCell , Paper} from '@mui/material';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { PersonOutlined , LocalPhoneOutlined ,EmailOutlined ,LocationOnOutlined } from '@mui/icons-material';
import InputAdornment from '@mui/material/InputAdornment';
import { CancelOutlined } from '@mui/icons-material';



const EditOrder = () => {
    const { orderId } = useParams();
    const { data: orderData } = useGetOrderQuery(orderId);
    console.log('orderData', orderData);
    const navigate = useNavigate();
    console.log('orderID', orderId)
  
    const validationSchema = yup.object({
      name: yup.string().required('Le nom complet est obligatoire'),
      phone: yup.string().required('Le numéro de téléphone est obligatoire'),
      email: yup.string().required('L\'email est obligatoire'),
      address: yup.string().required('L\'adresse est obligatoire'),
    });

    const [updateOrder, { isLoading }] = useUpdateOrderMutation();
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
        console.log('Form values:', values);
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('phone', values.phone);
        formData.append('email', values.email);
        formData.append('status', values.status);
        console.log('formData', formData);
        const payload = {
            fullName: values.name,
            phone: values.phone,
            email: values.email,
            address: values.address,
            status: values.status,
          };
        const headers = {
            'Content-Type': 'application/json'
          };
        try {
          /*const response = await updateOrder({ id: orderId, data: formData, headers}).unwrap();*/
          const response = await updateOrder({ id: orderId, data: payload, headers }).unwrap();
          /*const response = await updateOrder({ id: orderId, data: formData }).unwrap();*/
          console.log('order updated', response);
          navigate('/commandes');
        } catch (error) {
          console.log('error', error);
        }
      },      
      enableReinitialize: true
    });


    return ( 
        <Box m="1.5rem 2.5rem">
        <Header title="Modifier une commande" />
        <Grid container spacing={2.6}>
        <Grid 
          item
          xs={12}
          sx={{  
          borderRadius: 2,
          }}>
          <Box
            sx={{
              backgroundColor: 'white',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
              borderRadius: 2,
              padding: '1rem',
            }}
          >
            <Typography variant="h6" pb={0.5} sx={{ fontWeight: 'bold', fontSize: '0.9rem'}}>
              Informations de la commande
            </Typography>
          <TableContainer 
          component={Paper}
          sx={{
            boxShadow: 'none',
          }}
          >
            <Table size="small"  aria-label="simple table">
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "#F3F4F6",
                    color: "#000000",
                    fontSize: "14px",
                   }} 
                >
                  <TableCell sx={{ border: "none" , color:"#6B7280"}}>Ref</TableCell>
                  <TableCell sx={{ border: "none" , color:"#6B7280"}}>Date</TableCell>
                  <TableCell sx={{ border: "none" , color:"#6B7280" }}>Statut</TableCell>
                  <TableCell sx={{ border: "none" , color:"#6B7280" }}>Totale (DT)</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{
                    height: "10px",
                   }}
                >
                  <TableCell sx={{ border: "none" , fontWeight:"bold"}}>{"#" + orderData?._id.slice(0, 4)}</TableCell>
                  <TableCell sx={{ border: "none"}}>{new Date(orderData?.createdAt).toLocaleDateString('fr-FR', {day: 'numeric', month: 'long', year: 'numeric'})}</TableCell>
                  <TableCell sx={{ border: "none"}}>
                  <Chip
                    label={orderData?.status}
                    size="small"
                     sx={{
                     backgroundColor:
                     orderData?.status === "En attente" || orderData?.status === "Confirmé"
                    ? "#FFF59D"
                    : orderData?.status === "Livré"
                    ? "#ACFFAF"
                    : orderData?.status === "Annulé"
                    ? "#FFCACA"
                    : "default",
                    color:
                    orderData?.status === "En attente" || orderData?.status === "Confirmé"
                    ? "#C39A06"
                    : orderData?.status === "Livré"
                     ? "#10AF0D"
                    : orderData?.status === "Annulé"
                    ? "#F95757"
                   : "default",
                    borderRadius: "5px",
                    }}
                   />
                  </TableCell>
                  <TableCell sx={{ border: "none"}}>{orderData?.total}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          </Box>
        </Grid>
        <Grid item xs={7}>
        <Box 
        mt = {3}
        sx={
          {
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'white',
            borderRadius: 2,
            padding: '1rem',
          }
        }
         >
        <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
          Liste des produits
        </Typography>
        <Box mt={2}>
          <TableContainer 
          component={Paper}
          sx={{
            boxShadow: 'none',
            borderRadius: 2,
          }}
           >
            <Table size="small" aria-label="simple table">
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "#f2f2f2",
                    color: "#000000",
                    fontSize: "14px",
                    fontWeight: "bold",
                   }}
                >
                  <TableCell sx={{ border: "none" , color:"#6B7280" }}>Image</TableCell>
                  <TableCell sx={{ border: "none", color:"#6B7280" }}>Nom</TableCell>
                  <TableCell sx={{ border: "none", color:"#6B7280" }}>Quantité</TableCell>
                  <TableCell sx={{ border: "none", color:"#6B7280" }}>Prix (DT)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderData?.products.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell sx={{ border: "none" }}>
                      <Avatar 
                      variant="rounded"
                      sx={{ width: 60, height: 60 }}
                      src={`http://localhost:4000/uploads/categoryImages/${item.product.image}`}
                      />
                    </TableCell>
                    <TableCell sx={{ border: "none" }}>{item.product.name}</TableCell>
                    <TableCell sx={{ border: "none" }}>{item.quantity}</TableCell>
                    <TableCell sx={{ border: "none" }}>{item.product.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </Box>
        </Box>
       </Grid> 
        <Grid item xs={5}> 
        <Box mt={5.1}>
        <form onSubmit={formik.handleSubmit} noValidate>
          <Grid container spacing={2} sx={{ borderRadius: 2, boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', backgroundColor: 'white' , paddingTop : '0.7rem'}} >
            <Grid item xs={11.5}>
              <TextField
                label="Donner le nom complet du client"
                placeholder="Tapper le nom du client"
                variant="outlined"
                fullWidth
                required
                sx={{ backgroundColor: '#f2f2f2' }}
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
            <Grid item xs={4}>
              <TextField
                label="Donner le numéro de téléphone du client"
                placeholder="Tapper le numéro de téléphone du client"
                variant="outlined"
                fullWidth
                required
                sx={{ backgroundColor: '#f2f2f2' }}
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
            <Grid item xs={7.5}>
            <TextField
                label="Donner l'email du client"
                placeholder="Tapper l'email du client"
                variant="outlined"
                fullWidth
                required
                sx={{ backgroundColor: '#f2f2f2' }}
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
            <Grid item xs={11.5}>
              <TextField
                label="Donner l'adresse du client"
                placeholder="Tapper l'adresse du client"
                variant="outlined"
                fullWidth
                required
                sx={{ backgroundColor: '#f2f2f2' }}
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

            <Grid item xs={11.5}>
                <FormControl fullWidth sx={{ backgroundColor: "#f2f2f2" }}>
                   <InputLabel id="statut-label">Statut</InputLabel>
                   <Select
                    labelId="statut-label"
                    id="statut"
                    name="status"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    label="Statut"
                  >
                <MenuItem value='En attente'>En attente</MenuItem>
                <MenuItem value='Confirmé'>Confirmé</MenuItem>
                <MenuItem value='Livré'>Livré</MenuItem>
                <MenuItem value='Annulé'>Annulé</MenuItem>
              </Select>
             </FormControl>
            </Grid>
            {formik.values.status === 'Annulé' && (
           <Grid item xs={11.5}>
             <TextField
                label="Raison d'annulation"
               placeholder="Tapper la raison d'annulation"
                variant="outlined"
               fullWidth
               sx={{ backgroundColor: '#f2f2f2' }}
               name="cancellationReason"
               value={formik.values.cancellationReason}
               onChange={formik.handleChange}
               error={
               formik.touched.cancellationReason &&
               Boolean(formik.errors.cancellationReason)
                }
              helperText={
               formik.touched.cancellationReason &&
               formik.errors.cancellationReason
               }
            InputProps={{
             startAdornment: (
              <InputAdornment position="start">
               <CancelOutlined />
               </InputAdornment>
                ),
               }}
             />
             </Grid>
             )}

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                sx={{
                  backgroundColor: '#4B4EFC',
                  color: 'white',
                  borderRadius: 2,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#3D40FF',
                  },
                  fontSize: '0.7rem',
                  padding: '9px 24px',
                  marginBottom : '1.5rem'
                }}
              >
                {isLoading ? 'En cours...' : 'Modifier la commande'}
              </Button>
            </Grid>
          </Grid>
        </form>
        </Box>
        <Box sx={{ mb: 9 }}></Box>
        </Grid>
       </Grid>
      </Box> 
     );
}
 
export default EditOrder;