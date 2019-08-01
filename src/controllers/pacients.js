let database = require ('../db/queries.js');

let  index = async (req, res) => {
try{
    let data = await database.getAllPacients()
    // 201 Status code means that something was created
    return res.status(201).json({
     status: 'success',
     data: data,
     message: 'Retrieved all pacients'
   });
  }
  catch (err) {
    return res.status(404).json({
      status: 'failed',
      error: err
    });
  }
};

let show = async (req, res) => {
  try{
    let id = req.params.id;
    let data = await database.getPacient(id)

    return res.status(200).json({
     status: 'success',
     data: data,
     message: `Retrieved pacient of id: ${id}`
   });
  }
  catch (err) {
    return res.status(404).json({
      status: 'failed',
      error: err
    });
  }
};

let create = async (req, res) => {
  try{
    let body = req.body;
    let data = await database.createPacient(body)

    return res.status(201).json({
     status: 'success',
     message: `Inserted pacient with success.`
   });
  }
  catch (err) {
    return res.status(404).json({
      status: 'failed',
      error: err
    });
  }
};

let update = async (req, res) => {
  try{
    let id = req.params.id;
    let body = req.body;
    let data = await database.updatePacient(id, body)

    return res.status(201).json({
     status: 'success',
     message: `Updated ${data.rowCount} pacients.`
   });
  }
  catch (err) {
    return res.status(404).json({
      status: 'failed',
      error: err
    });
  }
}

let destroy = async (req, res) => {
  try{
    let id = req.params.id;
    let data = await database.deletePacient(id)

    if (data.rowCount <=  0) {
     res.status(404)
      .json({
        status: 'failed',
        message: `Removed ${data.rowCount} pacient.`
      });
    } else {
      res.status(200).json({
        status: 'success',
        message: `Removed ${data.rowCount} pacient.`
      });
    }
  }
  catch (err) {
    return res.status(404).json({
      status: 'failed',
      error: err
    });
  }
}

module.exports = {
  index: index,
  show: show,
  update: update,
  create: create,
  destroy: destroy
}
