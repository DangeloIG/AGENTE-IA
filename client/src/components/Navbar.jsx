// esta importante de la librerei react router ddom
import { Link } from 'react-router-dom';
import logo from '../assets/pueblo nuevo.png'; // Adjust the path based on your project structure

export default function Navbar() {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#f8f9fa',
      padding: '10px 20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    }}>
      <img
        src={logo}
        alt="Municipalidad Logo"
        style={{ height: '40px', width: 'auto' }}
      />
      <div style={{ display: 'flex', gap: '15px' }}>
        <Link to='' style={{ color: '#333', textDecoration: 'none', margin: '0 10px' }}>Principal</Link>
        <Link to='register' style={{ color: '#333', textDecoration: 'none', margin: '0 10px' }}>Registro</Link>
        <Link to='login' style={{ color: '#333', textDecoration: 'none', margin: '0 10px' }}>Iniciar Sesion</Link>
      </div>
    </nav>
  );
}