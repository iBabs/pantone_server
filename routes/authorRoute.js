import {Router} from 'express';
import { getProfile, login, signup } from '../controllers/authorController.js';
import authenticate from '../middleware/authenticate.js';

const AuthRouter = Router();

AuthRouter.post('/signup', signup);
AuthRouter.post('/login', login );
AuthRouter.get('/profile', authenticate,getProfile);

export default AuthRouter;