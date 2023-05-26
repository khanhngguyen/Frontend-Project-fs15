import * as yup from 'yup'

const registrationSchema = yup.object({
    username: yup
        .string()
        .required('Username can not be empty!')
        .min(4, 'Username must have at least 4 characters')
        .max(20, 'Username can not exceed 20 characters'),
    email: yup
        .string()
        .email('Email should be valid and contain @')
        .required('Email can not be empty'),
    password: yup
        .string()
        .required('Password can not be empty')
        .min(6, 'Password must have at least 6 characters')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 'Password must contain at least 1 number, 1 lowercase & 1 uppercase letter'),
    confirm: yup
        .string()
        .required('Password can not be epmty')
        .oneOf([yup.ref('password')], 'Password does not match'),
    avatar: yup
        .string()
        .required('Avatar image is required')
})

export type RegistrationFormData = yup.InferType<typeof registrationSchema>;
export default registrationSchema;