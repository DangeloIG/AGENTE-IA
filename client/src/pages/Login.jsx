import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const loginUser = async (e) => {
        e.preventDefault();
        const { email, password } = data;
        try {
            const { data } = await axios.post('/login', {
                email,
                password
            });
            if (data.error) {
                toast.error(data.error);
            } else {
                setData({});
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={{ 
            fontFamily: 'Arial, sans-serif', 
            backgroundImage: 'url(https://via.placeholder.com/1200x800)', 
            backgroundSize: 'cover', 
            minHeight: '100vh', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            padding: '20px' 
        }}>
            <div style={{ 
                backgroundColor: '#fff', 
                padding: '30px', 
                borderRadius: '10px', 
                boxShadow: '0 0 15px rgba(0,0,0,0.2)', 
                width: '100%', 
                maxWidth: '400px', 
                textAlign: 'center' 
            }}>
                <h1 style={{ color: '#007bff', fontSize: '24px', marginBottom: '10px' }}>Bienvenido</h1>
                <div style={{ fontSize: '28px', color: '#333', marginBottom: '20px' }}>Iniciar Sesion</div>
                <form onSubmit={loginUser} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <label style={{ textAlign: 'left', color: '#555', fontWeight: 'bold' }}>Ingrese su Correo </label>
                    <input type="email" placeholder='ingresa email ...' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} 
                           style={{ padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px', width: '100%', boxSizing: 'border-box' }} />
                    <label style={{ textAlign: 'left', color: '#555', fontWeight: 'bold' }}>Clave</label>
                    <input type="password" placeholder='ingresa tu contrasena ...' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} 
                           style={{ padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px', width: '100%', boxSizing: 'border-box' }} />
                    <button type='submit' style={{ padding: '12px', fontSize: '18px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}>Ingresar</button>
                </form>
                <p style={{ color: '#555', fontSize: '12px', marginTop: '20px' }}>
                    ¿Olvidó su clave? <a href="#" style={{ color: '#007bff', textDecoration: 'underline' }}>Haga clic aquí</a>
                </p>
                <div style={{ marginTop: '20px', fontSize: '12px', color: '#555' }}>
                    <p>MUNICIPALIDAD DE PUEBLO NUEVO</p>
                    <p>Tel: 976922667</p>
                    <p>©  - Municipalidad de Pueblo Nuevo - Todos los derechos reservados</p>
                    <p><a href="#" style={{ color: '#007bff', textDecoration: 'underline' }}>Dirección y horario para Dirección de Informática Municipal</a></p>
                </div>
            </div>
        </div>
    );
}