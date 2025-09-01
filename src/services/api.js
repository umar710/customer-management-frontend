// frontend/src/services/api.js
import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  "https://customer-management-backend-1-kby9.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor for better error handling
/*
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
    }
    return Promise.reject(error);
  }
);
*/

// frontend/src/services/api.js - Add detailed logging
api.interceptors.request.use(
  (config) => {
    console.log("🔄 API Request:", config.method?.toUpperCase(), config.url);
    if (config.data) {
      console.log("📦 Request Payload:", config.data);
    }
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("✅ API Response:", response.status, response.config.url);
    console.log("📨 Response Data:", response.data);
    return response;
  },
  (error) => {
    console.error("❌ API Error:", error.message);
    if (error.response) {
      console.error("📨 Error Response:", error.response.data);
      console.error("🔢 Status Code:", error.response.status);
    }
    return Promise.reject(error);
  }
);

// Customers API
export const customerService = {
  /*getAll: () =>
    api
      .get("/customers")
      .then((res) => res.data.customers || [])
      .catch((error) => {
        console.error("Error fetching customers:", error);
        throw error;
      }),
      */
  //NEW

  getAll: (params) =>
    api
      .get("/customers", { params })
      .then((res) => {
        // Handle different response structures
        if (res.data && Array.isArray(res.data.customers)) {
          return res.data.customers;
        } else if (Array.isArray(res.data)) {
          return res.data;
        } else {
          console.warn("Unexpected response structure:", res.data);
          return [];
        }
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
        throw error;
      }),
  ///

  getById: (id) =>
    api
      .get(`/customers/${id}`)
      .then((res) => res.data)
      .catch((error) => {
        console.error(`Error fetching customer ${id}:`, error);
        throw error;
      }),

  create: (data) =>
    api
      .post("/customers", data)
      .then((res) => res.data.customer)
      .catch((error) => {
        console.error("Error creating customer:", error);
        throw error;
      }),

  update: (id, data) =>
    api
      .put(`/customers/${id}`, data)
      .then((res) => res.data)
      .catch((error) => {
        console.error(`Error updating customer ${id}:`, error);
        throw error;
      }),

  delete: (id) =>
    api
      .delete(`/customers/${id}`)
      .then((res) => res.data)
      .catch((error) => {
        console.error(`Error deleting customer ${id}:`, error);
        throw error;
      }),
};

// Addresses API
export const addressService = {
  getAll: (params) =>
    api
      .get("/addresses", { params })
      .then((res) => res.data)
      .catch((error) => {
        console.error("Error fetching addresses:", error);
        throw error;
      }),

  create: (data) =>
    api
      .post("/addresses", data)
      .then((res) => res.data)
      .catch((error) => {
        console.error("Error creating address:", error);
        throw error;
      }),

  update: (id, data) =>
    api
      .put(`/addresses/${id}`, data)
      .then((res) => res.data)
      .catch((error) => {
        console.error(`Error updating address ${id}:`, error);
        throw error;
      }),

  delete: (id) =>
    api
      .delete(`/addresses/${id}`)
      .then((res) => res.data)
      .catch((error) => {
        console.error(`Error deleting address ${id}:`, error);
        throw error;
      }),
};

// frontend/src/services/api.js - Add filtered endpoint
export const getFiltered = (params) =>
  api
    .get("/customers/filtered", { params })
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error fetching filtered customers:", error);
      throw error;
    });

export default api;
