package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type ChatPayload struct {
	UserID       int    `json:"user_id" binding:"required"`
	Name         string `json:"name" binding:"required"`
	LastMessage  string `json:"last_message" binding:"required"`
	Participants int    `json:"participants" binding:"required"`
	Messages     int    `json:"messages" binding:"required"`
	Color        string `json:"color" binding:"required"`
}

func (s *Server) CreateChatHandler(c *gin.Context) {
	var payload ChatPayload
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	// create chat
	err := s.db.AddChat(payload.UserID, payload.Name, payload.LastMessage, payload.Participants, payload.Messages, payload.Color)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	resp := make(map[string]string)
	resp["message"] = "Chat created successfully"
	c.JSON(http.StatusOK, resp)
}

func (s *Server) GetChatsHandler(c *gin.Context) {
	userID := c.Query("user_id")
	if userID == "" {
		c.JSON(400, gin.H{"error": "user_id is required"})
		return
	}

	chats, err := s.db.GetChats(userID)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, chats)
}
