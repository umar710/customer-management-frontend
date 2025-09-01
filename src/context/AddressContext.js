// frontend/src/context/AddressContext.js
import React, { createContext, useContext, useReducer } from "react";
import { addressService } from "../services/api";

const AddressContext = createContext();

const initialState = {
  addresses: [],
  currentAddress: null,
  loading: false,
  error: null,
  filters: {
    city: "",
    state: "",
    pinCode: "",
    customerId: "",
  },
  pagination: {
    page: 1,
    limit: 10,
    totalPages: 1,
    totalCount: 0,
  },
};

function addressReducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    case "SET_ADDRESSES":
      return {
        ...state,
        addresses: action.payload.addresses,
        pagination: {
          ...state.pagination,
          totalPages: action.payload.totalPages,
          totalCount: action.payload.totalCount,
        },
        loading: false,
      };
    case "SET_ADDRESS":
      return { ...state, currentAddress: action.payload, loading: false };
    case "ADD_ADDRESS":
      return {
        ...state,
        addresses: [action.payload, ...state.addresses],
        currentAddress: action.payload,
      };
    case "UPDATE_ADDRESS":
      return {
        ...state,
        addresses: state.addresses.map((a) =>
          a.id === action.payload.id ? action.payload : a
        ),
        currentAddress: action.payload,
      };
    case "DELETE_ADDRESS":
      return {
        ...state,
        addresses: state.addresses.filter((a) => a.id !== action.payload),
        currentAddress: null,
      };
    case "SET_FILTERS":
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        pagination: { ...state.pagination, page: 1 },
      };
    case "CLEAR_FILTERS":
      return {
        ...state,
        filters: {
          city: "",
          state: "",
          pinCode: "",
          customerId: "",
        },
      };
    case "SET_PAGE":
      return {
        ...state,
        pagination: { ...state.pagination, page: action.payload },
      };
    default:
      return state;
  }
}

export function AddressProvider({ children }) {
  const [state, dispatch] = useReducer(addressReducer, initialState);

  // frontend/src/context/AddressContext.js - Update fetchAddresses function
  const fetchAddresses = async (
    page = state.pagination.page,
    limit = state.pagination.limit
  ) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });

      const { city, state: filterState, pinCode, customerId } = state.filters;
      const params = { page, limit };

      if (city) params.city = city;
      if (filterState) params.state = filterState;
      if (pinCode) params.pinCode = pinCode;
      if (customerId) params.customerId = customerId;

      console.log("📋 Fetching addresses with params:", params);

      const response = await addressService.getAll(params);
      console.log("🔍 Raw API response:", response);

      // Handle different possible response structures
      let addressesData = [];
      let totalPages = 1;
      let totalCount = 0;

      if (Array.isArray(response)) {
        // If response is directly an array
        addressesData = response;
        totalCount = response.length;
        console.log("📊 Using array response format");
      } else if (response && Array.isArray(response.addresses)) {
        // If response has addresses property (expected structure)
        addressesData = response.addresses;
        totalPages = response.totalPages || 1;
        totalCount = response.totalCount || response.addresses.length;
        console.log("📊 Using addresses property format");
      } else if (response && Array.isArray(response.data)) {
        // If response has data property
        addressesData = response.data;
        totalPages = response.totalPages || 1;
        totalCount = response.totalCount || response.data.length;
        console.log("📊 Using data property format");
      } else {
        // Fallback - try to use the response as array
        console.warn("⚠️ Unexpected response structure, using fallback");
        addressesData = Array.isArray(response) ? response : [];
        totalCount = addressesData.length;
      }

      console.log("📦 Processed addresses:", addressesData);

      dispatch({
        type: "SET_ADDRESSES",
        payload: {
          addresses: addressesData,
          totalPages: totalPages,
          totalCount: totalCount,
        },
      });
      dispatch({ type: "SET_PAGE", payload: page });
    } catch (error) {
      console.error("❌ Error fetching addresses:", error);
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  /*

  const fetchAddresses = async (
    page = state.pagination.page,
    limit = state.pagination.limit
  ) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });

      const { city, state: filterState, pinCode, customerId } = state.filters;
      const params = { page, limit };

      if (city) params.city = city;
      if (filterState) params.state = filterState;
      if (pinCode) params.pinCode = pinCode;
      if (customerId) params.customerId = customerId;

      const response = await addressService.getAll(params);
      dispatch({
        type: "SET_ADDRESSES",
        payload: {
          addresses: response.addresses,
          totalPages: response.totalPages,
          totalCount: response.totalCount,
        },
      });
      dispatch({ type: "SET_PAGE", payload: page });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
    };
    
    */

  const fetchAddress = async (id) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const address = await addressService.getById(id);
      dispatch({ type: "SET_ADDRESS", payload: address });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  /*

  const createAddress = async (addressData) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const newAddress = await addressService.create(addressData);
      dispatch({ type: "ADD_ADDRESS", payload: newAddress });
      return newAddress;
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  };

  const updateAddress = async (id, addressData) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const updatedAddress = await addressService.update(id, addressData);
      dispatch({ type: "UPDATE_ADDRESS", payload: updatedAddress });
      return updatedAddress;
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  };

  */

  // frontend/src/context/AddressContext.js - Update createAddress and updateAddress functions
  const createAddress = async (addressData) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      console.log("🆕 Creating address with data:", addressData);

      const newAddress = await addressService.create(addressData);
      console.log("✅ Address created:", newAddress);

      dispatch({ type: "ADD_ADDRESS", payload: newAddress });
      return newAddress;
    } catch (error) {
      console.error("❌ Error creating address:", error);
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  };

  const updateAddress = async (id, addressData) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      console.log("✏️ Updating address", id, "with data:", addressData);

      const updatedAddress = await addressService.update(id, addressData);
      console.log("✅ Address updated:", updatedAddress);

      dispatch({ type: "UPDATE_ADDRESS", payload: updatedAddress });
      return updatedAddress;
    } catch (error) {
      console.error("❌ Error updating address:", error);
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  };

  const deleteAddress = async (id) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      await addressService.delete(id);
      dispatch({ type: "DELETE_ADDRESS", payload: id });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  };

  const setFilters = (filters) => {
    dispatch({ type: "SET_FILTERS", payload: filters });
  };

  const clearFilters = () => {
    dispatch({ type: "CLEAR_FILTERS" });
  };

  const setPage = (page) => {
    dispatch({ type: "SET_PAGE", payload: page });
  };

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  const value = {
    ...state,
    fetchAddresses,
    fetchAddress,
    createAddress,
    updateAddress,
    deleteAddress,
    setFilters,
    clearFilters,
    setPage,
    clearError,
  };

  return (
    <AddressContext.Provider value={value}>{children}</AddressContext.Provider>
  );
}

export function useAddress() {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error("useAddress must be used within an AddressProvider");
  }
  return context;
}
