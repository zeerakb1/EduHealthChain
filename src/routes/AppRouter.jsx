import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import HomePage from '../pages/HomePage';
import AppointmentForm from '../pages/AppointmentForm';
import ViewHistory from '../components/ViewHistory';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/appointment-form" element={<AppointmentForm onSubmit={(data) => console.log(data)} />} />
        <Route path="/view-history" element={<ViewHistory />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;