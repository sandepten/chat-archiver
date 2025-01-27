package database

func (s *service) AddUser(user User) error {
	result := s.db.Create(&user).First(&user)
	return result.Error
}
