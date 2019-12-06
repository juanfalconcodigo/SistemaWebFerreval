process.env.PORT = process.env.PORT || 4000;
//jwt
process.env.SEED = process.env.SEED || "seed-en-desarrollo";
process.env.CADUCIDAD_TOKEN = '1h';
//db
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
let url_db;

if (process.env.NODE_ENV === 'dev') {
    url_db = 'mongodb://localhost:27017/ventasweb';
} else {
    url_db = process.env.MONGO_URI;
}
process.env.URLDB = url_db;