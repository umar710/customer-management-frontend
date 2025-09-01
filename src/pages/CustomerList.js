// frontend/src/pages/CustomerList.js - Complete fixed version
import React, { useEffect, useState, useCallback } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
  Grid,
  Snackbar,
  Chip,
  TextField,
  InputAdornment,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  LocationOn as LocationIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
  FilterList as FilterIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useCustomer } from "../context/CustomerContext";

const CustomerList = () => {
  const navigate = useNavigate();
  const {
    customers,
    loading,
    error,
    success,
    fetchCustomers,
    deleteCustomer,
    clearMessages,
  } = useCustomer();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [deleteError, setDeleteError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    city: "",
    state: "",
    pinCode: "",
  });
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [filtersExpanded, setFiltersExpanded] = useState(false);

  const loadCustomers = useCallback(async () => {
    await fetchCustomers();
  }, [fetchCustomers]);

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  /*
  // Filter customers based on search term and filters
  useEffect(() => {
    let filtered = customers;

    console.log("All customers:", customers); // Debugging
    console.log("Current filters:", filters); // Debugging

    // Apply search term filter
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (customer) =>
          customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.phone.includes(searchTerm) ||
          customer.id.toString().includes(searchTerm)
      );
    }

    // Apply city filter - check if cities field contains the filter
    if (filters.city.trim() !== "") {
      filtered = filtered.filter(
        (customer) =>
          customer.cities &&
          customer.cities.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    // Apply state filter - check if cities field might contain state info
    if (filters.state.trim() !== "") {
      filtered = filtered.filter(
        (customer) =>
          customer.cities &&
          customer.cities.toLowerCase().includes(filters.state.toLowerCase())
      );
    }

    // Apply pin code filter - check if cities field might contain pin code info
    if (filters.pinCode.trim() !== "") {
      filtered = filtered.filter(
        (customer) =>
          customer.cities && customer.cities.includes(filters.pinCode)
      );
    }

    console.log("Filtered results:", filtered); // Debugging
    setFilteredCustomers(filtered);
  }, [customers, searchTerm, filters]);

  */

  /*
  // frontend/src/pages/CustomerList.js - Updated filtering logic
  useEffect(() => {
    let filtered = customers;

    console.log("All customers:", customers);
    console.log("Current filters:", filters);

    // Apply search term filter
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (customer) =>
          customer.firstName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          customer.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.phone?.includes(searchTerm) ||
          customer.id?.toString().includes(searchTerm)
      );
    }

    // Apply city filter - check multiple possible fields
    if (filters.city.trim() !== "") {
      filtered = filtered.filter((customer) => {
        // Check various possible locations where city data might be stored
        const cityMatch =
          (customer.cities &&
            customer.cities
              .toLowerCase()
              .includes(filters.city.toLowerCase())) ||
          (customer.addresses &&
            customer.addresses.some(
              (address) =>
                address.city &&
                address.city.toLowerCase().includes(filters.city.toLowerCase())
            )) ||
          (customer.city &&
            customer.city.toLowerCase().includes(filters.city.toLowerCase()));

        console.log(`Customer ${customer.id} city match:`, cityMatch);
        return cityMatch;
      });
    }

    // Apply state filter - check multiple possible fields
    if (filters.state.trim() !== "") {
      filtered = filtered.filter((customer) => {
        const stateMatch =
          (customer.cities &&
            customer.cities
              .toLowerCase()
              .includes(filters.state.toLowerCase())) ||
          (customer.addresses &&
            customer.addresses.some(
              (address) =>
                address.state &&
                address.state
                  .toLowerCase()
                  .includes(filters.state.toLowerCase())
            )) ||
          (customer.state &&
            customer.state.toLowerCase().includes(filters.state.toLowerCase()));

        console.log(`Customer ${customer.id} state match:`, stateMatch);
        return stateMatch;
      });
    }

    // Apply pin code filter - check multiple possible fields
    if (filters.pinCode.trim() !== "") {
      filtered = filtered.filter((customer) => {
        const pinCodeMatch =
          (customer.cities && customer.cities.includes(filters.pinCode)) ||
          (customer.addresses &&
            customer.addresses.some(
              (address) =>
                address.pinCode && address.pinCode.includes(filters.pinCode)
            )) ||
          (customer.pinCode && customer.pinCode.includes(filters.pinCode));

        console.log(`Customer ${customer.id} pin code match:`, pinCodeMatch);
        return pinCodeMatch;
      });
    }

    console.log("Filtered results:", filtered);
    setFilteredCustomers(filtered);
  }, [customers, searchTerm, filters]);

  */

  // Final filtering logic after debugging
  useEffect(() => {
    let filtered = customers;

    // Debug: Check what fields are available
    if (customers.length > 0) {
      const firstCustomer = customers[0];
      console.log(
        "Available fields in customer object:",
        Object.keys(firstCustomer)
      );
      if (firstCustomer.addresses) {
        console.log(
          "First address of first customer:",
          firstCustomer.addresses[0]
        );
      }
    }

    // Apply search term filter
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (customer) =>
          customer.firstName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          customer.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.phone?.includes(searchTerm) ||
          customer.id?.toString().includes(searchTerm)
      );
    }

    // Apply location filters - try different field names
    if (
      filters.city.trim() !== "" ||
      filters.state.trim() !== "" ||
      filters.pinCode.trim() !== ""
    ) {
      filtered = filtered.filter((customer) => {
        // Check if customer has addresses array
        if (customer.addresses && customer.addresses.length > 0) {
          return customer.addresses.some((address) => {
            let matches = true;

            if (filters.city.trim() !== "") {
              matches =
                matches &&
                address.city &&
                address.city.toLowerCase().includes(filters.city.toLowerCase());
            }

            if (filters.state.trim() !== "") {
              matches =
                matches &&
                address.state &&
                address.state
                  .toLowerCase()
                  .includes(filters.state.toLowerCase());
            }

            if (filters.pinCode.trim() !== "") {
              matches =
                matches &&
                address.pinCode &&
                address.pinCode.includes(filters.pinCode);
            }

            return matches;
          });
        }

        // If no addresses array, try other fields
        let matches = true;

        if (filters.city.trim() !== "") {
          matches =
            matches &&
            ((customer.cities &&
              customer.cities
                .toLowerCase()
                .includes(filters.city.toLowerCase())) ||
              (customer.city &&
                customer.city
                  .toLowerCase()
                  .includes(filters.city.toLowerCase())));
        }

        if (filters.state.trim() !== "") {
          matches =
            matches &&
            ((customer.cities &&
              customer.cities
                .toLowerCase()
                .includes(filters.state.toLowerCase())) ||
              (customer.state &&
                customer.state
                  .toLowerCase()
                  .includes(filters.state.toLowerCase())));
        }

        if (filters.pinCode.trim() !== "") {
          matches =
            matches &&
            ((customer.cities && customer.cities.includes(filters.pinCode)) ||
              (customer.pinCode && customer.pinCode.includes(filters.pinCode)));
        }

        return matches;
      });
    }

    setFilteredCustomers(filtered);
  }, [customers, searchTerm, filters]);

  const handleAddCustomer = () => {
    navigate("/customers/new");
  };

  const handleViewDetails = (customerId) => {
    navigate(`/customers/${customerId}`);
  };

  const handleEditCustomer = (customerId) => {
    navigate(`/customers/${customerId}/edit`);
  };

  const handleDeleteClick = (customer) => {
    setCustomerToDelete(customer);
    setDeleteDialogOpen(true);
    setDeleteError("");
  };

  const handleDeleteConfirm = async () => {
    if (customerToDelete) {
      try {
        await deleteCustomer(customerToDelete.id);
        setDeleteDialogOpen(false);
        setCustomerToDelete(null);
        // Clear filters after deletion to refresh the view
        setSearchTerm("");
        setFilters({ city: "", state: "", pinCode: "" });
      } catch (error) {
        console.error("Error deleting customer:", error);
        setDeleteError(
          error.message || "Failed to delete customer. Please try again."
        );
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setCustomerToDelete(null);
    setDeleteError("");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({ city: "", state: "", pinCode: "" });
  };

  const handleSnackbarClose = () => {
    clearMessages();
  };

  const hasActiveFilters =
    searchTerm || filters.city || filters.state || filters.pinCode;

  if (loading && customers.length === 0) {
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
      </Container>
    );
  }

  const displayCustomers = hasActiveFilters ? filteredCustomers : customers;

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

      {/* Search Bar */}
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search customers by name, email, phone, or ID..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton onClick={handleClearSearch} size="small">
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Filters Accordion */}
      <Accordion
        expanded={filtersExpanded}
        onChange={() => setFiltersExpanded(!filtersExpanded)}
        sx={{ mb: 3 }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FilterIcon sx={{ mr: 1 }} />
            <Typography>Location Filters</Typography>
            {(filters.city || filters.state || filters.pinCode) && (
              <Chip
                label="Active"
                color="primary"
                size="small"
                sx={{ ml: 2 }}
              />
            )}
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Filter customers by their address locations. These filters will
            match against the cities where customers have addresses.
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Filter by City"
                value={filters.city}
                onChange={(e) => handleFilterChange("city", e.target.value)}
                placeholder="Enter city name"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Filter by State"
                value={filters.state}
                onChange={(e) => handleFilterChange("state", e.target.value)}
                placeholder="Enter state name"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Filter by Pin Code"
                value={filters.pinCode}
                onChange={(e) => handleFilterChange("pinCode", e.target.value)}
                placeholder="Enter pin code"
                inputProps={{ maxLength: 6 }}
              />
            </Grid>
          </Grid>
          {(filters.city || filters.state || filters.pinCode) && (
            <Box sx={{ mt: 2 }}>
              <Button
                onClick={handleClearFilters}
                variant="outlined"
                size="small"
                startIcon={<ClearIcon />}
              >
                Clear Location Filters
              </Button>
            </Box>
          )}
        </AccordionDetails>
      </Accordion>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <Paper elevation={1} sx={{ p: 2, mb: 3, backgroundColor: "#f5f5f5" }}>
          <Typography variant="subtitle2" gutterBottom>
            Active Filters:
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {searchTerm && (
              <Chip
                label={`Search: "${searchTerm}"`}
                onDelete={handleClearSearch}
                color="primary"
                variant="outlined"
              />
            )}
            {filters.city && (
              <Chip
                label={`City: ${filters.city}`}
                onDelete={() => handleFilterChange("city", "")}
                variant="outlined"
              />
            )}
            {filters.state && (
              <Chip
                label={`State: ${filters.state}`}
                onDelete={() => handleFilterChange("state", "")}
                variant="outlined"
              />
            )}
            {filters.pinCode && (
              <Chip
                label={`Pin Code: ${filters.pinCode}`}
                onDelete={() => handleFilterChange("pinCode", "")}
                variant="outlined"
              />
            )}
          </Box>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Showing {displayCustomers.length} of {customers.length} customers
          </Typography>
        </Paper>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={clearMessages}>
          {error}
        </Alert>
      )}

      {displayCustomers.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="h6" gutterBottom>
              {hasActiveFilters
                ? "No matching customers found"
                : "No customers found"}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {hasActiveFilters
                ? "Try adjusting your search or filters."
                : error
                ? "There was an error loading customers."
                : "No customers have been created yet."}
            </Typography>
            {hasActiveFilters ? (
              <Button
                variant="outlined"
                onClick={() => {
                  setSearchTerm("");
                  handleClearFilters();
                }}
                sx={{ mt: 2 }}
                startIcon={<ClearIcon />}
              >
                Clear All Filters
              </Button>
            ) : (
              !error && (
                <Button
                  variant="contained"
                  onClick={handleAddCustomer}
                  sx={{ mt: 2 }}
                >
                  Create Your First Customer
                </Button>
              )
            )}
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {displayCustomers.map((customer) => (
            <Grid item xs={12} sm={6} md={4} key={customer.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {customer.firstName} {customer.lastName}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {customer.phone}
                  </Typography>
                  {customer.email && (
                    <Typography color="textSecondary" gutterBottom>
                      {customer.email}
                    </Typography>
                  )}
                  <Box sx={{ mt: 1 }}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      ID: {customer.id}
                    </Typography>
                    {customer.cities && (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                      >
                        Locations: {customer.cities}
                      </Typography>
                    )}
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      <Chip
                        icon={<LocationIcon />}
                        label={`${customer.addressCount || 0} address(es)`}
                        size="small"
                        variant="outlined"
                      />
                      {customer.addressCount === 1 && (
                        <Chip
                          label="Only One Address"
                          color="primary"
                          size="small"
                          variant="filled"
                        />
                      )}
                    </Box>
                  </Box>
                </CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    p: 1,
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => handleViewDetails(customer.id)}
                    color="primary"
                    title="View Details"
                  >
                    <ViewIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleEditCustomer(customer.id)}
                    color="secondary"
                    title="Edit Customer"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteClick(customer)}
                    color="error"
                    title="Delete Customer"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Customer Deletion</DialogTitle>
        <DialogContent>
          {deleteError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {deleteError}
            </Alert>
          )}
          <Typography>
            Are you sure you want to delete customer{" "}
            <strong>
              {customerToDelete?.firstName} {customerToDelete?.lastName}
            </strong>
            ?
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Customer ID: {customerToDelete?.id}
          </Typography>

          {customerToDelete?.addressCount > 0 && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              <Typography variant="body2">
                <strong>Warning:</strong> This customer has{" "}
                {customerToDelete.addressCount} address(es) associated.
              </Typography>
              <Typography variant="body2">
                Deleting the customer will also permanently delete all
                associated addresses.
              </Typography>
            </Alert>
          )}

          <Alert severity="error" sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>This action cannot be undone.</strong> All customer data
              will be permanently removed from the system.
            </Typography>
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            disabled={loading}
            startIcon={
              loading ? <CircularProgress size={20} /> : <DeleteIcon />
            }
          >
            {loading ? "Deleting..." : "Delete Permanently"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={!!success}
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

export default CustomerList;
