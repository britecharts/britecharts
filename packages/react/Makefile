.PHONY: default

clean:
	docker rm britecharts-react

build:
	docker build . --tag=britecharts-react:latest

shell:
	docker run -p 1212:8001 -v $(PWD)/docs:/code/docs -it britecharts-react bash

docs:
	docker run -p 1212:8001 -t -v $(PWD)/docs:/code/docs -v $(PWD)/src:/code/src britecharts-react:latest yarn docs

run:
	docker run -p 1212:8001 -t -v $(PWD)/docs:/code/docs -v $(PWD)/src:/code/src britecharts-react:latest yarn start

stop:
	docker stop -t 0 britecharts-react
