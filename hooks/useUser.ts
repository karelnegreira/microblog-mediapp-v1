import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

/*it fetches data and stored in its record it checks to see if data should be fetched or not */
const useUser = (userId: string) => {
    const {data, 
           error, 
           isLoading, 
           mutate} = useSWR(userId ? `/api/users/${userId}` : null, fetcher);

    return {
        data, 
        error, 
        isLoading, 
        mutate
    }
};

export default useUser;
