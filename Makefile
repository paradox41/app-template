dependencies:
	npm prune && npm install && bower install

clean:
	rm -rf node_modules/ app/bower_components/

build:
	make dependencies && gulp build

.PHONY: build
