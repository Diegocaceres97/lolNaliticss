import { useTranslation } from "react-i18next";

import './footer.css';
import { fireMessage } from "../alerts/alert";

const Footer = ()  => {

    const { t } = useTranslation();

    const steps = () => {
        fireMessage({
            text: t('nextStepsBody'),
            confirmButtonText: 'Okay 🫶🏻'
        })
    }

	return <p className="Footer" onClick={steps}>{t('nextSteps')}</p>
   
        
}

export default Footer;
