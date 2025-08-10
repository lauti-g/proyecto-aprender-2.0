
import app from 'express'
const router = app.Router()
import users from '../models/users.js'
import {registerUserSchema, changeUsernameSchema} from "../../zodSchema.js";
import z from "zod"
import bcrypt from "bcrypt";







router.get('/', (req, res)=>{
	res.render("home")
})
router.get('/registration', (req, res)=>{
	res.render("registration")
})
router.get('/deleteUser', (req, res)=>{
	res.render("deleteUser")
})
router.get('/changeUsername', (req, res)=>{
	res.render("changeUsername")
})


router.post('/registration',async (req, res)=>{
	try {
		const oldUsernames = await users.findOne({where:{username: `${req.body.username}`}, raw: true}) 
		const oldEmails = await users.findOne({where:{email: `${req.body.email}`}, raw: true}) 
		if(oldUsernames !== null || oldEmails !== null){ 
			if(oldEmails === null && oldUsernames !== null){
				throw res.send("nombre de usuario en uso")
			}else{
				throw res.send("email en uso")
			}
		}else{
			const result = await registerUserSchema.parse(req.body)
			if(result !== typeof(Error)){
				const cryptPassword = await bcrypt.hash(`${req.body.password}`, 10)
				const result = await bcrypt.compare(`${req.body.confirmPassword}`, `${cryptPassword}`)
				if(result){
					req.body.password = cryptPassword
					await users.create(req.body)
					res.send("usuario registrado")
				}else{
					res.send("no coinciden las contraseñas")
				}
			}
		}
	} catch (error) {
		if(error instanceof z.ZodError){
			throw res.send(error.issues[0].message)
		}
	}
})


router.delete('/deleteUser',async (req,res)=>{
	const user = await users.findOne({where:{username: `${req.body.username}`}, raw: true, attributes: ['username', 'password', 'id']}) 
	if(user === null){
		throw res.send("el usuario no existe")
	}
	const coincidencia = await bcrypt.compare(`${req.body.password}`, `${user.password}`) 
	if(!coincidencia){
		res.send("contraseña incorrecta")
	}
	else{
		res.send("usuario borrado")
		await users.destroy({where:{id:`${user.id}`}})
	}
})

router.put('/changeUsername', async (req, res)=>{
	try {
		await changeUsernameSchema.parse(req.body)
	} catch (error) {
		if(error instanceof z.ZodError){
			throw res.send(error.issues[0].message)
		}
	}
	const oldUsernameAndPassword = await users.findOne({where: {username:`${req.body.username}`}, attributes:['username', 'password','id'], raw: true})

	if(oldUsernameAndPassword === null){
		throw res.send("nombre de usuario inexistente")
	}
	const compareChangeUsername = await bcrypt.compare(`${req.body.password}`, `${oldUsernameAndPassword.password}`)
	if(!compareChangeUsername){
		throw res.send("contraseña incorrecta")
	}else{
		await users.update(
			{username:`${req.body.newUsername}`},
			{where: {username: `${req.body.username}`}}
		)
		res.send("nombre de usuario actualizado")
	}
}
)

export default router

