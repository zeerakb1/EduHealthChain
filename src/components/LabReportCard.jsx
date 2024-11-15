import React from 'react';

const LabReportCard = ({ title, onDownload }) => {
  return (
    <div className="flex justify-between items-center p-4 border rounded shadow-sm bg-white">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <button
        onClick={onDownload}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
      >
        Download
      </button>
    </div>
  );
};

export default LabReportCard;
