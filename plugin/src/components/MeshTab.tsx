import * as React from 'react';
import {useHistory} from "react-router";
import {getKialiUrl, initKialiListeners, kioskUrl} from "../utils";

const kialiTypes = {
    services: 'services',
    pods: 'workloads',
    deployments: 'workloads',
    deploymentconfigs: 'workloads',
    statefulsets: 'workloads',
}

const MeshTab = () => {
    const [kialiUrl, setKialiUrl] = React.useState({
        baseUrl: '',
        token: '',
    });

    initKialiListeners();

    React.useEffect(() => {
        getKialiUrl()
            .then(ku => setKialiUrl(ku))
            .catch(e => console.error(e));
    });

    const history = useHistory();
    const path = history.location.pathname.substr(8);
    const items = path.split('/');
    const namespace = items[0];
    const type = kialiTypes[items[1]];
    let id = items[2];
    if (items[1] === 'pods') {
        // This parsing is not good, it's only done in the PoC context, it can take the parent from the Pod labels
        let marks = 0;
        let j = id.length;
        while (j > 0) {
            if (id.charAt(j) === '-') {
                marks++;
            }
            if (marks === 2) {
                break;
            }
            j--;
        }
        if (j > 0) {
            id = id.substr(0, j);
        }
    }

    let iFrameUrl = kialiUrl.baseUrl + '/console/namespaces/' + namespace + '/' + type + '/' + id + '?' + kioskUrl() + '&' + kialiUrl.token;
    // Projects is a special case that will forward the graph in the iframe
    if (items[1] === 'projects') {
        iFrameUrl = kialiUrl.baseUrl +  '/console/graph/namespaces?namespaces=' + id + '&' + kioskUrl() + '&' + kialiUrl.token;
    }
    // TODO Obviously, this iframe is a PoC
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

export default MeshTab;