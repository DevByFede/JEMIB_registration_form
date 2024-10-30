export const defaultUser = () => {
    return {
        name: "",
        lastname: "",
        email: "",
        password: ""
    }
}

export const defaultComplexityStatus = () => {
    return {
        "isLengthOkay": false,
        "hasLowerLetter": false,
        "hasUpperLetter": false,
        "hasDigit": false,
        "hasSpecialCharacter": false,
    }
}