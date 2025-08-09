import { DataTypes } from "sequelize";
import sequelize from "../DB/connectDB.js";

const users = sequelize.define('users',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
        validate:{
            notEmpty: true,
            len: [3, 20]
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false,
        unique: true,
        validate:{
            isEmail:true,
            notEmpty: true,
            len:[7, 100]
        }
    },
    age:{
        type: DataTypes.INTEGER,
        allowNull:false,
        validate:{
            min: 18,
            notEmpty:true
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len:[5,100]
        },
    }
})
export default users