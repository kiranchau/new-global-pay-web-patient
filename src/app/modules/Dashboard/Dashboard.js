import React, { useMemo } from "react";
import objectPath from "object-path";
import { useHtmlClassService } from "../../../_common/layout";
import { DashboardPage } from "./DashboardPage";


export function Dashboard(props) {
    const uiService = useHtmlClassService();
    const layoutProps = useMemo(() => {
        return {
            demo: objectPath.get(
                uiService.config,
                "demo"
            )
        };
    }, [uiService]);
    return <>
        {layoutProps.demo === 'demo1' && <DashboardPage {...props} />}
    </>;
}

