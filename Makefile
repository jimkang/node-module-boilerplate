build: yetanothermodule.js
	whatever you have to do

browserify: yetanothermodule.js
	cat browserifyshim.js | browserify -s exportname > yetanothermodule-browserified.js

minbrowserify: browserify
	uglifyjs yetanothermodule-browserified.js -c -o yetanothermodule-browserified.min.js
