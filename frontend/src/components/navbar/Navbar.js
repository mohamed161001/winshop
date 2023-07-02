import {
    LightModeOutlined,
    DarkModeOutlined,
    Menu as MenuIcon,
    NotificationsNoneOutlined,
    StoreOutlined,
  } from "@mui/icons-material";
  import { useLogout } from "hooks/useLogout";
  import FlexBetween from "components/FlexBetween";
  import { useDispatch } from "react-redux";
  import { setMode } from "state";
  import { useLocation } from "react-router-dom";
  import {
    AppBar,
    Avatar,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    useTheme,
  } from "@mui/material";
import { SettingsOutlined, LogoutOutlined } from "@mui/icons-material";
import Badge from '@mui/material/Badge';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
  
  const Navbar = ({
    isSidebarOpen,
    setIsSidebarOpen,
  }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const location = useLocation();
    const activePath = location.pathname.split("/")[1];
    const [anchorEl, setAnchorEl] = useState(null);
    const { logout } = useLogout();
  
    const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      navigate("/addnewstore");
      setAnchorEl(false);
    };

    const handleLogout = () => {
        logout();
    }

    const navigate = useNavigate();
  
    return (
      <AppBar sx={{
        position: "static",
        background: "none",
        boxShadow: "none"
      }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/*LEFT SIDE */}
          <FlexBetween gap="0.5rem">
            <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <MenuIcon />
            </IconButton>
            <h3>{activePath}</h3>
          </FlexBetween>
  
          {/*right side*/}
          <FlexBetween gap="1.5rem">
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlined sx={{ fontSize: "25px" }} />
              ) : (
                <LightModeOutlined sx={{ fontSize: "25px" }} />
              )}
            </IconButton>
            <IconButton>
              <Badge badgeContent={4} color="secondary">
                <NotificationsNoneOutlined sx={{ fontSize: "25px" }} />
              </Badge>
            </IconButton>
            <div>
              <IconButton onClick={handleMenuClick}>
                <Avatar variant="soft" sx={{ width: 27, height: 27 }} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                id="account-menu"
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handleMenuClose}>
                    <SettingsOutlined sx={{ mr: "0.5rem" }} />
                    Paramétres
                    </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                    <StoreOutlined sx={{ mr: "0.5rem" }} />
                    Créer une autre boutique</MenuItem>
                <MenuItem onClick={handleLogout}>
                    <LogoutOutlined sx={{ mr: "0.5rem" }} />
                    Se déconnecter
                    </MenuItem>
              </Menu>
            </div>
          </FlexBetween>
        </Toolbar>
      </AppBar>
    );
  }
  
  export default Navbar;
  