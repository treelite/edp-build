/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$ 
 * 
 **************************************************************************/
 
 
 
/**
 * less-compiler.spec.js ~ 2014/02/24 21:13:56
 * @author leeight(liyubei@baidu.com)
 * @version $Revision$ 
 * @description 
 *  
 **/
var path = require('path');

var LessCompiler = require('../lib/processor/less-compiler.js');
var base = require('./base');

var pageEntries = 'html,htm,phtml,tpl,vm';
describe('less-compiler', function(){
    it('default', function(){
        var processor = new LessCompiler({
            entryExtnames: pageEntries,
            compileOptions: {
                compress: true
            }
        });

        var filePath = path.join('data', 'css-compressor', '1.less');
        var fileData = base.getFileInfo(filePath);
        var processContext = {
            baseDir: __dirname,
            addFileLink: function(){}
        };
        processor.process(fileData, processContext, function() {
            expect( fileData.data ).toBe( ".m1{background:url('../../img/logo.gif')}" );
        });
    });

    it('custom less module', function(){
        var processor = new LessCompiler({
            less: require( '../node_modules/less' ),
            entryExtnames: pageEntries,
            compileOptions: {
                compress: true
            }
        });

        var filePath = path.join('data', 'css-compressor', '1.less');
        var fileData = base.getFileInfo(filePath);
        var processContext = {
            baseDir: __dirname,
            addFileLink: function(){}
        };
        processor.process(fileData, processContext, function() {
            expect( fileData.data ).toBe( ".m1{background:url('../../img/logo.gif')}" );
        });
    });
});





















/* vim: set ts=4 sw=4 sts=4 tw=100: */
