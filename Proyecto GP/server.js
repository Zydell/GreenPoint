const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models'); // Asegúrate de que el archivo de modelos está bien configurado

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Incluir rutas CRUD

app.use('/api/negocios', require('./routes/negocioRoutes'));
app.use('/api/ofertas', require('./routes/ofertaRoutes'));
app.use('/api/credenciales', require('./routes/credencialRoutes'));
app.use('/api/puntos_verdes', require('./routes/puntoVerdeRoutes'));
app.use('/api/admins', require('./routes/admins'));
app.use('/api/canjea_ofertas', require('./routes/canjeaOfertas'));
app.use('/api/ciudadanos', require('./routes/ciudadanos'));
app.use('/api/greecoins', require('./routes/greecoins'));
app.use('/api/historial', require('./routes/historiales'));
app.use('/api/historial_negocios', require('./routes/historialNegocios'));
app.use('/api/materiales', require('./routes/materiales'));
app.use('/api/reciclajes', require('./routes/reciclajes'));
app.use('/api/registro_reciclaje', require('./routes/registroReciclajeRoutes'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});