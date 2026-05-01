import React, { useState } from 'react';
import axios from 'axios';

function CVUploadForm({ jobDescription, setResults }) {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!jobDescription) {
      alert("Please enter a job description first.");
      return;
    }
    if (files.length === 0) {
      alert("Please select at least one CV to upload.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('job_description', jobDescription);
    files.forEach(file => {
      formData.append('files', file);
    });

    try {
      const response = await axios.post('http://localhost:8000/upload_cvs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setResults(prev => [...prev, ...response.data.results]);
      setFiles([]);
    } catch (error) {
      console.error(error);
      alert("Error uploading CVs");
    }
    setUploading(false);
  };

  return (
    <form onSubmit={handleUpload} className="flex flex-col space-y-4">
      <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors">
        <input 
          type="file" 
          multiple 
          accept=".pdf" 
          onChange={handleFileChange}
          className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer mx-auto"
        />
        <p className="mt-2 text-xs text-slate-400">Select multiple PDF files</p>
      </div>
      
      {files.length > 0 && (
        <ul className="text-sm text-slate-600 space-y-1">
          {files.map((file, i) => <li key={i}>📄 {file.name}</li>)}
        </ul>
      )}

      <button 
        type="submit" 
        disabled={uploading}
        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {uploading ? 'Uploading & Analyzing...' : 'Screen CVs'}
      </button>
    </form>
  );
}

export default CVUploadForm;