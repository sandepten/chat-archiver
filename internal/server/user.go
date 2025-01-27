package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type UserPayload struct {
	UserID string `json:"user_id" binding:"required"`
}

func (s *Server) CreateUserHandler(c *gin.Context) {
	var payload UserPayload
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	// create user
	err := s.db.AddUser(payload.UserID)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	resp := make(map[string]string)
	resp["message"] = "User created successfully"
	c.JSON(http.StatusOK, resp)
}
