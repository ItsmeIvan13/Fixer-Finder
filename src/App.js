import HomePage from './components/HomePage';
import SignUpFixer from './components/SignUpFixer';
import SignUpFinder from './components/SignUpFinder';
import Accounts from './components/Accounts';
import ForgotPassword from './components/ForgotPassword';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Error404 from './components/Error404';

function App() {
  return (
    <Router>
    <Routes>
      <Route exact index path="/" element={<HomePage />} />
      <Route path="/accounts" element={<Accounts />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/signupfixer" element={<SignUpFixer />} />
      <Route path="/signupfinder" element={<SignUpFinder />} />
      <Route path='/dashboard' element={<Dashboard/>} />  
      <Route path="*" element={ <Error404/> } />
    </Routes>
  </Router>
  );
}

export default App;
