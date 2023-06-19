import { initialData } from "./initial-data";
import React from "react";
import "@atlaskit/css-reset";
import styled from "styled-components";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";

const Container = styled.div`
  display: flex;
`;

function App() {
  const [state, setState] = React.useState(initialData);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    setState({ ...state, homeIndex: null });

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);

      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      setState(newState);
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setState(newState);
  };

  const onDragStart = (start) => {
    console.log(start);
    const homeIndex = state.columnOrder.indexOf(start.source.droppableId);

    setState({ ...state, homeIndex: homeIndex });
  };

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <Container>
        {state.columnOrder.map((columnId, index) => {
          const column = state.columns[columnId];
          const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

          const isDropDisabled = index < state.homeIndex;

          return (
            <Column
              key={column.id}
              column={column}
              tasks={tasks}
              isDropDisabled={isDropDisabled}
            />
          );
        })}
      </Container>
    </DragDropContext>
  );
}

export default App;
