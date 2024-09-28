import exoress from 'express';
import authController from '../controllers/auth-controller.js';
import validatorRegistrationMiddleware from '../middlewares/validatorRegistration-middleware.js';
import validatorLoginMiddleware from '../middlewares/validatorLogin-middleware.js';
const route = exoress.Router();
import multerMiddleware from '../middlewares/multer-middleware.js';
import authMiddleware from '../middlewares/auth-middleware.js';

route.post(
    '/registration',
    multerMiddleware.single('avatar'),
    validatorRegistrationMiddleware,
    authController.registration
);
route.post('/login', validatorLoginMiddleware, authController.login);
route.post('/logout', authController.logout);
route.get('/refresh', authController.refreshToken);

export default route;
