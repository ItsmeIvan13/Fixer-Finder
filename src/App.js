import HomePage from './components/HomePage';
import SignUpFixer from './components/SignUpFixer';
import SignUpFinder from './components/SignUpFinder';
import Accounts from './components/Accounts';
import ForgotPassword from './components/ForgotPassword';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Error404 from './components/Error404';
import EditAccount from './components/EditAccount';
import DashboardFixer from './components/DashboardFixer';
import DashboardFinder from './components/DashboardFinder';
import Messages from './components/Messages';
function App() {
  return (
   
    <Router>
    <Routes>
      <Route exact index path="/" element={<HomePage />} />
      <Route path="/accounts" element={<Accounts />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/signupfixer" element={<SignUpFixer />} />
      <Route path="/signupfinder" element={<SignUpFinder />} />
      <Route path='/finder/dashboard' element={<DashboardFinder/>} />  
      <Route path='/fixer/dashboard' element={<DashboardFixer/>} />  
      <Route path='/accountsettings' element={<EditAccount/>} />
      <Route path='/messages' element={ <Messages/> }  />
      <Route path="*" element={ <Error404/> } />
    </Routes>
  </Router>
    
   
   
   
  );
}

export default App;
