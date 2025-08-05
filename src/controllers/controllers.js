import app from 'express'
const router = app.Router()
import { pool } from '../DB/connectDB.js'



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
	const newUser = req.body
	const username = newUser.username
	const password = newUser.password
	const confirmPassword = newUser.confirmPassword
	const email = newUser.email
	const age = newUser.age
	const oldsUser = await  pool.query(`SELECT username FROM users WHERE username = "${username}"`)
	const oldsEMails = await pool.query(`SELECT email FROM users WHERE email = "${email}"`)
	try {
	if(oldsUser[0][0] != undefined){
		res.send("nombre de usuario en uso eleji otro")
	}
	else if(oldsEMails[0][0] != undefined) {
		res.send("E-Mail en uso eleji otro")
	}
	else if(username.length < 3){
    	res.send("nombre muy corto minimo 3 caracteres")
		}
	else if(password.length < 5){
		res.send("contraceña muy corta minimo 5 caracteres")
		}
	else if(confirmPassword !== password){
		res.send("confirm password tiene que ser igual al password")
		}
	else if(age < 18) {
		res.send("edad minima requerida: 18")
		}
	else if(!email.includes("@")){
		res.send("se requerie e-mail")
		}
	else if("number" != typeof(age) ){
		res.send("edad tiene que ser un numero")
		} 
	else{
    	await pool.query(`INSERT INTO users (username, password, email, age) VALUES ("${username}", "${password}", "${email}", "${age}")`)
		res.send("usuario registrado")
		}}
	catch{
		console.error(error);
		res.send("ocurrio un error")
	}
})


router.delete('/deleteUser',async (req,res)=>{
	const deleteUser = req.body
	const username = deleteUser.username
	const password = deleteUser.password
	const getPassword = await pool.query(`SELECT password FROM users WHERE username = "${username}"`)
	if(getPassword[0][0] == undefined){
		res.send("el usuario no existe, asegurese de estar registrado.")
	}
	else if(getPassword[0][0].password !== password){
		res.send("contraceña incorrecta")
	}
	else{
		const idUser = await pool.query(`SELECT id FROM users WHERE  username = "${username}"`)
		pool.query(`DELETE  FROM users WHERE id = ${idUser[0][0].id} `)
		res.send(`usuario ${username} borrado`)
	}
})

router.put('/changeUsername', async (req, res)=>{
	const changeUsername = req.body
	const username = changeUsername.username
	const newUsername = changeUsername.newUsername
	const password = changeUsername.password
	const getPassword = await pool.query(`SELECT password FROM users WHERE username = "${username}"`)
	const getUsers = await pool.query(`SELECT username FROM users WHERE username = "${newUsername}"`)
	if(getPassword[0][0] !== undefined){
		if(getUsers[0][0] !== undefined){
			res.send("este nombre de usuario ya esta en uso")
		}
		else if(newUsername.length < 3){
			res.send("el nuevo nombre de usuario es muy corto minimo 3 caracteres")
		}
		else if(getPassword[0][0].password !== password){
			res.send("contraceña incorrecta")
		}
		else{
			const id = await pool.query(`SELECT id FROM users WHERE username = "${username}"`)
			pool.query(`UPDATE users SET username = "${newUsername}" WHERE id = ${id[0][0].id}`)
			res.send("nombre de usuario actualizados")
		}
	}else {res.send("nombre de usuario o contraceña incorrecta")}
}
)

export default router

