import React, { useState, useEffect } from 'react';

const App = () => {
  const [file, setFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  const fetchUploadedFiles = async () => {
    try {
      const response = await fetch('http://localhost:5000/files');
      const data = await response.json();
      
      if (response.ok) {
        setUploadedFiles(data.files);
      } else {
        console.error('Error fetching files:', data.error);
      }
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        toast(`File uploaded: ${data.fileName}`);
        fetchUploadedFiles(); // Update the list of files
      } else {
        toast('File upload failed');
      }
    } catch (error) {
      console.error('Error during file upload:', error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>

      <div>
        <h2>Uploaded Files:</h2>
        <ul>
          {uploadedFiles.map((fileName, index) => (
            <li key={index}>
              {fileName}
              <img
                src={`http://localhost:5000/uploads/${encodeURIComponent(fileName)}`}
                alt={fileName}
                style={{ maxWidth: '300px', maxHeight: '300px' }}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;
