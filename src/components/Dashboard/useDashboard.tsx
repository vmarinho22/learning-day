import { ReactElement, useEffect, useRef, useState } from "react";
import { FaHome, FaRegListAlt, FaUsers } from "react-icons/fa";

type Menu = {
    title: string;
    icon: ReactElement<any, any>;
    path: string;
}

const useDashboard = () => {
    const [open, setOpen] = useState(true);
    const ref = useRef();

    useEffect(() => {
        if(window.innerWidth <= 768) {
            setOpen(false);
        }
    }, []);

    const Menus: Menu[] = [
        {title: 'Home', icon: <FaHome className="text-2xl"/>, path: '/home'},
        {title: 'Usuários', icon: <FaUsers className="text-2xl" />, path: '/users'},
        {title: 'Treinamentos', icon: <FaRegListAlt className="text-2xl" />, path: '/trainings'},
    ];

    return {
        open,
        setOpen,
        Menus,
        ref
    }
}

export default useDashboard;