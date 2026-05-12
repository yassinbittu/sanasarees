import React, { useEffect, useState } from "react";
import { getUserProfile } from "./api/profile";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getUserProfile();
      setUser(res.data.user);
    } catch (error) {
      console.error("Profile fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-lg">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center mt-20">
        <p>Failed to load profile</p>
      </div>
    );
  }

  return (
    <div className="max-w-[800px] mx-auto mt-24 px-6">
      <div className="bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-[#7A1E2D] mb-6">
          My Profile
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">Username</p>
            <p className="font-medium">{user.username}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium">{user.phone}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Role</p>
            <p className="font-medium capitalize">{user.role}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p className="font-medium">
              {user.is_active ? "Active" : "Inactive"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Joined</p>
            <p className="font-medium">
              {new Date(user.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;