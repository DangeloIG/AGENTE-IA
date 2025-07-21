// client/src/api.js

const API_BASE_BACKEND = "http://localhost:5000";
const API_BASE_IA = "http://localhost:6000";
const API_BASE_CONFIRM = "http://localhost:8000";

/**
 * Sube el PDF al backend, que internamente hace OCR → IA → Distribución
 * y devuelve { area, textoDetectado, distribucion }.
 */
export async function enviarOCR(file) {
  const formData = new FormData();
  formData.append('document', file);   // Debe coincidir con upload.single('document')

  const res = await fetch(`${API_BASE_BACKEND}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Error al subir o procesar el PDF: ${error}`);
  }

  return await res.json(); // { area, textoDetectado, distribucion }
}

/**
 * Envía la confirmación al microservicio de confirmación.
 * data debe contener: { area, texto_detectado, filename, decision, jefe }
 */
export async function confirmarDocumento(data) {
  const res = await fetch(`${API_BASE_CONFIRM}/confirmar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Error en confirmación: ${error}`);
  }

  return await res.json(); // { confirmado, mensaje, expediente }
}
