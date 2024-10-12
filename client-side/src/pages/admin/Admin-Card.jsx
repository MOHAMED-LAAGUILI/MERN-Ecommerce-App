import { PropTypes } from 'prop-types';

export default function DashboardCard({ title, value, icon, color }) {
  return (
    <div className={`${color} border-2 text-gray-100 rounded-xl p-6 shadow-md transition-all transform hover:scale-105 hover:shadow-lg`}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-1">{title}</h2>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <i className={`${icon} text-4xl opacity-50`}></i>
      </div>
    </div>
  );
}

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
