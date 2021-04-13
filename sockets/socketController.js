const TicketController = require("../controllers/ticketController")

const ticketControl = new TicketController()

const socketController = (socket) => {

    socket.emit( 'ultimo-ticket', ticketControl.ultimo )
    socket.emit( 'estado-actual', ticketControl.ultimos )
    socket.emit( 'tickets-pendientes', ticketControl.tickets.length )
    
    socket.on('siguiente-ticket', (payload, callback)=> {
        
        const siguiente = ticketControl.siguienteTicket()
        callback(siguiente)
        
        socket.broadcast.emit( 'tickets-pendientes', ticketControl.tickets.length )
        
        
    })
    
    socket.on('atender-ticket', (payload, callback) => {
        if ( !payload.escritorio ) {
            return callback({
                ok: false,
                message: 'El escritorio es obligatorio'
            })
        }
        
        const ticket = ticketControl.atenderTicket( payload.escritorio )
        
        socket.broadcast.emit( 'estado-actual', ticketControl.ultimos )
        socket.emit( 'tickets-pendientes', ticketControl.tickets.length )
        socket.broadcast.emit( 'tickets-pendientes', ticketControl.tickets.length )

        if ( !ticket ) {
            callback({
                ok: false,
                message: 'No hay tickets'
            })
        } else {
            callback({
                ok: true,
                ticket
            })
        }
    })


}

module.exports = {
    socketController
}