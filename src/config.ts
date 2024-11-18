import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    env: process.env.NODE_ENV,
    jwtSecret: process.env.JWT_SECRET,
    database: {
      url: process.env.DATABASE_URL,
      name: process.env.DATABASE_NAME,
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
    },
  };
});
