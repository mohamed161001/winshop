import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import Header from 'components/header/Header';
import { useGetCategoryQuery } from 'state/api';
import { useParams } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';
import { FileUploadOutlined } from '@mui/icons-material';

const EditCategory = () => {
  const { categoryId } = useParams();
  const { data: categoryData } = useGetCategoryQuery(categoryId);
  console.log('categoryData', categoryData);

  const validationSchema = yup.object({
    name: yup.string().required('Le nom est obligatoire'),
    description: yup.string().required('La description est obligatoire'),
  });

  const formik = useFormik({
    initialValues: {
      name: categoryData?.name ?? '',
      description: categoryData?.description ?? '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
    enableReinitialize: true
  });

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Modifier une catégorie" />
      <form onSubmit={formik.handleSubmit} noValidate>
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
                  hidden
              />
            </Button> 
              <CardMedia
                 component="img"
                 src={`http://localhost:4000/uploads/categoryImages/${categoryData?.image}`}
                 alt="Image preview"
                 sx={{ 
                  maxWidth: '20%',
                  mt: '1rem',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                 }}
              />
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
            >
              Modifier catégorie
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default EditCategory;
