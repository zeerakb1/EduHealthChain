import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import AppointmentCard from '../components/AppointmentCard';

const HomePage = () => {
  const navigate = useNavigate();
  const appointments = [
    {
      id: 1,
      doctorName: 'Dr. John Smith',
      date: '2024-11-20',
      time: '10:00 AM',
    },
    {
        id: 2,
        doctorName: 'Dr. Trevor James',
        date: '2024-12-10',
        time: '12:00 AM',
      },
    // Additional dummy appointments...
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-8">Welcome to the EduHealth</h1>
      
      <div className="w-full max-w-5xl">
        <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
        
        {appointments.length > 0 ? (
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {appointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                doctorName={appointment.doctorName}
                date={appointment.date}
                time={appointment.time}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mb-4">You don’t have any appointments.</p>
        )}

        <div className="mt-6 space-y-4 max-w-xs">
          <Button text="Make an Appointment" onClick={() => navigate('/appointment-form')} />
          <Button text="View History" onClick={() => navigate('/view-history')} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
