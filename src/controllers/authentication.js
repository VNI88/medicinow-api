let jwt = require('jsonwebtoken');
let database = require ('../db/queries.js');
const config = require('../config/config.js');
const {generateToken} = require('../middleware/auth.js');

let create = async (req, res) => {
  try{
    let body = req.body;
    if(body.email && body.password){
      let email = body.email;
      let pass = body.password;

      let pacientValidation = await database.verifyPacient(body);
      let doctorValidation = await database.verifyDoctor(body);

      let realPacient = (pacientValidation, doctorValidation) => {
        if (pacientValidation.email === email && pacientValidation.password === password) {
          return pacientValidation
        }
        else if (doctorValidation.email === email && doctorValidation.password === password){
          return doctorValidation
        }
        else {
          return false
        }
      }

      if (realPacient){
        let userId = {
          id: realPacient.id
        };

        return res.status(200).json({
         status: 'success',
         token: generateToken(userId),
         message: `Token created successfully`
        });
      }
      else {
        return res.status(401).json({
          status: 'User not found',
          error: err
        });
      }
    }
  }
  catch(err) {
    return res.status(401).json({
      status: 'failed',
      error: err
    });
  }
};



module.exports = {
  create: create
}
