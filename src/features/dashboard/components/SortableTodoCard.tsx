import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import TodoCard from "./TodoCard"; // 네가 올려준 그 컴포넌트

type SortableTodoCardProps = React.ComponentProps<typeof TodoCard> & { id: string };

export default function SortableTodoCard(props: SortableTodoCardProps) {
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
            <TodoCard
                id
                {...cardProps}
                // ↓↓↓ 핸들에 바인딩 할 수 있도록 props를 내려준다
                renderHandle={({ className }) => (
                    <img
                        src="/icons/ic-drag-handle.svg"
                        alt="드래그"
                        className={className + " cursor-grab active:cursor-grabbing touch-none select-none"}
                        {...attributes}
                        {...listeners}
                    />
                )}
            />
        </div>
    );
}
