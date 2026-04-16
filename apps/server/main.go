package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// Health check
	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":  "healthy",
			"service": "hub-central-server",
		})
	})

	// SSO endpoints
	sso := r.Group("/sso")
	{
		sso.POST("/login", handleLogin)
		sso.POST("/logout", handleLogout)
		sso.GET("/userinfo", authMiddleware(), handleUserInfo)
		sso.POST("/refresh", handleRefresh)
	}

	// Admin endpoints
	admin := r.Group("/admin")
	admin.Use(authMiddleware())
	{
		admin.GET("/billing", handleBilling)
		admin.GET("/services", handleServices)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Hub Central Server starting on port %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}

func authMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		token := c.GetHeader("Authorization")
		if token == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "missing token"})
			return
		}
		// TODO: Validate JWT token
		c.Next()
	}
}

func handleLogin(c *gin.Context) {
	// TODO: Implement OIDC login
	c.JSON(http.StatusOK, gin.H{"message": "login endpoint"})
}

func handleLogout(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "logout successful"})
}

func handleUserInfo(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"user": "demo"})
}

func handleRefresh(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "token refreshed"})
}

func handleBilling(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"billing": "endpoint"})
}

func handleServices(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"services": []string{}})
}
