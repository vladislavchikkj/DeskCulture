import { useActions } from "@/hooks/useActions"
import { useAuth } from "@/hooks/useAuth"
import { IEmailPassword } from "@/store/user/user.interface"
import Meta from "@/ui/Meta"
import Button from "@/ui/button/button"
import { FC, useState } from "react"


const Auth: FC = () => {
	const { isLoading } = useAuth()
	const { login, register } = useActions()
	const { type, setType } = useState<'login' | 'register'>('login')
	const {register: formRegister, handleSubmit, formState, reset} = useForm<IEmailPassword>({
		mode: 'onChange',
	})
	const onSumbit:SubmitHandler<IEmailPassword> = (data) {
		if (type === 'login') {
			login(data)
		} else {
			register(data)
		}
		
		reset()
	}
	return (
		<Meta title='Auth'>

			<form onSubmit={handleSubmit(onSumbit)}>

			<Button variant='grey'>Register</Button>
			</form>
		</Meta>
	)
}

export default Auth
function useForm<T>(arg0: { mode: string }): { register: any; handleSubmit: any; formState: any; reset: any } {
	throw new Error('Function not implemented.')
}

