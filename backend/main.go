package main

import (
	"sync"
)

func main() {
	var wg sync.WaitGroup
	wg.Add(2)
	go func() {
		defer wg.Done()
		RunGrpc()
	}()
	go func() {
		defer wg.Done()
		RunOAuthServer()
	}()
	wg.Wait()
}
