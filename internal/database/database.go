package database

import (
	"log"
	"os"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// Service represents a service that interacts with a database.
type Service interface {
	// AddUser adds a new user to the database.
	AddUser(user User) error

	// GetChats fetches all chats for a given user ID.
	GetChats(userID int) ([]Chat, error)
}

type service struct {
	db *gorm.DB
}

var (
	dburl      = os.Getenv("BLUEPRINT_DB_URL")
	dbInstance *service
)

// New creates a new instance of the Service, initializing the database connection if needed.
func New() Service {
	// Reuse Connection
	if dbInstance != nil {
		return dbInstance
	}

	db, err := gorm.Open(sqlite.Open(dburl), &gorm.Config{})
	if err != nil {
		// This will not be a connection error, but a DSN parse error or
		// another initialization error.
		log.Fatal(err)
	}
	db.AutoMigrate(&User{}, &Chat{})

	dbInstance = &service{
		db: db,
	}
	return dbInstance
}
