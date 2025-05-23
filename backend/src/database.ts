import mysql from 'mysql2/promise';

// Crear el pool con las mismas configuraciones
const pool = mysql.createPool(
    {
        host:'localhost',
        user: 'root',
        password: 'rootpass',
        database: 'charlestherapy'   
    }
);

// Verificación inicial de conexión
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Base de datos conectada');
        connection.release();
    } catch (error) {
        console.error('Error de conexión a la base de datos:', error);
    }
})();

export default pool;
