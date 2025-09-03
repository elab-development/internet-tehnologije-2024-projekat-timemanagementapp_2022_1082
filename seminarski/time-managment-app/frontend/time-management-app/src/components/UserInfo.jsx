import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { userInfoAPI } from '../services/api';

function UserInfo() {
  const { user } = useUser();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadUserStats();
  }, []);

  const loadUserStats = async () => {
    try {
      setLoading(true);
      const userStats = await userInfoAPI.getUserStats();
      setStats(userStats);
    } catch (error) {
      console.error('Failed to load user stats:', error);
      setError('Failed to load statistics');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex-1 bg-white">
        <div className="p-6 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Loading user information...</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">User Information</h1>
        
        <div className="space-y-6">
          {/* User Profile Card */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-6 mb-6">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center overflow-hidden">
                {user?.imageUrl ? (
                  <img 
                    src={user.imageUrl} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white text-2xl font-bold">
                    {user?.firstName?.charAt(0) || 
                     user?.primaryEmailAddress?.emailAddress?.charAt(0) || 
                     'U'}
                  </span>
                )}
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {user?.firstName && user?.lastName 
                    ? `${user.firstName} ${user.lastName}`
                    : user?.firstName ||
                      user?.primaryEmailAddress?.emailAddress?.split('@')[0] ||
                      'User'
                  }
                </h2>
                <p className="text-gray-600 mb-1">
                  {user?.primaryEmailAddress?.emailAddress || 'No email provided'}
                </p>
                <p className="text-sm text-gray-500">
                  Member since: {user?.createdAt ? formatDate(user.createdAt) : 'Unknown'}
                </p>
              </div>
            </div>

            {/* User Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-1">Account Status</h3>
                <p className="text-green-600 font-medium">Active</p>
              </div>
            </div>
          </div>

          {/* Task statistika */}
          {stats && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Statistics</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{stats.tasks.total}</div>
                  <div className="text-sm text-gray-600">Total Tasks</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{stats.tasks.completed}</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
                
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{stats.tasks.pending}</div>
                  <div className="text-sm text-gray-600">Pending</div>
                </div>
                
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{stats.tasks.trashed}</div>
                  <div className="text-sm text-gray-600">In Trash</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{stats.tasks.recentlyCreated}</div>
                  <div className="text-sm text-gray-600">This Week</div>
                </div>
              </div>

              {/* Produktivnost */}
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-md font-medium text-gray-900 mb-3">Productivity</h4>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Completion Rate</span>
                      <span>{stats.productivity.completionRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${stats.productivity.completionRate}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Acc Info */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Last Sign In</span>
                <span className="text-gray-900">
                  {user?.lastSignInAt ? formatDate(user.lastSignInAt) : 'Unknown'}
                </span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Account Created</span>
                <span className="text-gray-900">
                  {user?.createdAt ? formatDate(user.createdAt) : 'Unknown'}
                </span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Email Verified</span>
                <span className={user?.primaryEmailAddress?.verification?.status === 'verified' 
                  ? 'text-green-600' 
                  : 'text-yellow-600'
                }>
                  {user?.primaryEmailAddress?.verification?.status === 'verified' ? 'Yes' : 'Pending'}
                </span>
              </div>
              
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Two-Factor Auth</span>
                <span className="text-gray-600">
                  {user?.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600">{error}</p>
              <button 
                onClick={loadUserStats}
                className="mt-2 text-sm text-red-700 hover:text-red-800 underline"
              >
                Retry loading statistics
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserInfo;