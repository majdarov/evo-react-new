import { Group } from '../../../redux/commoditySlice';

export interface TreeNode extends Group {
  childs?: TreeNode[];
}

export interface TreeProps {
  rootLabel: string;
  treeLabel: string;
  pId: string;
  data: TreeNode[];
  callback: Function | null;
  viewEdit: boolean;
}

export type Callback = (id: string, tagName: string, className: string) => void;
