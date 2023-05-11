import { useTranslation } from "react-i18next";

import './footer.css';
import { fireMessage } from "../../components";

export const Footer = ()  => {

    const { t } = useTranslation();

    const steps =async() => {

        fireMessage({
            html: `
            <p>${t('nextStepsBody')}: <a Target="_blank" href="https://github.com/Diegocaceres97/lolNaliticss">Github repository</a></p>
            `,
            confirmButtonText: 'Okay 🫶🏻'
        })
    }

	return <p className="Footer" onClick={steps}>{t('nextSteps')}</p>
   
        
}
