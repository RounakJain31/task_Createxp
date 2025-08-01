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
