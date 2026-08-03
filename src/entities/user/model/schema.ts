import { z } from 'zod';

export const emailSchema = z
  .string()
  .trim()
  .pipe(z.email({ message: 'Некорректный формат email' }));


export const passwordSchemaLogin = z.string();

const registerPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+=\-`~[\]{}|;':",./<>?]{6,25}$/;

export const passwordSchemaRegister = z.string().regex(registerPasswordRegex,{message: 'Пароль должен содержать цифры и буквы'})
  .min(6, { message: 'Пароль должен быть не менее 6 символов' })
    .max(25, { message: 'Пароль слишком длинный' });
  

