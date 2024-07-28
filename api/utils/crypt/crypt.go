package crypt

import "golang.org/x/crypto/bcrypt"

func CreateHash(input string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(input), bcrypt.DefaultCost)
	return string(bytes), err
}

func CompareHash(input string, enc string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(enc), []byte(input))
	return err == nil
}
