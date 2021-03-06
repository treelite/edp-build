/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * replace-require-resource.spec.js ~ 2014/02/25 11:39:29
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 *  
 **/
var fs = require('fs');
var path = require('path');

var ReplaceRequireResource = require('../lib/util/replace-require-resource.js');
var base = require('./base');
var Project = path.resolve(__dirname, 'data', 'dummy-project');

describe('replace-require-resource', function(){
    it('default', function(){
        var file = path.resolve(Project, 'src', 'case1.js');
        var code = fs.readFileSync(file, 'utf-8');
        var z = ReplaceRequireResource(code, 'tpl', function(resourceId){
            return '[' + resourceId + ']'
        });
        var expected = 
        "define('case1', [\n" +
        "    'foo',\n" +
        "    'tpl!./tpl/123.html'\n" +
        "], function (foo, require, exports, module) {\n" +
        "    require('[tpl!./tpl/list.tpl.html]');\n" +
        "    require('no-such-plugin!./tpl/list.tpl.html');\n" +
        "    require('[tpl!er/tpl/hello.tpl.html]');\n" +
        "    var z = require('jquery');\n" +
        "    return 'case1';\n" +
        "});";

        expect( z ).toBe( expected );
    });

    it('multiple pluginIds', function(){
        var file = path.resolve(Project, 'src', 'case1.js');
        var code = fs.readFileSync(file, 'utf-8');
        var z = ReplaceRequireResource(code, ['tpl', 'no-such-plugin'], function(resourceId){
            return '[' + resourceId + ']'
        });
        var expected = 
        "define('case1', [\n" +
        "    'foo',\n" +
        "    'tpl!./tpl/123.html'\n" +
        "], function (foo, require, exports, module) {\n" +
        "    require('[tpl!./tpl/list.tpl.html]');\n" +
        "    require('[no-such-plugin!./tpl/list.tpl.html]');\n" +
        "    require('[tpl!er/tpl/hello.tpl.html]');\n" +
        "    var z = require('jquery');\n" +
        "    return 'case1';\n" +
        "});";

        expect( z ).toBe( expected );
    });
});





















/* vim: set ts=4 sw=4 sts=4 tw=100: */
