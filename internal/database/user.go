package database

func (s *service) AddUser(userId string) error {
	user := User{
		UserID: userId,
	}
	result := s.db.Create(&user).First(&user)
	return result.Error
}
