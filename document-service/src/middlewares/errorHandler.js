module.exports = (err, req, res, next) => {
  console.error('[ERROR]', err.message);
  res.status(500).json({
    error: 'Ocurrió un error interno en el servidor',
    detalle: err.message
  });
};
