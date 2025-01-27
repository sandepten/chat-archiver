package database

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	UserID string `gorm:"unique"`
	Name   string

	Chats []Chat
}

type Chat struct {
	gorm.Model
	UserID       int
	Name         string
	LastMessage  string
	Participants int
	Messages     int
	Color        string
}
