// frontend/src/context/CustomerContext.js - Fix the clearMessages function
import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";
import { customerService } from "../services/api";

const CustomerContext = createContext();

const initialState = {
  customers: [],
  currentCustomer: null,
  loading: false,
  error: null,
  success: null,
};

function customerReducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false, success: null };
    case "SET_SUCCESS":
      return { ...state, success: action.payload, loading: false, error: null };
    case "CLEAR_MESSAGES":
      return { ...state, error: null, success: null };
    case "SET_CUSTOMERS":
      return {
        ...state,
        customers: action.payload,
        loading: false,
        error: null,
      };
    case "SET_CUSTOMER":
      return {
        ...state,
        currentCustomer: action.payload,
        loading: false,
        error: null,
      };
    case "ADD_CUSTOMER":
      return {
        ...state,
        customers: [action.payload, ...state.customers],
        currentCustomer: action.payload,
        loading: false,
        error: null,
        success: "Customer created successfully!",
      };
    case "UPDATE_CUSTOMER":
      return {
        ...state,
        customers: state.customers.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
        currentCustomer: action.payload,
        loading: false,
        error: null,
        success: "Customer updated successfully!",
      };
    case "DELETE_CUSTOMER":
      return {
        ...state,
        customers: state.customers.filter((c) => c.id !== action.payload),
        currentCustomer: null,
        loading: false,
        error: null,
        success: "Customer deleted successfully!",
      };
    default:
      return state;
  }
}

export function CustomerProvider({ children }) {
  const [state, dispatch] = useReducer(customerReducer, initialState);

  // Use useCallback to create stable function references
  const fetchCustomers = useCallback(async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const customers = await customerService.getAll();
      dispatch({ type: "SET_CUSTOMERS", payload: customers });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  }, []);

  const fetchCustomer = useCallback(async (id) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const customer = await customerService.getById(id);
      dispatch({ type: "SET_CUSTOMER", payload: customer });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  }, []);

  const createCustomer = useCallback(async (customerData) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const newCustomer = await customerService.create(customerData);
      dispatch({ type: "ADD_CUSTOMER", payload: newCustomer });
      return newCustomer;
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  }, []);

  const updateCustomer = useCallback(async (id, customerData) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const updatedCustomer = await customerService.update(id, customerData);
      dispatch({ type: "UPDATE_CUSTOMER", payload: updatedCustomer });
      return updatedCustomer;
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  }, []);

  const deleteCustomer = useCallback(async (id) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      await customerService.delete(id);
      dispatch({ type: "DELETE_CUSTOMER", payload: id });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  }, []);

  // These dispatch functions don't need dependencies
  const setSuccess = useCallback((message) => {
    dispatch({ type: "SET_SUCCESS", payload: message });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: "CLEAR_ERROR" });
  }, []);

  const clearMessages = useCallback(() => {
    dispatch({ type: "CLEAR_MESSAGES" });
  }, []);

  //
  const fetchFilteredCustomers = async (filters = {}) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });

      const params = {};
      if (filters.city) params.city = filters.city;
      if (filters.state) params.state = filters.state;
      if (filters.pinCode) params.pinCode = filters.pinCode;

      const customers = await customerService.getFiltered(params);
      dispatch({ type: "SET_CUSTOMERS", payload: customers });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  const value = {
    ...state,
    fetchCustomers,
    fetchFilteredCustomers, // Add this
    fetchCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    setSuccess,
    clearError,
    clearMessages,
  };

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error("useCustomer must be used within a CustomerProvider");
  }
  return context;
}
