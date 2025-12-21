import { Outlet, Link, useLocation } from 'react-router-dom';

export function PublicLayout() {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/jci', label: 'JCI' },
    { path: '/jci2', label: 'About' },
    { path: '/book', label: 'Book Event' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      {/* <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-2xl font-bold text-gray-900">
                JCI Cebu
              </Link>
              <nav className="hidden md:flex space-x-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(link.path)
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
            
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </header> */}

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      {/* <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 JCI Cebu Lakan Bahaghari. All rights reserved.</p>
        </div>
      </footer> */}
    </div>
  );
}
