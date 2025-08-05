import express from 'express'
import router from './router/routes.js'
import path from 'path'
import 'ejs'
import { fileURLToPath } from 'url';


const dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()


app.use(express.static(path.join(dirname, 'front', 'public')));
app.set('views', path.join(dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.json())



app.get('/', router)
app.get('/registration', router)
app.post('/registration', router)
app.get('/changeUsername', router)
app.get('/deleteUser', router)
app.delete('/deleteUser', router)
app.put('/changeUsername', router)


app.listen(3000)
console.log("server on port 3000")