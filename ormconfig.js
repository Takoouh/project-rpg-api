module.exports = {
  type: 'postgres',
  url: process.env.DB_URL,
  password: process.env.POSTGRES_PASSWORD,
  entities: [process.env.ENTITY_PATH],
  synchronize: true,
};
