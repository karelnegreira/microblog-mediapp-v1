import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import useEditModal from "@/hooks/userEditModal";
import Model from '../Model';
import Input from "../Input";



const EditModal = () => {
    const {data: currentUser} = useCurrentUser();
    const {mutate: mutateFetchedUser} = useUser(currentUser?.id);
    const editModal = useEditModal();

    const [profileImage, setProfileImage] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');

    useEffect(() => {
        setProfileImage(currentUser?.profileImage);
        setCoverImage(currentUser?.coverImage);
        setName(currentUser?.name);
        setUsername(currentUser?.username);
        setBio(currentUser?.bio);
    },  [currentUser?.name, 
         currentUser?.username,
         currentUser?.bio,
         currentUser?.profileImage,
         currentUser?.coverImage]);
    
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
          setIsLoading(true);
          await axios.patch('/api/edit', {
            name, 
            username, 
            bio, 
            profileImage, 
            coverImage
          });

          mutateFetchedUser();
          toast.success('Profile updated');
          editModal.onClose();  

        } catch (error) {
            toast.error('Oh uh something went wrong');
            console.log(error);
            
        } finally {
            setIsLoading(false);
        }
    }, [editModal, name, username, bio, mutateFetchedUser, profileImage, coverImage]);

    const bodyContent = (
        <div className="flex flex-col gap-4">

            <Input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={isLoading}
            />

            <Input
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                disabled={isLoading}
            />

            <Input
                placeholder="Bio"
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                disabled={isLoading}
            />

        </div>
    )

  return (
    <Model 
        disabled={isLoading}
        isOpen={editModal.isOpen}
        title="Edit your profile"
        actionLabel="Save"
        onClose={editModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
    />
  )
}

export default EditModal