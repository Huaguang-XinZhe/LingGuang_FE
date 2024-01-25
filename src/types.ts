/** @format */

import { ElScrollbar } from "element-plus";

export type ScrollIns = InstanceType<typeof ElScrollbar> | undefined;

export interface ListItem {
  id: number;
  content: string;
}

export interface Result {
  code: number;
  data: any;
  msg: string;
}
