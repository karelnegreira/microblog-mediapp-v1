import { useCallback, useState } from "react";

import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import usePosts from "@/hooks/usePosts";
import useRegisterModal from "@/hooks/useRegisterModal";
import toast from "react-hot-toast";
import axios from "axios";
import Button from "./Button";
import Avatar from "./Avatar";


interface FormProps {
    placeholder: string;
    isComment: boolean;
    postId: string;
}

const Form: React.FC<FormProps> = ({placeholder, isComment, postId}) => {

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const {data: currentUser} = useCurrentUser();
    const {mutate: mutatePosts} = usePosts(postId as string);

    const [body, setBody] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);
            await axios.post('/api/posts', { body });
            toast.success('Tweet Created');

            setBody('');
            mutatePosts();
            
        } catch (error) {
            toast.error("Uh oh something went wrong")
        } finally {
            setIsLoading(false);
        }
    }, [body, mutatePosts])

  return (
    <div className="border-p-[1px] border-neutral-800 px-5 py-2">
        {currentUser ?
            ( <div className="flex flex-row gap-4">
                    <div>
                        <Avatar userId={currentUser?.id} />
                    </div>
                    <div className="w-full">
                        <textarea 
                            disabled={isLoading} 
                            onChange={(e) => setBody(e.target.value)} 
                            
                        >

                        </textarea>
                    </div>
            </div>) : ( 
        <div className="py-8">
            
            <h1 className="text-white text-2xl text-center mb-4 font-bold">Let's Spread</h1>
            <div className="flex flex-row items-center justify-center gap-6">
                <Button label="Login  " onClick={loginModal.onOpen} />
                <Button label="Register" onClick={registerModal.onOpen} secundary />
            </div>
        </div>
        )}
    </div>
  )
}

export default Form