import { Box, FormControl } from "@mui/material";
import Header from "components/header/Header";
import { Grid } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useGetProductsQuery } from "state/api";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { SmartToyOutlined } from "@mui/icons-material";
import CircularProgress from '@mui/material/CircularProgress';
import { IconButton, InputAdornment } from "@mui/material";
import { ContentCopy } from '@mui/icons-material';


const FacebookAds = () => {
  const { data: products = [] } = useGetProductsQuery();
  const [selectedProduct, setSelectedProduct] = useState("");
  const [generatedHeadline, setSelectedHeadline] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");
  const [generatedTargetAudience, setSelectedTargetAudience] = useState("");


    const [loading, setLoading] = useState(false);


    // handling open ai api
    const API_KEY = "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";
    async function callOpenAIAPI1 (e){
      e.preventDefault();
      console.log("callOpenAIAPI");
        setLoading(true);   
      const APIbody = { 
              "model": "text-davinci-003",
              "prompt":
              "Créez un texte publicitaire Facebook pour ce produit en français avec des emojis:" + selectedProduct + "\nAdditional information: " + selectedDescription ,
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
                setSelectedHeadline(currentGeneratedText);
            }
          }, 20);
      });
  }
    async function callOpenAIAPI2 (e){
      e.preventDefault();
      console.log("callOpenAIAPI");
        setLoading(true);   
      const APIbody = { 
              "model": "text-davinci-003",
              "prompt":
              `Veuillez générer le public cible pour facebook ads de ce produit "${selectedProduct}". Prenez en compte des facteurs tels que la démographie, les intérêts et les préférences.`,
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
        setLoading(false);
        const generatedTargetAudience = data.choices[0].text.trim();
        const generatedTargetAudienceLength = generatedTargetAudience.length;
        let currentIndex = 0;
        let currentGeneratedTargetAudience = '';
        const interval = setInterval(() => {
            if (currentIndex === generatedTargetAudienceLength) {
              clearInterval(interval);
            } else {
              currentIndex++;
              currentGeneratedTargetAudience = generatedTargetAudience.slice(0, currentIndex);
                setSelectedTargetAudience(currentGeneratedTargetAudience);
            }
          }, 20);
      });
  }


  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };



    const handleDescriptionChange = (event) => {
        setSelectedDescription(event.target.value);
    };

    const handleCopyClick = () => {
        navigator.clipboard.writeText(generatedHeadline);
    };




  return (
    <Box m="1.5rem 2.5rem" pb={3}>
      <Header title="Facebook Ads" subtitle={"générer le texte d'une publicité Facebook en utilisant l'IA"}/>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={7}>
        <FormControl fullWidth sx={{ backgroundColor: "#f2f2f2" }} >
          <InputLabel id="produit-label">
            Veuillez choisir un produit
            </InputLabel>
          <Select
            labelId="produit-label"
            id="produit"
            name="name"
            value={selectedProduct}
            onChange={handleProductChange}
          >
            <MenuItem value="">
              <em>Aucun</em>
            </MenuItem>
            {products.map((product) => (
              <MenuItem key={product.id} value={product.name}>
                {product.name}
              </MenuItem>
            ))}
          </Select>
          </FormControl>
        </Grid>
        <Grid item xs={7}>
                  <TextField
                    label="
                    Donner des détails sur l'offre et les avantages du produit..."
                    multiline 
                    rows={4} 
                    fullWidth
                    placeholder="Tapper une description du produit" 
                    variant="outlined"
                    sx={{backgroundColor: '#f2f2f2','&:hover': { borderColor: 'currentColor' }}}
                    name="description"
                    value = {selectedDescription}
                    onChange={handleDescriptionChange}
                     />
         </Grid>
         <Grid xs={12} sm={6} item>
                <Button 
              variant="contained" 
              startIcon={
                loading
                 ? <CircularProgress size={20} /> : <SmartToyOutlined />}
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
              >Générer le texte principale</Button>
                </Grid>
        <Grid item xs={7}>
                  <TextField
                    label=""
                    multiline 
                    rows={5} 
                    fullWidth
                    placeholder="" 
                    variant="outlined"
                    sx={{backgroundColor: '#f2f2f2','&:hover': { borderColor: 'currentColor' }}}
                    name="generatedHeadline"
                    value = {generatedHeadline}
                    InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleCopyClick}>
                              <ContentCopy />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
             </Grid>
            <Grid item xs={7}>
            <TextField 
                  placeholder=""
                  label="" 
                  variant="outlined" 
                  multiline 
                  rows={5} 
                  fullWidth 
                  required 
                  sx={{backgroundColor: '#f2f2f2'}}
                  name="targetAudience"
                  value={generatedTargetAudience}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleCopyClick}>
                          <ContentCopy />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  />
            </Grid>
      </Grid>
    </Box>
  );
};

export default FacebookAds;
