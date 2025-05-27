import React, { useState } from 'react';
import { useUploadVideoMutation } from '../../services/videos.service';
import VideoPlayer from '../../components/VideoPlayer';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './VideoUploadPage.css';
const VideoUploaderPage: React.FC = () => {


  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadVideo, { isLoading, isError }] = useUploadVideoMutation();


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    setUploadSuccess(false);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      await uploadVideo(formData).unwrap();
      setUploadSuccess(true);
    } catch (error) {
      console.error('Error uploading video:', error);
      setUploadSuccess(false);
    }
  };

  return (
    <div className="container mt-43" style={{ textAlign: 'center' }}>
      <Form>
        <Form.Group controlId="formFile">
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
        <Button
          variant="primary"
          onClick={handleUpload}
          disabled={!selectedFile || isLoading}
          style={{ marginTop: '10px' }}
        >
          {isLoading ? 'Processing...' : 'Upload'}
        </Button>
      </Form>
      {uploadSuccess && <p className="success-message">Video uploaded successfully!</p>}
      {isError && <p className="error-message">Error uploading video.</p>}
      {selectedFile?.name && (

        <VideoPlayer buffer={selectedFile?.name || ''} />
      )
      }
    </div >
  )
};

export default VideoUploaderPage;