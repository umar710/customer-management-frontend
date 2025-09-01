// frontend/src/pages/AddressList.js
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Pagination,
  CircularProgress,
  Alert,
  Grid,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useAddress } from "../context/AddressContext";
import AddressForm from "../components/AddressForm";
import AddressFilters from "../components/AddressFilters";

const AddressList = () => {
  const {
    addresses,
    loading,
    error,
    pagination,
    filters,
    fetchAddresses,
    deleteAddress,
    //setFilters,
    clearFilters,
    setPage,
  } = useAddress();

  const [addressFormOpen, setAddressFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);

  /*useEffect(() => {
    fetchAddresses();
  }, [filters, pagination.page]);
  */

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses, filters, pagination.page]);

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
      await deleteAddress(addressToDelete.id);
      setDeleteDialogOpen(false);
      setAddressToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setAddressToDelete(null);
  };

  const handleSubmitAddress = async (addressData) => {
    setAddressFormOpen(false);
    // The actual create/update will be handled through the context
    // This will trigger a refetch of addresses
    fetchAddresses();
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleClearFilters = () => {
    clearFilters();
  };

  // Safe check for addresses array
  const addressesArray = addresses || [];
  const isEmpty = addressesArray.length === 0;

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
          Address Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddAddress}
        >
          Add Address
        </Button>
      </Box>

      {/* Filters */}
      <Box sx={{ mb: 3, p: 2, border: "1px solid #eee", borderRadius: 1 }}>
        <Typography variant="h6" gutterBottom>
          Filters
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          <AddressFilters />
          <Button variant="outlined" onClick={handleClearFilters}>
            Clear Filters
          </Button>
        </Box>

        {/* Active filters display */}
        {(filters.city ||
          filters.state ||
          filters.pinCode ||
          filters.customerId) && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Active filters:
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {filters.city && (
                <Chip label={`City: ${filters.city}`} size="small" />
              )}
              {filters.state && (
                <Chip label={`State: ${filters.state}`} size="small" />
              )}
              {filters.pinCode && (
                <Chip label={`Pin: ${filters.pinCode}`} size="small" />
              )}
              {filters.customerId && (
                <Chip
                  label={`Customer ID: ${filters.customerId}`}
                  size="small"
                />
              )}
            </Box>
          </Box>
        )}
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : isEmpty ? (
        <Card>
          <CardContent sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="h6" gutterBottom>
              No addresses found
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {Object.values(filters).some((filter) => filter)
                ? "No addresses match your filters."
                : "No addresses have been created yet."}
            </Typography>
            <Button
              variant="contained"
              onClick={handleAddAddress}
              sx={{ mt: 2 }}
            >
              Add First Address
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <Grid container spacing={3}>
            {addressesArray.map((address) => (
              <Grid item xs={12} md={6} key={address.id}>
                <Card>
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 2,
                      }}
                    >
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          {address.firstName} {address.lastName}
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                          {address.phone}
                        </Typography>
                      </Box>
                      <Box>
                        {address.isPrimary && (
                          <Chip
                            label="Primary"
                            color="primary"
                            size="small"
                            sx={{ mb: 1 }}
                          />
                        )}
                        <Box>
                          <IconButton
                            size="small"
                            onClick={() => handleEditAddress(address)}
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
                    </Box>

                    <Typography gutterBottom>
                      <strong>Address:</strong> {address.addressLine1}
                    </Typography>
                    {address.addressLine2 && (
                      <Typography gutterBottom>
                        {address.addressLine2}
                      </Typography>
                    )}
                    <Typography gutterBottom>
                      {address.city}, {address.state} {address.pinCode}
                    </Typography>

                    <Box sx={{ mt: 2 }}>
                      <Chip
                        label={`Customer ID: ${address.customerId}`}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={pagination.totalPages}
                page={pagination.page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </>
      )}

      {/* Address Form Dialog */}

      <AddressForm
        open={addressFormOpen}
        onClose={() => setAddressFormOpen(false)}
        address={editingAddress} // This should be your editing address state
        onSubmit={handleSubmitAddress}
        isEdit={Boolean(editingAddress)}
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

export default AddressList;
