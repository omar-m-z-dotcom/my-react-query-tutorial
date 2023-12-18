import axios from "axios";
import user from '../models/user';
import channel from '../models/channel';
import { useQuery } from "@tanstack/react-query";

const fetchUser = async (id: string) => {
    return axios.get<user>(`http://localhost:3000/users/${id}`).then((res) => res.data);
};

const fetchChannel = async (id?: string) => {
    return axios.get<channel>(`http://localhost:3000/channels/${id}`).then((res) => res.data);
};

const useDependantQueryData = (id: string) => {
    const { data: user, error: userError } = useQuery({
        queryKey: ["user", id],
        queryFn: () => fetchUser(id),
    });
    if (userError) {
        throw userError
    }
    const channelID = user?.channelId
    const { data: channel, error: channelError } = useQuery({
        queryKey: ["channel", channelID],
        queryFn: () => fetchChannel(channelID),
        enabled: !!channelID,
    })
    if (channelError) {
        throw channelError
    }
    return { user, channel };
}

export default useDependantQueryData;