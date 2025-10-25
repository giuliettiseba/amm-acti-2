import type {Room} from "../index.ts";

export interface RoomsState {
    data: Room[] | null;
    loading: boolean;
    error: string | null;
}