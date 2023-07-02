import { CssBaseline , ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { BrowserRouter, Routes , Route , Navigate } from "react-router-dom";
import { themeSettings } from "theme";
import { useSelector } from "react-redux";
import Layout from "scenes/layout"
import Dashboard from "scenes/dashboard";
import Products from "scenes/products/Products";
import AddProduct from "scenes/products/AddProduct";
import Categories from "scenes/categories/Categories"
import AddCategory from "scenes/categories/AddCategory";
import EditCategory from "scenes/categories/EditCategory";
import Clients from "scenes/clients/Clients";
import Orders from "scenes/orders/Orders";
import EditOrder from "scenes/orders/EditOrder";
import EditProduct from "scenes/products/EditProduct";
import Pages from "scenes/pages/pages";
import Theme from "scenes/theme/theme";
import ViewOrder from "scenes/orders/ViewOrder";
import ViewClient from "scenes/clients/ViewClient";
import Marketing from "scenes/Marketing/Marketing";
import Signup from "scenes/Signup/Signup";
import Signin from "scenes/Signin/Signin";
import FacebookAds from "scenes/Marketing/FacebookAds";
import InstagramAds from "scenes/Marketing/InstagramAds";
import Email from "scenes/Marketing/Email";
import Store from "scenes/store/store";
import EditAbouUs from "scenes/pages/editAboutUs";
import EditReturnsPolicy from "scenes/pages/editReturnsPolicy";
import AddNewStore from "scenes/AddNewStore/AddNewStore";

function App() {
  const mode = useSelector((state)=>state.global.mode);
  const theme = useMemo(()=>createTheme(themeSettings(mode)),[mode]);
  return (
    <div className="app">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Routes>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/addnewstore" element={<AddNewStore/>}/>
          <Route element= {<Layout/>}>
            <Route path="/" element= {<Navigate to="/dashboard" replace />}/>
            <Route path="/dashboard" element = {<Dashboard/>}/>
            <Route path="/produits" element = {<Products/>}/>
            <Route path="/produits/addproduct" element = {<AddProduct/>}/>
            <Route path="/produits/editproduct/:productId" element={<EditProduct />} />
            <Route path="/categories" element = {<Categories/>}/>
            <Route path="/categories/addcategory" element = {<AddCategory/>}/>
            <Route path="/categories/editcategory/:categoryId" element={<EditCategory />} />
            <Route path="/clients" element = {<Clients/>}/>
            <Route path="/clients/viewclient/:orderId" element={<ViewClient />} />
            <Route path="/commandes" element = {<Orders/>}/>
            <Route path="/commandes/viewOrder/:orderId" element={<ViewOrder />} />
            <Route path="/commandes/editorder/:orderId" element={<EditOrder />} />
            <Route path="/pages" element={<Pages/>}/>
            <Route path="/pages/editaboutus" element={<EditAbouUs/>}/>
            <Route path="/pages/editreturnspolicy" element={<EditReturnsPolicy/>}/>
            <Route path="/theme" element={<Theme/>}/>
            <Route path="/boutique" element={<Store/>}/>
            <Route path="/marketing" element={<Marketing/>}/>
            <Route path="/marketing/facebook" element={<FacebookAds/>}/>
            <Route path="/marketing/instagram" element={<InstagramAds/>}/>
            <Route path="/marketing/email" element={<Email/>}/>
          </Route>
        </Routes>
      </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
