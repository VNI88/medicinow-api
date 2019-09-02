let database = require ('../db/queries.js');
const {generateToken, validatePass} = require('../middleware/auth.js');

let create = async (req, res) => {
  try{
    let body = req.body;
    if(body.email && body.password){
      let email = body.email;
      let password = body.password;

      let pacientValidation = await database.verifyPacient(body);
      let doctorValidation = await database.verifyDoctor(body);

      let realPacient =  async (pacientValidation, doctorValidation) => {
        if (pacientValidation.email === email && password) {
          let res =  await validatePass(password, pacientValidation.password);
          if(res === true){
            return pacientValidation;
          }
          else {
            return false
          }
        }
        else if (doctorValidation.email === email && password){
          let res = await validatePass(password, doctorValidation.password);
          if(res === true) {
            return doctorValidation;
          }
          else {
            return false
          }
        }
        else {
          return false
        }
      }

      if (realPacient){
        let userId = {
          id: realPacient.id,
        };
        if (pacientValidation){
          return res.status(200).json({
           status: 'success',
           token: generateToken(userId),
           name: `${pacientValidation.first_name} ${pacientValidation.last_name}`,
           message: `Token created successfully`
          });
        }
        else{
          return res.status(200).json({
           status: 'success',
           token: generateToken(userId),
           name:`${doctorValidation.first_name} ${doctorValidation.last_name}`,
           message: `Token created successfully`
          });
        }
      }
      else {
        return res.status(401).json({
          status: 'User not found',
          error: err
        });
      }
    }
    else if (body.email){
      return res.status(401).json({
        status: 'failed',
        error: 'Invalid password'
      });
    }
    else {
      return res.status(401).json({
        status: 'failed',
        error: 'Please send your credentials'
      });
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
