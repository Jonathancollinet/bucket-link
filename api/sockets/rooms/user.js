const model = require('../../models');
const User = model.User;

const generateQuery = function(query, model, options){
  if(!model) throw new Error('[GenerateQuery] - model undefined');
  options = options || {};
  options.fields = options.fields || ['excerpt'];

  query = query || {};
  query.attributes = query.attributes || [];
  return query;
};

async function updateGeneralData(idArr){
  console.log('idArr', idArr);
  if (idArr != null || idArr[0] != undefined) {
    return new Promise(function(resolve){
      User.findAll(generateQuery({
        raw: true,
        attributes: ['id', 'email', 'firstname', 'createdAt'],
        where: { id: { $in: idArr } }
      }, User)).then(function(data){
        data = data.map(function(user){
          console.log('user retrive', user);
          return user;
        });
        console.log('data resolved in generalData', data);
        resolve(data);
      });
    }).catch(err =>{
      console.log("err generalData", err);
      return err;
    });
  } else {
    console.log('no data to query in updateGeneralData (socket)');
  }
}

module.exports = {
  updateGeneralData: updateGeneralData
}