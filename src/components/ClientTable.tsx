import type { Client } from "../types/client";

interface Props {
  clients: Client[];
}

export default function ClientTable({ clients }: Props) {
  return (
    <table className="min-w-full mt-4 border text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2">Client ID</th>
          <th className="px-4 py-2">Client Name</th>
          <th className="px-4 py-2">Type</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2">Updated By</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((client) => (
          <tr key={client.id} className="border-t">
            <td className="px-4 py-2 text-blue-600">{client.id}</td>
            <td className="px-4 py-2">{client.name}</td>
            <td className="px-4 py-2">{client.type}</td>
            <td className="px-4 py-2">{client.email}</td>
            <td className="px-4 py-2">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2" />
              {client.status}
            </td>
            <td className="px-4 py-2">hello world</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}