import { ClipLoader } from 'react-spinners';
import { useRouter } from 'next/router'


import Header from '@/components/Header';
import usePost from '@/hooks/usePost';
import PostItem from '@/components/posts/PostItem';
import Form from '@/components/Form';



const PostView = () => {
    const router = useRouter();
    const {postId} = router.query;

    const {data: fetchedPost, isLoading} = usePost(postId as string);

    if (isLoading || !fetchedPost) {
        return (
            <div className="flex justify-center items-center h-full">
                <ClipLoader color="red" size={80} />
            </div>
          )
    }
        
    return (
        <>
            <Header showBackArrow label="Spread"/>
            <PostItem data={fetchedPost} />
            <Form postId={postId as string} isComment placeholder="Spread it out" />
        </>
    );
}



export default PostView