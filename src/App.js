import './App.css';
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './auth/PrivateRoute';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AccountVerification from './components/signup/AccountVerification';
import LoadingPage from './components/homepage/LoadingPage';

function App() {
  return (
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/verify-account' element={<AccountVerification/>} />
        {/* <Route path='/load' element={<LoadingPage/>} /> */}
        <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
        
      </Routes>
  );
}

export default App;
