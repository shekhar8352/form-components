import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import './App.css';

import Navigation from './components/Navigation';
import Playground from './components/Playground';
import Home from './pages/Home';
import GettingStarted from './pages/GettingStarted';
import Documentation from './pages/Documentation';
import ComponentShowcase from './pages/ComponentShowcase';
import ComponentShowcaseComplete from './pages/ComponentShowcaseComplete';
import Examples from './pages/Examples';
import ComponentDocs from './pages/components/ComponentDocs';
import FormTextInputDocs from './pages/components/FormTextInputDocs';
import DemoIndex from './pages/demos/DemoIndex';
import RegistrationDemo from './pages/demos/RegistrationDemo';
import CrossProjectDemo from './pages/demos/CrossProjectDemo';

function App() {
  return (
    <MantineProvider>
      <Router>
        <Navigation>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/getting-started" element={<GettingStarted />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/showcase" element={<ComponentShowcase />} />
            <Route path="/showcase/complete" element={<ComponentShowcaseComplete />} />
            <Route path="/examples" element={<Examples />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="/components" element={<ComponentDocs />} />
            <Route path="/components/text-input" element={<FormTextInputDocs />} />
            <Route path="/components/*" element={<div>Component documentation page not found</div>} />
            <Route path="/demos" element={<DemoIndex />} />
            <Route path="/demos/registration" element={<RegistrationDemo />} />
            <Route path="/demos/cross-project" element={<CrossProjectDemo />} />
            <Route path="/demos/*" element={<div>Demo not found</div>} />
          </Routes>
        </Navigation>
      </Router>
    </MantineProvider>
  );
}

export default App;
