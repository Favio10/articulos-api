const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.headers['authorization'];
    
    if (!token) {
        return res.status(403).json({
            status: 'error',
            message: 'Token no proporcionado'
        });
    }

    try {
        const tokenLimpio = token.replace('Bearer ', '');
        const decoded = jwt.verify(tokenLimpio, process.env.JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            status: 'error',
            message: 'Token inválido o expirado'
        });
    }
};

const verificarRol = (roles) => {
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(403).json({
                status: 'error',
                message: 'No autorizado'
            });
        }

        if (!roles.includes(req.usuario.rol)) {
            return res.status(403).json({
                status: 'error',
                message: 'No tienes los permisos necesarios'
            });
        }

        next();
    };
};

module.exports = {
    verificarToken,
    verificarRol
}; 