export default function Navbar() {
    return (
      <nav className="bg-gradient-to-r from-gray-900 to-black text-white shadow-lg transition-all duration-300">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="font-bold text-lg">P</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                Ramesh Agency Admin
              </h1>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="relative group">
                <span className="text-gray-300 hover:text-white font-medium transition-colors duration-200 cursor-pointer flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span className="hidden md:inline">Dashboard</span>
                </span>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
              </div>
              
             
            </div>
          </div>
        </div>
      </nav>
    );
  }