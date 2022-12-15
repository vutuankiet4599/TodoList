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
	r.HandleFunc("/api/todo/{id}", controllers.PutTodo).Methods("PUT", "OPTIONS");
	r.HandleFunc("/api/todo/{id}", controllers.DeleteTodo).Methods("DELETE", "OPTIONS");
	r.HandleFunc("/api/todo", controllers.DeleteAllTodo).Methods("DELETE", "OPTIONS");
	r.Use(mux.CORSMethodMiddleware(r));

	http.Handle("/", r);
}