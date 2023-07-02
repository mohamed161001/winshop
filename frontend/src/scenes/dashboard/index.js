import FlexBetween from "components/FlexBetween";
import Header from "components/header/Header";
import { Box } from "@mui/material";
import Button from "@mui/material";
import Typography from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DataGrid } from "@mui/x-data-grid";
import StatBox from "components/StatBox/StatBox";
import { ShoppingBag } from "@mui/icons-material";
import { HourglassTop } from "@mui/icons-material";
import { Traffic } from "@mui/icons-material";
import { AccountBalanceWallet } from "@mui/icons-material";
import SalesChart from "components/salesChart/SalesChart";
import { useGetClientsQuery } from "state/api";
import { Chip } from "@mui/material";



const Dashboard = () => {

    const {data , isLoading} = useGetClientsQuery();


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
    ];




    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
    return ( 
        <Box m="1.5rem 2.5rem">
            <Header title="Dashboard" />

            <Box
            mt = "20px"
            display= "grid"
            gridTemplateColumns= "repeat(12, 1fr)"
            gridAutoRows ="160px"
            gap="10px"
            sx={{
                "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
            }}
            >
                 {/* ROW 1 */}
                <StatBox
                    title="Commandes d'aujourd'hui"
                    value="10"
                    increase="+ 33.5%"
                    description="depuis hier"
                    icon={<ShoppingBag 

                        sx = {{
                            color: 'black',
                        }}
                    />}
                />
                <StatBox
                    title="Revenue d'aujourd'hui"
                    value="500DT"
                    increase="+ 33.5%"
                    description="depuis hier"
                    icon={<AccountBalanceWallet
                        sx = {{
                            color: 'black',
                        }}
                         />}
                />
                <Box 
                gridColumn="span 6"
                gridRow="span 2"
                display="flex"
                p="0rem"
                backgroundColor="white"
                borderRadius="10px"
                boxShadow="0px 4px 10px rgba(0, 0, 0, 0.05)"
                >
                    <SalesChart view="sales" isDashboard={true} />
                    </Box>



                <StatBox
                    title="Commandes en attente"
                    value="5"
                    increase="+ 33.5%"
                    description="depuis hier"
                    icon={<HourglassTop
                        sx = {{
                            color: 'black',
                        }}
                         />}
                />
                <StatBox
                    title="Revenue cette Année"
                    value="5000DT"
                    increase="+ 33.5%"
                    description="depuis l'année "
                    icon={<Traffic
                        sx = {{
                            color: 'black',
                        }}
                         />}
                />
            <Box
                gridColumn="span 12"
                gridRow="span 3"
                backgroundColor="white"
                borderRadius="20px"
                sx={{
                  "& .MuiDataGrid-root": {
                    border: "none",
                    borderRadius: "20px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
                  },
                  "& .MuiDataGrid-columnHeader": {
                    backgroundColor: "white",
                    },
                    "& .MuiDataGrid-columnHeaderTitle": {
                        fontWeight: "bold",
                        fontSize: "13px",
                        lineHeight: "17px",
                        color: "#000000",
                        },
                        "& .MuiDataGrid-cell": {
                            fontSize: "13px",
                            lineHeight: "17px",
                            color: "#000000",
                            },
                }}
                >
                    <DataGrid
               rows={ data ? data : []}
               columns={columns}
               loading={isLoading || !data}
               getRowId={(row)=>row._id}
               sx={{
                borderRadius: "20px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",

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



        </Box>
     );
}
 
export default Dashboard;