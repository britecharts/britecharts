.PHONY: default

clean:
	docker rm britecharts

build:
	docker build . --tag=britecharts:latest

shell:
	docker run -p 1234:8001 -v $(PWD)/docs:/code/docs -it britecharts bash

docs:
	docker run -p 1234:8001 -t -v $(PWD)/docs:/code/docs -v $(PWD)/src:/code/src britecharts:latest yarn docs

run:
	docker run -p 1234:8001 -t -v $(PWD)/docs:/code/docs -v $(PWD)/src:/code/src britecharts:latest yarn demos:serve

stop:
	docker stop -t 0 britecharts
