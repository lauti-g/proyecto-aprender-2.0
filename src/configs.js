import express from 'express'
import path from 'path'
import 'ejs'
import { fileURLToPath } from 'url';
import routes from "./router/routes.js";


const config = express()
const dirname = path.dirname(fileURLToPath(import.meta.url))


//config.use(express.static(path.join(dirname, 'front', 'public')));
config.set('views', path.join(dirname, 'views'))
config.set('view engine', 'ejs')
config.use(express.json())
config.use(routes)


export default config
