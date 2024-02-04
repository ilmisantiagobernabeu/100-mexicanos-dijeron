import { useState, useEffect, createContext, useContext } from "react";


const Datacontext = createContext();

export const useData = () => useContext(Datacontext);


export const Dataprovider = ({ children }) => {
    const [data, setData ] = useState(null);
    
    const [ loading, Setloading ] = useState(true);
    useEffect( () => {
        const fetchData = async () => {
            try{
                const response = await fetch('Answers.json');
                const data = await response.json();
                setData(data);
                Setloading(false)
                console.log('obtuvimos la data con exito')
            }
            catch(error){
                console.log('Failed triyng to fetch data');
                Setloading(false)
            }
        }
        
        if(!data && loading){
            fetchData();
        }
    },[data, loading]);
    
    return(
        <Datacontext.Provider value={{data, loading}}>
                { children }
        </Datacontext.Provider>
    );

}