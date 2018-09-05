!function(e){if("object"==typeof module&&"object"==typeof module.exports){var t=e(require,exports);void 0!==t&&(module.exports=t)}else"function"==typeof define&&define.amd&&define(["require","exports","./languageFacts","./lintRules","../parser/cssNodes","vscode-nls"],e)}(function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=e("./languageFacts"),n=e("./lintRules"),i=e("../parser/cssNodes"),o=e("vscode-nls").loadMessageBundle(),a=function(){return function(e,t){this.name=e,this.node=t}}(),s=function(){function e(){this.data={}}return e.prototype.add=function(e,t,r){var n=this.data[e];n||(n={nodes:[],names:[]},this.data[e]=n),n.names.push(t),r&&n.nodes.push(r)},e}(),l=function(){function e(e,t){this.warnings=[],this.settings=t,this.documentText=e.getText(),this.keyframes=new s}return e.entries=function(t,r,n,i){var o=new e(r,n);return t.acceptVisitor(o),o.completeValidations(),o.getEntries(i)},e.prototype.fetch=function(e,t){for(var r=[],n=0,i=e;n<i.length;n++){var o=i[n];o.name===t&&r.push(o)}return r},e.prototype.fetchWithValue=function(e,t,r){for(var n=[],i=0,o=e;i<o.length;i++){var a=o[i];if(a.name===t){var s=a.node.getValue();s&&this.findValueInExpression(s,r)&&n.push(a)}}return n},e.prototype.findValueInExpression=function(e,t){var r=!1;return e.accept(function(e){return e.type===i.NodeType.Identifier&&e.getText()===t&&(r=!0),!r}),r},e.prototype.getEntries=function(e){return void 0===e&&(e=i.Level.Warning|i.Level.Error),this.warnings.filter(function(t){return 0!=(t.getLevel()&e)})},e.prototype.addEntry=function(e,t,r){var n=new i.Marker(e,t,this.settings.get(t),r);this.warnings.push(n)},e.prototype.getMissingNames=function(e,t){e=e.slice(0);for(i=0;i<t.length;i++){var r=e.indexOf(t[i]);-1!==r&&(e[r]=null)}for(var n=null,i=0;i<e.length;i++){var a=e[i];a&&(n=null===n?o("namelist.single","'{0}'",a):o("namelist.concatenated","{0}, '{1}'",n,a))}return n},e.prototype.visitNode=function(e){switch(e.type){case i.NodeType.Keyframe:return this.visitKeyframe(e);case i.NodeType.FontFace:return this.visitFontFace(e);case i.NodeType.Ruleset:return this.visitRuleSet(e);case i.NodeType.SimpleSelector:return this.visitSimpleSelector(e);case i.NodeType.Function:return this.visitFunction(e);case i.NodeType.NumericValue:return this.visitNumericValue(e);case i.NodeType.Import:return this.visitImport(e);case i.NodeType.HexColorValue:return this.visitHexColorValue(e);case i.NodeType.Prio:return this.visitPrio(e)}return!0},e.prototype.completeValidations=function(){this.validateKeyframes()},e.prototype.visitKeyframe=function(e){var t=e.getKeyword(),r=t.getText();return this.keyframes.add(e.getName(),r,"@keyframes"!==r?t:null),!0},e.prototype.validateKeyframes=function(){var e=["@-webkit-keyframes","@-moz-keyframes","@-o-keyframes"];for(var t in this.keyframes.data){var r=this.keyframes.data[t].names,i=-1===r.indexOf("@keyframes");if(i||1!==r.length){var a=this.getMissingNames(e,r);if(a||i)for(var s=0,l=this.keyframes.data[t].nodes;s<l.length;s++){var d=l[s];if(i){u=o("keyframes.standardrule.missing","Always define standard rule '@keyframes' when defining keyframes.");this.addEntry(d,n.Rules.IncludeStandardPropertyWhenUsingVendorPrefix,u)}if(a){var u=o("keyframes.vendorspecific.missing","Always include all vendor specific rules: Missing: {0}",a);this.addEntry(d,n.Rules.AllVendorPrefixes,u)}}}}return!0},e.prototype.visitSimpleSelector=function(e){var t=this.documentText.charAt(e.offset);return 1===e.length&&"*"===t&&this.addEntry(e,n.Rules.UniversalSelector),"#"===t&&this.addEntry(e,n.Rules.AvoidIdSelector),!0},e.prototype.visitImport=function(e){return this.addEntry(e,n.Rules.ImportStatemement),!0},e.prototype.visitRuleSet=function(t){var l=t.getDeclarations();if(!l)return!1;l.hasChildren()||this.addEntry(t.getSelectors(),n.Rules.EmptyRuleSet);for(var d=this,u=[],f=0,h=l.getChildren();f<h.length;f++)if((U=h[f])instanceof i.Declaration){var p=U;u.push(new a(p.getFullPropertyName().toLowerCase(),p))}if(0===this.fetch(u,"box-sizing").length){var c=this.fetch(u,"width");if(c.length>0){for(var y=!1,g=0,v=["border","border-left","border-right","padding","padding-left","padding-right"];g<v.length;g++)for(var m=v[g],w=0,x=this.fetch(u,m);w<x.length;w++)(L=(U=x[w]).node.getValue())&&!L.matches("none")&&(this.addEntry(U.node,n.Rules.BewareOfBoxModelSize),y=!0);if(y)for(var E=0,P=c;E<P.length;E++){var R=P[E];this.addEntry(R.node,n.Rules.BewareOfBoxModelSize)}}var k=this.fetch(u,"height");if(k.length>0){for(var y=!1,V=0,b=["border","border-top","border-bottom","padding","padding-top","padding-bottom"];V<b.length;V++)for(var m=b[V],S=0,N=this.fetch(u,m);S<N.length;S++)(L=(U=N[S]).node.getValue())&&!L.matches("none")&&(this.addEntry(U.node,n.Rules.BewareOfBoxModelSize),y=!0);if(y)for(var I=0,T=k;I<T.length;I++){var D=T[I];this.addEntry(D.node,n.Rules.BewareOfBoxModelSize)}}}var F=this.fetchWithValue(u,"display","inline");if(F.length>0)for(var A=0,C=["width","height","margin-top","margin-bottom","float"];A<C.length;A++)for(var B=C[A],M=d.fetch(u,B),K=0;K<M.length;K++){var W=M[K].node,L=W.getValue();("float"!==B||L&&!L.matches("none"))&&d.addEntry(W,n.Rules.PropertyIgnoredDueToDisplay,o("rule.propertyIgnoredDueToDisplayInline","Property is ignored due to the display. With 'display: inline', the width, height, margin-top, margin-bottom, and float properties have no effect."))}if((F=this.fetchWithValue(u,"display","inline-block")).length>0)for(var M=this.fetch(u,"float"),K=0;K<M.length;K++){var O=M[K].node;(L=O.getValue())&&!L.matches("none")&&this.addEntry(O,n.Rules.PropertyIgnoredDueToDisplay,o("rule.propertyIgnoredDueToDisplayInlineBlock","inline-block is ignored due to the float. If 'float' has a value other than 'none', the box is floated and 'display' is treated as 'block'"))}if((F=this.fetchWithValue(u,"display","block")).length>0)for(var M=this.fetch(u,"vertical-align"),K=0;K<M.length;K++)this.addEntry(M[K].node,n.Rules.PropertyIgnoredDueToDisplay,o("rule.propertyIgnoredDueToDisplayBlock","Property is ignored due to the display. With 'display: block', vertical-align should not be used."));for(var z=this.fetch(u,"float"),K=0;K<z.length;K++)this.addEntry(z[K].node,n.Rules.AvoidFloat);for(oe=0;oe<u.length;oe++){var U=u[oe];if("background"!==U.name&&(L=U.node.getValue())&&"-"!==this.documentText.charAt(L.offset)){var H=this.fetch(u,U.name);if(H.length>1)for(var j=0;j<H.length;j++){var q=H[j].node.getValue();q&&"-"!==this.documentText.charAt(q.offset)&&H[j]!==U&&this.addEntry(U.node,n.Rules.DuplicateDeclarations)}}}for(var _=new s,Z=!1,G=0,J=l.getChildren();G<J.length;G++){var Q=J[G];if(this.isCSSDeclaration(Q)){var X=(p=Q).getFullPropertyName(),Y=X.charAt(0);if("-"===Y){if("-"!==X.charAt(1)){r.isKnownProperty(X)||this.addEntry(p.getProperty(),n.Rules.UnknownVendorSpecificProperty);var $=p.getNonPrefixedPropertyName();_.add($,X,p.getProperty())}}else"*"!==Y&&"_"!==Y||(this.addEntry(p.getProperty(),n.Rules.IEStarHack),X=X.substr(1)),r.isKnownProperty(X)||this.addEntry(p.getProperty(),n.Rules.UnknownProperty,o("property.unknownproperty.detailed","Unknown property: '{0}'",X)),_.add(X,X,null)}else Z=!0}if(!Z)for(var ee in _.data){var te=_.data[ee],re=te.names,ne=r.isKnownProperty(ee)&&-1===re.indexOf(ee);if(ne||1!==re.length){for(var ie=[],oe=0,ae=e.prefixes.length;oe<ae;oe++){var se=e.prefixes[oe];r.isKnownProperty(se+ee)&&ie.push(se+ee)}var le=this.getMissingNames(ie,re);if(le||ne)for(var de=0,ue=te.nodes;de<ue.length;de++){var fe=ue[de];if(ne){he=o("property.standard.missing","Also define the standard property '{0}' for compatibility",ee);this.addEntry(fe,n.Rules.IncludeStandardPropertyWhenUsingVendorPrefix,he)}if(le){var he=o("property.vendorspecific.missing","Always include all vendor specific properties: Missing: {0}",le);this.addEntry(fe,n.Rules.AllVendorPrefixes,he)}}}}return!0},e.prototype.visitPrio=function(e){return this.addEntry(e,n.Rules.AvoidImportant),!0},e.prototype.visitNumericValue=function(e){var t=e.getValue();return!t.unit||-1===r.units.length.indexOf(t.unit.toLowerCase())||(0===parseFloat(t.value)&&t.unit&&this.addEntry(e,n.Rules.ZeroWithUnit),!0)},e.prototype.visitFontFace=function(e){var t=e.getDeclarations();if(t){for(var r=!1,i=!1,o=!1,a=0,s=t.getChildren();a<s.length;a++){var l=s[a];if(this.isCSSDeclaration(l)){var d=l.getProperty().getName().toLowerCase();"src"===d&&(r=!0),"font-family"===d&&(i=!0)}else o=!0}return o||r&&i||this.addEntry(e,n.Rules.RequiredPropertiesForFontFace),!0}},e.prototype.isCSSDeclaration=function(e){if(e instanceof i.Declaration){if(!e.getValue())return!1;var t=e.getProperty();return!(!t||t.getIdentifier().containsInterpolation())}return!1},e.prototype.visitHexColorValue=function(e){var t=e.length;return 9!==t&&7!==t&&5!==t&&4!==t&&this.addEntry(e,n.Rules.HexColorLength),!1},e.prototype.visitFunction=function(e){var t=-1,r=0;switch(e.getName().toLowerCase()){case"rgb(":case"hsl(":t=3;break;case"rgba(":case"hsla(":t=4}return-1!==t&&(e.getArguments().accept(function(e){return!(e instanceof i.BinaryExpression)||(r+=1,!1)}),r!==t&&this.addEntry(e,n.Rules.ArgsInColorFunction)),!0},e.prefixes=["-ms-","-moz-","-o-","-webkit-"],e}();t.LintVisitor=l});