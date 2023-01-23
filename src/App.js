//import './App.css';
import { Route, Routes } from "react-router-dom";
import Header from "./pages/Header/Header";
import Dashboard from "./pages/Dashboard/Dashboard";
import Details from "./pages/Details/Details";
import CreateDestination from "./pages/CreateDestination/CreateDestination";
import EditDestination from "./pages/EditDestination/EditDestination";
import { AuthContextProvider } from "./auth/authContext";
import { CommentsStore } from "./reducers/CommentsReducer";
import { MsalProvider } from '@azure/msal-react';
import ButtonAppBar from "./components/Menu/Menu";
import PersistentDrawerLeft from "./components/SideMenu/SideMenu";

function App({ msauInstance }) {
  return (
    <div className="App">
      <MsalProvider instance={msauInstance}>
        <AuthContextProvider>
          <ButtonAppBar />
          <PersistentDrawerLeft />
          <CommentsStore>
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/:destinationType' element={<Dashboard />} />
              <Route path='/destination/:id' element={<Details />} />
              <Route path='/destination/create' element={<CreateDestination />} />
              <Route path='/destination/:id/edit' element={<EditDestination />} />
            </Routes>
          </CommentsStore>
        </AuthContextProvider>
      </MsalProvider>
    </div>
  );
}

export default App;
