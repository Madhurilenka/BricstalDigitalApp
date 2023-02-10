const mongoose = require('mongoose')


const isValid = (value) => {
    if (typeof value === "undefined" || value === null || typeof value === "boolean" || typeof value === "number") return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    if (typeof value === "object" && Object.keys(value).length === 0) return false;
  
    return true;
  };

  const isValidObjectId = (objectId) => {
    return mongoose.Types.ObjectId.isValid(objectId);
  };


  module.exports={isValid,isValidObjectId}