import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

/*it fetches data and stored in its record it checks to see if data should be fetched or not */
const useCurrentUser = () => {
    const {data, error, isLoading, mutate} = useSWR('/api/current', fetcher);

    return {
        data, 
        error, 
        isLoading, 
        mutate
    }
};

export default useCurrentUser;

