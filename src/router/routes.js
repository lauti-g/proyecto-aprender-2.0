import routes from '../controllers/controllers.js'



routes.get('/', routes)
routes.get('/registrarse', routes)
routes.post('/registrarse', routes)
routes.get('/cambiarNombreDeUsuario', routes)
routes.get('/borrarUsuario', routes)
routes.delete('/borrarUsuario', routes)
routes.put('/cambiarNombreDeUsuario', routes)


export default routes