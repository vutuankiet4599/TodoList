package controllers

import (
	"database/sql"
	"encoding/json"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
)

type TodoList struct {
	ID int `json:"id"`
	Content string `json:"content"`
}

func GetAllTodo(w http.ResponseWriter, r *http.Request) {
	db, err := sql.Open("mysql", "root:@tcp(127.0.0.1:3306)/todo_list");
	if err != nil {
		panic(err.Error());
	}
	defer db.Close();

	result, err := db.Query("SELECT * FROM todos");
	if err != nil {
		panic(err.Error());
	}

	var todo_list = make([]TodoList, 0);
	for result.Next() {
		var todo TodoList;
		err = result.Scan(&todo.ID, &todo.Content);
		if err != nil {
			panic(err.Error());
		}

		todo_list = append(todo_list, todo);
	}
	json.NewEncoder(w).Encode(todo_list);
}