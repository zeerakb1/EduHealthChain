import React from 'react';
import LabReportCard from './LabReportCard';

const ViewHistory = () => {
  const labReports = [
    { id: 1, title: 'Blood Test Report', file: 'blood_test_report.pdf' },
    { id: 2, title: 'X-Ray Report', file: 'xray_report.pdf' },
    { id: 3, title: 'MRI Report', file: 'mri_report.pdf' },
  ];

  const handleDownload = (fileName) => {
    alert(`Downloading ${fileName}`); 
    // Implement actual download logic here
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-8">View History</h1>
      <div className="w-full max-w-3xl space-y-4">
        {labReports.length > 0 ? (
          labReports.map((report) => (
            <LabReportCard
              key={report.id}
              title={report.title}
              onDownload={() => handleDownload(report.file)}
            />
          ))
        ) : (
          <p className="text-gray-500">You don’t have any lab reports available.</p>
        )}
      </div>
    </div>
  );
};

export default ViewHistory;
