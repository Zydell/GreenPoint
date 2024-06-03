const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models'); // Asegúrate de que el archivo de modelos está bien configurado

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Incluir rutas CRUD
const negocioRoutes = require('./routes/negocioRoutes');
const ofertaRoutes = require('./routes/ofertaRoutes');
const credencialRoutes = require('./routes/credencialRoutes');
//const puntoVerdeRoutes = require('./routes/puntoVerdeRoutes');

app.use('/api/negocios', negocioRoutes);
app.use('/api/ofertas', ofertaRoutes);
app.use('/api/credenciales', credencialRoutes);
//app.use('/api/puntos_verdes', puntoVerdeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
