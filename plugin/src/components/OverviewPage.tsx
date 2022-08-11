import * as React from 'react';
import {getKialiUrl, initKialiListeners, kioskUrl} from "../utils";

const OverviewPage = () => {
    const [kialiUrl, setKialiUrl] = React.useState({
        baseUrl: '',
        token: '',
    });

    React.useEffect(() => {
        getKialiUrl()
            .then(ku => setKialiUrl(ku))
            .catch(e => console.error(e));
    });

    initKialiListeners();

    const iFrameUrl = kialiUrl.baseUrl + '/console/overview/?' + kioskUrl() + '&' + kialiUrl.token;
    return (
        <>
            <iframe
                src={iFrameUrl}
                style={{overflow: 'hidden', height: '100%', width: '100%' }}
                height="100%"
                width="100%"
            />
        </>
    );
};

export default OverviewPage;