import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InformationScreen from "./pages/InformationScreen";
import TermsPage from "./pages/TermsPage";
import CapturePage from "./pages/CapturePage";
import ProcessingPage from "./pages/ProcessingPage";
import FaceNotDetectedPage from "./pages/FaceNotDetectedPage";
import FeedbackPage from "./pages/FeedbackPage";
import PageContainer from "./components/PageContainer";
import ShowcasePage from "./pages/ShowcasePage";
import MultipleFacesPage from "./pages/MultipleFacesPage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
      <Router>
        <PageContainer>
          <Routes>
            <Route path="/" element={<InformationScreen />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/capture" element={<CapturePage />} />
            <Route path="/processing" element={<ProcessingPage />} />
            <Route path="/noface" element={<FaceNotDetectedPage />} />
            <Route path="/showcase" element={<ShowcasePage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/moface" element={<MultipleFacesPage />} />
            <Route path="/error" element={<ErrorPage />} />
          </Routes>
        </PageContainer>
      </Router>
  );
}

export default App;
