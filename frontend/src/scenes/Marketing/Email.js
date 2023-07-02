import { useGetClientsQuery } from "state/api";import { Box, FormControl } from "@mui/material";
import Header from "components/header/Header";
import { Grid } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { SmartToyOutlined } from "@mui/icons-material";
import CircularProgress from '@mui/material/CircularProgress';
import { IconButton, InputAdornment } from "@mui/material";
import { ContentCopy } from '@mui/icons-material';



const Email = () => {

    const { data: clients = [] } = useGetClientsQuery();


 const [selectedClient, setSelectedClient] = useState("");
  const [generatedEmail, setSelectedEmail] = useState("");
  const [selectedObject, setSelectedObject] = useState("");

  const [loading, setLoading] = useState(false);




      // handling open ai api
      const API_KEY = "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";
      async function callOpenAIAPI (e){
        e.preventDefault();
        console.log("callOpenAIAPI");
          setLoading(true);   
        const APIbody = { 
                "model": "text-davinci-003",
                "prompt": `Générer un e-mail pour le client ${selectedClient} concernant ${selectedObject}.`,
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
                  setSelectedEmail(currentGeneratedText);
              }
            }, 20);
        });
    }







    const handleClientChange = (event) => {
        setSelectedClient(event.target.value);
      };
    
    const handleObjectChange = (event) => {
        setSelectedObject(event.target.value);
    };
    
    const handleCopyClick = () => {
        navigator.clipboard.writeText(generatedEmail);
    };




    return ( 
        <Box m="1.5rem 2.5rem">
            <Header title="Email" subtitle={"générer emails envoyés à vos clients en utilisant l'IA"}/>
            <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={7}>
        <FormControl fullWidth sx={{ backgroundColor: "#f2f2f2" }} >
          <InputLabel id="client-label">
            Veuillez choisir un client
            </InputLabel>
          <Select
            labelId="client-label"
            id="client"
            name="client"
            value={selectedClient}
            onChange={handleClientChange}
          >
            <MenuItem value="">
              <em>Aucun</em>
            </MenuItem>
            {clients.map((client) => (
              <MenuItem key={client.id} value={client.fullName}>
                {client.fullName}
              </MenuItem>
            ))}
          </Select>
          </FormControl>
        </Grid>
        <Grid item xs={7}>
        <FormControl fullWidth sx={{ backgroundColor: "#f2f2f2" }} >
          <InputLabel id="client-label">
            Veuillez choisir un objet
            </InputLabel>
          <Select
            labelId="object-label"
            id="object"
            name="object"
            value={selectedObject}
            onChange={handleObjectChange}
          >
            <MenuItem value="">
              <em>Aucun</em>
            </MenuItem>
            <MenuItem value="retard-de-livraison">Retard de livraison</MenuItem>
            <MenuItem value="confirmation-de-commande">Confirmation de commande</MenuItem>
            <MenuItem value="demande-d-avis-des-produits">Demande d'avis des produits</MenuItem>
            <MenuItem value="offre-de-remise">Offre de remise</MenuItem>
          </Select>
          </FormControl>
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
              onClick={callOpenAIAPI}
              >Générer l'email</Button>
                </Grid>
        <Grid item xs={7}>
                  <TextField
                    label=""
                    multiline 
                    rows={25} 
                    fullWidth
                    placeholder="" 
                    variant="outlined"
                    sx={{backgroundColor: '#f2f2f2','&:hover': { borderColor: 'currentColor' }}}
                    name="generatedEmail"
                    value = {generatedEmail}
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
}
 
export default Email;