import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Box, FormControl, InputLabel, Typography } from '@mui/material';
import Header from 'components/header/Header';
import CardMedia from '@mui/material/CardMedia';
import { FileUploadOutlined } from '@mui/icons-material';
import InputAdornment from '@mui/material/InputAdornment';
import { StoreOutlined } from '@mui/icons-material';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { SmartToyOutlined } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import FlexBetween from 'components/FlexBetween';

const Store = () => {

    const [loading, setLoading] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);

    const validationSchema = yup.object({
        name: yup.string().required('Le nom est obligatoire'),
        description: yup.string().required('La description est obligatoire'),
        text: yup.string().required('Le texte principal est obligatoire'),
        category: yup.string().required('La catégorie est obligatoire'),
        image: yup
        .mixed()
        .test("fileSize", "Le fichier est trop volumineux", (value) =>
          value ? value.size <= 5000000 : true
        )
        .test("fileType", "Le format du fichier n'est pas pris en charge", (value) =>
          value ? ["image/jpeg", "image/png"].includes(value.type) : true
        ),
      });

  
    
      const formik = useFormik({
        initialValues: {
          name: 'caprezor',
          category: '',
          info: '',
          text: '',
          description: '',
          image: null,

        },
        validationSchema,
        onSubmit: async(values) => {
          console.log('Form values:', values);
        },
      });
    
    
      const handleImageChange = (event) => {
        formik.setFieldValue("image", event.currentTarget.files[0]);
        formik.setFieldValue("imageUrl", URL.createObjectURL(event.currentTarget.files[0]));
      }



      const API_KEY = "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";
      async function callOpenAIAPI1 (e){
        e.preventDefault();
        console.log("callOpenAIAPI");
          setLoading(true);   
        const APIbody = { 
                "model": "text-davinci-003",
                "prompt": `Générer le headline de la page d'accueil de cette boutique qui s'appelle : ${formik.values.name} Informations sur la boutique : ${formik.values.info} :`,
                "max_tokens": 50,
                "temperature": 0.8
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
          setLoading(false);
          const generatedText = data.choices[0].text.trim();
          const generatedTextLength = generatedText.length;
          let currentIndex = 0;
          let currentGeneratedText = '';
          const interval = setInterval(() => {
              if (currentIndex === generatedTextLength) {
                clearInterval(interval);
              } else {
                currentIndex++;
                currentGeneratedText = generatedText.slice(0, currentIndex);
                formik.setFieldValue("text", currentGeneratedText);
              }
            }, 20);
        });}


      async function callOpenAIAPI2 (e){
        e.preventDefault();
        console.log("callOpenAIAPI");
          setLoading(true);   
        const APIbody = { 
                "model": "text-davinci-003",
                "prompt": `Générer une petite description comme sous titre du headline de la page d'accueil de cette boutique :
                    - Nom de la boutique : ${formik.values.name}
                    - Informations de la boutique : ${formik.values.info}
                    :
                    `,
                "max_tokens": 70,
                "temperature": 0.8
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
          setLoading(false);
          const generatedText = data.choices[0].text.trim();
          const generatedTextLength = generatedText.length;
          let currentIndex = 0;
          let currentGeneratedText = '';
          const interval = setInterval(() => {
              if (currentIndex === generatedTextLength) {
                clearInterval(interval);
              } else {
                currentIndex++;
                currentGeneratedText = generatedText.slice(0, currentIndex);
                formik.setFieldValue("description", currentGeneratedText);
              }
            }, 20);
        });}
  

    return ( 
        <Box m="1.5rem 2.5rem">
       <FlexBetween>   
      <Header title="Les informations de la boutique" />
      {buttonClicked && (
          <Grid item xs={12}>
            <Alert severity="success" sx={{ mt: '1rem' }}>
              Vos modifications ont été enregistrées avec succès !
            </Alert>
          </Grid>
          )}
      </FlexBetween>
      <Grid
        container
        spacing={2}
      >
      <Grid item xs={8}>
      <Box>
      <form onSubmit={formik.handleSubmit} noValidate enctype="multipart/form-data">
        <Grid 
          container
          spacing={2}
          sx={{
            mt: '1rem',
            mb: '1rem',
            pt: '1rem',
            pb: '1rem',
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
          }}
         >
          <Grid item xs={11}>
            <TextField
              label="le nom de la boutique "
              placeholder="Tapper le nom de la boutique"
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
                    <StoreOutlined />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={11}>
            <FormControl fullWidth sx={{ backgroundColor: '#f2f2f2' }}>
            <InputLabel id="categorie-label">Catégorie de la boutique</InputLabel>
              <Select 
                name="category"
                value={formik.values.category}
                label="Catégorie de la boutique"
                onChange={formik.handleChange}
                error={formik.touched.category && Boolean(formik.errors.category)}
                helperText={formik.touched.category && formik.errors.category}
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
          <Grid item xs={11}>
            <TextField
              label="Informations supplémentaires"
              placeholder="Tapper des informations supplémentaires"
              variant="outlined"
              fullWidth
              rows={2}
              sx={{ backgroundColor: '#f2f2f2' }}
              name="info"
              value={formik.values.info}
              onChange={formik.handleChange}
              error={formik.touched.info && Boolean(formik.errors.info)}
              helperText={formik.touched.info && formik.errors.info}
             />
          </Grid>

          <Grid xs={11} sm={6} item>
                <Button 
                  variant="contained" 
                 startIcon={loading ? <CircularProgress size="1rem" /> : <SmartToyOutlined />}
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
                  onClick={(e) => {
                    callOpenAIAPI1(e);
                    callOpenAIAPI2(e);
                  }}
                  >Générer avec IA</Button>
                </Grid>

          <Grid item xs={11}>
            <TextField
              label="Texte Principal"
              placeholder="Tapper un texte principal"
              variant="outlined"
              fullWidth
              rows={2}
              required
              sx={{ backgroundColor: '#f2f2f2' }}
              name="text"
              value={formik.values.text}
              onChange={formik.handleChange}
              error={formik.touched.text && Boolean(formik.errors.text)}
              helperText={formik.touched.text && formik.errors.text}
              />
          </Grid>  
          <Grid item xs={11}>
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

           </Grid>
          <Grid item xs={12}>
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
          </Grid>
        </Grid>
      </form>
      </Box>
      </Grid>
      <Grid 
      item
       xs={3}
        sx={{
          mt: '2rem',
          mb: '1rem',
          ml: '2rem',
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
          textAlign: 'center',
          height: 'fit-content',
          padding: '1rem',

        }}
       >
        <Typography variant="h6" sx={{ color: 'black', fontWeight: 'bold' }}>
          Logo de la boutique
        </Typography>
              {formik.values.imageUrl && (
              <CardMedia
                 component="img"
                 src={formik.values.imageUrl}
                 alt="Image preview"
                 sx={{ 
                  maxWidth: '50%',
                  mt: '1rem',
                  borderRadius: '5px',
                  border : '1px solid #f2f2f2',
                  mb: '1rem',
                  ml: 'auto',
                  mr: 'auto',
                 }}
              />
              )}
          <Button variant="outlined" startIcon={<FileUploadOutlined />} 
            component="label"
            sx={{
             color:"#4B4EFC",
             borderColor:"#4B4EFC",
             textTransform:"none",
              fontSize: '0.7rem',
              padding: '9px 24px',
             '&:hover': {
              borderColor: '#8B8DFF',
              color: '#8B8DFF',
            },
            }}>
              Ajouter votre logo
              <input
                  type="file"
                  name="heroImage"
                  onChange={handleImageChange}
                  hidden
              />
            </Button> 
           <Typography variant="body2" sx={{ mt: '1rem', color: 'grey' }}>
            Format : png , jpg , jpeg
            </Typography>
            <Typography variant="body2" sx={{ mt : '0.3rem' , color: 'grey' }}>
            Taille : 5 Mo maximum
            </Typography>
      </Grid>
    </Grid>
    </Box>
     );
}
 
export default Store;