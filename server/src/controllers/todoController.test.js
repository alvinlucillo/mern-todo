const { getAllTodosByUser } = require("../controllers/todoController");
const mockData = require("../mocks/data");

describe("getAllTodosByUser", () => {
  it("should call getAllTodosByUser", () => {
    const mockGetAllTodosByUser = jest.fn(() => {
      return mockData.todos;
    });
    const mockJson = jest.fn();
    const mockNext = jest.fn();

    const mockRepo = {
      findTodosByUserId: mockGetAllTodosByUser,
    };

    const getAllTodosByUserHandler = getAllTodosByUser(mockRepo);

    getAllTodosByUserHandler({ user: { id: 1 } }, { json: mockJson }, mockNext);

    expect(mockGetAllTodosByUser).toBeCalledTimes(1);
  });

  it("should return one item", () => {
    const userId = "1";
    const todo = mockData.todos.filter((todo) => todo.owner === userId);

    const mockGetAllTodosByUser = jest.fn((id) => {
      return mockData.todos.filter((todo) => todo.owner === id);
    });
    const mockJson = jest.fn();
    const mockNext = jest.fn();

    const mockRepo = {
      findTodosByUserId: mockGetAllTodosByUser,
    };

    const getAllTodosByUserHandler = getAllTodosByUser(mockRepo);

    getAllTodosByUserHandler(
      { user: { id: userId } },
      { json: mockJson },
      mockNext
    );

    expect(mockGetAllTodosByUser).toBeCalledTimes(1);
    expect(mockGetAllTodosByUser.mock.results[0].value.length).toEqual(1);
    expect(mockGetAllTodosByUser.mock.results[0].value).toEqual(todo);
  });

  it("should return nothing", () => {
    const userId = "3";

    const mockGetAllTodosByUser = jest.fn((id) => {
      return mockData.todos.filter((todo) => todo.owner === id);
    });
    const mockJson = jest.fn();
    const mockNext = jest.fn();

    const mockRepo = {
      findTodosByUserId: mockGetAllTodosByUser,
    };

    const getAllTodosByUserHandler = getAllTodosByUser(mockRepo);

    getAllTodosByUserHandler(
      { user: { id: userId } },
      { json: mockJson },
      mockNext
    );

    expect(mockGetAllTodosByUser.mock.results[0].value.length).toEqual(0);
  });
});
