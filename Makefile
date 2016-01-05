HOMEDIR = $(shell pwd)

test:
	node tests/basictests.js

start:
	node yet-another-module.js

create-docker-machine:
	docker-machine create --driver virtualbox dev

stop-docker-machine:
	docker-machine stop dev

start-docker-machine:
	docker-machine start dev

# connect-to-docker-machine:
	# eval "$(docker-machine env dev)"

build-docker-image:
	docker build -t jkang/yet-another-module .

push-docker-image: build-docker-image
	docker push jkang/yet-another-module

# /tmp mapping is only for development.
run-yet-another-module:
	docker rm -f yet-another-module || \
		echo "yet-another-module did not need removal."
	docker run \
		-d \
		--restart=always \
		--name yet-another-module \
		-v $(HOMEDIR)/config:/usr/src/app/config \
		-v /tmp:/usr/src/app/data \
		-p 49160:8080 \
		jkang/yet-another-module \
		node yet-another-module.js

pushall: push-docker-image
	git push origin master
