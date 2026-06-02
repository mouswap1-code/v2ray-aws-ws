const http = require('http');
const WebSocket = require('ws');

// UUID (tu peux le changer par le tien)
const UUID = 'f09a960a-4f1b-495f-9962-f1a14e5a7791';
const PORT = process.env.PORT || 8080;

// Serveur HTTP pour les health checks AWS
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200);
        res.end('OK');
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

// Serveur WebSocket
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws, req) => {
    const path = req.url;
    console.log(`Nouvelle connexion WebSocket: ${path}`);
    
    if (path !== '/ws') {
        ws.close(1008, 'Invalid path');
        return;
    }

    ws.on('message', (message) => {
        console.log(`Message reçu: ${message}`);
        ws.send(`Echo: ${message}`);
    });

    ws.on('close', () => {
        console.log('Connexion fermée');
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Serveur WebSocket actif sur le port ${PORT}`);
});
