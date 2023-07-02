import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import Header from 'components/header/Header';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { SmartToyOutlined } from '@mui/icons-material';


const EditAbouUs = () => {

    const [loading, setLoading] = useState(false);




     // handling open ai api
  const API_KEY = "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";
  async function callOpenAIAPI (e){
    e.preventDefault();
    console.log("callOpenAIAPI");
    setLoading(true);
    const APIbody = { 
            "model": "text-davinci-003",
            "prompt": `Générer le contenu textuelle de la page "À propos de nous" pour cette boutique : Caprezor . Informations additionnelles : ${formik.values.info} :`,
            "max_tokens": 300,
            "temperature": 0.5
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
        formik.setFieldValue('content', currentDescription);
      }
    }, 20);
      
    });
}


    const validationSchema = yup.object({
        name: yup.string().required('Le nom de la page est obligatoire'),
        content: yup.string().required('le contenu de la page est obligatoire'),
      });
    
    
      const formik = useFormik({
        initialValues: {
            name: 'à propos de nous',
            content: '',
            info: '',
        },
        validationSchema,
        onSubmit: async(values) => {
            console.log('Form values:', values);
        },
      });




    return ( 
        <Box m="1.5rem 2.5rem">
        <Header title="Modifier à propos de nous" />
        <form onSubmit={formik.handleSubmit} noValidate enctype="multipart/form-data">
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <TextField
                label="le nom de la page"
                placeholder="le nom de la page"
                variant="outlined"
                fullWidth
                required
                sx={{ 
                    backgroundColor: '#f2f2f2',
                    "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#000000",
                    },
                 }}
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                disabled
              />
            </Grid>
            <Grid item xs={8}>
                <TextField
                    label="Informations additionnelles sur votre boutique"
                    placeholder="Informations additionnelles sur votre boutique"
                    variant="outlined"
                    rows={4}
                    multiline
                    fullWidth
                    sx={{ backgroundColor: '#f2f2f2' }}
                    name="info"
                    value={formik.values.info}
                    onChange={formik.handleChange}
                    error={formik.touched.info && Boolean(formik.errors.info)}
                    helperText={formik.touched.info && formik.errors.info}
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
              >Générer la page</Button>
                </Grid>
            <Grid item xs={8}>
              <TextField
                label="Contenu de la page"
                placeholder="Contenu de la page"
                variant="outlined"
                rows={15}
                multiline
                fullWidth
                required
                sx={{ backgroundColor: '#f2f2f2' }}
                name="content"
                value={formik.values.content}
                onChange={formik.handleChange}
                error={formik.touched.content && Boolean(formik.errors.content)}
                helperText={formik.touched.content && formik.errors.content}
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
                 Modifier la page
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
     );
}
 
export default EditAbouUs;