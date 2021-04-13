// puerto
process.env.PORT = process.env.PORT || 3000;

// entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//segun entorno, selecciona bd
if ( process.env.NODE_ENV === 'dev') {
    process.env.DATABASE = '';
} else {
    process.env.DATABASE = '';
}
