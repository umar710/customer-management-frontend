// frontend/src/pages/CustomerDetail.js - Add status display
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
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  LocationOn as LocationIcon,
} from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { useCustomer } from "../context/CustomerContext";
import { useAddress } from "../context/AddressContext";
import AddressForm from "../components/AddressForm";

const CustomerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentCustomer, loading, error, fetchCustomer } = useCustomer();
  const { deleteAddress } = useAddress();

  const [addressFormOpen, setAddressFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);

  /*useEffect(() => {
    if (id) {
      fetchCustomer(id);
    }
  }, [id]);
  */

  useEffect(() => {
    if (id) {
      fetchCustomer(id);
    }
  }, [id, fetchCustomer]);

  const handleAddAddress = () => {
    setEditingAddress(null);
    setAddressFormOpen(true);
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setAddressFormOpen(true);
  };

  const handleDeleteClick = (address) => {
    setAddressToDelete(address);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (addressToDelete) {
      try {
        await deleteAddress(addressToDelete.id);
        // Refresh customer data to get updated addresses
        fetchCustomer(id);
        setDeleteDialogOpen(false);
        setAddressToDelete(null);
      } catch (error) {
        console.error("Error deleting address:", error);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setAddressToDelete(null);
  };

  const handleAddressSubmit = () => {
    setAddressFormOpen(false);
    setEditingAddress(null);
    // Refresh customer data to get updated addresses
    fetchCustomer(id);
  };

  if (loading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Button sx={{ mt: 2 }} onClick={() => navigate("/customers")}>
          Back to Customers
        </Button>
      </Container>
    );
  }

  if (!currentCustomer) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography>Customer not found.</Typography>
        <Button sx={{ mt: 2 }} onClick={() => navigate("/customers")}>
          Back to Customers
        </Button>
      </Container>
    );
  }

  const addressCount = currentCustomer.addresses?.length || 0;

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
          Customer Details
        </Typography>
        <Button onClick={() => navigate("/customers")}>
          Back to Customers
        </Button>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 2,
            }}
          >
            <Typography variant="h5">Personal Information</Typography>

            <Box sx={{ display: "flex", gap: 1 }}>
              <Chip
                icon={<LocationIcon />}
                label={`${addressCount} address(es)`}
                variant="outlined"
              />
              {addressCount === 1 && (
                <Chip
                  label="Only One Address"
                  color="primary"
                  variant="filled"
                />
              )}
            </Box>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography>
                <strong>First Name:</strong> {currentCustomer.firstName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                <strong>Last Name:</strong> {currentCustomer.lastName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                <strong>Phone:</strong> {currentCustomer.phone}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                <strong>Email:</strong> {currentCustomer.email || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddAddress}
                sx={{ mt: 2 }}
              >
                Add Address
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h5">Addresses</Typography>
            <Typography variant="body2" color="textSecondary">
              {addressCount} address(es)
            </Typography>
          </Box>

          {addressCount > 0 ? (
            currentCustomer.addresses.map((address) => (
              <Card key={address.id} variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography>
                        <strong>Address:</strong> {address.addressLine1}
                      </Typography>
                      {address.addressLine2 && (
                        <Typography>{address.addressLine2}</Typography>
                      )}
                      <Typography>
                        {address.city}, {address.state} {address.pinCode}
                      </Typography>
                      {address.isPrimary && (
                        <Typography
                          variant="body2"
                          color="primary"
                          sx={{ mt: 1 }}
                        >
                          Primary Address
                        </Typography>
                      )}
                    </Box>
                    <Box>
                      <IconButton
                        size="small"
                        onClick={() => handleEditAddress(address)}
                        color="primary"
                        sx={{ mr: 1 }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteClick(address)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))
          ) : (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="body2" color="textSecondary">
                No addresses found for this customer.
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddAddress}
                sx={{ mt: 2 }}
              >
                Add First Address
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Address Form Dialog */}
      <AddressForm
        open={addressFormOpen}
        onClose={() => {
          setAddressFormOpen(false);
          setEditingAddress(null);
        }}
        address={editingAddress}
        onSubmit={handleAddressSubmit}
        isEdit={Boolean(editingAddress)}
        presetCustomerId={currentCustomer.id}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this address? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CustomerDetail;
