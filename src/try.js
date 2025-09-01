// frontend/src/pages/CustomerList.js
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
  Card,
  CardContent,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useCustomer } from "../context/CustomerContext";

const CustomerList = () => {
  const navigate = useNavigate();
  const { customers, loading, error, fetchCustomers } = useCustomer();
  const [debugInfo, setDebugInfo] = useState("");

  useEffect(() => {
    console.log("CustomerList mounted, fetching customers...");
    fetchCustomers()
      .then(() => {
        console.log("Customers fetched:", customers);
        setDebugInfo(`Loaded ${customers.length} customers`);
      })
      .catch((err) => {
        console.error("Error in fetchCustomers:", err);
        setDebugInfo(`Error: ${err.message}`);
      });
  }, []);

  const handleAddCustomer = () => {
    navigate("/customers/new");
  };

  const handleRetry = () => {
    setDebugInfo("Retrying...");
    fetchCustomers().then(() => {
      setDebugInfo(`Loaded ${customers.length} customers after retry`);
    });
  };

  if (loading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
          flexDirection: "column",
        }}
      >
        <CircularProgress />
        <Typography variant="body2" sx={{ mt: 2 }}>
          Loading customers...
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {debugInfo}
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h1">
          Customers
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddCustomer}
        >
          Add Customer
        </Button>
      </Box>

      {/* Debug information */}
      <Box sx={{ mb: 2, p: 1, backgroundColor: "#f5f5f5", borderRadius: 1 }}>
        <Typography variant="body2" color="textSecondary">
          Debug: {debugInfo || "No debug info available"}
        </Typography>
        <Button size="small" onClick={handleRetry} sx={{ mt: 1 }}>
          Retry Loading
        </Button>
      </Box>

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
          action={
            <Button color="inherit" size="small" onClick={handleRetry}>
              RETRY
            </Button>
          }
        >
          Error: {error}
        </Alert>
      )}

      {customers.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="h6" gutterBottom>
              No customers found
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {error
                ? "There was an error loading customers."
                : "No customers have been created yet."}
            </Typography>
            <Button
              variant="contained"
              onClick={handleAddCustomer}
              sx={{ mt: 2 }}
            >
              Create Your First Customer
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Box>
          {customers.map((customer) => (
            <Box
              key={customer.id}
              sx={{ p: 2, border: "1px solid #ddd", borderRadius: 1, mb: 2 }}
            >
              <Typography variant="h6">
                {customer.firstName} {customer.lastName}
              </Typography>
              <Typography>Phone: {customer.phone}</Typography>
              {customer.email && (
                <Typography>Email: {customer.email}</Typography>
              )}
              <Button
                variant="outlined"
                sx={{ mt: 1 }}
                onClick={() => navigate(`/customers/${customer.id}`)}
              >
                View Details
              </Button>
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default CustomerList;
