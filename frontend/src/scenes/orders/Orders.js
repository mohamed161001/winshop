import Header from "components/header/Header";
import {Box ,  IconButton,InputBase} from "@mui/material"
import { useGetClientsQuery } from "state/api";
import {DataGrid} from "@mui/x-data-grid";
import {  EditOutlined , Search } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { Chip } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VisibilityOutlined } from "@mui/icons-material";




const Orders = () => {

    const {data , isLoading} = useGetClientsQuery();
    const [searchTerm, setSearchTerm] = useState("");
    console.log('data',data)
    const navigate = useNavigate();


    const filteredData = data
    ? data.filter((row) =>
        row.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];




    const handleSearchTermChange = (event) => {
      setSearchTerm(event.target.value);
    };



    
    const columns = [

        {
            field: "createdAt",
            headerName: "Date de création",
            flex: 1,
            valueFormatter: (params) => {
                return new Date(params.value).toISOString().slice(0, 10);
              },
        },
        {
            field : "fullName",
            headerName : "Client",
            flex : 0.5,
        },
        {
            field : "total",
            headerName : "Totale (en DT)",
            flex : 0.5,
        },
        {
            field : "status",
            headerName : "Statut",
            flex : 0.5,
            renderCell: (params) => {
                let color;
                let backgroundColor;
                switch (params.value) {
                    case "En attente":
                      color = "#C39A06";
                      backgroundColor = "#FFF59D";
                      break;
                    case "Confirmé":
                      color = "#C39A06";
                      backgroundColor = "#FFF59D";
                      break;
                    case "Livré":
                        color = "#10AF0D";
                        backgroundColor = "#ACFFAF";
                      break;
                    case "Annulé":
                        color = "#F95757";
                        backgroundColor = "#FFCACA";
                      break;
                    default:
                        color = "default";
                        backgroundColor = "default";
                  }
                return (
                  <Chip
                    label={params.value}
                    size="small"
                    sx={{
                        backgroundColor: backgroundColor,
                        color: color,
                        borderRadius: "5px",
                      }}
                  />
                );
              },
        },
        {
            headerName : "Actions",
            flex : 0.5,
            renderCell: (params) => {
              const handleEditClick = () => {
                navigate(`/commandes/editOrder/${params.row._id}`);
              };
              const handleViewClick = () => {
                navigate(`/commandes/viewOrder/${params.row._id}`);
              };
                return (
                    <>
                        <IconButton aria-label="view" onClick={handleViewClick}>
                            <VisibilityOutlined />
                        </IconButton>
                        <IconButton aria-label="edit" onClick={handleEditClick}>
                            <EditOutlined />
                        </IconButton>
                    </>
                );
            }
        },
    ]




    return ( 
        <Box m="1.5rem 2.5rem">
        <Header title="Liste des commandes"/>
        <FlexBetween>
        <FlexBetween
        backgroundColor="#DFDFDF"
        borderRadius="9px"
        gap="3rem"
        p="0.1rem 1.5rem"
      >
        <InputBase
         placeholder="Rechercher une commande"
         value={searchTerm}
         onChange={handleSearchTermChange}
          />
        <IconButton>
          <Search />
        </IconButton>
      </FlexBetween>
        </FlexBetween>
        <Box
          mt="40px"
          height="75vh"
          backgroundColor="white"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5px",
            },
          }}
        >
            <DataGrid
               rows={filteredData || []}
               columns={columns}
               loading={isLoading || !data}
               getRowId={(row)=>row._id}
               sx={{
                boxShadow: 2,
                "& .MuiDataGrid-virtualScroller": {
                  overflowY: "auto",
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(0, 0, 0, 0.3) transparent",
                  "&::-webkit-scrollbar": {
                    width: "6px",
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "transparent",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    borderRadius: "3px",
                  },
                },
               }}
            />
        </Box>
    </Box>
     );
}
 
export default Orders;