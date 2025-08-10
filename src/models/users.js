import { DataTypes } from "sequelize";
import sequelize from "../DB/connectDB.js";

const usuarios = sequelize.define('usuarios',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombreDeUsuario:{
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
            len:[4, 100]
        }
    },
    edad:{
        type: DataTypes.INTEGER,
        allowNull:false,
        validate:{
            min: 18,
            notEmpty:true
        }
    },
    contraseña:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len:[5,100]
        }
    }
})
export default usuarios