import { Client } from 'pg';
import * as fs from 'fs/promises';
import * as dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

const runSeeds = async () => {
  try {
    console.log('Conectando a la base de datos...');
    await client.connect();

    console.log('Leyendo el archivo seed.sql...');
    let seedSQL = await fs.readFile('src/database/seed.sql', 'utf-8');

    // Ejecutar el SQL para poner el rol de replicación en replica
    await client.query('SET session_replication_role = replica;');
    
    console.log('Ejecutando el script SQL...');
    await client.query(seedSQL);

    // Restaurar el rol de replicación a su valor predeterminado
    await client.query('SET session_replication_role = DEFAULT;');

    console.log('Seed script ejecutado exitosamente.');

  } catch (error) {
    console.error('Error ejecutando el seed script:', error);
  } finally {
    await client.end();
  }
};

runSeeds();
