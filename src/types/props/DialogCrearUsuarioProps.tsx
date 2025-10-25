import type {User} from "../index.ts";

export interface DialogCrearUsuarioProps {
    open: boolean;
    onClose: () => void;
    onSuccess?: (user: User) => void;
}