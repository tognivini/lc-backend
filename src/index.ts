import * as express from "express"
import * as bodyParser from "body-parser"
import * as connectionOptions from '../ormconfig';
import routes from "./routes"
import { createConnection } from 'typeorm';

createConnection();
const app = express()

app.use(bodyParser.json())
app.use(routes)

app.listen(3333)