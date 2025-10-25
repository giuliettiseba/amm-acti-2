export interface Room {
    id: number;
    name: string;
    capacity: "1" | "2-4" | "5-8" | "9+";
    planta: number;
    precio: number;
    image: string;
}

