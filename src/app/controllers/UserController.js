import * as Yup from 'yup'
import { v4 } from 'uuid';
import User from '../models/User.js';

class UserController {
    async store(request, response) {

        const schema = Yup.object({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password_hash: Yup.string().min(8).required(),
            admin: Yup.boolean()
        });

        try {
            schema.validateSync(request.body, { abortEarly: false, strict: true });
        } catch (err) {
            return response.status(400).json({ error: err.errors});
        }
        
        const { name, email, password_hash, admin } = request.body;

        const existinUser = await User.findOne(
            {
                where: {
                    email
                }
            }
        );

        if (existinUser) {
            return response.status(400).json({ message: 'Este e-mail já está cadastrrado!' });
        }
        const user = await User.create({
            id: v4(),
            name,
            email,
            password_hash,
            admin
        });

        return response.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin
        });
    }
}

export default new UserController();