import md5 from 'md5';

export const hashProductId = (id) => {
  return md5(id.toString());
};

export const decodeHash = (hash) => {
  return hash;
};
