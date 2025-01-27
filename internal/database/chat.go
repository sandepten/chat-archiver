package database

func (s *service) GetChats(userID string) ([]Chat, error) {
	var chats []Chat
	if result := s.db.Where("user_id = ?", userID).Find(&chats); result.Error != nil {
		return nil, result.Error
	}
	return chats, nil
}

func (s *service) AddChat(userID string, name, lastMessage string, participants, messages int, color string) error {
	chat := Chat{
		UserID:       userID,
		Name:         name,
		LastMessage:  lastMessage,
		Participants: participants,
		Messages:     messages,
		Color:        color,
	}
	result := s.db.Create(&chat).First(&chat)
	return result.Error
}
