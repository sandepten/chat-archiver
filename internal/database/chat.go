package database

func (s *service) GetChats(userID int) ([]Chat, error) {
	var chats []Chat
	if result := s.db.Where("user_id = ?", userID).Find(&chats); result.Error != nil {
		return nil, result.Error
	}
	return chats, nil
}
