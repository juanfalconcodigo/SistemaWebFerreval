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
    url_db = 'mongodb+srv://juan:Nn42lh6UOgvTwrXL@cluster0-3lu3i.mongodb.net/ventasweb? retryWrites = true & ssl = false'
}
process.env.URLDB = url_db;