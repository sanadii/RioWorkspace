import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
    const history = useNavigate();
    //state data
    const [isDashboard, setIsDashboard] = useState(false);
    const [isApps, setIsApps] = useState(false);

    // Apps
    const [isFinance, setIsFinance] = useState(false);
    const [iscurrentState, setIscurrentState] = useState('Finance');

    function updateIconSidebar(e : any) {
        if (e && e.target && e.target.getAttribute("sub-items")) {
            const ul : any = document.getElementById("two-column-menu");
            const iconItems : any = ul.querySelectorAll(".nav-icon.active");
            let activeIconItems = [...iconItems];
            activeIconItems.forEach((item) => {
                item.classList.remove("active");
                var id = item.getAttribute("sub-items");
                const getID = document.getElementById(id) as HTMLElement
                if (getID)
                    getID.classList.remove("show");
            });
        }
    }

    useEffect(() => {
        document.body.classList.remove('twocolumn-panel');
        if (iscurrentState !== 'Finance') {
            setIsFinance(false);
        }
        if (iscurrentState !== 'Dashboard') {
            setIsDashboard(false);
        }
        if (iscurrentState !== 'Apps') {
            setIsApps(false);
        }
    }, [
        history,
        iscurrentState,
        isDashboard,
        isFinance,
        isApps,
    ]);

    const menuItems : any = [
        {
            label: "Finance",
            isHeader: true,
        },
        {
            id: "finance",
            label: "Finance",
            icon: "ri-dashboard-2-line",
            link: "/#",
            stateVariables: isFinance,
            click: function (e : any) {
                e.preventDefault();
                setIsFinance(!isFinance);
                setIscurrentState('Finance');
                updateIconSidebar(e);
            },
            subItems: [
                {
                    id: "revenues",
                    label: "Revenues",
                    link: "/revenues",
                    parentId: "finance",
                },
                {
                    id: "expenses",
                    label: "Expenses",
                    link: "/expenses",
                    parentId: "finance",
                },
            ],
        },

    ];
    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;