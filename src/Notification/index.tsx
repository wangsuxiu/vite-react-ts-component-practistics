/*
 * @Author: wsx
 * @Date: 2021-02-07 14:38:40
 * @LastEditTime: 2021-02-07 16:21:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vite-react-ts/src/Notification/index.tsx
 */
import React from 'react'
import { NoticeProps } from './components/Notice/index';
import 'antd/es/notification/style/index.less'
import Notice from './components/Notice'

// 第一种方法，实例化一个Notification类来生成notice component
interface NotificationProps {
    maxCount?: number;
    closeIcon?: React.ReactNode;
}

let key = 1;
const increaseKey =  () => key++;



class Notification extends React.Component<NotificationProps, {
    notices: NoticeProps[]; 
}>{
   constructor(props: NotificationProps){
    super(props);
    this.state = {
        notices: []
    }
   }
   
   // 增加 notice
   addNotice = (notice: NoticeProps)=> {
      const noticeId = notice.noticeId = notice.noticeId || key

       
   }

   // 移除 notice
   removeNotice = ()=> {
       
   } 

   render() {
       const {notices} = this.state
       return <div className="notices">
        {notices.map((n: NoticeProps) => <Notice {...n} onClose={this.removeNotice}/>)}
       </div>
   }
}


// 第二种方法: 单例模式


export default Notification;


