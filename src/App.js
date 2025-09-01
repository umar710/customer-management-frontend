// frontend/src/App.js - Update to include AddressProvider
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CustomerList from "./pages/CustomerList";
import CustomerDetail from "./pages/CustomerDetail";
import CustomerForm from "./pages/CustomerForm";
import AddressList from "./pages/AddressList";
import Navigation from "./components/Navigation";
import { CustomerProvider } from "./context/CustomerContext";
import { AddressProvider } from "./context/AddressContext";
import "./App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CustomerProvider>
        <AddressProvider>
          <Router>
            <div className="App">
              <Navigation />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<CustomerList />} />
                  <Route path="/customers" element={<CustomerList />} />
                  <Route path="/customers/new" element={<CustomerForm />} />
                  <Route path="/customers/:id" element={<CustomerDetail />} />
                  <Route
                    path="/customers/:id/edit"
                    element={<CustomerForm />}
                  />
                  <Route path="/addresses" element={<AddressList />} />
                </Routes>
              </main>
            </div>
          </Router>
        </AddressProvider>
      </CustomerProvider>
    </ThemeProvider>
  );
}

export default App;
