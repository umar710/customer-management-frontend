// frontend/src/pages/CustomerForm.js
import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Box,
  Alert,
  Snackbar,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useCustomer } from "../context/CustomerContext";

const CustomerForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const {
    createCustomer,
    updateCustomer,
    currentCustomer,
    fetchCustomer,
    loading,
    error,
    success,
    clearMessages,
  } = useCustomer();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  //const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      fetchCustomer(id);
    }
  }, [isEdit, id, fetchCustomer]);

  useEffect(() => {
    if (isEdit && currentCustomer) {
      setFormData({
        firstName: currentCustomer.firstName || "",
        lastName: currentCustomer.lastName || "",
        email: currentCustomer.email || "",
        phone: currentCustomer.phone || "",
      });
    }
  }, [isEdit, currentCustomer]);

  useEffect(() => {
    // Show success message when operation is successful
    if (success) {
      setSnackbarOpen(true);
      // Redirect to customers list after a short delay
      const timer = setTimeout(() => {
        navigate("/customers");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await updateCustomer(id, formData);
      } else {
        await createCustomer(formData);
      }
      // Success message will be handled by the context and useEffect
    } catch (error) {
      console.error("Error saving customer:", error);
    }
  };

  const handleCancel = () => {
    clearMessages();
    navigate("/customers");
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    clearMessages();
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {isEdit ? "Edit Customer" : "Create New Customer"}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={clearMessages}>
          {error}
        </Alert>
      )}

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}
            >
              <Button onClick={handleCancel} disabled={loading}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" disabled={loading}>
                {loading
                  ? "Processing..."
                  : isEdit
                  ? "Update Customer"
                  : "Create Customer"}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>

      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {success}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CustomerForm;
