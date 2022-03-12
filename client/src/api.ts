
type localStorageObjectType = {
  accesstoken: string;
  refreshToken: string;
  user: string;
};

type Res = {
  todos: Array<Todos>;
  tokens?: localStorageObjectType;
  user: string;
};

type Todos = {
  title: string;
  todo_id: string;
  completed: boolean;
};

class Api {
  constructor() { }

  getAccessToken(): localStorageObjectType {
    return JSON.parse(localStorage.getItem("token") || "fail");
  }

  async getDataFromDB(): Promise<Res> {
    const response = await fetch("http://localhost:3000/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.getAccessToken().accesstoken,
      },
    });

    return response.json();
  }

  async addNewItemDB(data: { title: string, todo_id: string, completed: boolean }): Promise<Todos> {
    console.log(data)
    const accesstoken = JSON.parse(localStorage.getItem("token") || "fail");
    const newData = JSON.stringify({ title: data.title, todo_id: data.todo_id, completed: data.completed });
    const response = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accesstoken.accesstoken,
      },
      body: newData,
    });

    return response.json();
  }

  async deleteItemFromDB(id: string): Promise<Todos> {
    const accesstoken = JSON.parse(localStorage.getItem("token") || "fail");
    const response = await fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: accesstoken.accesstoken,
      },
    });
    return response.json();
  }

  async changeCompletedStatusOfItemDB(data: {
    id: string;
    completed: string;
  }): Promise<Todos> {
    const accesstoken = JSON.parse(localStorage.getItem("token") || "fail");
    const response = await fetch(`http://localhost:3000/todos/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: accesstoken.accesstoken,
      },
      body: JSON.stringify({ completed: !data.completed }),
    });
    return response.json();
  }

  async checkAllTodosDB(completedStatus: boolean): Promise<void> {
    const accesstoken = JSON.parse(localStorage.getItem("token") || "fail");
    const response = await fetch(
      `http://localhost:3000/todos/check-all/${completedStatus}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: accesstoken.accesstoken,
        },
      }
    );
  }

  async deleteAllCheckedTodosDB(): Promise<void> {
    const accesstoken = JSON.parse(localStorage.getItem("token") || "fail");
    const response = await fetch(
      `http://localhost:3000/todos/delete-checked/all`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: accesstoken.accesstoken,
        },
      }
    );
  }
}

const api: any = new Api();

export default api;
