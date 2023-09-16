import './App.css';
import AuthProvider from './providers/authProvider';


import Routes from './routes';

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </div>
  );
}

export default App;