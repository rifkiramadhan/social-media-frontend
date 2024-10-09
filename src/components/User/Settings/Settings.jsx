import { FaUserCircle, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SettingsPage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <div className=' p-8 rounded-lg shadow-4xl w-full max-w-md bg-white'>
        <h2 className='text-2xl font-semibold text-center text-gray-700 mb-6'>
          User Settings
        </h2>
        {/* upload profile photo */}
        <Link to='/dashboard/upload-profile-picture'>
          <div className='bg-white shadow-lg rounded-lg p-6 mb-4 hover:bg-orange-100 transition-colors duration-200'>
            <div className='flex items-center space-x-4'>
              <FaUserCircle className='text-orange-500 text-3xl' />
              <div className='flex-1'>
                <h3 className='text-gray-700 font-semibold text-lg'>
                  Update Profile Photo
                </h3>
                <p className='text-gray-600'>Change Profile Photo</p>
              </div>
            </div>
          </div>
        </Link>
        {/* add email */}
        <Link to='/dashboard/update-email'>
          <div className='bg-white shadow-lg rounded-lg p-6 mb-4 hover:bg-orange-100 transition-colors duration-200'>
            <div className='flex items-center space-x-4'>
              <FaEnvelope className='text-orange-500 text-3xl' />
              <div className='flex-1'>
                <h3 className='text-gray-700 font-semibold text-lg'>
                  Update Email
                </h3>
                <p className='text-gray-600'>Change Email Address</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SettingsPage;
