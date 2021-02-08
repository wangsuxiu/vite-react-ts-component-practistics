/*
 * @Author: wsx
 * @Date: 2021-02-07 14:48:43
 * @LastEditTime: 2021-02-08 16:16:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vite-react-ts/src/Notification/components/Notice/index.tsx
 */
import React from 'react'
import NodeJS from 'node';
import classNames from 'classnames';

export interface NoticeProps {
    onClose: (key: string | number) => void;
    duration?: number;
    content: React.ReactNode;
    disableIcon?: boolean;
    key?: string | number;
    noticeId?: string | number;
    className?: string;
    style?: React.CSSProperties;
}


class Notice extends React.Component<NoticeProps>{
    key: string | number;
    timer: NodeJS.Timeout | null;
    constructor(props: NoticeProps){
        super(props)
        this.key = this.props.noticeId!;
        this.timer = null;
    }
    componentDidMount(){
        const {duration, onClose} = this.props;
        if(duration) {
            setTimeout(()=> {
                onClose(this.key);
            }, duration)
        }
    }

    componentWillUnmount(){
        if(this.timer) {
            clearTimeout(this.timer as NodeJS.Timeout)
            this.timer = null
        }
    }

    onMouseEnter = (e: React.MouseEvent<HTMLDivElement>)=> {
        e.preventDefault();
        const {duration} = this.props
        if(this.timer || duration) {
            clearTimeout(this.timer)
            this.timer = null
        }
    }

    onMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        const {duration, onClose} = this.props;
        if(duration) {
            this.timer = setTimeout(()=> {
                onClose(this.key)
            }, duration)
        }
    }

    render() {
        const {className, onClose, content, disableIcon, style, noticeId} = this.props
        const classname = classNames('pb-notice', className);
        const closeIcon = disableIcon ? null : (<div className="notice-close-btn" onClick={()=> {
            onClose(this.key)
        }}>
            X
        </div>)
        return <div 
                id={noticeId as any} 
                className={classname} 
                onMouseEnter={this.onMouseEnter} 
                onMouseLeave={this.onMouseLeave}
                style={style}
                >
                    <div className="notice-content">{content}</div>
                    {closeIcon}
                </div>
    }
}


export default Notice;