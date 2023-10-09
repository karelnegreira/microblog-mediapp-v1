import React from 'react'
import useCurrentUser from './useCurrentUser'
import usePost from './usePost';

const useLike = ({postId, userId}: {postId: string, userId?: string }) => {
    const { data: currentUser } = useCurrentUser();
    const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId); 
}

export default useLike