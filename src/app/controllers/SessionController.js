import * as Yup from 'yup';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth.js';

class SessionController {
    async store(request, response) {
        const schema = Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().min(8).required(),
        });

        const dataIncorrect = () => {
            return response.status(400).json({ error: 'E-mail or password incorrect' });
        }
        
        const isValid = await schema.isValid(request.body, { strict: true });
        
        if(!isValid) {
            dataIncorrect();
        }
        
        const { email, password } = request.body;

        const existinUser = await User.findOne(
            {
                where: {
                    email
                }
            }
        );

        if (!existinUser) {
            dataIncorrect();
        }
        
        const isPasswordCorrect = await bcrypt.compare(password, existinUser.password_hash);

        if (!isPasswordCorrect) {
            dataIncorrect();
        }

        const token = jwt.sign({id: existinUser.id}, authConfig.secret, {
            expiresIn: authConfig.expiresIn
        });

        return response.status(200).json({ 
            id: existinUser.id,
            name: existinUser.name,
            email: existinUser.email,
            admin: existinUser.admin,
            token,
         });
    }
}

export default new SessionController();