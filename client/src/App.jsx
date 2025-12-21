import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from './components/Layout/Header';
import JCI from './pages/JCI';
import JCI2 from './pages/JCI2';
import Book from './pages/Book';
import AdminDashboard from './pages/AdminDashboard';
import Admin2 from './pages/Admin2';
import Admin3 from './pages/Admin3';
import Member from './pages/Member';
function App() {
  return (
    <Router>
      {/* Added overflow-x-hidden to prevent horizontal scroll */}
      <div className="min-h-screen bg-white font-sans overflow-x-hidden">
        {/* <Header /> */}
        <main className="overflow-x-hidden">
          <Routes>
            <Route path="/jci" element={<JCI />} />
            <Route path="/jci2" element={<JCI2 />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin2" element={<Admin2 />} />
            <Route path="/admin3" element={<Admin3 />} />
            <Route path="/member" element={<Member />} />
            <Route path="/book" element={<Book />} />
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;