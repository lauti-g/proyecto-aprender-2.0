
import app from 'express'
const router = app.Router()
import usuarios from '../models/users.js'
import {registrarUsuarioSchema, cambiarNombreDeUsuarioSchema} from "../../zodSchema.js";
import z from "zod"
import bcrypt from "bcrypt";







router.get('/', (req, res)=>{
	res.render("inicio")
})
router.get('/registrarse', (req, res)=>{
	res.render("registrarse")
})
router.get('/borrarUsuario', (req, res)=>{
	res.render("borrarUsuario")
})
router.get('/cambiarNombreDeUsuario', (req, res)=>{
	res.render("cambiarNombreDeUsuario")
})


router.post('/registrarse',async (req, res)=>{
	try {
		const viejosnombreDeUsuario = await usuarios.findOne({where:{nombreDeUsuario: `${req.body.nombreDeUsuario}`}, raw: true}) 
		const viejosEmails = await usuarios.findOne({where:{email: `${req.body.email}`}, raw: true}) 
		if(viejosnombreDeUsuario !== null || viejosEmails !== null){ 
			if(viejosEmails === null && viejosnombreDeUsuario !== null){
				throw res.send("nombre de usuario en uso")
			}else{
				throw res.send("email en uso")
			}
		}else{
			const resultado = await registrarUsuarioSchema.parse(req.body)
			if(resultado !== typeof(Error)){
				const encriptarContraseña = await bcrypt.hash(`${req.body.contraseña}`, 10)
				const resultado = await bcrypt.compare(`${req.body.confirmarContraseña}`, `${encriptarContraseña}`)
				if(resultado){
					req.body.contraseña = encriptarContraseña
					await usuarios.create(req.body)
					res.send("usuario registrado")
				}else{
					res.send("no coinciden las contraseñas")
				}
			}
		}
	} catch (error) {
		if(error instanceof z.ZodError){
			throw res.send(error.issues[0].message)
		}else{
			console.log(error)
		}
	}
})


router.delete('/borrarUsuario',async (req,res)=>{
	const usuario = await usuarios.findOne({where:{nombreDeUsuario: `${req.body.nombreDeUsuario}`}, raw: true, attributes: ['nombreDeUsuario', 'contraseña', 'id']}) 
	if(usuario === null){
		throw res.send("el usuario no existe")
	}
	const coincidencia = await bcrypt.compare(`${req.body.contraseña}`, `${usuario.contraseña}`) 
	if(!coincidencia){
		res.send("contraseña incorrecta")
	}
	else{
		res.send("usuario borrado")
		await usuarios.destroy({where:{id:`${usuario.id}`}})
	}
})

router.put('/cambiarNombreDeUsuario', async (req, res)=>{
	try {
		await cambiarNombreDeUsuarioSchema.parse(req.body)
	} catch (error) {
		if(error instanceof z.ZodError){
			throw res.send(error.issues[0].message)
		}
	}
	const viejoNombreDeUsuarioYContraseña = await usuarios.findOne({where: {nombreDeUsuario:`${req.body.nombreDeUsuario}`}, attributes:['nombreDeUsuario', 'contraseña','id'], raw: true})

	if(viejoNombreDeUsuarioYContraseña === null){
		throw res.send("nombre de usuario inexistente")
	}
	const compararContraseñas = await bcrypt.compare(`${req.body.contraseña}`, `${viejoNombreDeUsuarioYContraseña.contraseña}`)
	if(!compararContraseñas){
		throw res.send("contraseña incorrecta")
	}else{
		await usuarios.update(
			{nombreDeUsuario:`${req.body.nuevoNombreDeUsuario}`},
			{where: {nombreDeUsuario: `${req.body.nombreDeUsuario}`}}
		)
		res.send("nombre de usuario actualizado")
	}
}
)

export default router

