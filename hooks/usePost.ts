import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

/*it fetches data and stored in its record it checks to see if data should be fetched or not */
const usePost = (postId: string) => {
    const url = postId ?  `/api/posts/${postId}`: null;

    const {data, error, isLoading, mutate} = useSWR(url, fetcher);

    return {
        data, 
        error, 
        isLoading, 
        mutate
    }
};

export default usePost;
