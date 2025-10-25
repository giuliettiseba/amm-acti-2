import type {GenericCardProps} from "./props/GenericCardProps.tsx";

export interface GenericCardState extends GenericCardProps {
    // …key value pairs for the internal state that you want to style the slot
    // but don't want to expose to the users
    otherValue?: string;
}