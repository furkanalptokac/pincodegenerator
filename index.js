const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

var pin;
var id;
const digits = 7;

db.defaults(({id: {}, pin: [] }))
    .write();

if (db.get('id.id').value === null) {
    console.log('id set to 1')
    id = 1;
}

generate();

function generate () {
    pin = generatePin(digits);
    id = (db.get('id.id')
        .value());

    db.get('pin')
        .push({ id: id,  pin: pin })
        .write();
    
    id++;

    db.set('id.id', id)
        .write();
}

function generatePin (digits) {
    var pin = '' + Math.floor(Math.random() * 9);
    for (let i = 0; i < digits - 1; i++) {
        pin = pin + '' + Math.floor(Math.random() * 9);
    }
    return pin;
}