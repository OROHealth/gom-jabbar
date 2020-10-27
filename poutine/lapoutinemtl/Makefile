.PHONY : all
all : bonjour
bonjour:
	$(MAKE) -C ./services/bonjour docker
clean:
	docker system prune -a
ls:
	docker image ls
compose:
	docker-compose up -d
down:
	docker-compose down
ps:
	docker-compose ps
