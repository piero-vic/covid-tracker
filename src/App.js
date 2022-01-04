import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './components/Home';
import Details from './components/Details';

function App() {
  const regions = useSelector((state) => state.data);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {regions.map((region) => (
          <Route
            key={region.slug}
            path={`/${region.slug}`}
            element={<Details region={region} />}
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
