import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Enrollment from './pages/Enrollment';

// Contexts
import { AuthProvider } from './admin/context/AuthProvider';
import { EventsProvider } from './context/EventsContext';

// Admin Components
import AdminLayout from './admin/layout/AdminLayout';
import Login from './admin/pages/Login';
import Dashboard from './admin/pages/Dashboard';
import EventsAdmin from './admin/pages/EventsAdmin';
import UsersAdmin from './admin/pages/UsersAdmin';
import KidsAdmin from './admin/pages/KidsAdmin';
import GroupsAdmin from './admin/pages/GroupsAdmin';
import SettingsAdmin from './admin/pages/SettingsAdmin';
import ProtectedRoute from './admin/components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <EventsProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route
              path="/*"
              element={
                <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-background-light text-[#111118] pt-[81px]">
                  <Header />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/enrollment" element={<Enrollment />} />
                  </Routes>
                </div>
              }
            />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} /> {/* Default to dashboard */}
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="events" element={<EventsAdmin />} />
              <Route path="users" element={<UsersAdmin />} />
              <Route path="kids" element={<KidsAdmin />} />
              <Route path="groups" element={<GroupsAdmin />} />
              <Route path="settings" element={<SettingsAdmin />} />
            </Route>
          </Routes>
        </Router>
      </EventsProvider>
    </AuthProvider>
  );
}

export default App;
