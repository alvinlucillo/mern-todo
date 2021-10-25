import React from "react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

import TodoItem from "./TodoItem";
import { toLocaleString } from "../utils/Utils";
import { mount } from "../mocks/testSetup";
import mockData from "../mocks/data";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

function renderTodoItem(args, storeState) {
  let store = mockStore(storeState);
  const defaultProps = {
    todo: {},
  };

  const props = { ...defaultProps, ...args };
  const wrapper = mount(
    <Provider store={store}>
      <TodoItem {...props} />
    </Provider>
  );

  return { store, props, wrapper };
}

describe("Todo Item", () => {
  it("should render todo details when there is one", () => {
    const initialState = {};
    const todo = mockData.todos[0];
    const { wrapper } = renderTodoItem({ todo }, initialState);
    const date = toLocaleString(todo.due);

    expect(wrapper.find(".todoItem__title").text()).toEqual(todo.title);
    expect(wrapper.find(".todoItem__due").text()).toEqual(date);
    expect(wrapper.find("input[type='checkbox']").props().checked).toEqual(
      false
    );
  });

  it("should render a checked todo when the status is completed", () => {
    const initialState = {};
    const todo = mockData.todos[1];
    const { wrapper } = renderTodoItem({ todo }, initialState);
    const date = toLocaleString(todo.due);

    expect(wrapper.find(".todoItem__title").text()).toEqual(todo.title);
    expect(wrapper.find(".todoItem__due").text()).toEqual(date);
    expect(wrapper.find("input[type='checkbox']").props().checked).toEqual(
      true
    );
  });

  it("should call onEditMode callback when a todo is edited with todo and true values", () => {
    const initialState = {};
    const todo = mockData.todos[1];
    const onEditMode = jest.fn();
    const { wrapper } = renderTodoItem({ todo, onEditMode }, initialState);

    const button = wrapper.find("button.todoItem__edit-button");

    button.simulate("click");

    expect(onEditMode.mock.calls.length).toEqual(1);
    expect(onEditMode.mock.calls[0][0]).toEqual(todo);
    expect(onEditMode.mock.calls[0][1]).toEqual(true);
  });
});
