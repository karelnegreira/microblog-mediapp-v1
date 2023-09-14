import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

/*it fetches data and stored in its record it checks to see if data should be fetched or not */
const useUsers = () => {
    const {data, error, isLoading, mutate} = useSWR('/api/users', fetcher);

    return {
        data, 
        error, 
        isLoading, 
        mutate
    }
};

export default useUsers;

