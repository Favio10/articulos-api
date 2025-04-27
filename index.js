const app = require('./src/app.js');
const sequelize = require ('./src/config/db.js');
const PORT = process.env.PORT || 3000;

sequelize.authenticate()
.then(() => {
    console.log('La conexión a la base de datos fue exitosa')
    return sequelize.sync({alter: true})
})
.then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`http://localhost:${PORT}`);
    });
  })

.catch((error) => {
    console.error('Error al conectar o sincronizar la base de datos:', error);
  });

