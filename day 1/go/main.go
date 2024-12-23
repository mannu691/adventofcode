package main

import (
	utils "adventofcode/utils/go"
	"fmt"
	"math"
	"sort"
	"strconv"
	"strings"
)

func main() {
	input := utils.GetInput("1", false)
	parts := strings.Split(input, "\n")
	frequency := make(map[int]int)
	var left []int
	var right []int
	for _, part := range parts {
		ins := strings.Fields(part)
		num1, _ := strconv.Atoi(ins[0])
		num2, _ := strconv.Atoi(ins[1])
		left = append(left, num1)
		right = append(right, num2)
		frequency[num2]++
	}
	sort.Ints(left)
	sort.Ints(right)
	sum := 0
	sim := 0
	for i, l := range left {
		r := right[i]
		sum += int(math.Abs(float64(l - r)))
		sim += l * frequency[l]
	}
	fmt.Printf("Part 1 : %d\n", sum)
	fmt.Printf("Part 2 : %d\n", sim)
}
