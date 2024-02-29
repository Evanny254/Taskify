import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaInfo } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AccountDetails = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    bio: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    fetch("https://taskify-backend-5v37.onrender.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setFormData({
          username: data.username,
          email: data.email,
          bio: data.bio,
        });
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const accessToken = localStorage.getItem("access_token");
    fetch("https://taskify-backend-5v37.onrender.com/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(formData);
        setUser(data);
        setIsEditing(false);
      })

      .catch((error) => {
        console.error("Error updating user details:", error);
      });
      alert("Details Updated Successfully")
    navigate("/home");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white overflow-hidden shadow-sm rounded-md border w-96 mx-auto mt-8">
      <div className="px-6 py-6 flex items-center justify-between bg-cyan-100 rounded-t-md">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Account Details
        </h3>
      </div>
      <div className="px-6 pb-6">
        <dl className="divide-y divide-gray-200">
          <div className="py-4">
            <dt className="text-sm font-medium text-gray-500">
              <FaUser className="mr-2" />
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {!isEditing ? (
                user.username
              ) : (
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="border-b border-gray-200 focus:outline-none focus:border-cyan-500 w-full"
                />
              )}
            </dd>
          </div>
          <div className="py-4">
            <dt className="text-sm font-medium text-gray-500">
              <FaEnvelope className="mr-2" />
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {!isEditing ? (
                user.email
              ) : (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border-b border-gray-200 focus:outline-none focus:border-cyan-500 w-full"
                />
              )}
            </dd>
          </div>
          <div className="py-4">
            <dt className="text-sm font-medium text-gray-500">
              <FaInfo className="mr-2" />
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {!isEditing ? (
                user.bio
              ) : (
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="border-b border-gray-200 focus:outline-none focus:border-cyan-500 w-full"
                ></textarea>
              )}
            </dd>
          </div>
        </dl>
      </div>
      <div className="px-6 py-4 bg-cyan-100 rounded-b-md flex justify-center">
        {!isEditing ? (
          <button
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleEdit}
          >
            Edit
          </button>
        ) : (
          <button
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleSave}
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default AccountDetails;
