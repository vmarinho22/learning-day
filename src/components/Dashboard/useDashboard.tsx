import { ReactElement, useRef, useState } from "react";
import { FaHome, FaUsers } from "react-icons/fa";

type Menu = {
    title: string;
    icon: ReactElement<any, any>;
    path: string;
}

const useDashboard = () => {
    const [open, setOpen] = useState(true);
    const ref = useRef();

    const Menus: Menu[] = [
        {title: 'Home', icon: <FaHome className="text-2xl"/>, path: '/'},
        {title: 'Users', icon: <FaUsers className="text-2xl" />, path: '/users'},
    ];

    return {
        open,
        setOpen,
        Menus,
        ref
    }
}

export default useDashboard;