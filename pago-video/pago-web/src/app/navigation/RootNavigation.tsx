import { BrowserRouter, Route, Routes } from 'react-router-dom'
import VideoUploaderPage from '../pages/video/VideoUploadPage'


const RootNavigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VideoUploaderPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RootNavigation
