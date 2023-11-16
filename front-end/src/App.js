import './App.css';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import MainRoutes from './routes';

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
