HOMEDIR = $(shell pwd)
GITDIR = /var/repos/yet-another-module.git

test:
	node tests/basictests.js

start: start-yet-another-module
	psy start -n yet-another-module -- node yet-another-module.js

stop:
	psy stop yet-another-module || echo "Non-zero return code is OK."

sync-worktree-to-git:
	git --work-tree=$(HOMEDIR) --git-dir=$(GITDIR) checkout -f

npm-install:
	cd $(HOMEDIR)
	npm install
	npm prune

post-receive: sync-worktree-to-git npm-install stop start

pushall:
	git push origin master && git push server master

