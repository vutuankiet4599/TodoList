package main

import (
	"TodoList/src/routes"
	"fmt"
	"net/http"
)

func main() {
	// http.Handle("/", http.FileServer(http.Dir("./template")));
	routes.InitAPIRoutes();
	fmt.Println("Server is running on port 8080");
	http.ListenAndServe(":8080", nil);
}