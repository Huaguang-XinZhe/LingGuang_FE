/** @format */

import { ElScrollbar } from "element-plus";

export type ScrollIns = InstanceType<typeof ElScrollbar> | undefined;

export interface SampleInput {
  id: number;
  content: string;
}

export interface PagingQueryResponse {
  sampleInputs: SampleInput[]; // 这里用逗号也可以耶
  total: number;
}

export interface Result {
  code: number;
  data: any;
  msg: string;
}

export interface Tree {
  id: number;
  label: string;
  count?: number;
  children?: Tree[];
}
