import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';
import friend from '../models/friend';

const fetchFriends = async () => {
    return axios.get<friend[]>(`http://localhost:3000/friends`).then(res => res.data)
}

const useFriendsData = () => {
    return useSuspenseQuery({
        queryKey: ['friends'],
        queryFn: fetchFriends,
    })
}
export default useFriendsData