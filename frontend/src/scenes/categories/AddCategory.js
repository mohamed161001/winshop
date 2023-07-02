import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import Header from 'components/header/Header';
import CardMedia from '@mui/material/CardMedia';
import { FileUploadOutlined } from '@mui/icons-material';
import { useCreateCategoryMutation } from 'state/api';
import { useNavigate } from 'react-router-dom';
import { CategoryOutlined } from '@mui/icons-material';
import InputAdornment from '@mui/material/InputAdornment';


const AddCategory = () => {

  
  const validationSchema = yup.object({
    name: yup.string().required('Le nom est obligatoire'),
    description: yup.string().required('La description est obligatoire'),
    image: yup
    .mixed()
    .test("fileSize", "Le fichier est trop volumineux", (value) =>
      value ? value.size <= 5000000 : true
    )
    .test("fileType", "Le format du fichier n'est pas pris en charge", (value) =>
      value ? ["image/jpeg", "image/png"].includes(value.type) : true
    ),
  });

  const [createCategory , { isLoading }] = useCreateCategoryMutation();
  const navigate = useNavigate();
 



  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      image: null,
    },
    validationSchema,
    onSubmit: async(values) => {
      console.log('Form values:', values);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("image", values.image);
      console.log('Form data:', formData);

      const response = await createCategory(formData);

      // Check for any errors returned by the server
      if (response.error) {
        console.error(response.error);
      } else {
        console.log('Category created successfully!');
        navigate('/categories');
      }
  
    },
  });


  const handleImageChange = (event) => {
    formik.setFieldValue("image", event.currentTarget.files[0]);
    formik.setFieldValue("imageUrl", URL.createObjectURL(event.currentTarget.files[0]));
  }


  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Créer une catégorie" />
      <form onSubmit={formik.handleSubmit} noValidate enctype="multipart/form-data">
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <TextField
              label="Donner le nom du catégorie"
              placeholder="Tapper le nom du catégorie"
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
                    <CategoryOutlined />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              label="Description"
              placeholder="Tapper une description"
              variant="outlined"
              rows={4}
              multiline
              fullWidth
              required
              sx={{ backgroundColor: '#f2f2f2' }}
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
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
              Ajouter une image
              <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  hidden
              />
            </Button>  
            {formik.values.imageUrl && (
              <CardMedia
                 component="img"
                 src={formik.values.imageUrl}
                 alt="Image preview"
                 sx={{ 
                  maxWidth: '20%',
                  mt: '1rem',
                  borderRadius: '5px',
                 }}
              />
  )}

           </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
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
              }}
              disabled={isLoading}
            >
               {isLoading ? 'Loading...' : 'Créer catégorie'} {/* Show "Loading..." if the request is in progress */}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddCategory;

