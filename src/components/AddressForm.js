// frontend/src/components/AddressForm.js
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Grid,
  Alert,
} from "@mui/material";
import { useCustomer } from "../context/CustomerContext";
import { useAddress } from "../context/AddressContext";

const AddressForm = ({ open, onClose, address, onSubmit, isEdit = false }) => {
  const { customers } = useCustomer();
  const { createAddress, updateAddress } = useAddress();
  const [formData, setFormData] = useState({
    customerId: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pinCode: "",
    isPrimary: false,
  });
  const [errors, setErrors] = useState({});
  const [submissionError, setSubmissionError] = useState("");

  useEffect(() => {
    if (address) {
      setFormData({
        customerId: address.customerId || "",
        addressLine1: address.addressLine1 || "",
        addressLine2: address.addressLine2 || "",
        city: address.city || "",
        state: address.state || "",
        pinCode: address.pinCode || "",
        isPrimary: address.isPrimary || false,
      });
    } else {
      setFormData({
        customerId: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pinCode: "",
        isPrimary: false,
      });
    }
    setErrors({});
    setSubmissionError("");
  }, [address, open]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when field is changed
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Clear submission error when any field changes
    if (submissionError) {
      setSubmissionError("");
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.customerId) newErrors.customerId = "Customer is required";
    if (!formData.addressLine1.trim())
      newErrors.addressLine1 = "Address line 1 is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.pinCode.trim()) newErrors.pinCode = "Pin code is required";

    if (formData.pinCode && !/^\d{6}$/.test(formData.pinCode)) {
      newErrors.pinCode = "Pin code must be 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setSubmissionError("");
    if (validateForm()) {
      try {
        console.log("📤 Submitting address data:", formData);

        if (isEdit && address) {
          const result = await updateAddress(address.id, formData);
          console.log("✅ Update result:", result);
        } else {
          const result = await createAddress(formData);
          console.log("✅ Creation result:", result);
        }

        onClose();
        if (onSubmit) {
          onSubmit();
        }
      } catch (error) {
        console.error("❌ Error saving address:", error);
        setSubmissionError(
          error.message || "Failed to save address. Please try again."
        );
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{isEdit ? "Edit Address" : "Add New Address"}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {/* Error Alert */}
          {submissionError && (
            <Grid item xs={12}>
              <Alert severity="error" sx={{ mb: 2 }}>
                {submissionError}
              </Alert>
            </Grid>
          )}

          <Grid item xs={12}>
            <FormControl fullWidth error={Boolean(errors.customerId)}>
              <InputLabel>Customer</InputLabel>
              <Select
                name="customerId"
                value={formData.customerId}
                onChange={handleChange}
                label="Customer"
                disabled={isEdit}
              >
                {customers.length === 0 ? (
                  <MenuItem disabled value="">
                    No customers available. Please create a customer first.
                  </MenuItem>
                ) : (
                  customers.map((customer) => (
                    <MenuItem key={customer.id} value={customer.id}>
                      {customer.firstName} {customer.lastName} ({customer.phone}
                      )
                    </MenuItem>
                  ))
                )}
              </Select>
              {errors.customerId && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  {errors.customerId}
                </span>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address Line 1"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleChange}
              error={Boolean(errors.addressLine1)}
              helperText={errors.addressLine1}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address Line 2"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              error={Boolean(errors.city)}
              helperText={errors.city}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              error={Boolean(errors.state)}
              helperText={errors.state}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Pin Code"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
              error={Boolean(errors.pinCode)}
              helperText={errors.pinCode}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  name="isPrimary"
                  checked={formData.isPrimary}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label="Primary Address"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          {isEdit ? "Update" : "Add"} Address
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddressForm;
