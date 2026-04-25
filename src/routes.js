import { Router } from "express";

import UserController from "./app/controllers/UserController.js";
import SessionController from "./app/controllers/SessionController.js";
import ProductController from "./app/controllers/ProductController.js";
import multer from "multer";
import multerConfig from './config/multer.cjs'
import authMidlleware from "./app/midllewares/auth.js";
import CategoryController from "./app/controllers/CategoryController.js";
import adminMidlleware from "./app/midllewares/authAdmin.js";
import OrderContrller from "./app/controllers/OrderContrller.js";

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMidlleware);
routes.post('/products', adminMidlleware, upload.single('file'), ProductController.store);
routes.put('/products/:id', adminMidlleware, upload.single('file'), ProductController.update);
routes.get('/products', ProductController.index);

routes.post('/categories', adminMidlleware, upload.single('file'), CategoryController.store);
routes.put('/categories/:id', adminMidlleware, upload.single('file'), CategoryController.update);
routes.get('/categories', CategoryController.index);

routes.post('/orders', OrderContrller.store);
routes.get('/orders', OrderContrller.index);
routes.put('/orders/:id', adminMidlleware, OrderContrller.update);

export default routes;