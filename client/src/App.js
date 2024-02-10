 
import './App.css';
import {BrowserRouter as Router,Route,Routes} from  'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Protected from './component/Protected';
import { UserContextProvider } from './context/UserContext';
import Donar from './pages/dashboard/Donar';
import Hospiital from './pages/dashboard/Hospiital';
import Orgpage from './pages/dashboard/Orgpage';
import Analytics from './pages/dashboard/Analytics';
 
import Request from './pages/dashboard/Request';
import Orgrequest from './pages/Orgrequest';
import Admin from './pages/Admin';
import Hospitallist from './pages/admin/Hospitallist';
import Orglist from './pages/admin/Orglist';
import DonarList from './pages/admin/DonarList';
 
export const API=axios.create({baseURL:"http://localhost:5000/api/v1"})

function App() {

  return (
    <>
    <UserContextProvider>
    <Router>
    <ToastContainer/>
      <Routes>
      
        <Route path='/' element={
        <Protected>
           <Home/>
        </Protected>
     }/>
     <Route path='/donar' element={
        <Protected>
           <Donar/>
        </Protected>
     }/>
     <Route path='/hospital' element={
        <Protected>
           <Hospiital/>
        </Protected>
     }/>
      <Route path='/request' element={
        <Protected>
           <Request/>
        </Protected>
     }/>
     <Route path='/org-request' element={
        <Protected>
           <Orgrequest/>
        </Protected>
     }/>
     <Route path='/organisation' element={
        <Protected>
           <Orgpage/>
        </Protected>
     }/>
     <Route path='/analytics' element={
        <Protected>
           <Analytics/>
        </Protected>
     }/>
     <Route path='/hospital-list' element={
        <Protected>
           <Hospitallist/>
        </Protected>
     }/>
      <Route path='/org-list' element={
        <Protected>
           <Orglist/>
        </Protected>
     }/>
      <Route path='/donar-list' element={
        <Protected>
           <DonarList/>
        </Protected>
     }/>
      <Route path='/admin' element={
        <Protected>
           <Admin/>
        </Protected>
     }/>
       
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </Router>
    </UserContextProvider>
    
     
    </>
    
  );
}

export default App;
