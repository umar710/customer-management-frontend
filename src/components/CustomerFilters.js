// frontend/src/components/CustomerFilters.js
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FilterList as FilterIcon } from "@mui/icons-material";
import { useCustomer } from "../context/CustomerContext";

const CustomerFilters = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { filters, setFilters } = useCustomer();

  const [open, setOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState({
    city: filters.city || "",
    state: filters.state || "",
    pinCode: filters.pinCode || "",
  });

  const handleOpen = () => {
    setLocalFilters({
      city: filters.city || "",
      state: filters.state || "",
      pinCode: filters.pinCode || "",
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
      >
        Filters
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Filter Customers</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
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

export default CustomerFilters;
