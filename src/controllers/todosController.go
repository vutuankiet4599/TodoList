package controllers

import (
	"database/sql"
	"encoding/json"
	"io/ioutil"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

type TodoList struct {
	ID int `json:"id"`
	Content string `json:"content"`
}

type Todo struct {
	Content string
}

func GetAllTodo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json");
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

func PostTodo(w http.ResponseWriter, r *http.Request) {
	db, err := sql.Open("mysql", "root:@tcp(127.0.0.1:3306)/todo_list");
	if err != nil {
		panic(err.Error());
	}
	defer db.Close();

	stmt, err := db.Prepare("INSERT INTO todos(content) VALUES (?)");
	if err != nil {
		panic(err.Error());
	}
	defer stmt.Close();

	body, err := ioutil.ReadAll(r.Body);

	var content Todo;
	err = json.Unmarshal(body, &content);
	if err != nil {
		panic(err.Error());
	}

	_, err = stmt.Exec(content.Content);
	if err != nil {
		panic(err.Error());
	}

	json.NewEncoder(w).Encode(content.Content);

}

func PutTodo(w http.ResponseWriter, r *http.Request) {
	db, err := sql.Open("mysql", "root:@tcp(127.0.0.1:3306)/todo_list");
	if err != nil {
		panic(err.Error());
	}
	defer db.Close();

	stmt, err := db.Prepare("UPDATE todos SET content = ? WHERE id = ?");
	if err != nil {
		panic(err.Error());
	}
	defer stmt.Close();

	id := mux.Vars(r)["id"];
	body, err := ioutil.ReadAll(r.Body);
	var content Todo;
	err = json.Unmarshal(body, &content);
	if err != nil {
		panic(err.Error());
	}

	_, err = stmt.Exec(content.Content, id);

	if err != nil {
		panic(err.Error());
	}

	json.NewEncoder(w).Encode(content.Content);
}