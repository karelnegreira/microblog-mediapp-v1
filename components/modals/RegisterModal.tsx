import React, {useCallback, useState } from 'react'
import useLoginModal  from '../../hooks/useLoginModal'
import Input from '../Input';
import Model from '../Model';
import useRegisterModal from '@/hooks/useRegisterModal';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';

const RegisterModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [name, setName] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onToggle = useCallback(() => {
        if (isLoading) {
            return;
        }
        registerModal.onClose();
        loginModal.onOpen();
    }, [isLoading, registerModal, loginModal]); 

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            await axios.post("/api/register", {
                email, 
                password, 
                username, 
                name
            })

            toast.success('Account created successfully! Lets Spread now...')

            signIn('credentials', {
                email, 
                password, 
            });

            registerModal.onClose()
        } catch (error) {
            console.log(error)
            toast.error('Oh uh, something went wrong :( ')
        } finally {
            setIsLoading(false);
        }
    }, [registerModal, email, password, username, name])

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
                type="password"
                onChange={(e) => setPassword(e.target.value) }
                value={password}
                disabled={isLoading}
            />
        </div>
    )

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p> Already have an account?
                <span onClick={onToggle} className="text-white cursor-pointer hover: underline">
                    Sign in
                </span>
            </p>
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
        footer={footerContent}
    />
  );
}

export default RegisterModal