package main

import (
	"TodoList/src/routes"
	"fmt"
	"net/http"
)

func main() {
	routes.InitAPIRoutes();
	fmt.Println("Server is running on port 8080");
	http.ListenAndServe(":8080", nil);
}