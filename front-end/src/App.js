import './App.css';
import Header from './components/header/header';
import MainRoutes from './routes';
import Footer from './Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <MainRoutes />
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
