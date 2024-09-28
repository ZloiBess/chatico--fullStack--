import './styles/App.css';
import Header from './components/HeaderComponent.jsx';
import Footer from './components/FooterComponent.jsx';
import AppRouterComponent from './router/AppRouterComponent.jsx';
import { BrowserRouter } from 'react-router-dom';
import './styles/App.css';

function App() {
    return (
        <div className="App">
            <div className="wrapper">
                <header className="App-header">
                    <Header />
                </header>
                <main className="App-main">
                    <BrowserRouter>
                        <AppRouterComponent />
                    </BrowserRouter>
                </main>
                <footer className="App-footer">
                    <Footer />
                </footer>
            </div>
        </div>
    );
}

export default App;
