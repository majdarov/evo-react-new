const requestPaths = [
  'store_v2',
  'bulks_v1',
  'products_v2',
  'groups_v2',
  'get_schemes',
  'post_schemes',
  'documents_v2',
  'get_employees',
  'put_product_v2',
  'post_product_v2',
  'delete_product_v2',
  'put_group_v2',
  'post_group_v2',
  'delete_group_v2',
  'post_array_products_v2',
  'post_array_groups_v2',
  'put_array_products_v2',
  'put_array_groups_v2',
  'get_ofd_documents',
] as const;
export type RequestPath = (typeof requestPaths)[number];

export type ActionType = {
  type: RequestPath /* "documents_v2" */;
  docType?: string /* "SELL" */;
  period?: {
    dateStart: number /* 1726430400429 */;
    dateEnd: number /* 1726508738429 */;
  } | null;
  value?: string;
  storeUuid?: string;
  body?: any;
  cursor?: unknown;
  id?: string;
  employee_id?: string | null;
};
