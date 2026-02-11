import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme } from "./utils/Themes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import  Authentication  from './pages/Authentication';
import  ShopListing  from './pages/ShopListing';
import  Favorite  from './pages/Favourite';
import  NewArrival  from './pages/NewArrival';
import  Oders  from './pages/Orders';
import  Contact  from './pages/Contact';
import  Cart  from './pages/Cart';
import  ProductDetails  from './pages/ProductDetails';
import { useDispatch, useSelector } from "react-redux";
import ToastMessage from "./components/ToastMessage";


const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.2s ease;
`;
function App() {
  const { currentUser } = useSelector((state) => state.user);
  const { open, message, severity } = useSelector((state) => state.user);
  const [openAuth, setOpenAuth] = useState(false);
  return (
    <ThemeProvider theme={lightTheme}>
     <BrowserRouter>
     <Container>
      <Navbar setOpenAuth={setOpenAuth} currentUser={currentUser} />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/shop" exact element={<ShopListing />} />
        <Route path="/New_Arrivals" exact element={<NewArrival />} />
        <Route path="/Orders" exact element={<Oders />} />
        <Route path="/Contact" exact element={<Contact />} />
        <Route path="/favorite" exact element={<Favorite />} />
        <Route path="/cart" exact element={<Cart />} />
        <Route path="/shop/:id" exact element={<ProductDetails />} />
      </Routes>
      {openAuth && <Authentication openAuth={openAuth} setOpenAuth={setOpenAuth} />}
      {open && (
        <ToastMessage message={message} severity={severity}/>
      )}
     </Container>
     </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;