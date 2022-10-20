OUT_DIR="./grpc_out"

init_grpc_front:
	cd frontend && yarn
	cd /tmp && wget https://github.com/grpc/grpc-web/releases/download/1.4.1/protoc-gen-grpc-web-1.4.1-linux-x86_64
	mv /tmp/protoc-gen-grpc-web-1.4.1-linux-x86_64 /usr/local/bin/protoc-gen-grpc-web
	chmod +x /usr/local/bin/protoc-gen-grpc-web

init_grpc_back:
	go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.28
	go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.2
	apk add protoc

gen_grpc_front:
	cd frontend && rm -rf $(OUT_DIR)
	cd frontend && mkdir $(OUT_DIR)
	cd frontend && protoc \
		-I=../grpc \
		../grpc/*.proto \
    --grpc-web_out=import_style=typescript,mode=grpcwebtext:$(OUT_DIR) \
		--js_out=import_style=commonjs,binary:$(OUT_DIR)

gen_grpc_back:
	cd backend && rm -rf $(OUT_DIR)
	cd backend && mkdir $(OUT_DIR)
	cd backend && protoc \
		-I=../grpc \
		../grpc/*.proto \
		--go_out=$(OUT_DIR) \
		--go_opt=paths=source_relative \
		--go-grpc_out=$(OUT_DIR) \
		--go-grpc_opt=paths=source_relative

start_dev_init:
	docker exec -it grpc_dev_front sh -c 'apk add git openssh-client'
	docker exec -it grpc_dev_front sh -c 'cd /root/ && git clone https://github.com/jphacks/F_2213 /root/app'

start_dev_front:
	docker exec -itd grpc_dev_front sh -c 'cd /root/app/frontend && yarn && yarn dev'

start_dev_back:
	docker exec -itd grpc_dev_back sh -c 'cd /root/app/backend && go run main.go'

danger_rm:
	docker compose down --rmi all --volumes --remove-orphans