import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type SortableField = "id" | "name" | "createdAt" | "updatedAt";

const SORT_FIELDS: { id: SortableField; label: string }[] = [
  { id: "name", label: "Client Name" },
  { id: "createdAt", label: "Created At" },
  { id: "updatedAt", label: "Updated At" },
  { id: "id", label: "Client ID" },
];

type SortRule = {
  id: SortableField;
  direction: "asc" | "desc";
};

interface Props {
  sortRules: SortRule[];
  setSortRules: React.Dispatch<React.SetStateAction<SortRule[]>>;
}

export default function SortPanel({ sortRules, setSortRules }: Props) {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = sortRules.findIndex((item) => item.id === active.id);
      const newIndex = sortRules.findIndex((item) => item.id === over.id);
      setSortRules((rules) => arrayMove(rules, oldIndex, newIndex));
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={sortRules.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <div>
          {sortRules.map((item) => (
            <SortableItem
              key={item.id}
              id={item.id}
              label={SORT_FIELDS.find((f) => f.id === item.id)?.label || item.id}
              direction={item.direction}
              onToggleDirection={() =>
                setSortRules((rules) =>
                  rules.map((r) =>
                    r.id === item.id
                      ? { ...r, direction: r.direction === "asc" ? "desc" : "asc" }
                      : r
                  )
                )
              }
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

function SortableItem({
  id,
  label,
  direction,
  onToggleDirection,
}: {
  id: string;
  label: string;
  direction: "asc" | "desc";
  onToggleDirection: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "8px",
    border: "1px solid #ccc",
    marginBottom: "4px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <span>{label}</span>
      <button onClick={onToggleDirection}>
        {direction === "asc" ? "↑" : "↓"}
      </button>
    </div>
  );
}


// import {
//   DndContext,
//   closestCenter,
//   useSensor,
//   useSensors,
//   PointerSensor,
// } from "@dnd-kit/core";
// import {
//   arrayMove,
//   SortableContext,
//   useSortable,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";

// type SortableField = "id" | "name" | "createdAt" | "updatedAt";

// const SORT_FIELDS: { id: SortableField; label: string }[] = [
//   { id: "name", label: "Client Name" },
//   { id: "createdAt", label: "Created At" },
//   { id: "updatedAt", label: "Updated At" },
//   { id: "id", label: "Client ID" },
// ];

// type SortRule = {
//   id: SortableField;
//   direction: "asc" | "desc";
// };

// interface Props {
//   sortRules: SortRule[];
//   setSortRules: React.Dispatch<React.SetStateAction<SortRule[]>>;
// }

// export default function SortPanel({ sortRules, setSortRules }: Props) {
//   const sensors = useSensors(useSensor(PointerSensor));

//   const handleDragEnd = (event: any) => {
//     const { active, over } = event;
//     if (active.id !== over?.id) {
//       const oldIndex = sortRules.findIndex((r) => r.id === active.id);
//       const newIndex = sortRules.findIndex((r) => r.id === over?.id);
//       setSortRules(arrayMove(sortRules, oldIndex, newIndex));
//     }
//   };

//   const toggleDirection = (id: SortableField) => {
//   console.log("Toggling direction for", id);
//   setSortRules((prev) =>
//     prev.map((r) =>
//       r.id === id ? { ...r, direction: r.direction === "asc" ? "desc" : "asc" } : r
//     )
//   );
// };


//   return (
//     <div className="border p-4 rounded bg-white w-full max-w-md mt-4 shadow">
//       <h2 className="font-semibold mb-2">Sort By</h2>
//       <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//         <SortableContext items={sortRules.map((r) => r.id)} strategy={verticalListSortingStrategy}>
//           {sortRules.map((rule) => {
//             const field = SORT_FIELDS.find((f) => f.id === rule.id);
//             return (
//               <SortableSortItem
//                 key={rule.id}
//                 id={rule.id}
//                 label={field?.label || rule.id}
//                 direction={rule.direction}
//                 toggleDirection={toggleDirection}
//               />
//             );
//           })}
//         </SortableContext>
//       </DndContext>
//       <button
//         className="mt-4 px-4 py-2 bg-black text-white rounded"
//         onClick={() => {
//           localStorage.setItem("sortRules", JSON.stringify(sortRules));
//         }}
//       >
//         Apply Sort
//       </button>
//     </div>
//   );
// }

// function SortableSortItem({
//   id,
//   label,
//   direction,
//   toggleDirection,
// }: {
//   id: SortableField;
//   label: string;
//   direction: "asc" | "desc";
//   toggleDirection: (id: SortableField) => void;
// }) {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       {...attributes}
//       {...listeners}
//       className="flex justify-between items-center border px-4 py-2 mb-2 rounded cursor-move bg-gray-50"
//     >
//       <span>{label}</span>
//       <button
//         onClick={() => toggleDirection(id)}
//         className="text-blue-600 font-semibold"
//       >
//         {direction === "asc" ? "↑ A-Z" : "↓ Z-A"}
//       </button>
//     </div>
//   );
// }
