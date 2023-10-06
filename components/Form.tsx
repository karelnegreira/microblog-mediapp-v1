import { useCallback, useState } from "react";

import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import usePosts from "@/hooks/usePosts";
import useRegisterModal from "@/hooks/useRegisterModal";
import toast from "react-hot-toast";
import axios from "axios";


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
    <div></div>
  )
}

export default Form