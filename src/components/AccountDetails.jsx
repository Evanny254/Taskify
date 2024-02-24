import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaInfo } from 'react-icons/fa';

const AccountDetails = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token'); 
    fetch('https://taskify-backend-btvr.onrender.com/user', {
      headers: {
        'Authorization': `Bearer ${accessToken}`  
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setUser(data);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });
  }, []);

  if (!user) {
    return <div>Loading...</div>; 
  }

  return (
    <div className='bg-white overflow-hidden shadow-sm rounded-md border w-72 mx-auto mt-8'>
      <div className='px-4 py-5 sm:px-6 flex items-center justify-between bg-cyan-100 rounded-t-md'>
        <h3 className='text-lg leading-6 font-medium text-gray-900'>
          Account Details
        </h3>
      </div>
      <div className='border-t border-gray-200 px-4 py-5 sm:p-0'>
        <dl className='sm:divide-y sm:divide-gray-200'>
          <div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>
              <FaUser className="mr-2" />
            </dt>
            <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
              {user.username}
            </dd>
          </div>
          <div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>
              <FaEnvelope className="mr-2" />
            </dt>
            <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
              {user.email}
            </dd>
          </div>
          <div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>
              <FaInfo className="mr-2" />
            </dt>
            <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
              {user.bio}
            </dd>
          </div>
        </dl>
      </div>
      <div className='border-t border-gray-200 px-4 py-4 sm:px-6 bg-cyan-100 rounded-b-md'>
      </div>
    </div>
  );
};

export default AccountDetails;
