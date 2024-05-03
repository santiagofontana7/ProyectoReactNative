import { object, string, ref } from "yup"

export const isValidEmail = (emailInput) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    return regex.test(emailInput)
}

export const isAtLeastSixCharacters = (input) => {
    const regex = /.{6,}/
    return regex.test(input)
}

export const signupSchema = object().shape({
    confirmPassword: string()
        .oneOf([ref("password"), null], "Las contraseñas no coinciden")
        .required("La confirmación de la contraseña es requerida"),

    password: string()
        .required("La contraseña es requerida")
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
    email: string().required("El email es requerido").email("Formato de email inválido"),
})

export const signinSchema = object().shape({
    password: string()
        .required("La contraseña es requerida"),
    email: string().required("El email es requerido").email("Formato de email inválido"),
})