test:
	node tests/basictests.js

run:
	wzrd index.js -- \
		-d

pushall:
	git push origin master && git push origin gh-pages
