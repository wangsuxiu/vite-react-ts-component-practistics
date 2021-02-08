/*
 * @Author: wsx
 * @Date: 2021-02-07 14:38:40
 * @LastEditTime: 2021-02-08 16:20:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vite-react-ts/src/Notification/index.tsx
 */
import React from 'react'
import { NoticeProps } from './components/Notice/index';
import 'antd/es/notification/style/index.less'
import Notice from './components/Notice'
import { update } from 'lodash';

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
      const { maxCount } = this.props;
      this.setState(p=> {
          const notices = p.notices
          const noticeIndex = notices.map(n=> n.noticeId).indexOf(noticeId)
          const updatedNotices = notices.concat()
          if(noticeIndex!==-1) {
            // 替换掉存在的那个notice
            updatedNotices.splice(noticeIndex, 1, notice)
          }else {
              if(maxCount && updatedNotices.length >= maxCount) {
                // 剔除第一个notice
                updatedNotices.shift()
              }

              notice.key = notice.noticeId
              updatedNotices.push(notice)
          }

          return {
              notices: updatedNotices,
          }

       }
      )
       
   }

   // 移除 notice
   removeNotice = (key: string)=> {
       this.setState(previousState => ({
           ...previousState,
           notices: previousState.notices.filter(f=> f.noticeId !== key),
       }))
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


