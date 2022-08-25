build-and-push:
	docker build -t woodev/domomir-backend ./backend
	docker push woodev/domomir-backend:latest
	docker build -t woodev/domomir-frontend -f ./frontend/prod.Dockerfile ./frontend
	docker push woodev/domomir-frontend:latest

run-prod:
	docker-compose -f docker-compose.prod.yml up

run-prod-bg:
	docker-compose -f docker-compose.prod.yml up -d
