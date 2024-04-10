import { genSaltSync, hashSync } from 'bcrypt-ts';

const encrypt = (data: string): string => {
    const salt = genSaltSync(10);
    return hashSync(data, salt);
};

export default encrypt;