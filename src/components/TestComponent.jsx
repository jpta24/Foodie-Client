import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function TestComponent({ user }) {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: user.id });
  
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };
  
    return (
      <div
        style={style}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className="bg-white p-2 rounded  my-2 text-dark col-4 mx-auto"
      >
        <h1>{user.name}</h1>
      </div>
    );
  }
  

export default TestComponent