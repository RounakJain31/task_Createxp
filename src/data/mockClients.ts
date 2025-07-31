import type { Client } from "../types/client";

export const mockClients: Client[] = [
  {
    id: 1,
    name: "RJ ",
    email: "rj@email.com",
    type: "Individual",
    createdAt: "2025-07-20T08:30:00Z",
    updatedAt: "2025-07-01T10:00:00Z",
    status: "active",
  },
  {
    id: 2,
    name: "Test Test",
    email: "test@test.com",
    type: "Individual",
    createdAt: "2024-02-10T09:00:00Z",
    updatedAt: "2024-03-10T14:20:00Z",
    status: "active",
  },
  
  // Add more as needed
];
