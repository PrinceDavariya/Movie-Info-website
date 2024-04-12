import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Navigate back
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
      <nav className="absolute top-0 left-0 w-full p-4">
        <Link to="/" className="ri-arrow-left-line hover:text-purple-600">
          Go Back
        </Link>
      </nav>
      <div style={styles.container}>
        <h1 style={styles.heading}>404 - Page Not Found</h1>
        <p style={styles.text}>The page you are looking for does not exist.</p>
      </div>
    </div>
  );
}

// Styles object
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 64px)', // Adjust for navbar height if exists
    padding: '20px',
    textAlign: 'center',
    color: '#fff', // Text color
    backgroundColor: '#1F1E24', // Background color
  },
  heading: {
    fontSize: '36px', // Heading font size
    marginBottom: '20px', // Margin below heading
  },
  text: {
    fontSize: '18px', // Text font size
  },
};

export default NotFound;
