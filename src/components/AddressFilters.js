// frontend/src/components/AddressFilters.js
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { FilterList as FilterIcon } from "@mui/icons-material";
import { useAddress } from "../context/AddressContext";
import { useCustomer } from "../context/CustomerContext";

const AddressFilters = () => {
  const { filters, setFilters } = useAddress();
  const { customers } = useCustomer();

  const [open, setOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState({
    city: filters.city || "",
    state: filters.state || "",
    pinCode: filters.pinCode || "",
    customerId: filters.customerId || "",
  });

  const handleOpen = () => {
    setLocalFilters({
      city: filters.city || "",
      state: filters.state || "",
      pinCode: filters.pinCode || "",
      customerId: filters.customerId || "",
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleApply = () => {
    setFilters(localFilters);
    handleClose();
  };

  const handleClear = () => {
    setLocalFilters({
      city: "",
      state: "",
      pinCode: "",
      customerId: "",
    });
  };

  const handleChange = (field) => (e) => {
    setLocalFilters((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<FilterIcon />}
        onClick={handleOpen}
        sx={{ mr: 1 }}
      >
        Filters
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Filter Addresses</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Customer</InputLabel>
              <Select
                value={localFilters.customerId}
                onChange={handleChange("customerId")}
                label="Customer"
              >
                <MenuItem value="">All Customers</MenuItem>
                {customers.map((customer) => (
                  <MenuItem key={customer.id} value={customer.id}>
                    {customer.firstName} {customer.lastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="City"
              value={localFilters.city}
              onChange={handleChange("city")}
              fullWidth
            />

            <TextField
              label="State"
              value={localFilters.state}
              onChange={handleChange("state")}
              fullWidth
            />

            <TextField
              label="Pin Code"
              value={localFilters.pinCode}
              onChange={handleChange("pinCode")}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClear}>Clear</Button>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleApply} variant="contained">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddressFilters;
