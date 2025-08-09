
import app from 'express'
const router = app.Router()
import users from '../models/users.js'
import registerUserSchema from "../../zodSchema.js";
import z from "zod"





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
			console.log(result)
			if(result !== typeof(Error)){
				await users.create(req.body)
				res.send("usuario registrado")
			}
		}
	} catch (error) {
		if(error instanceof z.ZodError){
			throw res.send(error.issues[0].message)
		}
	}
})


router.delete('/deleteUser',async (req,res)=>{
	const oldUsernames = await users.findOne({where:{username: `${req.body.username}`}, raw: true}) 
	
})

router.put('/changeUsername', async (req, res)=>{
	
}
)

export default router

