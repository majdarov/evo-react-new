import { Group } from '../../../redux/commoditySlice';

export interface TreeNode extends Group {
  childs?: TreeNode[];
}

export interface TreeProps {
  rootLabel: string;
  treeLabel: string;
  pId: string;
  data: TreeNode[];
  callback: TreeCallback | null;
  viewEdit: boolean;
}

export type TreeCallback = (
  id: string,
  tagName?: string,
  className?: string,
) => void;
