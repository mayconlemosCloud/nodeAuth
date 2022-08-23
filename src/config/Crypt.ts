import bcrypt from 'bcryptjs';

export const GeneratePassword = (password:string)=>
{
    return bcrypt.hash(password,10)
}

export const ComparePassword = (password:string,hash:string)=>
{
    return bcrypt.compare(password,hash)
}
