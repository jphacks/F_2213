package main

import (
	"sync"
)

func main() {
	var wg sync.WaitGroup
	wg.Add(3)
	go func() {
		defer wg.Done()
		RunGrpc()
	}()
	go func() {
		defer wg.Done()
		RunOAuthServer()
	}()
	go func() {
		defer wg.Done()
		RunImageServer()
	}()
	wg.Wait()
}
