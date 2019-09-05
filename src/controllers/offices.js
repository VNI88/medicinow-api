let database = require ('../db/queries.js');

let  index = async (req, res) => {
try{
    let data = await database.getAllOffices()
    // 201 Status code means that something was created
    return res.status(201).json({
     status: 'success',
     data: data,
     message: 'Retrieved all offices'
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
    let streetAddress = req.params.streetAddress;
    let data = await database.getOffice(streetAddress)

    return res.status(200).json({
     status: 'success',
     data: data,
     message: `Retrieved office of id: ${id}`
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
    let data = await database.createOffice(body)

    return res.status(201).json({
     status: 'success',
     message: `Inserted office with success.`
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
    let data = await database.updateOffice(id, body)

    return res.status(201).json({
     status: 'success',
     message: `Updated ${data.rowCount} offices.`
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
    let data = await database.deleteOffice(id)

    if (data.rowCount <=  0) {
     res.status(404)
      .json({
        status: 'failed',
        message: `Removed ${data.rowCount} office.`
      });
    } else {
      res.status(200).json({
        status: 'success',
        message: `Removed ${data.rowCount} office.`
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
