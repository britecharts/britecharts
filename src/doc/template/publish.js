"use strict";

/**
 * @module template/publish
 * @type {*}
 */
/*global env: true */

var template = require('jsdoc/template'),
  doop = require('jsdoc/util/doop'),
  fs = require('jsdoc/fs'),
  _ = require('underscore'),
  path = require('jsdoc/path'),

  taffy = require('taffydb').taffy,
  handle = require('jsdoc/util/error').handle,
  helper = require('jsdoc/util/templateHelper'),
  moment = require("moment"),
  htmlsafe = helper.htmlsafe,
  sanitizeHtml = require('sanitize-html'),
  linkto = helper.linkto,
  resolveAuthorLinks = helper.resolveAuthorLinks,
  scopeToPunc = helper.scopeToPunc,
  hasOwnProp = Object.prototype.hasOwnProperty,
  conf = env.conf.templates || {},
  data,
  view,
  outdir = env.opts.destination,
  searchEnabled = conf.search !== false;

var globalUrl = helper.getUniqueFilename('global');
var indexUrl = helper.getUniqueFilename('index');

var navOptions = {
  includeDate: conf.includeDate !== false,
  logoFile: conf.logoFile,
  systemName: conf.systemName || "Documentation",
  navType: conf.navType || "vertical",
  footer: conf.footer || "",
  copyright: conf.copyright || "",
  theme: conf.theme || "simplex",
  syntaxTheme: conf.syntaxTheme || "default",
  linenums: conf.linenums,
  collapseSymbols: conf.collapseSymbols || false,
  inverseNav: conf.inverseNav,
  outputSourceFiles: conf.outputSourceFiles === true,
  sourceRootPath: conf.sourceRootPath,
  disablePackagePath: conf.disablePackagePath,
  outputSourcePath: conf.outputSourcePath,
  dateFormat: conf.dateFormat,
  analytics: conf.analytics || null,
  methodHeadingReturns: conf.methodHeadingReturns === true,
  sort: conf.sort,
  search: searchEnabled
};
var searchableDocuments = {};

var navigationMaster = {
  index: {
    title: navOptions.systemName,
    link: indexUrl,
    members: []
  },
  namespace: {
    title: "Namespaces",
    link: helper.getUniqueFilename("namespaces.list"),
    members: []
  },
  module: {
    title: "Modules",
    link: helper.getUniqueFilename("modules.list"),
    members: []
  },
  class: {
    title: "Classes",
    link: helper.getUniqueFilename('classes.list'),
    members: []
  },

  mixin: {
    title: "Mixins",
    link: helper.getUniqueFilename("mixins.list"),
    members: []
  },
  event: {
    title: "Events",
    link: helper.getUniqueFilename("events.list"),
    members: []
  },
  interface: {
    title: "Interfaces",
    link: helper.getUniqueFilename("interfaces.list"),
    members: []
  },
  tutorial: {
    title: "Tutorials",
    link: helper.getUniqueFilename("tutorials.list"),
    members: []
  },
  global: {
    title: "Global",
    link: globalUrl,
    members: []

  },
  external: {
    title: "Externals",
    link: helper.getUniqueFilename("externals.list"),
    members: []
  }
};

function find(spec) {
  return helper.find(data, spec);
}

function tutoriallink(tutorial) {
  return helper.toTutorial(tutorial, null, {
    tag: 'em',
    classname: 'disabled',
    prefix: 'Tutorial: '
  });
}

function getAncestorLinks(doclet) {
  return helper.getAncestorLinks(data, doclet);
}

function hashToLink(doclet, hash) {
  if (!/^(#.+)/.test(hash)) {
    return hash;
  }

  var url = helper.createLink(doclet);

  url = url.replace(/(#.+|$)/, hash);
  return '<a href="' + url + '">' + hash + '</a>';
}

function needsSignature(doclet) {
  var needsSig = false;

  // function and class definitions always get a signature
  if (doclet.kind === 'function' || doclet.kind === 'class') {
    needsSig = true;
  }
  // typedefs that contain functions get a signature, too
  else if (doclet.kind === 'typedef' && doclet.type && doclet.type.names &&
    doclet.type.names.length) {
    for (var i = 0, l = doclet.type.names.length; i < l; i++) {
      if (doclet.type.names[i].toLowerCase() === 'function') {
        needsSig = true;
        break;
      }
    }
  }

  return needsSig;
}

function addSignatureParams(f) {
  var optionalClass = 'optional';
  var params = helper.getSignatureParams(f, optionalClass);

  f.signature = (f.signature || '') + '(';

  for (var i = 0, l = params.length; i < l; i++) {
    var element = params[i];
    var seperator = (i > 0) ? ', ' : '';

    if (!new RegExp("class=[\"|']"+optionalClass+"[\"|']").test(element)) {
      f.signature += seperator + element;
    } else {
      var regExp = new RegExp("<span class=[\"|']"+optionalClass+"[\"|']>(.*?)<\\/span>", "i");
      f.signature += element.replace(regExp, " $`["+seperator+"$1$']");
    }

  }

  f.signature += ')';
}

function addSignatureReturns(f) {
  if (navOptions.methodHeadingReturns) {
    var returnTypes = helper.getSignatureReturns(f);

    f.signature = '<span class="signature">' + (f.signature || '') + '</span>' + '<span class="type-signature">' + (returnTypes.length ? ' &rarr; {' + returnTypes.join('|') + '}' : '') + '</span>';
  }
  else {
    f.signature = f.signature || '';
  }
}

function addSignatureTypes(f) {
  var types = helper.getSignatureTypes(f);

  f.signature = (f.signature || '') + '<span class="type-signature">' + (types.length ? ' :' + types.join('|') : '') + '</span>';
}

function addAttribs(f) {
  var attribs = helper.getAttribs(f);

  f.attribs = '<span class="type-signature">' + htmlsafe(attribs.length ? '<' + attribs.join(', ') + '> ' : '') + '</span>';
}

function shortenPaths(files, commonPrefix) {
  //	// always use forward slashes
  //	var regexp = new RegExp( '\\\\', 'g' );
  //
  //	var prefix = commonPrefix.toLowerCase().replace( regexp, "/" );
  //
  //	Object.keys( files ).forEach( function ( file ) {
  //		files[file].shortened = files[file]
  //			.resolved
  //			.toLowerCase()
  //			.replace( regexp, '/' )
  //			.replace( prefix, '' );
  //	} );

  Object.keys(files).forEach(function(file) {
    files[file].shortened = files[file].resolved.replace(commonPrefix, '')
    // always use forward slashes
    .replace(/\\/g, '/');
  });


  return files;
}

function getPathFromDoclet(doclet) {
  if (!doclet.meta) {
    return;
  }

  return path.normalize(doclet.meta.path && doclet.meta.path !== 'null' ?
    doclet.meta.path + '/' + doclet.meta.filename :
    doclet.meta.filename);
}

function searchData(html) {
  var startOfContent = html.indexOf("<div class=\"container\">");
  if (startOfContent > 0) {
    var startOfSecondContent = html.indexOf("<div class=\"container\">", startOfContent + 2);
    if (startOfSecondContent > 0) {
      startOfContent = startOfSecondContent;
    }
    html = html.slice(startOfContent);
  }
  var endOfContent = html.indexOf("<span class=\"copyright\">");
  if (endOfContent > 0) {
    html = html.substring(0, endOfContent);
  }
  var stripped = sanitizeHtml(html, {allowedTags: [], allowedAttributes: []});
  stripped = stripped.replace(/\s+/g, ' ');
  return stripped;
}

function generate(docType, title, docs, filename, resolveLinks) {
  resolveLinks = resolveLinks === false ? false : true;

  var docData = {
    title: title,
    docs: docs,
    docType: docType
  };

  var outpath = path.join(outdir, filename),
    html = view.render('container.tmpl', docData);

  if (resolveLinks) {
    html = helper.resolveLinks(html); // turn {@link foo} into <a href="foodoc.html">foo</a>
  }

  if (searchEnabled) {
    searchableDocuments[filename] = {
      "id": filename,
      "title": title,
      "body": searchData(html)
    };
  }

  fs.writeFileSync(outpath, html, 'utf8');
}

function generateSourceFiles(sourceFiles) {
  Object.keys(sourceFiles).forEach(function(file) {
    var source;
    // links are keyed to the shortened path in each doclet's `meta.shortpath` property
    var sourceOutfile = helper.getUniqueFilename(sourceFiles[file].shortened);
    helper.registerLink(sourceFiles[file].shortened, sourceOutfile);

    try {
      source = {
        kind: 'source',
        code: helper.htmlsafe(fs.readFileSync(sourceFiles[file].resolved, 'utf8'))
      };
    } catch (e) {
      handle(e);
    }

    generate('source', 'Source: ' + sourceFiles[file].shortened, [source], sourceOutfile,
      false);
  });
}

/**
 * Look for classes or functions with the same name as modules (which indicates that the module
 * exports only that class or function), then attach the classes or functions to the `module`
 * property of the appropriate module doclets. The name of each class or function is also updated
 * for display purposes. This function mutates the original arrays.
 *
 * @private
 * @param {Array.<module:jsdoc/doclet.Doclet>} doclets - The array of classes and functions to
 * check.
 * @param {Array.<module:jsdoc/doclet.Doclet>} modules - The array of module doclets to search.
 */
function attachModuleSymbols(doclets, modules) {
  var symbols = {};

  // build a lookup table
  doclets.forEach(function(symbol) {
    symbols[symbol.longname] = symbols[symbol.longname] || [];
    symbols[symbol.longname].push(symbol);
  });

  return modules.map(function(module) {
    if (symbols[module.longname]) {
      module.modules = symbols[module.longname]
      // Only show symbols that have a description. Make an exception for classes, because
      // we want to show the constructor-signature heading no matter what.
      .filter(function(symbol) {
        return symbol.description || symbol.kind === 'class';
      })
        .map(function(symbol) {
          symbol = doop(symbol);

          if (symbol.kind === 'class' || symbol.kind === 'function') {
            symbol.name = symbol.name.replace('module:', '(require("') + '"))';
          }

          return symbol;
        });
    }
  });
}

/**
 * Create the navigation sidebar.
 * @param {object} members The members that will be used to create the sidebar.
 * @param {array<object>} members.classes
 * @param {array<object>} members.externals
 * @param {array<object>} members.globals
 * @param {array<object>} members.mixins
 * @param {array<object>} members.interfaces
 * @param {array<object>} members.modules
 * @param {array<object>} members.namespaces
 * @param {array<object>} members.tutorials
 * @param {array<object>} members.events
 * @return {string} The HTML for the navigation sidebar.
 */
function buildNav(members) {

  var seen = {};
  var nav = navigationMaster;
  if (members.modules.length) {

    members.modules.forEach(function(m) {
      if (!hasOwnProp.call(seen, m.longname)) {

        nav.module.members.push(linkto(m.longname, m.longname.replace("module:", "")));
      }
      seen[m.longname] = true;
    });
  }

  if (members.externals.length) {

    members.externals.forEach(function(e) {
      if (!hasOwnProp.call(seen, e.longname)) {

        nav.external.members.push(linkto(e.longname, e.name.replace(/(^"|"$)/g, '')));
      }
      seen[e.longname] = true;
    });
  }

  if (members.classes.length) {

    members.classes.forEach(function(c) {
      if (!hasOwnProp.call(seen, c.longname)) {

        nav.class.members.push(linkto(c.longname, c.longname.replace("module:", "")));
      }
      seen[c.longname] = true;
    });

  }

  if (members.events.length) {

    members.events.forEach(function(e) {
      if (!hasOwnProp.call(seen, e.longname)) {

        nav.event.members.push(linkto(e.longname, e.longname.replace("module:", "")));
      }
      seen[e.longname] = true;
    });

  }

  if (members.namespaces.length) {

    members.namespaces.forEach(function(n) {
      if (!hasOwnProp.call(seen, n.longname)) {

        nav.namespace.members.push(linkto(n.longname, n.longname.replace("module:", "")));
      }
      seen[n.longname] = true;
    });

  }

  if (members.mixins.length) {

    members.mixins.forEach(function(m) {
      if (!hasOwnProp.call(seen, m.longname)) {

        nav.mixin.members.push(linkto(m.longname, m.longname.replace("module:", "")));
      }
      seen[m.longname] = true;
    });

  }

  if (members.interfaces && members.interfaces.length) {

    members.interfaces.forEach(function(m) {
      if (!hasOwnProp.call(seen, m.longname)) {

        nav.interface.members.push(linkto(m.longname, m.longname.replace("module:", "")));
      }
      seen[m.longname] = true;
    });

  }

  if (members.tutorials.length) {

    members.tutorials.forEach(function(t) {

      nav.tutorial.members.push(tutoriallink(t.name));
    });

  }

  if (members.globals.length) {
    members.globals.forEach(function(g) {
      if (g.kind !== 'typedef' && !hasOwnProp.call(seen, g.longname)) {

        nav.global.members.push(linkto(g.longname, g.longname.replace("module:", "")));
      }
      seen[g.longname] = true;
    });

    // even if there are no links, provide a link to the global page.
    if (nav.global.members.length === 0) {
      nav.global.members.push(linkto("global", "Global"));
    }
  }

  var topLevelNav = [];
  _.each(nav, function(entry, name) {
    if (entry.members.length > 0 && name !== "index") {
      topLevelNav.push({
        title: entry.title,
        link: entry.link,
        members: entry.members
      });
    }
  });
  nav.topLevelNav = topLevelNav;
}

/**
 @param {TAFFY} taffyData See <http://taffydb.com/>.
 @param {object} opts
 @param {Tutorial} tutorials
 */
exports.publish = function(taffyData, opts, tutorials) {
  data = taffyData;

  conf['default'] = conf['default'] || {};

  var templatePath = opts.template;
  view = new template.Template(templatePath + '/tmpl');

  // claim some special filenames in advance, so the All-Powerful Overseer of Filename Uniqueness
  // doesn't try to hand them out later
  //	var indexUrl = helper.getUniqueFilename( 'index' );
  // don't call registerLink() on this one! 'index' is also a valid longname

  //	var globalUrl = helper.getUniqueFilename( 'global' );
  helper.registerLink('global', globalUrl);

  // set up templating
  // set up templating
  view.layout = conf['default'].layoutFile ?
    path.getResourcePath(path.dirname(conf['default'].layoutFile),
    path.basename(conf['default'].layoutFile) ) : 'layout.tmpl';

  // set up tutorials for helper
  helper.setTutorials(tutorials);

  data = helper.prune(data);

  var sortOption = navOptions.sort === undefined ? opts.sort : navOptions.sort;
  sortOption = sortOption === undefined ? true : sortOption;
  sortOption = sortOption === true ? 'longname, version, since' : sortOption;
  if (sortOption) {
    data.sort(sortOption);
  }
  helper.addEventListeners(data);

  var sourceFiles = {};
  var sourceFilePaths = [];
  data().each(function(doclet) {
    doclet.attribs = '';

    if (doclet.examples) {
      doclet.examples = doclet.examples.map(function(example) {
        var caption, lang;

        // allow using a markdown parser on the examples captions (surrounded by useless HTML p tags)
        if (example.match(/^\s*(<p>)?<caption>([\s\S]+?)<\/caption>(\s*)([\s\S]+?)(<\/p>)?$/i)) {
          caption = RegExp.$2;
          example = RegExp.$4 + (RegExp.$1 ? '' : RegExp.$5);
        }

        var lang = /{@lang (.*?)}/.exec(example);

        if (lang && lang[1]) {
          example = example.replace(lang[0], "");
          lang = lang[1];

        } else {
          lang = null;
        }

        return {
          caption: caption || '',
          code: example,
          lang: lang || "javascript"
        };
      });
    }
    if (doclet.see) {
      doclet.see.forEach(function(seeItem, i) {
        doclet.see[i] = hashToLink(doclet, seeItem);
      });
    }

    // build a list of source files
    var sourcePath;
    if (doclet.meta) {
      sourcePath = getPathFromDoclet(doclet);
      sourceFiles[sourcePath] = {
        resolved: sourcePath,
        shortened: null
      };

      //Check to see if the array of source file paths already contains
      // the source path, if not then add it
      if (sourceFilePaths.indexOf(sourcePath) === -1) {
          sourceFilePaths.push(sourcePath)
      }
    }
  });

  // update outdir if necessary, then create outdir
  var packageInfo = (find({
    kind: 'package'
  }) || [])[0];
  if (navOptions.disablePackagePath !== true && packageInfo && packageInfo.name) {
    if (packageInfo.version) {
      outdir = path.join(outdir, packageInfo.name, packageInfo.version);
    } else {
      outdir = path.join(outdir, packageInfo.name);
    }
  }
  fs.mkPath(outdir);

	// copy the template's static files to outdir
	var fromDir = path.join( templatePath, 'static' );
	var staticFiles = fs.ls( fromDir, 3 );

	staticFiles.forEach( function ( fileName ) {
		var toDir = fs.toDir( fileName.replace( fromDir, outdir ) );
		fs.mkPath( toDir );
		fs.copyFileSync( fileName, toDir );
	} );

    // copy user-specified static files to outdir
    var staticFilePaths;
    var staticFileFilter;
    var staticFileScanner;
    if (conf.default.staticFiles) {
        // The canonical property name is `include`. We accept `paths` for backwards compatibility
        // with a bug in JSDoc 3.2.x.
        staticFilePaths = conf.default.staticFiles.include ||
            conf.default.staticFiles.paths ||
            [];
        staticFileFilter = new (require('jsdoc/src/filter')).Filter(conf.default.staticFiles);
        staticFileScanner = new (require('jsdoc/src/scanner')).Scanner();

        staticFilePaths.forEach(function(filePath) {
            var extraStaticFiles = staticFileScanner.scan([filePath], 10, staticFileFilter);

            extraStaticFiles.forEach(function(fileName) {
                var sourcePath = fs.toDir(filePath);
                var toDir = fs.toDir( fileName.replace(sourcePath, outdir) );
                fs.mkPath(toDir);
                fs.copyFileSync(fileName, toDir);
            });
        });
    }

  if (sourceFilePaths.length) {
    var payload = navOptions.sourceRootPath;
    if (!payload) {
      payload = path.commonPrefix(sourceFilePaths);
    }
    sourceFiles = shortenPaths(sourceFiles, payload);
  }
  data().each(function(doclet) {
    var url = helper.createLink(doclet);
    helper.registerLink(doclet.longname, url);

    // add a shortened version of the full path
    var docletPath;
    if (doclet.meta) {
      docletPath = getPathFromDoclet(doclet);
      if (!_.isEmpty(sourceFiles[docletPath])) {
        docletPath = sourceFiles[docletPath].shortened;
        if (docletPath) {
          doclet.meta.shortpath = docletPath;
        }
      }
    }
  });

  data().each(function(doclet) {
    var url = helper.longnameToUrl[doclet.longname];

    if (url.indexOf('#') > -1) {
      doclet.id = helper.longnameToUrl[doclet.longname].split(/#/).pop();
    } else {
      doclet.id = doclet.name;
    }

    if (needsSignature(doclet)) {
      addSignatureParams(doclet);
      addSignatureReturns(doclet);
      addAttribs(doclet);
    }
  });

  // do this after the urls have all been generated
  data().each(function(doclet) {
    doclet.ancestors = getAncestorLinks(doclet);

    if (doclet.kind === 'member') {
      addSignatureTypes(doclet);
      addAttribs(doclet);
    }

    if (doclet.kind === 'constant') {
      addSignatureTypes(doclet);
      addAttribs(doclet);
      doclet.kind = 'member';
    }
  });

  var members = helper.getMembers(data);
  members.tutorials = tutorials.children;

  // add template helpers
  view.find = find;
  view.linkto = linkto;
  view.resolveAuthorLinks = resolveAuthorLinks;
  view.tutoriallink = tutoriallink;
  view.htmlsafe = htmlsafe;
  view.moment = moment;

  // once for all
  buildNav(members);
  view.nav = navigationMaster;
  view.navOptions = navOptions;
  attachModuleSymbols(find({
      kind: ['class', 'function'],
      longname: {
        left: 'module:'
      }
    }),
    members.modules);

  // only output pretty-printed source files if requested; do this before generating any other
  // pages, so the other pages can link to the source files
  if (navOptions.outputSourceFiles) {
    generateSourceFiles(sourceFiles);
  }

  if (members.globals.length) {
    generate('global', 'Global', [{
      kind: 'globalobj'
    }], globalUrl);
  }

  // some browsers can't make the dropdown work
  if (view.nav.module && view.nav.module.members.length) {
    generate('module', view.nav.module.title, [{
      kind: 'sectionIndex',
      contents: view.nav.module
    }], navigationMaster.module.link);
  }

  if (view.nav.class && view.nav.class.members.length) {
    generate('class', view.nav.class.title, [{
      kind: 'sectionIndex',
      contents: view.nav.class
    }], navigationMaster.class.link);
  }

  if (view.nav.namespace && view.nav.namespace.members.length) {
    generate('namespace', view.nav.namespace.title, [{
      kind: 'sectionIndex',
      contents: view.nav.namespace
    }], navigationMaster.namespace.link);
  }

  if (view.nav.mixin && view.nav.mixin.members.length) {
    generate('mixin', view.nav.mixin.title, [{
      kind: 'sectionIndex',
      contents: view.nav.mixin
    }], navigationMaster.mixin.link);
  }

  if (view.nav.interface && view.nav.interface.members.length) {
    generate('interface', view.nav.interface.title, [{
      kind: 'sectionIndex',
      contents: view.nav.interface
    }], navigationMaster.interface.link);
  }

  if (view.nav.external && view.nav.external.members.length) {
    generate('external', view.nav.external.title, [{
      kind: 'sectionIndex',
      contents: view.nav.external
    }], navigationMaster.external.link);
  }

  if (view.nav.tutorial && view.nav.tutorial.members.length) {
    generate('tutorial', view.nav.tutorial.title, [{
      kind: 'sectionIndex',
      contents: view.nav.tutorial
    }], navigationMaster.tutorial.link);
  }

  // index page displays information from package.json and lists files
  var files = find({
      kind: 'file'
    }),
    packages = find({
      kind: 'package'
    });

  generate('index', 'Index',
    packages.concat(
      [{
        kind: 'mainpage',
        readme: opts.readme,
        longname: (opts.mainpagetitle) ? opts.mainpagetitle : 'Main Page'
      }]
    ).concat(files),
    indexUrl);

  // set up the lists that we'll use to generate pages
  var classes = taffy(members.classes);
  var modules = taffy(members.modules);
  var namespaces = taffy(members.namespaces);
  var mixins = taffy(members.mixins);
  var interfaces = taffy(members.interfaces);
  var externals = taffy(members.externals);

  for (var longname in helper.longnameToUrl) {
    if (hasOwnProp.call(helper.longnameToUrl, longname)) {
      var myClasses = helper.find(classes, {
        longname: longname
      });
      if (myClasses.length) {
        generate('class', 'Class: ' + myClasses[0].name, myClasses, helper.longnameToUrl[longname]);
      }

      var myModules = helper.find(modules, {
        longname: longname
      });
      if (myModules.length) {
        generate('module', 'Module: ' + myModules[0].name, myModules, helper.longnameToUrl[longname]);
      }

      var myNamespaces = helper.find(namespaces, {
        longname: longname
      });
      if (myNamespaces.length) {
        generate('namespace', 'Namespace: ' + myNamespaces[0].name, myNamespaces, helper.longnameToUrl[longname]);
      }

      var myMixins = helper.find(mixins, {
        longname: longname
      });
      if (myMixins.length) {
        generate('mixin', 'Mixin: ' + myMixins[0].name, myMixins, helper.longnameToUrl[longname]);
      }

      var myInterfaces = helper.find(interfaces, {
        longname: longname
      });
      if (myInterfaces.length) {
        generate('interface', 'Interface: ' + myInterfaces[0].name, myInterfaces, helper.longnameToUrl[longname]);
      }

      var myExternals = helper.find(externals, {
        longname: longname
      });
      if (myExternals.length) {
        generate('external', 'External: ' + myExternals[0].name, myExternals, helper.longnameToUrl[longname]);
      }
    }
  }

  // TODO: move the tutorial functions to templateHelper.js
  function generateTutorial(title, tutorial, filename) {
    var tutorialData = {
      title: title,
      header: tutorial.title,
      content: tutorial.parse(),
      children: tutorial.children,
      docs: null
    };

    var tutorialPath = path.join(outdir, filename),
      html = view.render('tutorial.tmpl', tutorialData);

    // yes, you can use {@link} in tutorials too!
    html = helper.resolveLinks(html); // turn {@link foo} into <a href="foodoc.html">foo</a>

    if (searchEnabled) {
      searchableDocuments[filename] = {
        "id": filename,
        "title": title,
        "body": searchData(html)
      };
    }

    fs.writeFileSync(tutorialPath, html, 'utf8');
  }

  // tutorials can have only one parent so there is no risk for loops
  function saveChildren(node) {
    node.children.forEach(function(child) {
      generateTutorial('Tutorial: ' + child.title, child, helper.tutorialToUrl(child.name));
      saveChildren(child);
    });
  }

  function generateQuickTextSearch(templatePath, searchableDocuments, navOptions) {
      var data = {
          searchableDocuments: JSON.stringify(searchableDocuments),
          navOptions: navOptions
      };

      var tmplString = fs.readFileSync(templatePath + "/quicksearch.tmpl").toString(),
            tmpl = _.template(tmplString);

      var html = tmpl(data),
            outpath = path.join(outdir, "quicksearch.html");

      fs.writeFileSync(outpath, html, "utf8");
  }

  saveChildren(tutorials);

  if (searchEnabled) {
      generateQuickTextSearch(templatePath + '/tmpl', searchableDocuments, navOptions);
  }
};
