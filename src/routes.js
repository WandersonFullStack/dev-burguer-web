import { Router } from "express";

import UserController from "./app/controllers/UserController.js";
import SessionController from "./app/controllers/SessionController.js";
import ProductController from "./app/controllers/ProductController.js";
import multer from "multer";
import multerConfig from './config/multer.cjs'
import authMidlleware from "./midllewares/auth.js";
import CategoryController from "./app/controllers/CategoryController.js";
import adminMidlleware from "./midllewares/authAdmin.js";

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

routes.use(authMidlleware);
routes.post('/products', adminMidlleware, upload.single('file'), ProductController.store);
routes.put('/products/:id', adminMidlleware, upload.single('file'), ProductController.update);
routes.get('/products', ProductController.index);

routes.post('/categories', adminMidlleware, CategoryController.store);
routes.get('/categories', CategoryController.index);

export default routes;