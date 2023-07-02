
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  StorefrontOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  Inventory2Outlined,
  CategoryOutlined,
  FileCopyOutlined,
  CampaignOutlined,
  ColorLensOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import logo from "assets/LineTech 1.png";


const navItems = [
  {
    text: "Analyses",
    icon: null,
  },
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Clients",
    icon: null,
  },
  {
    text: "Commandes",
    icon: <Inventory2Outlined />,
  },
  {
    text: "Produits",
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Categories",
    icon: <CategoryOutlined />,
  },
  {
    text: "Clients",
    icon: <Groups2Outlined/>,
  },
  {
    text: "Boutique",
    icon: null,
  },
  {
    text: "Boutique",
    icon: <StorefrontOutlined/>,
  },
  {
    text: "Theme",
    icon: <ColorLensOutlined/>,
  },
  {
    text: "Pages",
    icon: <FileCopyOutlined/>,
  },
  {
    text: "Marketing",
    icon: null,
  },
  {
    text: "Marketing",
    icon: <CampaignOutlined/>,
  },

];

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const activePath = pathname.split("/")[1];
    setActive(activePath);
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[50],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth:"1px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 0.2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                <img src={logo} alt="logo" width="100%" height="auto" />
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography variant="h6" key={text} sx={{ m: "0.5rem 0 0.4rem 1rem", color: "#6B7280" , fontSize:"13.5px" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[500]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[1000],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "0.2rem",
                          
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.grey[500],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText 
                      primary={text}
                       primaryTypographyProps={{
                        fontWeight: 'Medium',
                        variant: 'h6',   
                  }}/>
                  
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;