export interface RoomReservation {
  id: number;
  roomId: number;
  startDate: string;
  endDate: string;
  userId: number;
  additionalPreferences: string[];
}

