import axios from '@/lib/axios';

class StatisticsModel
{
    static login(email: any, password: any, req?: any) {
        return axios.post('/api/proxy/auth/login', {email, password}, req);
    }

    static getStatistics(req?: any) {
        return axios.get('/statistics/user', req);
    }

    static getStatisticsDashboard(req?: any) {
        return axios.get('/statistics/dashboard', req);
    }

    static getAllPromos(req?: any) {
        return axios.get('/promo/list', req);
    }

    static addPromo(promoName: string, req?: any) {
        return axios.post('/promo/add', {name: promoName}, req);
    }
}

export default StatisticsModel;