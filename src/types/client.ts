export interface Client {
  id: number;
  name: string;
  email: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  status: "active" | "inactive";
}
