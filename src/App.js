import { Route, Routes } from "react-router-dom";
import { MsalProvider } from '@azure/msal-react';
import PersistentDrawerLeft from "./components/SideMenu/SideMenu";
import { AuthContextProvider } from "./auth/authContext";
import { CommentsStore } from "./reducers/CommentsReducer";
import Dashboard from "./pages/Dashboard/Dashboard";
import Details from "./pages/Details/Details";
import CreateDestination from "./pages/CreateDestination/CreateDestination";
import EditDestination from "./pages/EditDestination/EditDestination";
import RegisterForm from "./components/Authentication/RegisterForm";
import HomePage from "./pages/HomePage/HomePage";

function App({ msauInstance }) {
  return (
    <div className="App">
      <MsalProvider instance={msauInstance}>
        <AuthContextProvider>
          <PersistentDrawerLeft />
          <CommentsStore>
            <Routes>
              <Route path='/' element={<HomePage /> } />
              <Route path='/:destinationType' element={<Dashboard />} />
              <Route path='/destination/:id' element={<Details />} />
              <Route path='/destination/create' element={<CreateDestination />} />
              <Route path='/destination/:id/edit' element={<EditDestination />} />
              <Route path='/auth/register' element={<RegisterForm />} /> 
            </Routes>
          </CommentsStore>
        </AuthContextProvider>
      </MsalProvider>
    </div>
  );
}

export default App;
