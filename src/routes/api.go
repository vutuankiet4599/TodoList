package routes

import (
	"TodoList/src/controllers"
	"net/http"

	"github.com/gorilla/mux"
)

func InitAPIRoutes() {
	r := mux.NewRouter();
	r.HandleFunc("/api/todo", controllers.GetAllTodo).Methods("GET");
	r.HandleFunc("/api/todo", controllers.PostTodo).Methods("POST");
	r.HandleFunc("/api/todo/{id}", controllers.PutTodo).Methods("PUT");
	r.HandleFunc("/api/todo/{id}", controllers.DeleteTodo).Methods("DELETE");
	r.HandleFunc("/api/todo", controllers.DeleteAllTodo).Methods("DELETE");

	http.Handle("/", r);
}