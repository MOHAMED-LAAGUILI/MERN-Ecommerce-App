import PropTypes from 'prop-types';

export default function SpinnerLoading({ message, color }) {
  const { color: colorName, number } = color; // Destructure the color object

  return (
    <div style={{ minHeight: "100vh" }} className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex items-center justify-center">
        {/* Dynamically set the spinner color */}
        <div className={`loader border-t-4 border-b-4 border-${colorName}-${number} rounded-full w-20 h-20 animate-spin mb-4`}></div>
      </div>
      <p className="text-lg text-gray-800 dark:text-gray-100 font-semibold">
        {message}
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
  );
}

// Update PropTypes validation
SpinnerLoading.propTypes = {
  message: PropTypes.string.isRequired,
  color: PropTypes.shape({
    color: PropTypes.string.isRequired, // `color` should be a string
    number: PropTypes.number.isRequired, // `number` should be a number
  }).isRequired,
};
