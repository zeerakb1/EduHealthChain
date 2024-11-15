import React, { useState } from 'react';
import FormInput from '../components/FormInput';
import Button from '../components/Button';

const AppointmentForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [doctor, setDoctor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const appointmentData = { title, description, date, time, doctor };
    onSubmit(appointmentData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-8">Make an Appointment</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8">
        <FormInput
          label="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter appointment title"
        />
        <FormInput
          label="Description"
          type="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short description"
        />
        <FormInput
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <FormInput
          label="Time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Doctor</label>
          <select
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select a Doctor</option>
            <option value="Dr. John Smith">Dr. John Smith</option>
            <option value="Dr. Emily Davis">Dr. Emily Davis</option>
            <option value="Dr. Michael Brown">Dr. Michael Brown</option>
            <option value="Dr. Anna Lee">Dr. Anna Lee</option>
          </select>
        </div>
        <Button text="Submit" />
      </form>
    </div>
  );
};

export default AppointmentForm;