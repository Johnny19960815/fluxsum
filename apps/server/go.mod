module github.com/fluxsum/hub-central-server

go 1.23

require (
	github.com/fluxsum/go-utils v0.0.0
	github.com/gin-gonic/gin v1.10.0
	github.com/golang-jwt/jwt/v5 v5.2.1
	google.golang.org/grpc v1.68.0
	google.golang.org/protobuf v1.35.2
)

replace github.com/fluxsum/go-utils => ../../packages/go-utils
