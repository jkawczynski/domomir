run-prod:
	docker-compose -f docker-compose.prod.yml up -d

run-dev:
	docker-compose up --build

create-test-user:
	docker-compose run --rm backend create-test-user

shell:
	docker-compose exec backend python manage.py shell


makemigrations:
	python backend/domomir_backend/manage.py makemigrations

test:
	pytest backend/domomir_backend

