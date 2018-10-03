.PHONY: default

clean:
	docker stop -t 0 britecharts
	docker rm britecharts

build:
	docker build . --tag=britecharts:latest

shell: clean
	docker run -p 1234:8001 -v $(pwd):/britecharts -it --name britecharts britecharts:latest bash

run: clean
	docker run -p 1234:8001 -t --name britecharts britecharts:latest yarn demos:serve

stop:
	docker stop -t 0
