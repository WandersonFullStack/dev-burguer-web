module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'barney',
    password: 'admin762',
    database: 'dev-burguer-db',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};