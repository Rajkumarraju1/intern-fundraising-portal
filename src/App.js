import React, { useState, useEffect } from 'react';

// --- Helper Components for Icons ---
// Using inline SVGs for icons to keep it all in one file.
const UserIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const LockIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z" />
  </svg>
);

const GiftIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3s-3 1.34-3 3c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM4 8h16v11H4V8z" />
    </svg>
);

const TrophyIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.74 2.77 3.11 3.5V19H7v2h10v-2h-3.5v-3.56c1.37-.73 2.48-2 3.11-3.5C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.88C5.85 10.4 5 9.25 5 8zm14 0c0 1.25-.85 2.4-2.12 2.88V7h2v1z" />
    </svg>
);


// --- Mock Backend API ---
// This simulates a backend API call to fetch intern data.
const fetchInternData = async () => {
    console.log("Fetching intern data from mock backend...");
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500)); 

    const mockData = {
        internName: "Raj Kumar",
        referralCode: "rajkumar2025",
        totalDonations: 12500,
    };
    console.log("Data received:", mockData);
    return mockData;
};

// --- Mock Leaderboard Data ---
const fetchLeaderboardData = async () => {
    console.log("Fetching leaderboard data...");
    await new Promise(resolve => setTimeout(resolve, 500));

    const mockLeaderboard = [
        { id: 1, name: "Priya Sharma", donations: 21000 },
        { id: 2, name: "Amit Singh", donations: 18500 },
        { id: 3, name: "Sneha Patel", donations: 16000 },
        { id: 4, name: "Raj Kumar", donations: 12500 },
        { id: 5, name: "Anjali Gupta", donations: 9800 },
    ];
    console.log("Leaderboard data received:", mockLeaderboard);
    return mockLeaderboard;
}

// --- Components ---

// Dashboard Component
const Dashboard = ({ onLogout, onShowLeaderboard }) => {
    const [internData, setInternData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const data = await fetchInternData();
            setInternData(data);
            setLoading(false);
        };
        getData();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div></div>;
    }

    return (
        <div className="p-4 md:p-8 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Intern Dashboard</h1>
                <button
                    onClick={onLogout}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                >
                    Logout
                </button>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column: Profile & Referral */}
                <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-md space-y-4">
                    <div className="flex items-center space-x-4">
                         <div className="bg-blue-100 p-3 rounded-full">
                            <UserIcon className="w-8 h-8 text-blue-600" />
                         </div>
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-700">{internData.internName}</h2>
                            <p className="text-gray-500">Fundraising Intern</p>
                        </div>
                    </div>
                    <div className="border-t pt-4">
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">Your Referral Code</h3>
                        <p className="bg-gray-100 text-gray-800 font-mono p-3 rounded-lg text-center text-lg tracking-wider">
                            {internData.referralCode}
                        </p>
                    </div>
                </div>

                {/* Middle Column: Donations & Leaderboard Button */}
                <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-md flex flex-col justify-between">
                     <div>
                        <h3 className="text-lg font-semibold text-gray-600">Total Donations Raised</h3>
                        <p className="text-5xl font-bold text-green-500 my-4">
                            ₹{internData.totalDonations.toLocaleString('en-IN')}
                        </p>
                     </div>
                     <button 
                        onClick={onShowLeaderboard}
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center space-x-2"
                     >
                        <TrophyIcon className="w-6 h-6"/>
                        <span>View Leaderboard</span>
                     </button>
                </div>

                {/* Right Column: Rewards */}
                <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-lg font-semibold text-gray-600 mb-4 flex items-center space-x-2">
                        <GiftIcon className="w-6 h-6 text-purple-500"/>
                        <span>Rewards & Unlockables</span>
                    </h3>
                    <ul className="space-y-3">
                        <li className="flex items-center space-x-3"><span className="text-green-500">✅</span><span>₹5,000: Certificate of Appreciation</span></li>
                        <li className="flex items-center space-x-3"><span className="text-green-500">✅</span><span>₹10,000: Letter of Recommendation (LOR)</span></li>
                        <li className="flex items-center space-x-3"><span className="text-gray-400">🔒</span><span>₹25,000: LinkedIn Endorsement</span></li>
                        <li className="flex items-center space-x-3"><span className="text-gray-400">🔒</span><span>₹50,000: Bonus Swag Kit</span></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

// Leaderboard Component (Bonus)
const Leaderboard = ({ onBack }) => {
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);

     useEffect(() => {
        const getLeaders = async () => {
            setLoading(true);
            const data = await fetchLeaderboardData();
            setLeaders(data);
            setLoading(false);
        };
        getLeaders();
    }, []);

    return (
        <div className="p-4 md:p-8">
             <div className="flex items-center mb-6">
                <button onClick={onBack} className="mr-4 bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <h1 className="text-3xl font-bold text-gray-800">Top Fundraisers</h1>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {loading ? (
                     <div className="p-8 text-center">Loading...</div>
                ) : (
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Intern</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Donations Raised</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {leaders.map((leader, index) => (
                                <tr key={leader.id} className={leader.name === 'Raj Kumar' ? 'bg-blue-50' : ''}>
                                    <td className="px-6 py-4 whitespace-nowrap text-lg font-bold text-gray-700">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{leader.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right font-semibold text-green-600">₹{leader.donations.toLocaleString('en-IN')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}


// AuthForm Component (for Login/Signup)
const AuthForm = ({ isLogin, onAuth, onToggle }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, you'd validate and send this to a backend.
        // For this task, we just proceed.
        console.log(`Attempting ${isLogin ? 'login' : 'signup'} with:`, { email, password });
        onAuth();
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <div className="max-w-md w-full mx-auto bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
                    {isLogin ? 'Intern Login' : 'Create Account'}
                </h2>
                <p className="text-center text-gray-500 mb-8">
                    {isLogin ? 'Welcome back!' : 'Join the mission!'}
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <UserIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="relative">
                        <LockIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
                    >
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>
                </form>
                <p className="text-center text-sm text-gray-600 mt-6">
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}
                    <button onClick={onToggle} className="font-semibold text-blue-600 hover:underline ml-1">
                        {isLogin ? 'Sign Up' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
};

// Main App Component
export default function App() {
    // This state determines what the user sees: 'login', 'signup', 'dashboard', or 'leaderboard'
    const [page, setPage] = useState('login'); 

    // Since auth is not needed, this is a dummy function.
    const handleAuth = () => {
        console.log("Authentication successful (dummy). Redirecting to dashboard.");
        setPage('dashboard');
    };
    
    const handleLogout = () => {
        console.log("User logged out.");
        setPage('login');
    }

    const renderPage = () => {
        switch (page) {
            case 'login':
                return <AuthForm isLogin={true} onAuth={handleAuth} onToggle={() => setPage('signup')} />;
            case 'signup':
                return <AuthForm isLogin={false} onAuth={handleAuth} onToggle={() => setPage('login')} />;
            case 'dashboard':
                return <Dashboard onLogout={handleLogout} onShowLeaderboard={() => setPage('leaderboard')} />;
            case 'leaderboard':
                return <Leaderboard onBack={() => setPage('dashboard')} />;
            default:
                return <AuthForm isLogin={true} onAuth={handleAuth} onToggle={() => setPage('signup')} />;
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            {renderPage()}
        </div>
    );
}
