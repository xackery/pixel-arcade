.PHONY: npm-install
npm-install:
	@(docker run --rm -v ${PWD}:/src -it xackery/webbuild:10.19.0 bash -c 'cd client && npm install')
.PHONY: npm-audit-fix
npm-audit-fix:
	@(docker run --rm -v ${PWD}:/src -it xackery/webbuild:10.19.0 bash -c 'cd client && npm audit fix')