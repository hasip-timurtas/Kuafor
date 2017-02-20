import { SHA256 } from 'meteor/sha';

export const hashedPassword = (password) => {
  return { digest: SHA256( password ), algorithm: 'sha-256'};
};
