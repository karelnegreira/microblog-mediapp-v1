import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

/*it fetches data and stored in its record it checks to see if data should be fetched or not */
const usePosts = (userId?: string) => {
    const url = userId ?  `/api/posts?userId=${userId}`: '/api/posts';

    const {data, error, isLoading, mutate} = useSWR(url, fetcher);

    return {
        data, 
        error, 
        isLoading, 
        mutate
    }
};

export default usePosts;
