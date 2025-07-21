// client/src/components/UploadForm.jsx

import React, { useState } from 'react';
import { enviarOCR, confirmarDocumento } from '../api';

function UploadForm() {
  const [file, setFile] = useState(null);
  const [texto, setTexto] = useState('');
  const [area, setArea] = useState('');
  const [expediente, setExpediente] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Por favor selecciona un PDF antes de procesar.");
      return;
    }

    try {
      // 1) Enviamos al backend para OCR → IA → Distribución
      const { area: areaResp, textoDetectado, distribucion } = await enviarOCR(file);
      setTexto(textoDetectado);
      setArea(areaResp);

      // 2) Decisión del jefe
      const decision = window.confirm(`¿Este documento es para el área ${areaResp}?`) ? 'sí' : 'no';
      const jefe = prompt("Ingrese su nombre (jefe):", "");

      // 3) Confirmación final
      const { confirmado, expediente: exp } = await confirmarDocumento({
        area: areaResp,
        texto_detectado: textoDetectado,
        filename: file.name,
        decision,
        jefe
      });

      if (confirmado) {
        setExpediente(exp);
        setMensaje(`✅ Guardado con éxito. Expediente: ${exp}`);
      } else {
        setMensaje('❌ Documento rechazado por el jefe');
      }
    } catch (err) {
      console.error(err);
      setMensaje(`⚠️ Ocurrió un error: ${err.message}`);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Subir documento PDF</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="document"
          accept="application/pdf"
          onChange={e => setFile(e.target.files[0])}
          required
        />
        <button type="submit" style={{ marginLeft: '0.5rem' }}>
          Procesar
        </button>
      </form>

      {texto && (
        <div style={{ marginTop: '1rem' }}>
          <p><strong>Texto detectado:</strong></p>
          <p>{texto}</p>
        </div>
      )}

      {area && <p><strong>Área sugerida:</strong> {area}</p>}
      {expediente && <p><strong>Expediente:</strong> {expediente}</p>}
      {mensaje && <p style={{ marginTop: '1rem' }}>{mensaje}</p>}
    </div>
  );
}

export default UploadForm;
