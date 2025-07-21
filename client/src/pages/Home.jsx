import React, { useState } from 'react';

const Home = () => {
  const [solicitante, setSolicitante] = useState('');
  const [formData, setFormData] = useState({
    tipoDocumento: 'DNI',
    numeroDocumento: '',
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    ruc: '',
    razonSocial: '',
    repLegalNombres: '',
    repLegalPaterno: '',
    repLegalMaterno: '',
    telefono: '',
    direccion: {
      departamento: '',
      provincia: '',
      distrito: '',
      direccionActual: ''
    },
    descripcionSolicitud: '',
    asuntoSolicitud: '',
    correo: '',
    archivos: [],
    aceptaPolitica: false,
    aceptaDeclaracion: false
  });

  const handleSolicitanteChange = (event) => {
    setSolicitante(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    let checked;

    if ('checked' in event.target) {
      checked = event.target.checked;
    }

    if (type === 'checkbox' && checked !== undefined) {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (event) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setFormData(prev => ({ ...prev, archivos: [...prev.archivos, ...files] }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.aceptaPolitica || !formData.aceptaDeclaracion) {
      alert('Debe aceptar las políticas de privacidad y la declaración jurada para continuar.');
      return;
    }
    console.log('Formulario a enviar:', formData);
    alert('Formulario enviado con éxito. Revisa la consola para ver los datos.');
  };

  const renderNaturalFields = () => (
    <>
      <div style={styles.formRow}>
        <div style={styles.formGroup_2_col}>
          <label style={styles.label}>1.1. Tipo de documento de identidad del solicitante</label>
          <select name="tipoDocumento" value={formData.tipoDocumento} onChange={handleChange} style={styles.input}>
            <option value="DNI">DNI</option>
            <option value="CarnetExtranjeria">Carné de Extranjería</option>
            <option value="Pasaporte">Pasaporte</option>
          </select>
        </div>
        <div style={styles.formGroup_2_col}>
          <label style={styles.label}>Número de documento de identidad del solicitante</label>
          <input type="text" name="numeroDocumento" value={formData.numeroDocumento} onChange={handleChange} style={styles.input} />
        </div>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>1.2. Nombres y apellidos del solicitante</label>
        <div style={styles.formRow}>
          <input type="text" name="nombres" placeholder="Nombres" value={formData.nombres} onChange={handleChange} style={{ ...styles.input, ...styles.formGroup_3_col }} />
          <input type="text" name="apellidoPaterno" placeholder="Apellido paterno" value={formData.apellidoPaterno} onChange={handleChange} style={{ ...styles.input, ...styles.formGroup_3_col }} />
          <input type="text" name="apellidoMaterno" placeholder="Apellido materno" value={formData.apellidoMaterno} onChange={handleChange} style={{ ...styles.input, ...styles.formGroup_3_col }} />
        </div>
      </div>

      <CommonFields showDireccionNumber="1.4" showTelefonoNumber="1.3" />
    </>
  );

  const renderJuridicaFields = () => (
    <>
      <div style={styles.formRow}>
        <div style={styles.formGroup_2_col}>
          <label style={styles.label}>1.1. Ingrese el número de RUC</label>
          <input type="text" name="ruc" value={formData.ruc} onChange={handleChange} style={styles.input} />
        </div>
        <div style={styles.formGroup_2_col}>
          <label style={styles.label}>1.2. Razón Social</label>
          <input type="text" name="razonSocial" value={formData.razonSocial} onChange={handleChange} style={styles.input} />
        </div>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>1.3. Nombres y apellidos del solicitante (Representante Legal)</label>
        <div style={styles.formRow}>
          <input type="text" name="repLegalNombres" placeholder="Nombres" value={formData.repLegalNombres} onChange={handleChange} style={{ ...styles.input, ...styles.formGroup_3_col }} />
          <input type="text" name="repLegalPaterno" placeholder="Apellido paterno" value={formData.repLegalPaterno} onChange={handleChange} style={{ ...styles.input, ...styles.formGroup_3_col }} />
          <input type="text" name="repLegalMaterno" placeholder="Apellido materno" value={formData.repLegalMaterno} onChange={handleChange} style={{ ...styles.input, ...styles.formGroup_3_col }} />
        </div>
      </div>
      <CommonFields showDireccionNumber="1.5" showTelefonoNumber="1.4" />
    </>
  );

  const CommonFields = ({ showDireccionNumber, showTelefonoNumber }) => (
    <>
      <div style={styles.formGroup}>
        <label style={styles.label}>{showTelefonoNumber}. Ingrese Numero de Telefono / Celular</label>
        <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} style={styles.input} />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>{showDireccionNumber}. Dirección Actual</label>
        <div style={styles.formRow}>
          <select name="direccion.departamento" value={formData.direccion.departamento} onChange={handleChange} style={{ ...styles.input, ...styles.formGroup_3_col }}>
            <option value="">Departamento</option>
            <option value="Ica">Ica</option>
          </select>
          <select name="direccion.provincia" value={formData.direccion.provincia} onChange={handleChange} style={{ ...styles.input, ...styles.formGroup_3_col }}>
            <option value="">Provincia</option>
            <option value="Nazca">Nazca</option>
          </select>
          <select name="direccion.distrito" value={formData.direccion.distrito} onChange={handleChange} style={{ ...styles.input, ...styles.formGroup_3_col }}>
            <option value="">Distrito</option>
            <option value="Marcona">Marcona</option>
          </select>
        </div>
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>1.6. Dirección Actual</label>
        <input type="text" name="direccion.direccionActual" value={formData.direccion.direccionActual} onChange={handleChange} style={styles.input} />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>1.7. Correo electrónico de contacto <span style={{ color: 'gray', fontWeight: 'normal' }}>(debes tener acceso al correo)</span></label>
        <input type="email" name="correo" value={formData.correo} onChange={handleChange} style={styles.input} />
      </div>
    </>
  );

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <span style={styles.govpe}>gob.pe</span>
          <p style={styles.municipality}>Municipalidad Distrital de Pueblo Nuevo</p>
        </div>
        <h1 style={styles.title}>MESA DE PARTES VIRTUAL</h1>
        <p style={styles.subtitle}>Departamento de Ica</p>
      </header>

      <main>
        <div style={{ ...styles.infoBox, backgroundColor: '#e7f3fe', borderLeft: '5px solid #0d6efd' }}>
          <ul style={{ fontSize: '13px', paddingLeft: '20px', margin: 0, lineHeight: '1.6' }}>
  
            <li>Desde las 00:00 am horas hasta el término de atención de la entidad de un día hábil, se considera presentados el mismo día.</li>
            <li>Después del horario de atención de la entidad hasta las 23:59 horas, se considera presentados al día hábil siguiente.</li>
            <li>Los documentos ingresados los días sábados, domingos y feriados, se cuenta desde el día hábil siguiente.</li>
          </ul>
          <p style={{ fontSize: '13px', marginTop: '10px' }}>Para más información, puede comunicarse con nosotros:<br />Correo: <a href="mailto:mesadepartes@munipueblonuevo.gob.pe">mesadepartes@munipueblonuevo.gob.pe</a></p>
          <p style={{ fontSize: '11px', marginTop: '10px' }}>*De acuerdo al artículo 46.2 </p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>1. Información del solicitante</label>
            <select value={solicitante} onChange={handleSolicitanteChange} style={styles.input} required>
              <option value="" disabled>Selecciona una opción</option>
              <option value="Natural">Natural</option>
              <option value="Juridica">Jurídica</option>
            </select>
            {solicitante === '' && <span style={{ color: 'red', fontSize: '12px' }}>Campo requerido.</span>}
          </div>

          {solicitante === 'Natural' && renderNaturalFields()}
          {solicitante === 'Juridica' && renderJuridicaFields()}

          <div style={styles.formGroup}>
            <label style={styles.label}>2. Descripción de la solicitud o trámite</label>
            <input type="text" name="descripcionSolicitud" value={formData.descripcionSolicitud} onChange={handleChange} style={styles.input} />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>3. Asunto de la Solicitud o Trámite</label>
            <textarea name="asuntoSolicitud" value={formData.asuntoSolicitud} onChange={handleChange} style={{ ...styles.input, height: '100px' }} />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>4. Ingresa Tu Correo Electrónico</label>
            <input type="email" name="correo" value={formData.correo} onChange={handleChange} style={styles.input} />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>5. Adjunta los documentos que sustentan tu solicitud</label>
            <p style={{ fontSize: '12px', color: '#555', margin: '0 0 10px 0' }}>Solo se aceptan formatos: jpg, jpeg, png, tif, bmp, pdf, doc, docx, txt, xls, xlsx, xlsm, csv, rar, zip, mp3, wma, mp4 y wmv.<br /><b>Peso total máximo: 10 MB</b></p>
            <div style={styles.fileDropArea}>
              <input type="file" multiple onChange={handleFileChange} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} />
              <span style={{ fontSize: '50px' }}>📄</span>
              <p style={{ color: '#0d6efd', fontWeight: 'bold' }}>Selecciona los archivos <span style={{ color: '#333', fontWeight: 'normal' }}>o arrástralos aquí</span></p>
              {formData.archivos.length === 0 && <span style={{ color: 'red', fontSize: '12px' }}>Seleccione al menos un archivo</span>}
            </div>
            {formData.archivos.length > 0 && (
              <div style={{ marginTop: '10px' }}>
                <p style={{ fontSize: '13px', fontWeight: 'bold' }}>Archivos seleccionados:</p>
                <ul style={{ fontSize: '12px', listStyle: 'none', paddingLeft: 0 }}>
                  {formData.archivos.map((file, index) => <li key={index}>- {file.name}</li>)}
                </ul>
              </div>
            )}
          </div>

          <div style={styles.formGroup}>
            <p style={{ fontSize: '13px' }}>No olvidar que debe subir el Formulario Único de Trámite FUT en Formato PDF o JPG si no cuentas con uno descárgalo aquí <a href="https://munimarcona.gob.pe/wp-content/uploads/Docs/FUT.pdf" target="_blank" rel="noopener noreferrer">https://munipueblonuevo.gob.pe/wp-content/uploads/Docs/FUT.pdf</a></p>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.checkboxLabel}>
              <input type="checkbox" name="aceptaPolitica" checked={formData.aceptaPolitica} onChange={handleChange} />
              Acepto la política de privacidad
            </label>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.checkboxLabel}>
              <input type="checkbox" name="aceptaDeclaracion" checked={formData.aceptaDeclaracion} onChange={handleChange} />
              Acepto la declaración jurada de veracidad de la información
            </label>
          </div>

          <div style={{ textAlign: 'right' }}>
            <button type="submit" style={styles.button}>Enviar</button>
          </div>
        </form>
      </main>
    </div>
  );
};

const styles = {
  container: { fontFamily: 'Arial, sans-serif', color: '#333', maxWidth: '800px', margin: '40px auto', backgroundColor: '#fff', padding: '30px', borderRadius: '8px' },
  header: { borderBottom: '1px solid #eee', paddingBottom: '20px', marginBottom: '20px' },
  govpe: { color: '#333', fontWeight: 'bold', fontSize: '18px' },
  municipality: { margin: '0 0 0 15px', fontSize: '14px', color: '#555' },
  title: { margin: '10px 0 0 0', fontSize: '28px', color: '#333' },
  subtitle: { margin: '5px 0 0 0', fontSize: '14px', color: '#555' },
  infoBox: { padding: '15px', borderRadius: '5px', marginBottom: '20px' },
  form: { backgroundColor: '#f7f7f7', padding: '25px', borderRadius: '8px', border: '1px solid #e7e7e7' },
  formGroup: { marginBottom: '20px' },
  formRow: { display: 'flex', gap: '20px', flexWrap: 'wrap' },
  formGroup_2_col: { flex: '1 1 45%' },
  formGroup_3_col: { flex: '1 1 30%' },
  label: { display: 'block', marginBottom: '8px', fontSize: '14px', color: '#333', fontWeight: '600' },
  input: { width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', fontSize: '14px' },
  fileDropArea: { border: '2px dashed #0d6efd', borderRadius: '5px', padding: '20px', textAlign: 'center', backgroundColor: '#f0f8ff', position: 'relative' },
  checkboxLabel: { display: 'flex', alignItems: 'center', fontSize: '14px', cursor: 'pointer' },
  button: { backgroundColor: '#0d6efd', color: 'white', padding: '12px 25px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }
};

export default Home;