import React from 'react';
import { Button, notification, Space } from 'antd';

export const listToObject = (listItems: any[], key:string='id') => {
  const newObject:any = {}
  listItems.forEach(item => {
    if("is_deleted" in item && !item.is_deleted) {
      const keyValue = item[key];
      newObject[keyValue] = {...item, key: keyValue}
    }
  })
  return newObject
}

export const getFullSizeName = (size:string) => {
  if(size === 'M') {return "Medium"}
  if(size === 'S') {return "Small"}
  if(size === 'L') {return "Large"}
}

export const openNotificationWithIcon = (type:string, message:string, description:string="") => {
  (notification as any)[type]({
    message,
    description
  });
};