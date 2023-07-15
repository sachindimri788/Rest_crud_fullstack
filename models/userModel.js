const sequelize=require('../util/db');
const dataType=require('sequelize');
sequelize.options.logging = false;

const User=sequelize.define(
    'user',
{
    id:{
        type:dataType.INTEGER,
        autoIncrement: true,
        primaryKey:true,
    },
    name:{
        type:dataType.STRING
    },
    email:{
        type:dataType.STRING
    }
}
,
  {
    createdAt: false,
    updatedAt: false,
    // freezeTableName: true,
  }
)

module.exports=User