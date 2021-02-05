
/*
 * @Author: wsx
 * @Date: 2021-02-04 19:08:10
 * @LastEditTime: 2021-02-04 19:29:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vite-react-ts/src/Icon/index.tsx
 */
import React from 'react';
import classNames from 'classnames';
import omit from 'omit.js'


export interface IconProps  {
    title?: string;
    type: string;
    onClick?: React.MouseEventHandler<any>,
    style?: React.CSSProperties;
    spin?: boolean;
    className?: string; 
}


const Icon = (props: IconProps) => {
    const { type, title, className, spin} = props;
    const classNameStr = classNames({
        anticon: true,
        'anticon-spin': !!spin || type === 'loading', // 是否加载动画
        [`anticon-${type}`]: true,

    }, className)
    return (
        <i {...omit(props,['spin', 'type'])} className={classNameStr} />
    )
}


export default Icon;


