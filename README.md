# Frontend - Customer Management System

A React.js application for managing customers and their addresses with a modern, responsive interface built with Material-UI.

🌐 **Live Demo**: [https://umar-scustomer-management-frontend.netlify.app/customers](https://umar-scustomer-management-frontend.netlify.app/customers)

## 🚀 Features

- **Customer Management**: Full CRUD operations for customers
- **Address Management**: Manage multiple addresses per customer
- **Advanced Search**: Search customers by name, email, phone, or ID
- **Location Filtering**: Filter customers by city, state, or pin code
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern UI**: Material-UI components with professional styling
- **Real-time Validation**: Form validation with user feedback
- **Loading States**: Visual feedback during operations
- **Error Handling**: Comprehensive error handling and user notifications

## 📋 Live Application

### 🌐 Production URL
**Main Application**: [https://umar-scustomer-management-frontend.netlify.app/customers](https://umar-scustomer-management-frontend.netlify.app/customers)

### 📱 Access Points
- **Customers Dashboard**: `/customers`
- **Customer Details**: `/customers/:id`
- **Add Customer**: `/customers/new`
- **Edit Customer**: `/customers/:id/edit`
- **Address Management**: `/addresses`

## 🛠️ Installation & Local Development

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Backend API running (see backend README)

### Local Setup Instructions

1. **Clone and navigate to frontend directory**
   ```bash
   cd customer-management/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the frontend directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm start
   ```
   Application will open at `http://localhost:3000`

### Production Build
```bash
npm run build
```
Creates optimized production build in `build/` folder.

## 📱 Usage Guide

### Managing Customers

1. **View All Customers**
   - Navigate to the Customers tab
   - See all customers in a responsive grid layout
   - Use search bar to find specific customers

2. **Create a Customer**
   - Click "Add Customer" button
   - Fill in required fields (First Name, Last Name, Phone)
   - Optional: Add email address
   - Submit the form

3. **Edit a Customer**
   - Click the edit icon on any customer card
   - Modify the customer information
   - Save changes

4. **Delete a Customer**
   - Click the delete icon on any customer card
   - Confirm deletion in the dialog
   - Note: This will also delete all associated addresses

5. **Search & Filter Customers**
   - Use the search bar for quick text search
   - Click "Advanced Filters" for location-based filtering
   - Filter by city, state, or pin code
   - Use chips to manage active filters

### Managing Addresses

1. **View Customer Addresses**
   - Click the view icon on any customer card
   - See all addresses for that customer
   - Identify primary addresses

2. **Add an Address**
   - From customer details page, click "Add Address"
   - Fill in address details
   - Mark as primary if needed
   - Save the address

3. **Edit an Address**
   - Click the edit icon on any address card
   - Modify address information
   - Save changes

4. **Delete an Address**
   - Click the delete icon on any address card
   - Confirm deletion in the dialog

## 🎨 UI Components

### Customer Card
- Customer name and contact information
- Address count with visual indicator
- "Only One Address" badge when applicable
- Action buttons (View, Edit, Delete)

### Address Card
- Complete address information
- Primary address designation
- Edit and delete actions

### Forms
- Real-time validation
- Error highlighting
- Loading states during submission
- Success/error notifications

## 📦 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navigation.js   # Main navigation bar
│   ├── AddressForm.js  # Address creation/editing form
│   └── AddressFilters.js # Advanced filtering UI
├── pages/              # Page components
│   ├── CustomerList.js # Customers dashboard
│   ├── CustomerDetail.js # Customer details page
│   ├── CustomerForm.js # Customer form page
│   └── AddressList.js  # Address management page
├── context/            # React Context for state management
│   ├── CustomerContext.js # Customer global state
│   └── AddressContext.js # Address global state
├── services/           # API communication
│   └── api.js         # Axios configuration and API calls
├── styles/            # CSS styles
│   └── App.css        # Global styles
└── App.js             # Main application component
```

## 🔧 Configuration

### Environment Variables
- `REACT_APP_API_URL`: Backend API URL (default: http://localhost:5000/api)

### For Production Deployment
Update the API URL for your production backend:
```env
REACT_APP_API_URL=https://your-production-api.com/api
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px (single column layout)
- **Tablet**: 768px - 1024px (2-column grid)
- **Desktop**: > 1024px (3-column grid)

### Mobile Features
- Hamburger menu navigation
- Touch-friendly buttons and forms
- Optimized card layouts
- Mobile-first design approach

## 🎯 Key Functionality

### Search & Filter
- **Text Search**: Search across name, email, phone, and ID fields
- **Location Filters**: Filter by city, state, or pin code
- **Combined Filters**: Use multiple filters simultaneously
- **Real-time Results**: Instant filtering as you type

### Validation
- **Required Fields**: Highlighted with error messages
- **Email Format**: Valid email format checking
- **Phone Validation**: 10-digit phone number requirement
- **Pin Code Validation**: 6-digit pin code requirement

### User Experience
- **Loading States**: Visual feedback during API calls
- **Success Messages**: Confirmation of successful operations
- **Error Handling**: Clear error messages with recovery options
- **Confirmation Dialogs**: Prevent accidental deletions

## 📦 Dependencies

### Core Dependencies
- **react**: React library
- **react-dom**: DOM rendering for React
- **react-router-dom**: Routing functionality
- **react-scripts**: Create React App scripts

### UI Dependencies
- **@mui/material**: Material-UI component library
- **@mui/icons-material**: Material-UI icons
- **@emotion/react**: CSS-in-JS styling
- **@emotion/styled**: Styled components

### API Communication
- **axios**: HTTP client for API requests

## 🚀 Available Scripts

- `npm start` - Run development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App (not recommended)

## 🌐 Deployment

### Netlify Deployment
The application is deployed on Netlify with continuous deployment from GitHub.

**Production URL**: [https://umar-scustomer-management-frontend.netlify.app](https://umar-scustomer-management-frontend.netlify.app)

### Deployment Steps
1. Connect GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Configure environment variables in Netlify dashboard
5. Enable automatic deployments

### Environment Variables for Production
```env
REACT_APP_API_URL=https://your-production-backend.com/api
```

## 🐛 Troubleshooting

### Common Issues

1. **Connection Errors**
   - Ensure backend API is running and accessible
   - Check `REACT_APP_API_URL` environment variable
   - Verify CORS configuration on backend

2. **Build Errors**
   - Verify all dependencies are installed
   - Check Node.js version compatibility

3. **Production Issues**
   - Check network tab for API call failures
   - Verify environment variables are set in deployment platform

### Development Tips

1. **Check Console**: Always monitor browser console for errors
2. **Network Tab**: Use browser devtools to debug API calls
3. **React DevTools**: Install browser extension for React debugging
4. **Responsive Testing**: Test on multiple device sizes

## 🔄 API Integration

### Expected Response Format
```json
{
  "customers": [],
  "totalPages": 1,
  "currentPage": 1,
  "totalCount": 0
}
```

### Error Handling
- Network errors show user-friendly messages
- Validation errors highlight specific form fields
- API errors display detailed error information

## 🎨 Customization

### Theming
Modify the theme in `App.js`:
```jsx
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Your brand color
    },
    // Add other theme customizations
  },
});
```

### Styling
- Global styles in `src/styles/App.css`
- Component-specific styles using Material-UI `sx` prop
- Custom CSS classes for specific components

## 📞 Support

For issues and questions:
1. Check browser console for error messages
2. Verify backend API is running and accessible
3. Ensure all environment variables are set correctly
4. Check network tab for API call failures

**Live Application**: [https://umar-scustomer-management-frontend.netlify.app/customers](https://umar-scustomer-management-frontend.netlify.app/customers)

