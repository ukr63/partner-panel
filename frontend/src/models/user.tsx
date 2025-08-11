import axios from 'axios';

class UserModel
{
    static login(email: any, password: any, req?: any) {
        return axios.post('/api/proxy/auth/login', {email, password}, req);
    }
}

export default UserModel;