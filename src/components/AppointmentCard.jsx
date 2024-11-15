const AppointmentCard = ({ doctorName, date, time }) => {
    return (
      <div className="flex-shrink-0 w-72 border p-4 rounded-lg shadow-lg bg-white">
        <h3 className="text-lg font-semibold mb-2">{doctorName}</h3>
        <p className="text-gray-600">Date: {date}</p>
        <p className="text-gray-600">Time: {time}</p>
      </div>
    );
  };
  
  export default AppointmentCard;
  