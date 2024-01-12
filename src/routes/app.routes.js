const SecurityController = require('../controller/security.controller')
const clientController = new SecurityController();

const routes = [
    {
        url: '/generate-token',
        method: 'POST',
        handler: clientController.generateToken
    },
    {
        url: '/validate-token',
        method: 'POST',
        handler:  clientController.validateToken
    },
];

module.exports = { routes, SecurityController }