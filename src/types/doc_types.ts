export const docLifeCircle = ['InWork', 'Saved', 'Deleted'];
export type TDocLifeCircle = (typeof docLifeCircle)[number];

export const docTypes = ['invoice', 'write_downs'];
export type TDocTypes = (typeof docTypes)[number];

export const docPaymentStatus = [
  'not_payment',
  'partial_payment',
  'full_payment',
];
export type TDocPaymentStatus = (typeof docPaymentStatus)[number];
