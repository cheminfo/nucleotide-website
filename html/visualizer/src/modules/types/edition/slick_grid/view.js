'use strict';function _slicedToArray(e,t){return _arrayWithHoles(e)||_iterableToArrayLimit(e,t)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function _iterableToArrayLimit(e,t){var o=[],i=!0,l=!1,n=void 0;try{for(var r,d=e[Symbol.iterator]();!(i=(r=d.next()).done)&&(o.push(r.value),!(t&&o.length===t));i=!0);}catch(e){l=!0,n=e}finally{try{i||null==d["return"]||d["return"]()}finally{if(l)throw n}}return o}function _arrayWithHoles(e){if(Array.isArray(e))return e}define(["jquery","modules/default/defaultview","src/util/debug","lodash","slickgrid","src/util/util","src/util/ui","src/util/color","src/util/api","src/util/typerenderer","src/util/sandbox","src/data/structures","./copyFormatters"],function(t,e,o,l,n,r,d,i,a,s,c,u,g){"use strict";function m(){}function p(e){return!e.colDef}function h(d){d.$container.html(""),d.ignoreMyHighlights=d.module.getConfigurationCheckbox("slickCheck","ignoreMyHighlights");var a=d.getAllSlickColumns().filter(k),s=l.map(a,"id");for(var c in d.columnFilters)-1===s.indexOf(c)&&delete d.columnFilters[c];if(d.hiddenColumns||(d.hiddenColumns=a.map(function(e){if(e.colDef&&e.colDef.hideColumn&&"yes"===e.colDef.hideColumn[0])return e.name}).filter(function(e){return e})),d.slick.columns=d.getInMainColumns(),d.$rowToolbar=t("<div>").attr("class","rowToolbar"),d.module.getConfigurationCheckbox("toolbar","add")&&(d.$addButton=t("<input type=\"button\" value=\"New\"/>"),d.$addButton.on("click",function(){var e=d.grid.getColumns(),t=l.findIndex(e,function(e){return e.editor});-1<t&&(d.preventRowHelp(),d.grid.gotoCell(d.slick.data.getLength(),t,!0)),d._openDetails()}),d.$rowToolbar.append(d.$addButton)),d.module.getConfigurationCheckbox("toolbar","update")&&(d.$updateButton=t("<input type=\"button\" value=\"Update\"/>"),d.$updateButton.on("click",function(){d._openDetails()}),d.$rowToolbar.append(d.$updateButton)),d.module.getConfigurationCheckbox("toolbar","remove")&&(d.$deleteButton=t("<input type=\"button\" value=\"Delete\"/>"),d.$deleteButton.on("click",function(){d.deleteRowSelection()}),d.$rowToolbar.append(d.$deleteButton)),d.module.getConfigurationCheckbox("toolbar","showHide")){d.$showHideSelection=t.tmpl("<input type=\"button\" value=\"Show/Hide Column\"/>\n    <div class=\"mutliSelect\" style=\"display:none\">\n        <ul>\n            {{each columns}}\n            \n            <li><input type=\"checkbox\" value=\"${name}\" checked/>${name}</li>\n            {{/each}}\n        </ul>\n    </div>",{columns:a}),d.columnSelectionShown&&d.$showHideSelection.filter("div").show(),d.$showHideSelection.on("click",function(){d.$showHideSelection.filter("div").toggle(),d.columnSelectionShown=d.$showHideSelection.filter("div").is(":visible"),d.onResize()});for(var u=0;u<d.hiddenColumns.length;u++)d.$showHideSelection.find(`input[value="${d.hiddenColumns[u]}"]`).removeAttr("checked");d.$showHideSelection.find("input[type=\"checkbox\"]").on("change",function(){return this.checked?d.hideColumn(this.value):d.showColumn(this.value),h(d)}),d.$rowToolbar.append(d.$showHideSelection)}d.$actionButtons=Array(d.actionOutButtons.length);for(var u=0;u<d.actionOutButtons.length;u++)(function(e){d.$actionButtons[e]=t(`<input type="button" value="${d.actionOutButtons[e].buttonTitle}"/>`),d.$actionButtons[e].on("click",function(){d.module.controller.sendActionButton(d.actionOutButtons[e].actionName,d._getSelectedItems())})})(u);d.$rowToolbar.append(d.$actionButtons),d.$container.append(d.$rowToolbar),d.module.getConfiguration("toolbar")&&0===d.module.getConfiguration("toolbar").length&&d.$actionButtons&&0===d.$actionButtons.length&&d.$rowToolbar&&d.$rowToolbar.remove(),d.$slickgrid=t("<div>").addClass("flex-1"),d.$container.append(d.$slickgrid),d.slick.groupItemMetadataProvider=new n.Data.GroupItemMetadataProvider,d.slick.plugins.push(d.slick.groupItemMetadataProvider),d.slick.data=new n.Data.DataView({groupItemMetadataProvider:d.slick.groupItemMetadataProvider}),d.slick.data.setModule(d.module),d.grid=new n.Grid(d.$slickgrid,d.slick.data,d.slick.columns,d.slick.options),d.slick.grid=d.grid,d._newSandbox();for(var u=0;u<d.slick.plugins.length;u++)d.grid.registerPlugin(d.slick.plugins[u]);if("row"===d.module.getConfiguration("slick.selectionModel")?d.grid.setSelectionModel(new n.RowSelectionModel):d.grid.setSelectionModel(new n.CellSelectionModel),d.module.getConfigurationCheckbox("copyPaste","active")&&d.grid.registerPlugin(new n.CellExternalCopyManager({noAutoFocus:d.module.getConfigurationCheckbox("copyPasteOptions","noAutoFocus"),readOnlyMode:d.module.getConfigurationCheckbox("copyPasteOptions","readOnly"),newRowCreator:function(e){if(d.module.getConfigurationCheckbox("copyPasteOptions","newRows")){const t=[];for(let o=0;o<e;o++)t.push({});d.onActionReceive.addRow.call(d,t)}},dataItemColumnValueExtractor:function(e,o){const i=g[o.colDef.copyFormatter];if(i)return i.extract(e,o);if(o.CpEditor){var l={container:t("<p>"),column:o,position:{top:0,left:0},grid:d.grid},n=new o.CpEditor(l);n.loadValue(e);var r=n.serializeValue();return n.destroy(),r}}})),d.module.getConfigurationCheckbox("autoColumns","reorder")){var e=new n.RowMoveManager({cancelEditOnDrag:!0});e.onBeforeMoveRows.subscribe(function(t,e){for(var o=0;o<e.rows.length;o++)if(e.rows[o]==e.insertBefore||e.rows[o]==e.insertBefore-1)return t.stopPropagation(),!1;return!0}),e.onMoveRows.subscribe(function(e,t){var o=t.rows;o=o.map(function(e){return d._getItemInfoFromRow(e).idx});var l=d._getItemInfoFromRow(t.insertBefore);null!==l&&(l=l.idx),d._makeDataObjects();for(var n=d.slick.data.getItems(),r=0;r<n.length;r++)n[r].__pos=-1===o.indexOf(r)?r<l||null===l?1:3:2;d.slick.data.sort(y);for(var r=0;r<n.length;r++)delete n[r].__pos;d.grid.invalidateAllRows(),d.grid.render(),d.module.model.dataTriggerChange(d.module.data)}),d.grid.registerPlugin(e),d.grid.onDragInit.subscribe(function(t){t.stopImmediatePropagation()}),d.grid.onDragStart.subscribe(function(o,e){var i=this.module.data.get(),l=d.grid.getCellFromEvent(o);if(l&&(e.row=l.row,!!i[e.row])&&!n.GlobalEditorLock.isActive()){o.stopImmediatePropagation(),e.mode="recycle";var r=d.grid.getSelectedRows();r.length&&-1!=t.inArray(e.row,r)||(r=[e.row],d.grid.setSelectedRows(r)),e.rows=r,e.count=r.length;var a=t("<span></span>").css({position:"absolute",display:"inline-block",padding:"4px 10px",background:"#e0e0e0",border:"1px solid gray","z-index":99999,"-moz-border-radius":"8px","-moz-box-shadow":"2px 2px 6px silver"}).appendTo("body");return e.helper=a,t(e.available).css("background","pink"),a}}),d.grid.onDrag.subscribe(function(t,e){"recycle"!=e.mode||e.helper.css({top:t.pageY+5,left:t.pageX+5})}),d.grid.onDragEnd.subscribe(function(e,o){"recycle"!=o.mode||(o.helper.remove(),t(o.available).css("background","beige"))})}t(d.grid.getHeaderRow()).delegate(":input","change keyup",l.debounce(function(){var e=t(this).data("columnId");null!=e&&(d.columnFilters[e]=t.trim(t(this).val()),d.columnFilterFunctions[e]=b(d.columnFilters[e]),d.slick.data.refresh())},250)),d.grid.onHeaderRowCellRendered.subscribe(function(e,o){t(o.node).empty(),t("<input type='text'>").css("width","100%").data("columnId",o.column.id).val(d.columnFilters[o.column.id]).appendTo(o.node)}),d.grid.init(),d._activateHighlights(),d.grid.module=d.module,d.slick.data.syncGridSelection(d.grid,!0),d.module.getConfigurationCheckbox("slickCheck","oneUncollapsed")&&d.slick.groupItemMetadataProvider.onGroupExpanded.subscribe(function(e,t){this.getData().collapseAllGroups(t.item.level),this.getData().expandGroup(t.item.groupingKey)}),d.slick.data.onRowCountChanged.subscribe(function(){d.grid.updateRowCount(),d.grid.render()}),d.slick.data.onRowsChanged.subscribe(function(e,t){if(d.hasFilter){var o=d._getItemsInfo(t.rows);d._runFilter({event:"rowsChanged",rows:o})}d.grid.invalidateRows(t.rows),d.grid.render()}),d.grid.onAddNewRow.subscribe(function(e,t){const o=t.item;d.setNextUniqId(o,!0),d.slick.data.addItem(o),d._newRow(o,t)}),d.grid.onRenderCompleted.subscribe(function(){d._jpathColor()}),d.grid.onViewportChanged.subscribe(function(){function e(){if(d.lastViewport=d.grid.getViewport(),d.module.getConfigurationCheckbox("slickCheck","rowNumbering")&&!d._preventRowHelp){var e=d.grid.getDataLength();d.$rowHelp.html(`${Math.min(e,d.lastViewport.bottom-(d.addRowAllowed?2:1)).toString()}/${e}`),d.$rowHelp.fadeIn(),clearTimeout(d.lastRowHelp),d.lastRowHelp=setTimeout(function(){d.$rowHelp.fadeOut()},1e3)}d._preventRowHelp=!1,d._jpathColor(),d._inViewFilter()}setTimeout(function(){var t=d.grid.getViewport();t!==d.lastViewport&&e()},250),e()}),d.grid.onMouseEnter.subscribe(function(t){d._hl&&d.module.model.highlightId(d._hl,0),d.count=void 0===d.count?0:d.count,d.count++,d.hovering=!0;var e=d._getItemInfoFromEvent(t);if(e){var o=e.item._highlight;d._hl=o,o&&(d.module.model.highlightId(o,1),D=o),d.module.controller.onHover(e.idx,e.item)}}),d.grid.onMouseLeave.subscribe(function(t){d._e=t,d.count--,d.hovering=!1;var e=d._getItemInfoFromEvent(t);if(e){var o=e.item._highlight;o?d.module.model.highlightId(o,0):D&&d.module.model.highlightId(D,0)}}),d.grid.onColumnsResized.subscribe(function(){var e=d.grid.getColumns();for(let o=0;o<e.length;o++){var t=d.colConfig.find(function(t){return t===e[o].colDef});t&&(t.width=e[o].width)}d.grid.invalidate()}),d.grid.onCellChange.subscribe(function(e,t){if(d.fromPopup)var o=d.getColumnsGivenEditContext();else var l=d._getChangedColumn(t.cell);if(!p(l)){var n=d._getItemInfoFromRow(t.row);if(n){if(d.hasFilter){if(o)for(var r=0;r<o.length;r++)d._runFilter({event:"cellChanged",row:n,cell:d._getCell({row:t.row,cell:r}),previous:t.previous,column:o[r]});else d._runFilter({event:"cellChanged",row:n,cell:d._getCell(t),column:l,previous:t.previous});d._runFilter({event:"rowsChanged",rows:[n]})}d.module.controller.onRowChange(n.idx,n.item)}}}),d.grid.onClick.subscribe(function(e,t){var o=d.grid.getColumns(),i=d._getItemInfoFromRow(t.row);i&&o[t.cell]&&"rowDeletion"!==o[t.cell].id&&(!o[t.cell].colDef||!o[t.cell].colDef.isAction)&&d.module.controller.onClick(i.idx,i.item)}),d.grid.onDblClick.subscribe(function(e,t){var o=d._getItemInfoFromRow(t.row);d.module.controller.onDoubleClick(o.idx,o.item)}),d.grid.onActiveCellChanged.subscribe(function(e,t){d.lastActiveCell=t.cell,d.lastActiveRow=t.row;var o=d._getItemInfoFromRow(t.row);if(o){var i=d.grid.getColumns();i[t.cell]&&"rowDeletion"!==i[t.cell].id&&d.module.controller.onActive(o.idx,o.item)}}),d.grid.onColumnsReordered.subscribe(function(){var e=d.grid.getColumns(),t=d.module.definition.configuration.groups.cols[0],n=l.map(t,"name"),r=l.map(e,"id");if(n.concat().sort().join()!==r.concat().sort().join())return void o.warn("Something might be wrong, number of columns in grid and in configuration do not match");d.module.definition.configuration.groups.cols[0]=[];for(var a,s=0;s<e.length;s++)a=n.indexOf(r[s]),-1<a&&d.module.definition.configuration.groups.cols[0].push(t[a])}),d.grid.onSelectedRowsChanged.subscribe(function(e,t){d.lastSelectedRows=t.rows.slice();var o=d._getItemsInfo(d.lastSelectedRows);if(d.hasFilter&&d._runFilter({event:"rowsSelected",rows:o}),o.length){const e=o[d.lastSelectedRows.length-1];d.module.controller.onLastSelectedRow(e.idx,e.item)}else d.module.controller.unselectLastRow();d.module.controller.onRowsSelected(l.map(o,"item"))}),d.grid.onSort.subscribe(function(e,t){d._makeDataObjects();var o=t.sortCols?t.sortCols:[{sortCol:t.sortCol,sortAsc:t.sortAsc}];for(let n=o.length-1;0<=n;n--){var l=function(e,t){return void 0===e?o[n].sortAsc?1:-1:void 0===t?o[n].sortAsc?-1:1:e<t?-1:t<e?1:0};let e=o[n],t=e.sortCol.jpath;d.slick.data.sort(l,e.sortAsc,function(e){var o=e.getChildSync(t);return void 0!==o&&(o=o.get()),o})}d._updateHighlights(),d.grid.invalidateAllRows(),d.grid.render(),d.module.model.dataTriggerChange(this.module.data)}),d.slick.data.beginUpdate();var r=l.chain(d.module.getConfiguration("groupings")).filter(e=>e&&e.groupName&&e.getter).map(e=>{var t={};return e.getter&&1<e.getter.length?(t.getter=function(t){return t.getChildSync(e.getter)},d._makeDataObjects()):t.getter=e.getter[0],t.formatter=function(t){return`${e.groupName}: ${t.value}  <span style='color:green'>(${t.count} items)</span>`},t.aggregateCollapsed=!1,t.lazyTotalsCalculation=!0,t}).value();r.length&&(d.slick.data.setGrouping(r),d.module.getConfigurationCheckbox("slickCheck","collapseGroup")&&d.slick.data.collapseAllGroups(0)),d.module.getConfigurationCheckbox("slickCheck","filterColumns")&&d.searchFilter&&d.slick.data.setFilter(d.searchFilter),d.slick.data.setItems(d.module.data.get(),d.idPropertyName),d.slick.data.endUpdate(),d.lastViewport&&!d.module.getConfigurationCheckbox("slickCheck","backToTop")&&d.grid.scrollRowToTop(d.lastViewport.top),!d.module.getConfigurationCheckbox("slickCheck","forgetLastSelected")&&Array.isArray(d.lastSelectedRows)&&d.grid.setSelectedRows(d.lastSelectedRows),l.isUndefined(d.lastActiveRow)||d.module.getConfigurationCheckbox("slickCheck","forgetLastActive")||d.grid.gotoCell(d.lastActiveRow,d.lastActiveCell,!1,!0),d.grid.render(),d._setBaseCellCssStyle(),d.lastViewport=d.grid.getViewport(),d._jpathColor(),d._inViewFilter()}function C(){return"..."}function f(){return"<div style=\"width:100%; height: 100%;\"><a class=\"icon-clickable recycle-bin\"><i class=\"centered-icon fa fa-trash\"></i></a></div>"}function w(e,t,o,i){if(!o.__group&&(this.module.data.traceSync([t]),e)){var l=i.rendererOptions||{};i.renderType&&(l.forceType=i.renderType),s.render(e,o,i.jpath,l),this.postRenderer(e,t,o,i)}}function b(e){var t;if(t=e.match(/^"(.*)"$/),t)return function(e){return t=t.toLowerCase(),e=(e+"").toLowerCase(),e.match(t[1])};if(t=e.match(/^\/(.+)\/(i?)/),t)return function(e){return(e+"").match(new RegExp(t[1],t[2]||void 0))};if(t=e.match(/^([<>=]{1,2})([0-9]+)-([0-9\-:]*)$/),t){t=e.match(/^([<>=]{0,2})([0-9]+)-([0-9]*)-?([0-9]*)/);let o=parseInt(t[2],10),i=parseInt(t[3],10),l=parseInt(t[4],10);Number.isNaN(i)&&(i=1),Number.isNaN(l)&&(l=1);const n=new Date;if(n.setUTCFullYear(o),n.setUTCMonth(i-1),n.setUTCDate(l),n.setUTCHours(0),n.setUTCMinutes(0),n.setUTCSeconds(0),n.setUTCMilliseconds(0),"<"===t[1])return function(e){const t=new Date(e);return t<n};if(">"===t[1])return function(e){const t=new Date(e);return t>n};if("<="===t[1])return function(e){const t=new Date(e);return t<=n};if(">="===t[1])return function(e){const t=new Date(e);return t>=n};throw new Error("Invalid date operator")}if(t=e.match(/^([<>=]{1,2})([0-9.-]+)$/),t){if("<"===t[1])return function(e){return e<t[2]};if("<="===t[1]||"=<"===t[1])return function(e){return e<=t[2]};if(">"===t[1])return function(e){return e>t[2]};if(">="===t[1]||"=>"===t[1])return function(e){return e>=t[2]};if("=="===t[1]||"="===t[1])return function(e){return e==t[2]}}return t=e.match(/^([0-9.-]+)\.\.([0-9.-]*)$/),t?function(e){return e>=t[1]&&e<=t[2]}:function(t){return(t+"").toLowerCase().match(e.toLowerCase())}}function k(e){return"rowDeletion"!==e.id&&"_checkbox_selector"!==e.id&&"__selectAndMove"!==e.id}function y(e,t){return e.__pos-t.__pos}var v=Symbol("_sgid"),_=[];_.push(r.loadCss("components/slickgrid/slick.grid.css"));var I=Promise.all(_),R=0,x={typerenderer:C,"slick.text":n.Formatters.Text,"slick.percent":n.Formatters.PercentComplete,"slick.percentbar":n.Formatters.PercentCompleteBar,"slick.yesno":n.Formatters.YesNoSelect},S={};for(var F in u)"string"==typeof u[F]&&(S[F]=S[u[F]]);S.string=n.CustomEditors.TextValue,S.number=n.CustomEditors.NumberValue,S.boolean=n.CustomEditors.BooleanValue,S.color=n.CustomEditors.ColorValue,S.date=n.CustomEditors.Date,S.longtext=n.CustomEditors.LongText,S.select=n.CustomEditors.Select,S.ocl=n.CustomEditors.OCL,S.unit=n.CustomEditors.Unit,t.extend(!0,m.prototype,e,{init:async function(){var e,o=this;if(this.columnFilters={},this.columnFilterFunctions={},this.searchFilter=void 0,this._setScript(""),this.title=this.module.definition.title+"",this.$container?this.$container.html(""):(this._id=r.getNextUniqueId(),this.$rowHelp=t("<div>").attr("class","rowHelp"),this.$container=t("<div>").attr("id",this._id).addClass("main-container"),this.module.getDomContent().html(this.$rowHelp),this.module.getDomContent().append(this.$container),this._setDeleteRowListener()),e=this.module.getConfigurationCheckbox("saveInView","yes")?this.module.getConfiguration("varname"):void 0,this.actionOutButtons=this.module.getConfiguration("actionOutButtons"),this.actionOutButtons=this.actionOutButtons||[],this.actionOutButtons=l.filter(this.actionOutButtons,e=>e.actionName&&e.buttonTitle),this.$container.on("mouseleave",function(){o.module.controller.lastHoveredItemId=null}),this.hiddenColumns=void 0,this.slick={},this.colConfig=this.module.getConfiguration("cols",[],!1).filter(function(e){return e.name}),this.actionColConfig=(this.module.getConfiguration("actionCols")||[]).filter(function(e){return e.name}).map(function(e){return e.isAction=!0,e}),this.idPropertyName=this.module.getConfiguration("idProperty")||v,this.autoIdProperty=!this.module.getConfiguration("idProperty"),"pref"===this.module.getConfiguration("filterType")&&this._setScript(this.module.getConfiguration("filterRow")),this.postRenderer=function(e,t,i,l){if(e){let t={event:"postRender",column:l,row:{item:i},renderOptions:{}};o._runFilter(t),o.postUpdateCell(e,t.renderOptions)}},this.actionRenderer=function(e,l,n,r){function d(){a.doAction(s.renderOptions.action,n)}if(e){var s={event:"renderAction",column:r,row:{item:n},renderOptions:{icon:r.colDef.icon,disabled:!1,action:r.colDef.action,tooltip:r.colDef.tooltip,backgroundColor:i.array2rgba(r.colDef.backgroundColor),color:r.colDef.color,clickMode:r.colDef.clickMode}};o._runFilter(s),e.innerHTML=s.renderOptions.disabled?"":s.renderOptions.icon&&s.renderOptions.icon.startsWith("fa-")?`<div style="width:100%; height: 100%"><a style="display: block; text-align:center;"><i class="fa ${s.renderOptions.icon} centered-icon"></i></a></div>`:`<div style="width:100%; height: 100%"><a>${s.renderOptions.icon}</a></div>`;var c=t(e);o.postUpdateCell(e,s.renderOptions),c.css("cursor","default");var u=c.find("a");u.attr("title",s.renderOptions.tooltip),s.renderOptions.action&&("text"===s.renderOptions.clickMode?(u.addClass("icon-clickable"),u.length&&(u[0].onclick=d)):"background"===s.renderOptions.clickMode&&(c.css("cursor","pointer"),c.off("click.action"),c.on("click.action",d))),u.css("color",i.array2rgba(s.renderOptions.color))}},e){const t=await a.createData(e,JSON.parse(this.module.getConfiguration("data")));t.onChange(()=>{this.module.definition.configuration.groups.data[0].data[0]=JSON.stringify(t)}),o.resolveReady()}else o.resolveReady()},loadEditors:async function(){const e=this.getAllSlickColumns(),t=e.filter(e=>e.editor&&e.editor.load);await Promise.all(t.map(e=>e.editor.load()))},postUpdateCell:function(e,o){var i=t(e);i.css(o)},preventRowHelp:function(){this._preventRowHelp=!0},deleteRowSelection:function(){for(var e,t=this.grid.getSelectedRows(),o=this.module.data.get(),l=Array(t.length),n=0;n<t.length;n++)e=this._getItemInfoFromRow(t[n]),l[n]=e.idx;l=l.sort();var r=0,d=[];for(n=0;n<t.length;n++){var a=o.splice(l[n]-r++,1);a.length&&d.push(a[0])}this.lastSelectedRows=[],d.length&&(this._deleteFilter(d),this.module.controller.onRowsDelete(d),this.module.data.triggerChange())},getAllSlickColumns:function(){function e(e){var o;if(d.module.data&&d.module.data.length){var i=d.module.data.get(0).getChildSync(e);return o=i instanceof DataString?n.CustomEditors.TextValue:i instanceof DataNumber?n.CustomEditors.NumberValue:i instanceof DataBoolean?n.CustomEditors.BooleanValue:S[t(e)],o}}function t(e){var t,o=e.slice(0);o.unshift(0);var i=d.module.data.getChildSync(o);return DataObject.isDataObject(i)&&(t=i.type),t}var d=this,a=w.bind(this),s=this.colConfig.filter(function(e){return e.name}).map(function(i){var l,s,c;"auto"===i.editor&&d.module.data?(d.module.data.get().length?(l=i.forceType?S[i.forceType]:e(i.jpath),l=l||e(i.jpath),c=t(i.jpath)):(l=n.CustomEditors.DataString,o.warn("Slick grid: using editor based on type when the input variable is empty. Cannot determine type")),s=l):(l=S[i.editor],s=l||e(i.jpath),c=t(i.jpath));var u=r.evalOptions(i.rendererOptions);return{id:i.name,name:i.name,field:i.name,width:+i.width||void 0,minWidth:+i.minWidth||void 0,maxWidth:+i.maxWidth||void 0,resizable:!0,selectable:!0,focusable:!0,sortable:!0,defaultSortAsc:!0,editor:l,CpEditor:s,compositeEditor:l===n.CustomEditors.LongText?n.CustomEditors.SimpleLongText:void 0,formatter:x[i.formatter],asyncPostRender:"typerenderer"===i.formatter?a:d.postRenderer.bind(this),jpath:i.jpath,simpleJpath:1===i.jpath.length,dataType:c,renderType:i.forceType,colDef:i,rendererOptions:u}});if(s=l.filter(s,e=>e.name),l.isEmpty(s)){for(var c=[],u=d.module.data.get(),g=0;g<u.length;g++)c=l(c).push(l.keys(u[g])).flatten().uniq().value();s=l(c).filter(e=>"_"!==e[0]).map(o=>({id:o,name:o,field:o,resisable:!0,selectable:!0,focusable:!0,sortable:!1,editor:e([o]),CpEditor:e([o]),dataType:t([o]),jpath:[o],formatter:x.typerenderer,asyncPostRender:a,colDef:{id:o,jpath:[o]}})).value()}for(var m=this.getActionColumns(),g=0;g<m.length;g++)"begin"===m[g].colDef.position?s.unshift(m[g]):s.push(m[g]);if(this.module.getConfigurationCheckbox("autoColumns","remove")&&s.unshift({id:"rowDeletion",width:30,field:"rowDeletion",selectable:!1,resizable:!1,focusable:!1,sortable:!1,formatter:f}),this.module.getConfigurationCheckbox("autoColumns","select")){var p=new n.CheckboxSelectColumn({cssClass:"slick-cell-checkboxsel"});this.slick.plugins.push(p),s.unshift(p.getColumnDefinition())}return this.module.getConfigurationCheckbox("autoColumns","reorder")&&s.unshift({id:"__selectAndMove",name:"",width:40,behavior:"selectAndMove",selectable:!1,resizable:!1,cssClass:"cell-reorder dnd",formatter:function(){return""}}),s},getSlickColumns:function(){var e=this,t=this.getAllSlickColumns();return t.filter(function(t){return-1===e.hiddenColumns.indexOf(t.name)})},getInMainColumns:function(){return this.getSlickColumns().filter(function(e){return!!p(e)||!e.colDef.visibility||"main"===e.colDef.visibility||"both"===e.colDef.visibility})},getInPopupColumns:function(){return this.getAllSlickColumns().filter(function(e){return!p(e)&&("popup"===e.colDef.visibility||"both"===e.colDef.visibility)}).filter(function(e){return e.editor}).filter(k)},getActionColumns:function(){var e=this;return this.actionColConfig.map(t=>({id:t.name,name:t.name,width:+t.width||25,minWidth:+t.minWidth||25,maxWidth:+t.maxWidth||25,selectable:!1,resizable:!0,focusable:!1,sortable:!1,formatter:C,asyncPostRender:e.actionRenderer,colDef:t}))},getColumnsGivenEditContext:function(){return this.fromPopup?this.getInPopupColumns():this.getInMainColumns()},getSlickOptions:function(){var e=this;return{editable:e.module.getConfigurationCheckbox("slickCheck","editable"),enableAddRow:e.module.getConfigurationCheckbox("slickCheck","enableAddRow"),enableCellNavigation:e.module.getConfigurationCheckbox("slickCheck","editable"),autoEdit:e.module.getConfigurationCheckbox("slickCheck","autoEdit"),enableTextSelectionOnCells:!0,enableColumnReorder:!0,forceFitColumns:e.module.getConfigurationCheckbox("slickCheck","forceFitColumns"),multiColumnSort:!0,asyncEditorLoading:!0,asyncEditorLoadDelay:30,enableAsyncPostRender:!0,asyncPostRenderDelay:0,defaultColumnWidth:e.module.getConfiguration("slick.defaultColumnWidth")||80,dataItemColumnValueExtractor:function(e){return e},explicitInitialization:!0,rowHeight:e.module.getConfiguration("slick.rowHeight"),showHeaderRow:e.module.getConfigurationCheckbox("slickCheck","filterColumns"),headerRowHeight:+e.module.getConfiguration("slick.headerRowHeight")}},_openDetails:function(){var o=this;if(!this.grid.getEditorLock().isActive()||this.grid.getEditorLock().commitCurrentEdit()){var i=this.getInPopupColumns();if(0!==i.length){var l=t("<div class='item-details-form'></div>");l=t.tmpl("<div class='item-details-form'>\n    {{each columns}}\n    <div class='item-details-label'>\n        ${name}\n    </div>\n    <div class='item-details-editor-container' data-editorid='${id.replace(/[^a-zA-Z0-9_-]/g, \"_\")}'></div>\n    {{/each}}\n\n    <hr/>\n    <div class='item-details-form-buttons'>\n        <button data-action='save'>Save</button>\n        <button data-action='cancel'>Cancel</button>\n    </div>\n</div>",{context:this.grid.getDataItem(this.grid.getActiveCell().row),columns:i}).appendTo("body"),l.keydown(function(i){i.which==t.ui.keyCode.ENTER?(o.fromPopup=!0,o.grid.getEditController().commitCurrentEdit(),o.fromPopup=!1,i.stopPropagation(),i.preventDefault()):i.which==t.ui.keyCode.ESCAPE&&(o.fromPopup=!0,o.grid.getEditController().cancelCurrentEdit(),o.fromPopup=!1,i.stopPropagation(),i.preventDefault())}),l.find("[data-action=save]").click(function(){o.fromPopup=!0,o.grid.getEditController().commitCurrentEdit(),o.fromPopup=!1}),l.find("[data-action=cancel]").click(function(){o.fromPopup=!0,o.grid.getEditController().cancelCurrentEdit(),o.fromPopup=!1});var r=t.map(i,function(e){return l.find(`[data-editorid=${e.id.replace(/[^a-zA-Z0-9_-]/g,"_")}]`)}),d=new n.CompositeEditor(i,r,{destroy:function(){l.remove()}});this.grid.editActiveCell(d)||l.remove()}}},inDom:function(){},update:{script:function(e){"invar"===this.module.getConfiguration("filterType")&&(this._setScript(e.get()),this._runFilter({event:"scriptChanged"})),this.rerender()},data:function(e,t){this.update.list.call(this,e,t)},list:function(e){var t=this;this.module.controller.lastClickedItem=void 0,this.module.data=e,this._updateHighlights(),this.dataObjectsDone=!1,this.slick.plugins=[],this.slick.options=this.getSlickOptions(),this.generateUniqIds(),this.addRowAllowed=this.module.getConfigurationCheckbox("slickCheck","enableAddRow");var o=this.module.getConfigurationCheckbox("slickCheck","keepSelected");this.searchFilter=function(e){if(o){var i=t._getSelectedItems();if(i.find(o=>e[t.idPropertyName]===o[t.idPropertyName]))return!0}for(var n in t.columnFilters)if(n!==void 0&&""!==t.columnFilters[n])try{var r=t.slick.data.getIdxById(e[t.idPropertyName]),d=t.grid.getColumns()[t.grid.getColumnIndex(n)],a=l.clone(DataObject.resurrect(d.jpath));a.unshift(r);var s=t.module.data.getChildSync(a);if(s&&s.get&&(s=s.get()),!t.columnFilterFunctions[n](s))return!1}catch(t){return!0}return!0};for(let t of this.colConfig)g[t.copyFormatter]&&g[t.copyFormatter].load();Promise.all([I,this.loadEditors()]).then(function(){h(t)})}},blank:{list:function(){this.$container.html("")},script:function(){"invar"===this.module.getConfiguration("filterType")&&this._setScript("")}},_newRow:function(e,t){this.module.controller.onRowNew(this.slick.data.getLength()-1,e),this.module.model.dataTriggerChange(this.module.data),this._runFilter({row:{item:e},column:t?t.column:null,cell:null,event:"newRow"})},_setBaseCellCssStyle:function(){var e=this.grid.getColumns();this.baseCellCssStyle={};for(var t=0;t<e.length;t++)this.baseCellCssStyle[e[t].id]="highlighted-cell"},_setDeleteRowListener:function(){var t=this;this.$container.on("click","a.recycle-bin",function(o){var e=t.grid.getColumns(),i=t.grid.getCellFromEvent(o);if(t.lastViewport=t.grid.getViewport(),e[i.cell]&&"rowDeletion"===e[i.cell].id){var l=t._getItemInfoFromRow(i.row),n=t.module.data.get().splice(l.idx,1);n.length&&(t._deleteFilter(n),t.module.controller.onRowsDelete(n),t.module.data.triggerChange())}})},_getItemInfoFromEvent:function(t){var e=this,o=this.grid.getCellFromEvent(t);if(!o)return null;var i=e.slick.data.mapRowsToIds([o.row])[0];return i?{id:i,idx:e.slick.data.getIdxById(i),item:e.slick.data.getItemById(i)}:null},_getItemInfoFromRow:function(e){var t=this;if(l.isUndefined(e))return null;var o=t.slick.data.mapRowsToIds([e])[0];return o?{id:o,idx:t.slick.data.getIdxById(o),item:t.slick.data.getItemById(o)}:null},_jpathColor:function(){var e=this;if(e.lastViewport){var o=e.module.getConfiguration("colorjPath");if(o&&0<o.length){e._makeDataObjects();for(var l,n=e.lastViewport.top;n<=e.lastViewport.bottom;n++)if(l=e.grid.getDataItem(n),l&&!0!==l.__group){var r=l.getChildSync(o),d=e.grid.getCellNode(n,0);r?t(d).parent().css("background-color",r.get()).addClass("has-color"):t(d).parent().css("background-color","").removeClass("has-color")}}}},_setScript:function(e){this.filterScript=e||"",this.hasFilter=this._hasFilter(),this._newSandbox()},_newSandbox:function(){this._sandbox=new c,this._sandbox.setContext(this._getNewContext());try{this.filter=this._sandbox.run(`(function() {${this.filterScript}\n})`,`Slickgrid${this.module.getId()}`)}catch(t){this._reportError(t)}},_runFilter:function(e){if(this.hasFilter)try{this.filter.call(e)}catch(t){this._reportError(t)}},_getNewContext:function(){var e=this;return{getSlick:function(){return e.slick},getData:function(){return e.module.data&&e.module.data.get()},rerender:function(t){e.rerender(t)},API:a}},rerender:function(e){this.grid&&(e?this.grid.invalidateRows(e):this.grid.invalidateAllRows(),this.grid.render())},_reportError:function(t){var i="";t&&t.stack&&(i=t.message,t=t.stack);var l="Code executor error";this.title&&(l+=` (${this.title})`),i&&(l+=`: ${i}`),o.error(l),o.warn(t)},_inViewFilter:function(){var e=this;if(e.hasFilter&&e.lastViewport){var t=e._getRowsFromViewport(),o=e._getItemsInfo(t);e._runFilter({rows:o,cell:null,event:"inView"})}},_deleteFilter:function(e){this.hasFilter&&this._runFilter({event:"rowsDeleted",rows:e})},_selectHighlight:function(){if(!this.hovering){var e=this;if(this.module.getConfigurationCheckbox("slickCheck","highlightScroll")){var t=l.findIndex(this._highlights,function(t){return void 0!==t&&(t===e._highlighted[0]||t.indexOf&&-1<t.indexOf(e._highlighted[0]))});if(-1<t){this.lastViewport=this.grid.getViewport();var o=e.slick.data.getItemByIdx(t),i=e.slick.data.getRowById(o[e.idPropertyName]);if(void 0===i)return;(i<this.lastViewport.top||i>=this.lastViewport.bottom)&&this.grid.scrollRowToTop(i)}}}},_updateHighlights:function(){this._highlights=l.map(this.module.data.get(),"_highlight")},_drawHighlight:function(){var e=this;this.grid.removeCellCssStyles("highlight");var t={};this._selectHighlight(),this.lastViewport=this.grid.getViewport();for(let n=this.lastViewport.top;n<=this.lastViewport.bottom;n++){var o=this._getItemInfoFromRow(n);if(o){var i=o.item;l.some(e._highlighted,function(e){var t=i._highlight;return Array.isArray(t)||(t=[t]),-1<t.indexOf(e)})&&(t[n]=e.baseCellCssStyle)}}this.grid.setCellCssStyles("highlight",t)},_activateHighlights:function(){var e=this,t=l(this.module.data.get()).map("_highlight").flatten().filter(e=>!l.isUndefined(e)).value();e._highlighted=[],a.killHighlight(this.module.getId());for(var o=0;o<t.length;o++)(function(o){a.listenHighlight({_highlight:t[o]},function(t,o,i,n){e.ignoreMyHighlights&&n===e.module.getId()||(!Array.isArray(o)&&(o=[o]),e._highlighted=t?l(e._highlighted).push(o).flatten().uniq().value():l.filter(e._highlighted,function(e){return-1===o.indexOf(e)}),e._drawHighlight())},!1,e.module.getId())})(o)},_makeDataObjects:function(){if(!this.dataObjectsDone){for(var e=this.module.data.get(),t=0;t<e.length;t++)e[t]=DataObject.check(e[t]);this.dataObjectsDone=!0}},_getRowsFromViewport:function(){if(!this.lastViewport)return[];var e=this.lastViewport.bottom-this.lastViewport.top+1;if(Number.isNaN(e)||0>e)return[];for(var t=Array(e),o=0;o<t.length;o++)t[o]=this.lastViewport.top+o;return t.filter(function(e){return 0<=e})},_getItemsInfo:function(e){var t=[];if(!this.slick.data)return t;for(var o,l=0;l<e.length;l++)o=this._getItemInfoFromRow(e[l]),o&&t.push(o);return t},_getItems:function(e){var t=this._getItemsInfo(e);return l.map(t,"item")},_getChangedColumn:function(e){return this.getColumnsGivenEditContext()[e]},_getCell:function(e){if(!e||void 0===e.row||void 0===e.cell)return null;var t=this._getItemInfoFromRow(e.row),o=this.getColumnsGivenEditContext()[e.cell].jpath.slice();o.unshift(t.idx);var i=this.module.data.getChildSync(o);return void 0!==i&&(i=i.get()),i},_getSelectedItems:function(){return this._getItems(this.grid.getSelectedRows())},onResize:function(){this.grid&&this.grid.resizeCanvas(),this.$rowHelp.css({bottom:0})},getNextIncrementalId:function(){return++R},generateUniqIds:function(){if(this.module.data)for(var e=this.module.data.get(),t=0;t<e.length;t++)this.setNextUniqId(e[t])},setNextUniqId:function(e,t){if(!e[this.idPropertyName])if(this.autoIdProperty&&(void 0===e[this.idPropertyName]||t))e[this.idPropertyName]=++R;else if(!this.autoIdProperty&&!e[this.idPropertyName])throw new Error(`An element of slick grid input does not define it's id property "${this.idPropertyName}"`)},_hasFilter:function(){return l.some(this.filterScript.split("\n"),function(e){var t=e.replace(" ","");return!!t&&!t.match(/^\s*\/\/a/)})},_findItem:function(e){var t;if(!this.module.data)return null;var o=this.module.data.get();return"function"==typeof e?o.find(e):(t=l.isNumber(e)||e instanceof DataNumber?o[e]:"string"==typeof e||e instanceof DataString?{[this.idPropertyName]:e+""}:e,t)},exportToTabDelimited:function(){this._makeDataObjects();var e=this.grid.getColumns(),t=[{key:"all",description:"Export entire list"}];this.module.getConfigurationCheckbox("slickCheck","filterColumns")&&t.push({key:"filtered",description:"Export filtered list"}),this.module.getConfigurationCheckbox("slickCheck","editable")&&t.push({key:"selected",description:"Export selected elements"});var o;return d.choose(t,{autoSelect:!0,noConfirmation:!0}).then(t=>{if(t){t+="",o="filtered"===t?this.slick.data.getItems(!0):"selected"===t?l.map(this._getItemsInfo(this.lastSelectedRows||[]),"item"):this.slick.data.getItems();var n,r,d="",a=[];for(n=0;n<e.length;n++)e[n].jpath&&a.push(e[n].name||"");for(d+=`${a.join("\t")}\r\n`,n=0;n<o.length;n++){for(a=[],r=0;r<e.length;r++){var s=e[r].jpath;if(s){var c=o[n].getChildSync(s,!1);c=c?c.get():"","string"==typeof c&&(c=c.replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t")),a.push(c)}}d+=`${a.join("\t")}\r\n`}return d}})},hideColumn:function(e){this.hiddenColumns&&(-1!==this.hiddenColumns.indexOf(e)||(this.hiddenColumns.push(e),h(this)))},showColumn:function(e){if(this.hiddenColumns){var t=this.hiddenColumns.indexOf(e);-1<t&&(this.hiddenColumns.splice(t,1),h(this))}},toggleColumn:function(e){var t=this.hiddenColumns.indexOf(e);-1===t?this.hideColumn(e):this.showColumn(e)},getRowIndexes:function(e){var t,o,l=this.module.data.get();if("function"==typeof e)o=l.filter(e);else if("all"===e){t=Array(this.slick.data.getLength());for(var n=0;n<t.length;n++)t[n]=n}else Array.isArray(e)&&(!e.length||e.length&&("number"==typeof e[0]||e[0]instanceof DataNumber))?t=e:Array.isArray(e)?o=e.map(this._findItem.bind(this)):"number"==typeof e||e instanceof DataNumber?t=[e]:e?o=[this._findItem(e)]:t=[];return o&&(t=o.filter(e=>e).map(e=>this.slick.data.getRowById(e[this.idPropertyName]))),t},onActionReceive:{appendRow:function(e){this.onActionReceive.addRow.call(this,e)},prependRow:function(e){if(this.slick.data){Array.isArray(e)||(e=[e]);for(let t,o=0;o<e.length;o++)t=e[o],t=DataObject.resurrect(t),this.setNextUniqId(t,!0),this.slick.data.insertItem(0,t),this._newRow(t)}},addRow:function(e){if(this.slick.data){Array.isArray(e)||(e=[e]);for(let t,o=0;o<e.length;o++)t=e[o],t=DataObject.resurrect(t),this.setNextUniqId(t,!0),this.slick.data.addItem(t),this._newRow(t)}},insertRow:function(e){if(this.slick.data&&!Array.isArray(e)){e=[e];for(let t=0;t<e.length;t++){let o=e[t],i=o.row,l=o.item;this.setNextUniqId(l,!0),this.slick.data.insertItem(i,l),this._newRow(l)}}},rerender:function(){this.grid&&(this.grid.invalidateAllRows(),this.grid.render())},hoverRow:function(e){var t=this._findItem(e);if(t&&t[this.idPropertyName]){var o=this.slick.data.getRowById(t[this.idPropertyName]),i=this.slick.data.getIdxById(t[this.idPropertyName]);t=this.slick.data.getItem(i),this.module.controller.onHover(i,t),this.grid.scrollRowToTop(o)}},unsetActiveRow:function(){this.grid.setSelectedRows(this.grid.getSelectedRows().filter(e=>e!==this.lastActiveRow)),this.grid.resetActiveCell(),this.module.controller.unselectRow()},selectRow:function(e){"number"==typeof e&&(e={row:e});var t=this._findItem(e.row);if(t&&t[this.idPropertyName]){var o=this.slick.data.getRowById(t[this.idPropertyName]),i=this.slick.data.getIdxById(t[this.idPropertyName]);t=this.slick.data.getItem();var n=e.column;"number"!=typeof n&&(n=this.slick.columns.findIndex(e=>e.id===n),-1===n&&(n=0)),this.module.controller.onClick(i,t),l.isUndefined(o)||(this.grid.scrollRowToTop(o),this.grid.setActiveCell(o,n||0))}},selectRows:function(e){const t=this.getRowIndexes(e);t&&this.grid.setSelectedRows(t)},unselectRows:function(e){const t=this.getRowIndexes(e),o=this.grid.getSelectedRows(),i=l.difference(o,t);this.grid.setSelectedRows(i)},scrollToRow:function(e){const t=this.getRowIndexes(e),o=_slicedToArray(t,1),i=o[0];this.grid.scrollRowToTop(i)},selectRowsAdd:function(e){const t=this.getRowIndexes(e)||[],o=this.grid.getSelectedRows(),i=l.uniq(l.concat(t,o));this.grid.setSelectedRows(i)},showColumn:function(e){this.showColumn(e)},hideColumn:function(e){this.hideColumn(e)},toggleColumn:function(e){this.toggleColumn(e)}}});var D="";return m});
