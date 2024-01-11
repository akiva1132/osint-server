import cron from 'node-cron';
import { reductionPriorityInDB } from './dal';




export const reductionPriority = () => {
    cron.schedule('0 12 * * *', () => {
        console.log("reduction priority in progress");
        reductionPriorityInDB();
    });
    
    
    cron.schedule('0 0 * * *', () => {
        console.log("reduction priority in progress");
        reductionPriorityInDB(); 
    });
}