import Header from "components/header/Header";
import {Box ,  Button , IconButton,InputBase} from "@mui/material"
import { useGetProductsQuery , useDeleteProductMutation } from "state/api";
import {DataGrid} from "@mui/x-data-grid";
import { DeleteOutline , EditOutlined , Search } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Alert from '@mui/material/Alert';
import { useState } from "react";
import { AddOutlined } from "@mui/icons-material";
import Avatar from '@mui/material/Avatar';



const Products = () => {

    const {data , isLoading} = useGetProductsQuery();
    console.log('data',data)
    const navigate = useNavigate();
    const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

    const [notification, setNotification] = useState({
      open: false,
      message: '',
      severity: 'success',
    });

    const handleDeleteClick = async(productId) => {
      if (window.confirm("vous êtes sûr de vouloir supprimer ce produit ?")) {
        /*deleteCategory(categoryId);*/
        try {
          await deleteProduct(productId);
          setNotification({
            open: true,
            message: 'Produit supprimé avec succès',
            severity: 'success',
          });
        } catch (error) {
          setNotification({
            open: true,
            message: 'Une erreur lors de la suppression',
            severity: 'error',
          });
        }
      
      }
    };

          // function to close notification after 3 seconds
          useEffect(() => {
            let timer;
            if (notification.open) {
            timer = setTimeout(() => {
            setNotification({ ...notification, open: false });
           }, 3000);
           }
           return () => {
            clearTimeout(timer);
           };
         }, [notification]);


    const columns = [

        {
            field : "name",
            headerName : "Produit",
            flex : 1,
            renderCell: (params) => (
              <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar src={`http://localhost:4000/uploads/categoryImages/${params.row.image}`} alt={params.row.name} variant="rounded" style={{ marginRight: "0.6rem" }} />
                  <span>{params.row.name}</span>
              </div>
          )
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
            field : "quantity",
            headerName : "Inventaire",
            flex : 0.5,
        },
        {
            field : "price",
            headerName : "Prix (DT)",
            flex : 0.5,
        },
        {
            headerName : "Actions",
            flex : 0.5,
            renderCell: (params) => {
              const handleEditClick = () => {
                navigate(`/produits/editproduct/${params.row._id}`);
              };
                return (
                    <>
                        <IconButton aria-label="edit" onClick={handleEditClick}>
                            <EditOutlined />
                        </IconButton>
                        <IconButton 
                        aria-label="delete"
                        onClick={() => handleDeleteClick(params.row._id)}
                        disabled = {isDeleting}
                        >
                            <DeleteOutline />
                        </IconButton>

                    </>
                );
            }
        },

        
    ]

    return ( 
        <Box m="1.5rem 2.5rem">
          <Box mb="0.7rem">
          <FlexBetween>
            <Header title="Liste des produits"/>
            {/* Notification code here */}
            {notification.open && (
              <Alert variant="standard" severity={notification.severity} onClose={() => setNotification({ ...notification, open: false })}>
              {notification.message}
              </Alert>
           )}
          </FlexBetween>
          </Box>
            <FlexBetween>
            <FlexBetween
            backgroundColor="#DFDFDF"
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Rechercher un produit" />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
            <Button 
              component={Link}
              to="/produits/addproduct"
              variant="contained" 
              startIcon={<AddOutlined />}
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
              }}
              >Ajouter un produit</Button>
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
 
export default Products;