export const EnvConfiguration = () => ({
  environment: process.env.NODE_EN,
  port: process.env.PORT,
  mongodb: process.env.MONGODB,
  databaseUser: process.env.DATABASE_USER,
  databasePassword: process.env.DATABASE_PASSWORD,
  defaultLimit: process.env.DEFAULT_LIMIT,
});
