const path = require('path')
const fs = require('fs')

class Ticket {
    constructor( numero, escritorio ) {
        this.numero = numero
        this.escritorio = escritorio
    }
}

class TicketController {

    constructor() {
        this.ultimo = 0
        this.hoy = new Date().getDate()
        this.tickets = []
        this.ultimos = []

        this.init()

    }

    get toJson() {
        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos: this.ultimos

        }
    }

    init() {
        const { hoy, tickets, ultimo, ultimos } = require('../data/data.json')
        if ( hoy === this.hoy ) {
            this.tickets = tickets
            this.ultimo = ultimo
            this.ultimos = ultimos
        } else {
            //Es otro dia, entonces reinicia los datos en DB
            this.guardarDB()
        }
    }

    guardarDB() {
        const dbPath = path.join( __dirname, '../data/data.json' )
        fs.writeFileSync( dbPath, JSON.stringify( this.toJson) )
    }

    siguienteTicket() {
        this.ultimo += 1
        const ticket = new Ticket(this.ultimo, null);
        this.tickets.push( ticket )

        this.guardarDB()
        return ticket.numero
    }

    atenderTicket( escritorio ) {
        if (this.tickets.length === 0 ) {
            return null
        }
        //elimina el primer elemento del array tickets y lo almacena en ticket
        const ticket = this.tickets.shift()

        ticket.escritorio = escritorio

        //agregar el ticket que estoy atendiendo al inicio del array de ultimos tickets
        this.ultimos.unshift( ticket )

        if (this.ultimos.length > 4) {
            //Si el array tiene mas de 4 elementos, toma el ultimo y lo corta
            this.ultimos.splice(-1,1)
        }

        this.guardarDB()

        return ticket

    }

}

module.exports = TicketController