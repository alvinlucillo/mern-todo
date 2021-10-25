import React from "react";
import renderer from "react-test-renderer";
import TodoItem from "./TodoItem";
import mockData from "../mocks/data";

describe("TodoItem", () => {
  it("should run successfully", () => {
    const todo = mockData.todos[0];
    const [onEditMode, onSave, onDelete, onCheck] = Array(4).fill(jest.fn());
    const tree = renderer
      .create(
        <TodoItem
          todo={todo}
          onEditMode={onEditMode}
          onSave={onSave}
          onDelete={onDelete}
          onCheck={onCheck}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
