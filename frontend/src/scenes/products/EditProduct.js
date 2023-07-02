import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import Header from 'components/header/Header';
import { useGetProductQuery } from 'state/api';
import { useParams } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';
import { FileUploadOutlined } from '@mui/icons-material';
import { useGetCategoriesQuery } from 'state/api';
import { SmartToyOutlined } from '@mui/icons-material';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';




const EditProduct = () => {

    const { productId } = useParams();
    const { data: productData } = useGetProductQuery(productId);
    console.log('productData', productData);
    
  const { data: categories = [] } = useGetCategoriesQuery();


  const validationSchema = yup.object({
    name: yup.string().required('Le nom est obligatoire'),
    description: yup.string().required('La description est obligatoire'),
    price : yup.number().required('Le prix est obligatoire'),
    images: yup
    .array()
    .of(
      yup
        .mixed()
        .test("fileSize", "Le fichier est trop volumineux", (value) =>
          value ? value.size <= 5000000 : true
        )
        .test("fileType", "Le format du fichier n'est pas pris en charge", (value) =>
          value ? ["image/jpeg", "image/png"].includes(value.type) : true
        )
    ),
  });


  const formik = useFormik({
    initialValues: {
      name: productData?.name ?? '',
      description: productData?.description ?? '',
      price: productData?.price ?? '',
    },
    validationSchema,
    onSubmit: (values) => {
        console.log(values);
      },
      enableReinitialize: true
    });
  

  
  
  

    return ( 
        <Box m="1.5rem 2.5rem">
            <Header title="Modifier un produit" />
            <Grid>
            <form onSubmit={formik.handleSubmit} noValidate enctype="multipart/form-data">
              <Grid container spacing={2}>
                <Grid xs={12} sm={6} item>
                  <TextField 
                  placeholder="Enter first name"
                  label="Donner le nom du produit" 
                  variant="outlined" 
                  fullWidth 
                  required 
                  sx={{backgroundColor: '#f2f2f2'}}
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                <Button 
              variant="contained" 
              startIcon={<SmartToyOutlined />}
              sx={{
                backgroundColor:"#4B4EFC",
                color:'white',
                borderRadius: 2,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#3D40FF"
                },
                fontSize: "0.7rem",
                padding: "13px 24px"
              }}
              >Générer une description</Button>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    label="Description"
                    multiline 
                    rows={4} 
                    placeholder="Tapper une description du produit" 
                    variant="outlined"
                    fullWidth 
                    required
                    sx={{backgroundColor: '#f2f2f2','&:hover': { borderColor: 'currentColor' }}}
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                     />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                   placeholder="Prix de vente (DT)"
                    label="Prix de vente (DT)"
                    type="number"
                     variant="outlined" 
                     fullWidth 
                     required 
                     sx={{backgroundColor: '#f2f2f2'}}
                      name="price"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      error={formik.touched.price && Boolean(formik.errors.price)}
                      helperText={formik.touched.price && formik.errors.price}
                  />
                </Grid>
                <Grid item xs={8}>
                <FormControl fullWidth sx={{ backgroundColor: "#f2f2f2" }}>
                   <InputLabel id="categorie-label">Catégorie</InputLabel>
                   <Select
                    labelId="categorie-label"
                    id="categorie"
                    name="categorie"
                    value={formik.values.categorie}
                    onChange={formik.handleChange}
                    error={formik.touched.categorie && Boolean(formik.errors.categorie)}
                    label="Catégorie"
                  >
                 <MenuItem value="">
                 <em>Aucun</em>
                 </MenuItem>
                {categories.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                {category.name}
                </MenuItem>
                ))}
              </Select>
             </FormControl>
            </Grid>
                <Grid item xs={8}>
                  <TextField
                  type="number" 
                  name ="inventory"
                  placeholder="Inventaire" 
                  label="Inventaire"
                  variant="outlined"
                  fullWidth
                  required 
                  sx={{backgroundColor: '#f2f2f2'}}
                  value={formik.values.inventory}
                  onChange={formik.handleChange}
                />
                </Grid>
                <Grid item xs={8}>
          <Button variant="outlined" startIcon={<FileUploadOutlined />} 
            component="label"
            sx={{
             color:"#4B4EFC",
             borderColor:"#4B4EFC",
             textTransform:"none",
             '&:hover': {
              borderColor: '#8B8DFF',
              color: '#8B8DFF',
            },
            }}>
              Ajouter des images
              <input
                  type="file"
                  name="image"
                  hidden
                  multiple
              />
            </Button>
            <Grid container alignItems="center">
     <Grid item xs={4}>
        <CardMedia
        component="img"
        src={`http://localhost:4000/uploads/categoryImages/${productData?.image}`}
        alt="First image preview"
        sx={{ 
          maxWidth: '80%',
          mt: '1rem',
          borderRadius: '5px',
         }}
        />
  </Grid>
    </Grid>
             </Grid>
                <Grid item xs={12}>
                <Button type="submit" 
              variant="contained" 
              sx={{
                backgroundColor:"#4B4EFC",
                color:'white',
                borderRadius: 2,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#3D40FF"
                },
                fontSize: "0.7rem",
                padding: "10px 24px"
              }}>
                Modifier Produit
              </Button>
              <Box sx={{ mb: 3 }}></Box>
                </Grid>
              </Grid>
            </form>
      </Grid>
        </Box>
     );
}
 
export default EditProduct;