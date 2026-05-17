import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import FeedbackHistory from './pages/FeedbackHistory';
import Login from './pages/Login';
import ComingSoon from './pages/ComingSoon';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="feedback-history" element={<FeedbackHistory />} />
          {/* Sidebar routes not yet built */}
          <Route path="call-insights" element={<ComingSoon />} />
          <Route path="knowledge-base" element={<ComingSoon />} />
          <Route path="prompts" element={<ComingSoon />} />
          <Route path="boxy-controls" element={<ComingSoon />} />
          {/* True catch-all */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
