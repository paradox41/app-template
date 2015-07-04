dependencies:
	npm prune && npm install

clean:
	rm -rf node_modules/ app/bower_components/

build:
	make dependencies && gulp build

.PHONY: build
