package utils

import (
	"fmt"
	"os"
	"strings"
)

const (
	InputsFolder = "inputs"
	TestsFolder  = "tests"
)

func GetInput(day string, test bool) string {
	var dir string
	if test {
		// Check in test directories
		dir = fmt.Sprintf("../../%s", TestsFolder)
		if _, err := os.Stat(dir); os.IsNotExist(err) {
			dir = fmt.Sprintf("../%s", TestsFolder) // Fallback to alternate test directory
		}
	} else {
		// Check in input directories
		dir = fmt.Sprintf("../../%s", InputsFolder)
		if _, err := os.Stat(dir); os.IsNotExist(err) {
			dir = fmt.Sprintf("../%s", InputsFolder) // Fallback to alternate input directory
		}
	}

	path := fmt.Sprintf("%s/day-%s.txt", dir, day)
	file, err := os.ReadFile(path)
	if err != nil {
		fmt.Printf("Error reading the %s\n", path)
		return ""
	}
	return strings.ReplaceAll(string(file), "\r\n", "\n")
}
