import Header from "components/header/Header";
import { Box } from "@mui/material";
import { Grid, TextField, Button } from "@mui/material";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { SmartToyOutlined } from "@mui/icons-material";
import CardMedia from '@mui/material/CardMedia';
import { useState  } from "react";
import {FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { useGetCategoriesQuery } from "state/api";
import { useCreateProductMutation } from "state/api";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { ImageOutlined } from "@mui/icons-material";





const AddProduct = () => {

  const [loading, setLoading] = useState(false);

  // handling open ai api
  const API_KEY = "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";
  async function callOpenAIAPI (e){
    e.preventDefault();
    console.log("callOpenAIAPI");
    setLoading(true);
    const APIbody = { 
            "model": "text-davinci-003",
            "prompt": "generate a product description for this product : " + formik.values.name ,
            "max_tokens": 200,
            "temperature": 0.7

    }
    await fetch(`https://api.openai.com/v1/completions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": " Bearer " + API_KEY 
    },
    body: JSON.stringify(APIbody),
}).then ((data)=>{
     return data.json()
    }).then ((data)=>{
      console.log(data);
      /*formik.setFieldValue('description', data.choices[0].text.trim());
      setLoading(false);*/
      console.log(data);
     setLoading(false);
     const description = data.choices[0].text.trim();
     const descriptionLength = description.length;
      let currentIndex = 0;
     let currentDescription = '';
     const interval = setInterval(() => {
      if (currentIndex === descriptionLength) {
        clearInterval(interval);
      } else {
        currentIndex++;
        currentDescription = description.slice(0, currentIndex);
        formik.setFieldValue('description', currentDescription);
      }
    }, 20);
      
    });
}


  const [imageUrls, setImageUrls] = useState([]);
  const { data: categories = [] } = useGetCategoriesQuery();
  const navigate = useNavigate();


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


  const [createProduct, { isLoading }] = useCreateProductMutation();
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '',
      images: [],
    },
    validationSchema,
    onSubmit: async(values) => {
      console.log('Form values:', values);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("price", values.price);
      console.log('Form data:', formData);
        // Append only the first image to the formData
        if (values.images.length > 0) {
          formData.append('image', values.images[0]);
        }

      try {
        const response = await createProduct(formData);
        console.log('Product created successfully!',response);
        navigate('/produits');
      } catch (error) {
        console.error('Failed to create product:', error.message);
      }

    },
  });
  
  const handleImageChange = (event) => {
    const selectedImages = event.currentTarget.files;
    const images = Array.from(selectedImages).slice(0, 3); // Limit to 3 images
    formik.setFieldValue("images", images);
    let urls = [];
    for (let i = 0; i < images.length; i++) {
      urls.push(URL.createObjectURL(images[i]));
    }
    setImageUrls(urls);
  };
  
  
  

    return ( 
        <Box m="1.5rem 2.5rem">
            <Header title="Créer un produit" />
            <Grid>
            <form onSubmit={formik.handleSubmit} noValidate enctype="multipart/form-data">
              <Grid container spacing={2}>
                <Grid xs={12} sm={6} item>
                  <TextField 
                  placeholder="Tapper le nom du produit"
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
              startIcon={loading ? <CircularProgress size={20} /> : <SmartToyOutlined />}
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
              onClick={callOpenAIAPI}
              >Générer une description</Button>
                </Grid>
                <Grid item xs={8.5}>
                  <TextField
                    label="Description"
                    multiline 
                    rows={5} 
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
                <Grid item xs={8.5}>
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
                <Grid item xs={8.5}>
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
                <Grid item xs={8.5}>
                  <TextField
                  type="number" 
                  name ="inventory"
                  placeholder="Inventaire" 
                  label="Inventaire"
                  variant="outlined"
                  fullWidth
                  sx={{backgroundColor: '#f2f2f2'}}
                  value={formik.values.inventory}
                  onChange={formik.handleChange}
                />
                </Grid>
          <Grid item xs={8}>
          <Button variant="outlined"  
            component="label"
            sx={{
             color:"#4B4EFC",
             borderColor:"#4B4EFC",
             textTransform:"none",
             padding: "25px", // Increase the padding to make the button bigger
             borderRadius: "12px", // Set the border radius to 12px
             width: "200px", // Set the width to 200px to make the button square
             height:"200px",// Set the height to 200px to make the button square
             display: "flex",
             alignItems: "center",
             borderStyle: "dashed",
             justifyContent: "center",
             flexDirection: "column",
             '&:hover': {
              borderColor: '#8B8DFF',
              color: '#8B8DFF',
              borderStyle: "dashed",
            },
            }}>
              <ImageOutlined />
              Ajouter 3 images 
              <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  hidden
                  multiple
              />
            </Button>
      <Grid container alignItems="center">
     <Grid item xs={4}>
       {imageUrls.length > 0 && (
        <CardMedia
        component="img"
        src={imageUrls[0]}
        alt="First image preview"
        sx={{ 
          maxWidth: '80%',
          mt: '1rem',
          borderRadius: '5px',
         }}
        />
        )}
        </Grid>
    <Grid item xs={8}>
     {imageUrls.slice(1).map((url, index) => (
      <CardMedia
        key={index}
        component="img"
        src={url}
        alt={`Image preview ${index}`}
        sx={{ 
          maxWidth: '20%',
          mt: index === 0 ? '0' : '0.3rem',
          ml : '-2rem',
          borderRadius: '5px',
        }}
      />
       ))}
     </Grid>
    </Grid>
    </Grid>
                <Grid item xs={12}>
                <Button type="submit" 
                variant="contained" 
                disabled={isLoading}
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
                {isLoading ? 'En cours...' : 'Créer produit'}
              </Button>
              <Box sx={{ mb: 3 }}></Box>
                </Grid>
              </Grid>
            </form>
      </Grid>
      </Box>
     );
}
 
export default AddProduct;