import { useState, Suspense } from 'react';
import useSuperHerosData from '../hooks/useSuperHerosData';
import RQSelectedSuperHerosResult from './RQSelectedSuperHerosResult';

const RQSuperHerosForm = () => {
    const [heroIDs, setHeroIDs] = useState<number[]>([]);
    // const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const heroID = parseInt(event.currentTarget.value);
    //     if (event.currentTarget.checked) {
    //         setHeroIDs((prevHeroIDs) => [...prevHeroIDs, heroID]);
    //     } else {
    //         setHeroIDs((prevHeroIDs) => prevHeroIDs.filter((id) => id !== heroID));
    //     }
    // };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const selectedHeroIDs = Array.from(formData.values()).map((value) => parseInt(value.toString()));
        // const selectedHeroIDs = Array.from(formData.keys()).map((key) => parseInt(formData.get(key)?.toString() as string));
        setHeroIDs(selectedHeroIDs);
        event.currentTarget.reset();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {useSuperHerosData().data.map((hero) => (
                    <div key={hero.id}>
                        <input
                            type="checkbox"
                            value={hero.id}
                            name={`hero-${hero.id}`}
                            id={`hero-${hero.id}`}
                        />
                        <label htmlFor={`hero-${hero.id}`}>{hero.name}</label>
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
            <Suspense fallback={<div>Loading...</div>}>
                {heroIDs.length > 0 ? <RQSelectedSuperHerosResult selectedSuperHeros={heroIDs} /> : null}
            </Suspense>
        </div>
        // <div>
        //     {useSuperHerosData().data.map((hero) => (
        //         <div key={hero.id}>
        //             <input
        //                 type="checkbox"
        //                 value={hero.id}
        //                 name='hero-name'
        //                 id={`hero-${hero.id}`}
        //                 checked={heroIDs.includes(hero.id)}
        //                 onChange={handleCheckboxChange}
        //             />
        //             <label htmlFor={`hero-${hero.id}`}>{hero.name}</label>
        //         </div>
        //     ))}
        //     <Suspense fallback={<div>Loading...</div>}>
        //         {heroIDs.length > 0 ? <RQSelectedSuperHerosResult selectedSuperHeros={heroIDs} /> : null}
        //     </Suspense>
        // </div>
    );
}
export default RQSuperHerosForm