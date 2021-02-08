/*
 * @Author: wsx
 * @Date: 2021-02-07 17:09:49
 * @LastEditTime: 2021-02-08 15:35:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vite-react-ts/src/NotificationFactory/index.tsx
 */
import React from 'react'
import { NoticeProps } from '../Notification/components/Notice/index';
import Notification from '../Notification'
import {get} from 'lodash'
import ReactDOM from 'react-dom';

type placementType = 'right-top' | 'left-top' | 'right-bottom' | 'left-bottom' | 'center-top'
export interface NotificationOptions {
    message: React.ReactNode;
    description?: React.ReactNode;
    duration?: number | null;
    className?: string;
    style?: React.CSSProperties;
    top?: number;
    bottom?: number;
    onClose?(key: string): void;
    placement: placementType; 
}

type messageType = 'info' | 'error' | 'success' | 'warning'
interface MessageOptions extends NotificationOptions {
    type: messageType;
}

interface NotificationInstanceProps extends NotificationOptions {
    container: HTMLElement;
}


 
export interface NotificationInstanceCallbackReturn {
    notice: (notice: NoticeProps) => void;
    removeNotice: (key: string)=> void;
    destroy: () => void;
    component: Notification;
    container: HTMLElement;
}
 class NotificationFactory {
     notifications: {[key: string]: {notification: NotificationInstanceCallbackReturn, div: HTMLDivElement}}
     defaultPlacement = 'right-top'
     constructor(){
        this.notifications = {}
     }
     private genClassName = (placement: placementType) => `pb-notification-${placement}`
     private getContainer = (placement: placementType) => {
        if(get(this.notifications, [placement, 'div'], '')) {
            return this.notifications[placement].div
        }

        const container = document.createElement('div');
        container.className = this.genClassName(placement)
        return container;        
     }

     private genNotificationProps = (options: NotificationOptions) => {
         let props : any = {}
         const content = get(options, 'message', '')
         const duration = get(options, 'duration', null)
         const type = get(options, 'type', 'info')
         props.content = content;
         if(duration) props.duration = duration
         return props;
     }

     private genMessageProps = (options: MessageOptions) => {
         let props: any;
         const content = get(options, 'message', '')
         const duration = get(options, 'duration', 3000)
         const type = get(options, 'type', 'info')
         props.content = content;
         props.duration = duration;
         props.className = `pb-message pb-message-${type}`
         props.disableIcon = true;
         return props;
     }

     getNotificationInstance = (props: NotificationInstanceProps,callback: (n: NotificationInstanceCallbackReturn)=> void) => {
        const div = props.container || document.createElement('div');
        document.body.appendChild(div)
        let called = false;
        function ref(notification: Notification) {
            if(called) return 
            called = true;
            callback({
                notice: (noticeProps: NoticeProps) => notification.addNotice(noticeProps),
                removeNotice: (key: string) => notification.removeNotice(key),
                component: notification,
                destroy: ()=> {
                    ReactDOM.unmountComponentAtNode(div)
                    div.parentNode && div.parentNode.removeChild(div)
                },
                container: div,
            })

        }

        ReactDOM.render(<Notification {...props} ref={ref} />, div)
     }

     open = (options: NotificationOptions | MessageOptions, type: 'notice' | 'message') => {
         const placement = type === 'message' ? 'center-top' : get(options, 'placement', this.defaultPlacement) as placementType
         const currentNotification = get(this.notifications, [placement, 'notification'], null);
         if(currentNotification) {
            currentNotification.notice(
                type === 'message' ? this.genMessageProps(options as MessageOptions) : this.genNotificationProps(options)
            )
         }else {
            const div = this.getContainer(placement)
            this.getNotificationInstance({
                container: div,
                ...options,
            }, (n: NotificationInstanceCallbackReturn) => {
                this.notifications[placement] = {
                    notification: n,
                    div: n.container as HTMLDivElement,
                }

                n.notice(type === 'message' ? this.genMessageProps(options as MessageOptions) : this.genNotificationProps(options))
            })
         }
     }

     notice = (options: NotificationOptions) => {
        this.open(options, 'notice')
     }

     message = (options: MessageOptions) => {
        this.open(options, 'message')
     }  
 }

 export default NotificationFactory
