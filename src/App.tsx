import { useEffect, useState } from "react";
import { mockClients } from "./data/mockClients";
import type { Client } from "./types/client";
import ClientTable from "./components/ClientTable";
import SortPanel from "./components/SortPanel";

type SortableField = "id" | "name" | "createdAt" | "updatedAt";

type SortRule = {
  id: SortableField;
  direction: "asc" | "desc";
};

function App() {
  const [sortRules, setSortRules] = useState<SortRule[]>([
    { id: "name", direction: "asc" },
    { id: "createdAt", direction: "desc" },
  ]);
  const [sortedClients, setSortedClients] = useState<Client[]>([]);

  useEffect(() => {
    const sorted = [...mockClients].sort((a, b) => {
      for (let rule of sortRules) {
        const valA = a[rule.id];
        const valB = b[rule.id];

        let compareA = valA;
        let compareB = valB;

        if ((rule.id === "createdAt" || rule.id === "updatedAt") && typeof valA === "string" && typeof valB === "string") {
          compareA = new Date(valA).getTime();
          compareB = new Date(valB).getTime();
        }

        if (compareA < compareB) return rule.direction === "asc" ? -1 : 1;
        if (compareA > compareB) return rule.direction === "asc" ? 1 : -1;

      }
      return 0;
    });
    setSortedClients(sorted);
  }, [sortRules]);

  return (
    <div>
      <h1>Client Sorter</h1>
      <SortPanel sortRules={sortRules} setSortRules={setSortRules} />
      <ClientTable clients={sortedClients} />
    </div>
  );
}

export default App;
