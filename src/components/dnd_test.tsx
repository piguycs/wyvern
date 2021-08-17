import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function dnd_test() {
  const [list, setList] = useState<any[]>([
    { name: "persona", content: "hey!", tag: "1" },
    { name: "coolname", content: "hows life?", tag: "2" },
    { name: "dumnal", content: "HELLO!!", tag: "3" },
  ]);

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;

    const items = Array.from(list);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setList(items);
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="buttons">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {list!.map(({ name, content, tag }, index) => {
              return (
                <Draggable key={index} draggableId={index.toString()} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {name + ": " + content}
                    </li>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
