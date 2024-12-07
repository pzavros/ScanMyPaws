import md5 from 'md5';

// Simple hash function
export const hashProductId = (id) => {
  return md5(id.toString());
};

// Function to decode (if necessary)
export const decodeHash = (hash) => {
  // Logic to decode if needed
  return hash;
};
