// Utility/Helpers/useEditorSetupHooks.ts
import { useState } from 'react';
import { Link, ListFilter, DiamondPlus, Filter } from 'lucide-react';

const useEditorSetupHooks = () => {
    const [steps, setSteps] = useState([
        { icon: <Link />, title: "Generate", description: "Generate New URL", type:"generate" },
        { icon: <ListFilter />, title: "Filter", description: "Filter conditions", type:"filter" },
        { icon: <DiamondPlus />, title: "LeadConnector", description: "Add Task", type:"leadConnector" }
    ]);

    const addStep = (index: number) => {
        const newStep = { icon: <Filter />, title: "New Step", description: "New Action", type:"generate" };
        const updatedSteps = [...steps];
        updatedSteps.splice(index + 1, 0, newStep);
        setSteps(updatedSteps);
    };

    return { steps, addStep };
};

export default useEditorSetupHooks;
