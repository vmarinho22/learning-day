
import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Fab from '@mui/material/Fab';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";


const ActionsButton = (props : any) => {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleAddAction = () => {
        router.push(`${props.link}/create`);
    };

    const handleEditAction = () => {
        localStorage.setItem("editAction", props?.items);
        console.log('Edit Items', props?.items);
    };

    const handleDeleteAction = () => {
        localStorage.setItem("deleteAction", props?.items);
        console.log('Delete Items', props?.items);
    };

    return (
        <>
            <div className="fixed bottom-4 right-4">
                <Fab className="bg-gradient-to-r from-pr-purple to-pr-ocean hover:from-pr-ocean hover:to-pr-purple duration-500 origin-left text-white" aria-label="add" onClick={handleClickOpen}>
                    {props.children}
                </Fab>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Ações</DialogTitle>
                <DialogContent>
                    <List sx={{ pt: 0 }}>
                        <ListItem button onClick={handleAddAction}>
                            <ListItemAvatar>
                                <FaPlus />
                            </ListItemAvatar>
                            <ListItemText>
                                Adicionar
                            </ListItemText>
                        </ListItem>
                        <ListItem button onClick={handleEditAction}>
                            <ListItemAvatar>
                                <FaPen />
                            </ListItemAvatar>
                            <ListItemText>
                                Editar Selecionado(s)
                            </ListItemText>
                        </ListItem>
                        <ListItem button onClick={handleDeleteAction}>
                            <ListItemAvatar>
                                <FaTrash />
                            </ListItemAvatar>
                            <ListItemText>
                                Excluir Selecionado(s)
                            </ListItemText>
                        </ListItem>
                    </List>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default ActionsButton;