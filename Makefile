build-and-push:
	docker build -t woodev/domomir-backend ./backend
	docker push woodev/domomir-backend:latest
	docker build -t woodev/domomir-frontend./frontend/prod.Dockerfile
	docker push woodev/domomir-frontend:latest
