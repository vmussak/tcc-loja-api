const settings = {
    pg: {
        user: process.env.PG_USER || 'postgres',
        password: process.env.PG_PASSWORD || 'sqlprod',
        server: process.env.PG_SERVER || 'localhost',
        port: process.env.PG_PORT || '5432',
        database: process.env.PG_DATABASE || 'loja',
        max: 10,
        idleTimeoutMillis: 30000,
        schema: 'loja'
    }
};

module.exports = settings;