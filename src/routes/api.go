package routes

import (
	"TodoList/src/controllers"
	"net/http"

	"github.com/gorilla/mux"
)

func InitAPIRoutes() {
	r := mux.NewRouter();
	r.HandleFunc("/api/todo", controllers.GetAllTodo);

	http.Handle("/", r);
}