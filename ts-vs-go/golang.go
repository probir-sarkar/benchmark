package main

import (
	"fmt"
	"math/rand"
	"sync"
	"time"
)

// ✅ Recursive Fibonacci
func fibonacci(n int) int {
	if n <= 1 {
		return n
	}
	return fibonacci(n-1) + fibonacci(n-2)
}

// ✅ Merge Sort
func mergeSort(arr []int) []int {
	if len(arr) <= 1 {
		return arr
	}

	mid := len(arr) / 2
	left := mergeSort(arr[:mid])
	right := mergeSort(arr[mid:])

	return merge(left, right)
}

func merge(left, right []int) []int {
	result := []int{}
	i, j := 0, 0

	for i < len(left) && j < len(right) {
		if left[i] < right[j] {
			result = append(result, left[i])
			i++
		} else {
			result = append(result, right[j])
			j++
		}
	}

	result = append(result, left[i:]...)
	result = append(result, right[j:]...)
	return result
}

// ✅ Parallel Matrix Multiplication
func multiplyMatrices(A, B [][]float64, result [][]float64, wg *sync.WaitGroup, start, end int) {
	defer wg.Done()
	for i := start; i < end; i++ {
		for j := 0; j < len(B[0]); j++ {
			for k := 0; k < len(A[0]); k++ {
				result[i][j] += A[i][k] * B[k][j]
			}
		}
	}
}

func parallelMultiplyMatrices(A, B [][]float64) [][]float64 {
	size := len(A)
	result := make([][]float64, size)
	for i := range result {
		result[i] = make([]float64, size)
	}

	var wg sync.WaitGroup
	workers := 4
	chunkSize := size / workers

	for i := 0; i < workers; i++ {
		start := i * chunkSize
		end := (i + 1) * chunkSize
		if i == workers-1 {
			end = size
		}
		wg.Add(1)
		go multiplyMatrices(A, B, result, &wg, start, end)
	}

	wg.Wait()
	return result
}

// ✅ Benchmarking
func benchmark() {
	fmt.Println("Starting benchmarks...")

	// Fibonacci
	fibNum := 45
	startFib := time.Now()
	fmt.Println("Fibonacci(", fibNum, "):", fibonacci(fibNum))
	fmt.Println("Fibonacci Execution Time:", time.Since(startFib))

	// Merge Sort
	arraySize := 5000000
	arr := make([]int, arraySize)
	for i := range arr {
		arr[i] = rand.Intn(1000000)
	}
	startSort := time.Now()
	mergeSort(arr)
	fmt.Println("Merge Sort Execution Time:", time.Since(startSort))

	// Matrix Multiplication
	matrixSize := 1000
	A := make([][]float64, matrixSize)
	B := make([][]float64, matrixSize)
	for i := range A {
		A[i] = make([]float64, matrixSize)
		B[i] = make([]float64, matrixSize)
		for j := range A[i] {
			A[i][j] = rand.Float64() * 10
			B[i][j] = rand.Float64() * 10
		}
	}

	startMatrix := time.Now()
	parallelMultiplyMatrices(A, B)
	fmt.Println("Matrix Multiplication Execution Time:", time.Since(startMatrix))
}

func main() {
	benchmark()
}
