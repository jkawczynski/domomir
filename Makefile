build:
	docker-compose -f docker-compose.prod.yml build 

run-prod:
	docker-compose -f docker-compose.prod.yml up

run-prod-bg:
	docker-compose -f docker-compose.prod.yml up -d
