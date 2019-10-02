import { ActivityLog } from './activityLog';

export class Exercise {
    _id: string;
    name: string;
    description: string;
    set: number;
    reps: string;
    activityLogs: ActivityLog[];
}