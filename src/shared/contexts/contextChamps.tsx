import {
	Dispatch,
	SetStateAction,
	createContext,
	useState
} from 'react';
import { ChampsLOL } from '../../models/interfaces/champs.interface';

export const Contexto = createContext({
	data: null,
	setData: ((
		value: Dispatch<SetStateAction<ChampsLOL>>
	): void => {}) as Dispatch<SetStateAction<ChampsLOL>>,
});

export const DatosProvider = ({ children }) => {

	const [data, setData] = useState<ChampsLOL>({
		champPrincipal: [],
		champEnemies: [],
	});

	return (
		<Contexto.Provider value={{ data, setData }}>{children}</Contexto.Provider>
	);
};
