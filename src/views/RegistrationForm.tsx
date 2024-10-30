import Input from "../components/Input.tsx";
import {FormEvent, useEffect, useState} from "react";
import {defaultComplexityStatus, defaultUser} from "../composition/defaultStructures.ts";
import toast, { Toaster } from 'react-hot-toast';

interface User {
    name: string,
    lastname: string,
    email: string,
    password: string,
}

interface ComplexityStatus {
    [isLengthOkay: string]: boolean,
    hasLowerLetter: boolean,
    hasUpperLetter: boolean,
    hasDigit: boolean,
    hasSpecialCharacter: boolean,
}

const RegistrationForm = () => {

    const [user, setUser] = useState<User>(defaultUser)
    const [complexityStatus, setComplexityStatus] = useState<ComplexityStatus>(defaultComplexityStatus)
    const [isLoadingComplexity, setIsLoadingComplexity] = useState<Boolean>(false)

    useEffect(() => {
        isComplex()
    }, [ user.password ]);

    const onChangeUserName = (value: string) => {
        setUser({...user, name: value})
    }

    const onChangeLastname = (value: string) => {
        setUser({...user, lastname: value})
    }

    const onChangeEmail = (value: string) => {
        setUser({...user, email: value})
    }

    const onChangePassword = (value: string) => {
        setUser({...user, password: value})
    }

    const isComplex = () => {
        setIsLoadingComplexity(true)

        const lowerLetter = /[a-z]/
        const upperLetter = /[A-Z]/
        const digit = /[0-9]/
        const special = /[!@#$%&*()_+=|<>?{}\[\]~-]/

        const hasLowerLetter = lowerLetter.test(user.password)
        const hasUpperLetter = upperLetter.test(user.password)
        const hasDigit = digit.test(user.password)
        const hasSpecialCharacter = special.test(user.password)

        setComplexityStatus({
            isLengthOkay: user.password.length > 5,
            hasLowerLetter: hasLowerLetter,
            hasUpperLetter: hasUpperLetter,
            hasDigit: hasDigit,
            hasSpecialCharacter: hasSpecialCharacter,
        })

        setIsLoadingComplexity(false)
    }

    const displayComplexityStatuses = () => {

        const getMessageToDisplayByProperty = (prop: string) => {
            switch (prop) {
                case "isLengthOkay":
                    return "contain at least 6 characters"

                case "hasLowerLetter":
                    return "contain at least 1 lower letter"

                case "hasUpperLetter":
                    return "contain at least 1 upper letter"

                case "hasDigit":
                    return "contain at least 1 number"

                case "hasSpecialCharacter":
                    return "contain at least 1 special character"

                default:
                    return "This message will never appear"
            }
        }

        const checkIconToDisplay = (key: string) => {
            if (user.password.length === 0) {
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="size-5 text-gray-600">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375
                              0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0
                              .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764
                              0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065
                              4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189
                              3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                    </svg>

                )
            }

            if (isLoadingComplexity) {
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         strokeWidth="1.5" stroke="currentColor" className="size-5 text-gray-600 animate-spin">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/>
                    </svg>
                )
            }

            if (complexityStatus[key]) {
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         strokeWidth="1.5" stroke="currentColor" className="size-5 text-green-600">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                )
            }

            return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        strokeWidth="1.5" stroke="currentColor" className="size-5 text-red-600">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>

        }

        return (
            <>
                <p className="text-xs text-gray-600"> The password: </p>
                <div className="text-sm text-gray-600 flex flex-col gap-2">
                    {
                        Object.keys(complexityStatus).map((key: string, idx: number) => {
                            return (
                                <span className="flex items-center gap-2">
                                {
                                    checkIconToDisplay(key)
                                }
                                    <div key={ idx } className="text-xs gray-600">
                                    { getMessageToDisplayByProperty(key) }
                                </div>
                            </span>
                            )
                        })
                    }
                </div>
            </>
        )
    }

    const registration = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const isComplexPassword = Object.keys(complexityStatus).some((key: string) => complexityStatus[key])

        if (isComplexPassword && user.name.length > 0 && user.lastname.length > 0 && user.email.length > 0)
        {
            toast.success('Registration completed!', {
                duration: 4000,
                position: 'top-center'
            });

            setUser(defaultUser)
        }
        else
        {
            toast.error('Compile all fields below to continue the registration!', {
                duration: 4000,
                position: 'top-center'
            });
            setUser(defaultUser)
        }
    }

    return (
        <>
            <div className="w-full p-10 flex items-center justify-center">
                <div className="sm:w-full lg:w-2/3 flex flex-col items-center justify-center
                                 p-8 bg-slate-900 border border-gray-700 rounded-md shadow-md">
                     <h1 className="relative z-50 py-2 text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                         JEMIB - II Section | Registration Form
                     </h1>
                     <h2 className="text-gray-600 text-lg pt-2">
                         Insert your personal information below
                     </h2>
                     <form className="pt-10 pb-5 flex flex-col items-center gap-8" onSubmit={(event: FormEvent<HTMLFormElement>) => registration(event)}>
                        <div className="flex gap-8">
                            <Input label="Name" type="text" name="name" placeholder="John" className="px-4 py-2 bg-gray-50" value={ user.name } onChangeCallback={ onChangeUserName } required={ true }/>
                            <Input label="Lastname" type="text" name="lastname" placeholder="Doe" className="px-4 py-2 bg-gray-50" value={ user.lastname } onChangeCallback={ onChangeLastname } required={ true }/>
                        </div>
                         <Input label="Email" type="email" name="email" placeholder="johndoe@example.com" className="px-4 py-2 bg-gray-50" value={ user.email } onChangeCallback={ onChangeEmail } required={ true }/>
                         <Input label="Password" type="password" name="password" placeholder="********" className="px-4 py-2 bg-gray-50" value={ user.password } onChangeCallback={ onChangePassword } required={ true }/>
                         <div className="w-full flex flex-col items-start gap-2">
                             { displayComplexityStatuses() }
                         </div>
                         <button type="submit" className="w-full mt-3 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md text-lg trandform hover:scale-105 trasnition duration-300"> Registration </button>
                     </form>
                    <Toaster />
                 </div>
             </div>
         </>
    )
}

export default RegistrationForm;