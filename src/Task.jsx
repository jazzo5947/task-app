import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 50%;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "white")};

  width: 40px;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  &:focus {
    outline: none;
    border-color: red;
  }
`;

export default function Task({ task, index }) {
  const id = task.id;
  // const isDragDisabled = task.id === "task-1";

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          {...provided.dragHandleProps}
        >
          {task.content[0]}
        </Container>
      )}
    </Draggable>
  );
}
