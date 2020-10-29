.PHONY : all
all : bonjour outremona montroyashi verduny nordo bizar oldoporto pierre
bonjour:
	$(MAKE) -C ./services/bonjour docker
outremona:
	$(MAKE) -C ./services/outremona docker
montroyashi:
	$(MAKE) -C ./services/montroyashi docker
verduny:
	$(MAKE) -C ./services/verduny docker
nordo:
	$(MAKE) -C ./services/nordo docker
bizar:
	$(MAKE) -C ./services/bizar docker
oldoporto:
	$(MAKE) -C ./services/oldoporto docker
pierre:
	$(MAKE) -C ./services/pierre docker
clean:
	yes | docker system prune -a
ls:
	docker image ls
compose:
	docker-compose up outremona pierre
down:
	docker-compose down
ps:
	docker-compose ps

.PHONY : reset
reset: down ps clean all compose
