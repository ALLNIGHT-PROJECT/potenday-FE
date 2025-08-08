import { useSortable, defaultAnimateLayoutChanges } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { CSSProperties } from "react";
import UpcomingTodoCard from "@/features/dashboard/components/UpcomingTodoCard";

type SortableUpcomingProps = React.ComponentProps<typeof UpcomingTodoCard> & {
    id: string;
};

export default function SortableUpcomingCard(props: SortableUpcomingProps) {
    const { id, ...cardProps } = props;
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });


    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0 : 1,
        boxShadow: isDragging ? "0 10px 24px rgba(0,0,0,0.15)" : undefined,
        borderRadius: 20,
    };

    return (
        <div ref={setNodeRef} style={style} className="w-full">
            <UpcomingTodoCard
                {...props}
                renderHandle={({ className }) => (
                    <img
                        src="/icons/ic-drag-handle.svg"
                        alt="드래그"
                        className={(className ?? "") + " cursor-grab active:cursor-grabbing touch-none select-none"}
                        {...attributes}
                        {...listeners}
                    />
                )}
            />
        </div>
    );
}
