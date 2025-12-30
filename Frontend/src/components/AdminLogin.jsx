import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const AdminLogin = ({ onLogin }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      if (credentials.username === 'thakkif' && credentials.password === '1234') {
        onLogin(credentials.username);
        setLoginSuccess(true);
        setError('Login successful!');
      } else {
        setError('Invalid username or password');
        setLoginSuccess(false);
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-gray-100 to-white">
      <div className="pt-20">
        
      </div>
      
      <div className="flex items-center justify-center min-h-[calc(100vh-160px)] py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden border-2 border-red-600">
            <div className="bg-gradient-to-r from-red-600 to-red-800 py-4 px-6">
              <h2 className="text-xl font-bold text-white text-center">
                Admin Login
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {error && (
                <div className={`p-4 rounded ${
                  error.includes('success') 
                    ? 'bg-green-100 border-l-4 border-green-500 text-green-700'
                    : 'bg-red-100 border-l-4 border-red-500 text-red-700'
                }`}>
                  <p>{error}</p>
                </div>
              )}
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Username</label>
                <input
                  type="text"
                  name="username"
                  value={credentials.username}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
                  placeholder="Enter username"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200"
                  placeholder="Enter password"
                  required
                />
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 px-6 rounded-xl font-bold text-white transition-all ${
                    isLoading ? 'bg-red-400' : 'bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging in...
                    </span>
                  ) : 'Login'}
                </button>
              </div>
            </form>
            
<div className="px-6 pb-6">
  <button
    onClick={() => navigate('/donordetailstable')}  
    disabled={!loginSuccess}
    className={`w-full py-3 px-6 rounded-xl font-bold text-white transition-all ${
      !loginSuccess 
        ? 'bg-gray-400 cursor-not-allowed' 
        : 'bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl'
    }`}
  >
    View Donors Details
  </button>
</div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminLogin;