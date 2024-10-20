import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';
import PropTypes from "prop-types";

export default function SpinnerRedirect({message}) {
  const [countdown, setCountdown] = useState(4);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/"); // Redirect to login when countdown reaches 0
          return 0;
        }
        return prev - 1;
      });
    }, 1000); // Update countdown every second

    return () => clearInterval(timer); // Clean up timer on component unmount
  }, [navigate]);

  return (
    <>
        <Helmet>
        <meta charSet="utf-8" />
        <title>Redirecting....</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    
        <link
          href="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.css"
          rel="stylesheet"
        />

        <script src="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js"></script>

        <link
          defer
          rel="stylesheet"
          href="https://unicons.iconscout.com/release/v4.0.8/css/line.css"
        />
      </Helmet>


    <div style={{ minHeight: "100vh" }} className="flex  flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      
      <div className="flex items-center justify-center">
        <div className="loader border-t-4 border-b-4 border-blue-600 rounded-full w-20 h-20 animate-spin mb-4"></div>
      </div>
      <p className="text-lg text-gray-800 dark:text-gray-200 font-semibold">
      {message}<br /> Redirecting you in {countdown}s.
      </p>
      <style>{`
        .loader {
          border-left-color: transparent;
          border-right-color: transparent;
          animation: spin 1s linear infinite;
          }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
          </>
  );
}

SpinnerRedirect.propTypes = {
  message: PropTypes.node.isRequired,

};