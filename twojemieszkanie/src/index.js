import React from 'react';
import ReactDOM from 'react-dom/client';
import { Footer, Navbar } from './components/layout';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import FlatList from './pages/menu/flats/FlatList';
import CreateFlat from './pages/menu/flats/CreateFlat';
import EditFlat from './pages/menu/flats/EditFlat';
import SignUpSignIn from './pages/menu/profile/SignUpSignIn';
import SupportFileForm from './pages/menu/profile/SupportFileForm';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/menu/flats" element={<FlatList />}/>
        <Route path="/menu/flats/create" element={<CreateFlat />}/>
        <Route path="/menu/flats/edit/:id" element={<EditFlat />}/>
        <Route path="/menu/profile" element={<SignUpSignIn/>} />
        <Route path="/logout" element={<SupportFileForm/>} />
        <Route path="*" element={<NotFound />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

