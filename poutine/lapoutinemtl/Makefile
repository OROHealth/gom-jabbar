.PHONY : all
all : bonjour outremona
bonjour:
	$(MAKE) -C ./services/bonjour docker
outremona:
	$(MAKE) -C ./services/outremona docker
clean:
	yes | docker system prune -a
ls:
	docker image ls
compose:
	docker-compose up -d
down:
	docker-compose down
ps:
	docker-compose ps

.PHONY : reset
reset: down ps clean all compose
