import Header from "components/header/Header";
import { Box, Button, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { EditOutlined, Search } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useNavigate } from "react-router-dom";


const Pages = () => {
  const navigate = useNavigate();

  const rows = [
    { id: 1, name: "A propos", createdAt: "2023-05-19T08:30:00Z" },
    { id: 2, name: "Politiques de retour", createdAt: "2023-05-20T12:45:00Z" },
  ];

  const columns = [
    {
      field: "name",
      headerName: "Nom de la page",
      flex: 0.5,
    },
    {
      field: "createdAt",
      headerName: "Dernière modification",
      flex: 1,
      valueFormatter: (params) => {
        return new Date(params.value).toISOString().slice(0, 10);
      },
    },
    {
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params) => {
        const handleEditClick = () => {
          navigate(`/pages/editAboutUs`);
        };
        return (
          <>
            <IconButton aria-label="edit" onClick={handleEditClick}>
              <EditOutlined />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Box mb="0.7rem">
        <FlexBetween>
          <Header
           title="Liste des pages"
           subtitle = "modifier le contenu des pages de votre boutique"
          />
        </FlexBetween>
      </Box>
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
          rows={rows}
          columns={columns}
          getRowId={(row) => row.id}
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
};

export default Pages;
