import Header from "components/header/Header";
import {Box ,  IconButton,InputBase} from "@mui/material"
import { useGetClientsQuery } from "state/api";
import {DataGrid} from "@mui/x-data-grid";
import { Search } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { EmailOutlined } from "@mui/icons-material";
import { VisibilityOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";


const Clients = () => {

    const {data , isLoading} = useGetClientsQuery();
    console.log('data',data)
    const navigate = useNavigate();

    
    const columns = [
        {
            field : "fullName",
            headerName : "Nom",
            flex : 0.5,
        },
        {
            field: "createdAt",
            headerName: "Date de création",
            flex: 1,
            valueFormatter: (params) => {
                return new Date(params.value).toISOString().slice(0, 10);
              },
        },
        {
            field : "phone",
            headerName : "Numéro de téléphone",
            flex : 0.5,
        },
        {
            headerName : "Actions",
            flex : 0.5,
            renderCell: (params) => {
              const handleViewClick = () => {
                navigate(`/clients/viewClient/${params.row._id}`);
              };

                return (
                    <>
                        <IconButton aria-label="view"
                        onClick={() => {
                            handleViewClick();
                          }}
                        >
                            < VisibilityOutlined/>
                        </IconButton>
                        <IconButton aria-label="contact">
                            <EmailOutlined />
                        </IconButton>

                    </>
                );
            }
        },
    ]

    return ( 
        <Box m="1.5rem 2.5rem">
        <Header title="Liste des clients"/>
        <FlexBetween>
        <FlexBetween
        backgroundColor="#DFDFDF"
        borderRadius="9px"
        gap="3rem"
        p="0.1rem 1.5rem"
      >
        <InputBase placeholder="Rechercher un client" />
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
               rows={data || []}
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
 
export default Clients;