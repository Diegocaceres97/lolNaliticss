import { Dispatch, SetStateAction, createContext, useState } from 'react';
import { ChampsLOL } from '../../models/interfaces/champs.interface';

export const Contexto = createContext({ data: null, setData: ((value: Dispatch<SetStateAction<ChampsLOL>>): void => {}) as Dispatch<SetStateAction<ChampsLOL>> });

export const DatosProvider = ({children}) => {

    console.log(children)
    const [data, setData] = useState<ChampsLOL>({ champPrincipal: [], champEnemies: [] }); 
    
    console.log(data)

	return (
		<Contexto.Provider value={{data, setData}}>{children}</Contexto.Provider>
	);
};