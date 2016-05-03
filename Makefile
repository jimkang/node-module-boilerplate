HOMEDIR = $(shell pwd)
SSHCMD = ssh $(SMUSER)@smidgeo-headporters
PROJECTNAME = yet-another-module
APPDIR = /var/apps/$(PROJECTNAME)

pushall: sync restart-remote
	git push origin master

sync:
	rsync -a $(HOMEDIR) $(SMUSER)@smidgeo-headporters:/var/apps/ --exclude node_modules/ --exclude data/
	ssh $(SMUSER)@smidgeo-headporters "cd /var/apps/$(PROJECTNAME) && npm install"

restart-remote:
	$(SSHCMD) "systemctl restart $(PROJECTNAME)"

set-permissions:
	$(SSHCMD) "chmod +x $(APPDIR)/yet-another-module-responder.js && \
	chmod 777 -R $(APPDIR)/data/yet-another-module-responses.db"

update-remote: sync set-permissions restart-remote

install-service:
	$(SSHCMD) "cp $(APPDIR)/$(PROJECTNAME).service /etc/systemd/system && \
	systemctl daemon-reload"
