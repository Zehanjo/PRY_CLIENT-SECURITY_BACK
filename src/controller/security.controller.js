const { mysqlConfig } = require("../config/mysql.connection");
const jwt = require("jsonwebtoken");
const fastify = require('fastify')({logger: true});
fastify.register(require('@fastify/formbody'));

const _secretKey = "security";
class SecurityController {
  async generateToken(req, reply) {
    try {
      const securityToken = Math.floor(10000000 + Math.random() * 90000000);
      const token = jwt.sign({ securityToken }, _secretKey);
      const SQL = `CALL sp_insertToken(?);`;
      const response = await mysqlConfig.query(SQL, [token]);
      if (response[0].affectedRows === 1) {
        reply.send({
          token,
          succes: true,
          message: "Token successfully created in BD",
        });
      } else {
        console.error({
          success: false,
          message: "Error to register user in BD",
        });
      }
    } catch (error) {
      reply.status(500).send({ error: `Error al generar el token ${error}` });
    }
  }
  async validateToken(req, reply) {
    console.log("validate token");
    console.log(req.body);
    try {
      const { token } = req.body;
      console.log("token", token);
      jwt.verify(token, _secretKey, (err, decoded) => {
        if (err) {
          reply.send({ valido: false });
        } else {
          reply.send({ valido: true });
        }
      });
    } catch (error) {
      reply.status(500).send({ error: `Error al validar el token ${error}` });
    }
  }
}

module.exports = SecurityController;
