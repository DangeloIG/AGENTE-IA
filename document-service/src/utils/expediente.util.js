const generarExpediente = () => {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const timestamp = now.getTime();

  return `EXP-${yyyy}${mm}${dd}-${timestamp}`;
};

module.exports = { generarExpediente };
