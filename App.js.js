import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';
import Auth from './components/Auth';

function App() {
  const [user] = useAuthState(auth);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? (
          user.email === 'harshavardhanjw@gmail.com' ? 
            <AdminDashboard /> : 
            <StudentDashboard />
        ) : <Auth />} />
      </Routes>
    </Router>
  );
}