import routes from '../controllers/controllers.js'



routes.get('/', routes)
routes.get('/registration', routes)
routes.post('/registration', routes)
routes.get('/changeUsername', routes)
routes.get('/deleteUser', routes)
routes.delete('/deleteUser', routes)
routes.put('/changeUsername', routes)


export default routes