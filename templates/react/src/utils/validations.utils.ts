import {number, string} from 'yup'

export const ValidationsForm = {
    reqWithSizeMinMax: (min: number, max: number) => string().required('Es requerido').min(min, `Minimo caracteres ${min}`).max(max, `Maximo caracteres ${max}`),
    reqWithSizeMin: (size: number) => string().required('Es requerido').min(size, `Minimo caracteres ${size}`),
    reqWithSizeMax: (size: number) => string().required('Es requerido').max(size, `Maximo caracteres ${size}`),
    reqNumberMinMax: (min: number, max: number) => number().required('Es requerido').min(min, `Minimo ${min}`).max(max, `Maximo ${max}`),
    reqNumberMin: (size: number) => number().required('Es requerido').min(size, `Minimo ${size}`),
    reqNumberMax: (size: number) => number().required('Es requerido').max(size, `Maximo ${size}`),
    withSizeMinMax: (min: number, max: number) => string().min(min, `Minimo caracteres ${min}`).max(max, `Maximo caracteres ${max}`),
    withSizeMin: (size: number) => string().min(size, `Minimo caracteres ${size}`),
    withSizeMax: (size: number) => string().max(size, `Maximo caracteres ${size}`),
    numberMinMax: (min: number, max: number) => number().min(min, `Minimo ${min}`).max(max, `Maximo ${max}`),
    numberMin: (size: number) => number().min(size, `Minimo ${size}`),
    numberMax: (size: number) => number().max(size, `Maximo ${size}`),
    reqNumber: () => number().required('Es requerido'),
    reqEmail: () => string().required('Es requerido').email("no es un formato valido"),
    reqNoSpaces: () => string().required('Es requerido').matches(/^[ s]+|[ s]+$/, "Sin espacios"),
    noSpaces: () => string().matches(/^[ s]+|[ s]+$/, "Sin espacios"),
    email: () => string().email(),
    req: () => string().required('Es requerido'),
    reqColorHex: () => string().required('Es requerido').matches(/#([a-fA-F]|[0-9]){3, 6}/, "No es formato hexadeciamal"),
    colorHex: () => string().matches(/#([a-fA-F]|[0-9]){3, 6}/, "No es formato hexadeciamal"),
};
