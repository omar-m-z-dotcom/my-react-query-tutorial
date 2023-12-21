import { useSuspenseQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import superHero from '../models/superHero';

const fetchSuperheroes = async () => {
    return axios.get<superHero[]>(`http://localhost:3000/superheroes`).then(res => res.data)
}

const useSuperHerosData = () => {
    return useSuspenseQuery({
        queryKey: ['superHeroes'],
        queryFn: fetchSuperheroes,
    })
}
export default useSuperHerosData

const addSuperHero = async (hero: superHero) => {
    return axios.post<superHero>(`http://localhost:3000/superheroes`, hero)
}


export const useAddSuperHero = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: addSuperHero,
        /*
        onSuccess: (data: TData, variables: TVariables, context: TContext) => Promise<unknown> | unknown
        - Optional
        - This function will fire when the mutation is successful and will be passed the mutation's result.
        - If a promise is returned, it will be awaited and resolved before proceeding.
        */
        // onSuccess: (query) => {
        /*
        await queryClient.invalidateQueries({
        queryKey: ['posts'],
        exact,
        refetchType: 'active',
        }, { throwOnError, cancelRefetch })
        - filters?: QueryFilters: Query Filters
            - queryKey?: QueryKey: Query Keys
            - exact?: boolean use exact matching for the queryKey
            - refetchType?: 'active' | 'inactive' | 'all' | 'none'
                - Defaults to 'active'
                - When set to active, only queries that match the refetch predicate and are actively being rendered via useQuery and friends will be refetched in the background.
                - When set to inactive, only queries that match the refetch predicate and are NOT actively being rendered via useQuery and friends will be refetched in the background.
                - When set to all, all queries that match the refetch predicate will be refetched in the background.
                - When set to none, no queries will be refetched, and those that match the refetch predicate will be marked as invalid only.
        - options?: InvalidateOptions:
            - throwOnError?: boolean
                - When set to true, this method will throw if any of the query refetch tasks fail.
            - cancelRefetch?: boolean
                - Defaults to true
                    - Per default, a currently running request will be cancelled before a new request is made.
                - When set to false, no refetch will be made if there is already a request running
        */
        // queryClient.invalidateQueries({ queryKey: ['superHeroes'], })
        /*
        queryClient.setQueryData(queryKey, updater)
        - queryKey: QueryKey: Query Keys
        - updater: TQueryFnData | undefined | ((oldData: TQueryFnData | undefined) => TQueryFnData | undefined)
            - If non-function is passed, the data will be updated to this value
            - If a function is passed, it will receive the old data value and be expected to return a new one.
        */
        //     queryClient.setQueryData<superHero[]>(['superHeroes'], (oldData) => {
        //         console.log(query, oldData);

        //         if (oldData) {
        //             return [...oldData, query.data]
        //         }
        //     })
        // }
        /*
        onMutate: (variables: TVariables) => Promise<TContext | void> | TContext | void
            - Optional
            - This function will fire before the mutation function is fired and is passed the same variables the mutation function would receive
            - Useful to perform optimistic updates to a resource in hopes that the mutation succeeds
            - The value returned from this function will be passed to both the onError and onSettled functions in the event of a mutation failure and can be useful for rolling back optimistic updates.
        */
        onMutate(passedHero) {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            queryClient.cancelQueries({ queryKey: ['superHeroes'] })

            // Snapshot the previous value
            const previousHeros = queryClient.getQueryData<superHero[]>(['superHeroes'])

            // Optimistically update to the new value
            if (previousHeros) {
                queryClient.setQueryData<superHero[]>(['superHeroes'], [
                    ...previousHeros,
                    { ...passedHero, id: previousHeros.length + 1 },
                ])
            }

            // Return a context object with the snapshot of the previous value
            return { previousHeros }
        },
        /*
        onError: (err: TError, variables: TVariables, context?: TContext) => Promise<unknown> | unknown
            - Optional
            - This function will fire if the mutation encounters an error and will be passed the error.
            - If a promise is returned, it will be awaited and resolved before proceeding
        */
        onError(_error, _variables, context) {
            // Rollback to the previous value
            if (context?.previousHeros) {
                queryClient.setQueryData<superHero[]>(['superHeroes'], context.previousHeros)
            }
        },
        /*
        onSettled: (data: TData, error: TError, variables: TVariables, context?: TContext) => Promise<unknown> | unknown
            - Optional
            - This function will fire when the mutation is either successfully fetched or encounters an error and be passed either the data or error
            - If a promise is returned, it will be awaited and resolved before proceeding
        */
        onSettled() {
            // refetch the superHeros query to update the UI and make sure it's in sync with the server
            queryClient.invalidateQueries({ queryKey: ['superHeroes'] })
        },
    })
}