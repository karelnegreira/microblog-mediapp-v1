import React, {useCallback, useState } from 'react'
import useLoginModal  from '../../hooks/useLoginModal'
import Input from '../Input';
import Model from '../Model';
import useRegisterModal from '@/hooks/useRegisterModal';

const RegisterModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [name, setName] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            /*TODO register and login */

            registerModal.onClose()
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }, [registerModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input 
                placeholder="email"
                onChange={(e) => setEmail(e.target.value) }
                value={email}
                disabled={isLoading}
            />
            <Input 
                placeholder="name"
                onChange={(e) => setName(e.target.value) }
                value={name}
                disabled={isLoading}
            />
            <Input 
                placeholder="username"
                onChange={(e) => setUserName(e.target.value) }
                value={username}
                disabled={isLoading}
            />
            <Input 
                placeholder="password"
                onChange={(e) => setPassword(e.target.value) }
                value={password}
                disabled={isLoading}
            />
        </div>
    )

  return (
    <Model 
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title="Create an account"
        actionLabel="Register"
        onClose={registerModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
    />
  );
}

export default RegisterModal