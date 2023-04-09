
import { Notification } from 'src/typeorm/entities/Notification';

export const eventToNotification = (body: any, id: any, subject: string): Notification => {
    
  let notification = new Notification();
  notification.payload = body;
  notification.subject = subject;
  notification.reservation = id;
  return notification;
};
