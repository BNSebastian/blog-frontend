import {
  MatSelect,
  MatSelectModule
} from "./chunk-M6RIWBV3.js";
import {
  MatButtonModule,
  MatIconButton
} from "./chunk-WQUQ3UPS.js";
import {
  MatFormField
} from "./chunk-LVKBTVLF.js";
import "./chunk-WVE3MB2T.js";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-XEKCPULX.js";
import "./chunk-AUU4UGRC.js";
import "./chunk-KBGNCL4Q.js";
import "./chunk-PC3APA6M.js";
import "./chunk-HBE7IOOK.js";
import {
  MatOption,
  mixinDisabled,
  mixinInitialized
} from "./chunk-ICN7OLV4.js";
import "./chunk-YACN3KM5.js";
import {
  coerceBooleanProperty,
  coerceNumberProperty
} from "./chunk-4EUULQTL.js";
import "./chunk-CV33DFH4.js";
import "./chunk-ZWE3ZXX4.js";
import "./chunk-PVP7C4DS.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Injectable,
  InjectionToken,
  Input,
  NgModule,
  Optional,
  Output,
  SkipSelf,
  ViewEncapsulation$1,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-RXRC473I.js";
import "./chunk-2UXUBMH3.js";
import "./chunk-KUOPV5YS.js";
import {
  Subject
} from "./chunk-UB6C7KF6.js";

// node_modules/@angular/material/fesm2022/paginator.mjs
function MatPaginator_Conditional_2_Conditional_3_For_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "mat-option", 18);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const pageSizeOption_r6 = ctx.$implicit;
    ɵɵproperty("value", pageSizeOption_r6);
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" ", pageSizeOption_r6, " ");
  }
}
function MatPaginator_Conditional_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "mat-form-field", 16)(1, "mat-select", 17);
    ɵɵlistener("selectionChange", function MatPaginator_Conditional_2_Conditional_3_Template_mat_select_selectionChange_1_listener($event) {
      ɵɵrestoreView(_r12);
      const ctx_r11 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r11._changePageSize($event.value));
    });
    ɵɵrepeaterCreate(2, MatPaginator_Conditional_2_Conditional_3_For_3_Template, 2, 2, "mat-option", 18, ɵɵrepeaterTrackByIdentity);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = ɵɵnextContext(2);
    ɵɵproperty("appearance", ctx_r3._formFieldAppearance)("color", ctx_r3.color);
    ɵɵadvance(1);
    ɵɵproperty("value", ctx_r3.pageSize)("disabled", ctx_r3.disabled)("aria-labelledby", ctx_r3._pageSizeLabelId)("panelClass", ctx_r3.selectConfig.panelClass || "")("disableOptionCentering", ctx_r3.selectConfig.disableOptionCentering);
    ɵɵadvance(1);
    ɵɵrepeater(ctx_r3._displayedPageSizeOptions);
  }
}
function MatPaginator_Conditional_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 19);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r4 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵtextInterpolate(ctx_r4.pageSize);
  }
}
function MatPaginator_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 12)(1, "div", 13);
    ɵɵtext(2);
    ɵɵelementEnd();
    ɵɵtemplate(3, MatPaginator_Conditional_2_Conditional_3_Template, 4, 7, "mat-form-field", 14)(4, MatPaginator_Conditional_2_Conditional_4_Template, 2, 1, "div", 15);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵattribute("id", ctx_r0._pageSizeLabelId);
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" ", ctx_r0._intl.itemsPerPageLabel, " ");
    ɵɵadvance(1);
    ɵɵconditional(3, ctx_r0._displayedPageSizeOptions.length > 1 ? 3 : -1);
    ɵɵadvance(1);
    ɵɵconditional(4, ctx_r0._displayedPageSizeOptions.length <= 1 ? 4 : -1);
  }
}
function MatPaginator_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 20);
    ɵɵlistener("click", function MatPaginator_Conditional_6_Template_button_click_0_listener() {
      ɵɵrestoreView(_r14);
      const ctx_r13 = ɵɵnextContext();
      return ɵɵresetView(ctx_r13.firstPage());
    });
    ɵɵnamespaceSVG();
    ɵɵelementStart(1, "svg", 7);
    ɵɵelement(2, "path", 21);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("matTooltip", ctx_r1._intl.firstPageLabel)("matTooltipDisabled", ctx_r1._previousButtonsDisabled())("matTooltipPosition", "above")("disabled", ctx_r1._previousButtonsDisabled());
    ɵɵattribute("aria-label", ctx_r1._intl.firstPageLabel);
  }
}
function MatPaginator_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = ɵɵgetCurrentView();
    ɵɵnamespaceSVG();
    ɵɵnamespaceHTML();
    ɵɵelementStart(0, "button", 22);
    ɵɵlistener("click", function MatPaginator_Conditional_13_Template_button_click_0_listener() {
      ɵɵrestoreView(_r16);
      const ctx_r15 = ɵɵnextContext();
      return ɵɵresetView(ctx_r15.lastPage());
    });
    ɵɵnamespaceSVG();
    ɵɵelementStart(1, "svg", 7);
    ɵɵelement(2, "path", 23);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵproperty("matTooltip", ctx_r2._intl.lastPageLabel)("matTooltipDisabled", ctx_r2._nextButtonsDisabled())("matTooltipPosition", "above")("disabled", ctx_r2._nextButtonsDisabled());
    ɵɵattribute("aria-label", ctx_r2._intl.lastPageLabel);
  }
}
var _MatPaginatorIntl = class _MatPaginatorIntl {
  constructor() {
    this.changes = new Subject();
    this.itemsPerPageLabel = "Items per page:";
    this.nextPageLabel = "Next page";
    this.previousPageLabel = "Previous page";
    this.firstPageLabel = "First page";
    this.lastPageLabel = "Last page";
    this.getRangeLabel = (page, pageSize, length) => {
      if (length == 0 || pageSize == 0) {
        return `0 of ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      return `${startIndex + 1} – ${endIndex} of ${length}`;
    };
  }
};
_MatPaginatorIntl.ɵfac = function MatPaginatorIntl_Factory(t) {
  return new (t || _MatPaginatorIntl)();
};
_MatPaginatorIntl.ɵprov = ɵɵdefineInjectable({
  token: _MatPaginatorIntl,
  factory: _MatPaginatorIntl.ɵfac,
  providedIn: "root"
});
var MatPaginatorIntl = _MatPaginatorIntl;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatPaginatorIntl, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
function MAT_PAGINATOR_INTL_PROVIDER_FACTORY(parentIntl) {
  return parentIntl || new MatPaginatorIntl();
}
var MAT_PAGINATOR_INTL_PROVIDER = {
  // If there is already an MatPaginatorIntl available, use that. Otherwise, provide a new one.
  provide: MatPaginatorIntl,
  deps: [[new Optional(), new SkipSelf(), MatPaginatorIntl]],
  useFactory: MAT_PAGINATOR_INTL_PROVIDER_FACTORY
};
var DEFAULT_PAGE_SIZE = 50;
var PageEvent = class {
};
var MAT_PAGINATOR_DEFAULT_OPTIONS = new InjectionToken("MAT_PAGINATOR_DEFAULT_OPTIONS");
var _MatPaginatorMixinBase = mixinDisabled(mixinInitialized(class {
}));
var nextUniqueId = 0;
var _MatPaginator = class _MatPaginator extends _MatPaginatorMixinBase {
  /** The zero-based page index of the displayed list of items. Defaulted to 0. */
  get pageIndex() {
    return this._pageIndex;
  }
  set pageIndex(value) {
    this._pageIndex = Math.max(coerceNumberProperty(value), 0);
    this._changeDetectorRef.markForCheck();
  }
  /** The length of the total number of items that are being paginated. Defaulted to 0. */
  get length() {
    return this._length;
  }
  set length(value) {
    this._length = coerceNumberProperty(value);
    this._changeDetectorRef.markForCheck();
  }
  /** Number of items to display on a page. By default set to 50. */
  get pageSize() {
    return this._pageSize;
  }
  set pageSize(value) {
    this._pageSize = Math.max(coerceNumberProperty(value), 0);
    this._updateDisplayedPageSizeOptions();
  }
  /** The set of provided page size options to display to the user. */
  get pageSizeOptions() {
    return this._pageSizeOptions;
  }
  set pageSizeOptions(value) {
    this._pageSizeOptions = (value || []).map((p) => coerceNumberProperty(p));
    this._updateDisplayedPageSizeOptions();
  }
  /** Whether to hide the page size selection UI from the user. */
  get hidePageSize() {
    return this._hidePageSize;
  }
  set hidePageSize(value) {
    this._hidePageSize = coerceBooleanProperty(value);
  }
  /** Whether to show the first/last buttons UI to the user. */
  get showFirstLastButtons() {
    return this._showFirstLastButtons;
  }
  set showFirstLastButtons(value) {
    this._showFirstLastButtons = coerceBooleanProperty(value);
  }
  constructor(_intl, _changeDetectorRef, defaults) {
    super();
    this._intl = _intl;
    this._changeDetectorRef = _changeDetectorRef;
    this._pageSizeLabelId = `mat-paginator-page-size-label-${nextUniqueId++}`;
    this._pageIndex = 0;
    this._length = 0;
    this._pageSizeOptions = [];
    this._hidePageSize = false;
    this._showFirstLastButtons = false;
    this.selectConfig = {};
    this.page = new EventEmitter();
    this._intlChanges = _intl.changes.subscribe(() => this._changeDetectorRef.markForCheck());
    if (defaults) {
      const {
        pageSize,
        pageSizeOptions,
        hidePageSize,
        showFirstLastButtons
      } = defaults;
      if (pageSize != null) {
        this._pageSize = pageSize;
      }
      if (pageSizeOptions != null) {
        this._pageSizeOptions = pageSizeOptions;
      }
      if (hidePageSize != null) {
        this._hidePageSize = hidePageSize;
      }
      if (showFirstLastButtons != null) {
        this._showFirstLastButtons = showFirstLastButtons;
      }
    }
    this._formFieldAppearance = defaults?.formFieldAppearance || "outline";
  }
  ngOnInit() {
    this._initialized = true;
    this._updateDisplayedPageSizeOptions();
    this._markInitialized();
  }
  ngOnDestroy() {
    this._intlChanges.unsubscribe();
  }
  /** Advances to the next page if it exists. */
  nextPage() {
    if (!this.hasNextPage()) {
      return;
    }
    const previousPageIndex = this.pageIndex;
    this.pageIndex = this.pageIndex + 1;
    this._emitPageEvent(previousPageIndex);
  }
  /** Move back to the previous page if it exists. */
  previousPage() {
    if (!this.hasPreviousPage()) {
      return;
    }
    const previousPageIndex = this.pageIndex;
    this.pageIndex = this.pageIndex - 1;
    this._emitPageEvent(previousPageIndex);
  }
  /** Move to the first page if not already there. */
  firstPage() {
    if (!this.hasPreviousPage()) {
      return;
    }
    const previousPageIndex = this.pageIndex;
    this.pageIndex = 0;
    this._emitPageEvent(previousPageIndex);
  }
  /** Move to the last page if not already there. */
  lastPage() {
    if (!this.hasNextPage()) {
      return;
    }
    const previousPageIndex = this.pageIndex;
    this.pageIndex = this.getNumberOfPages() - 1;
    this._emitPageEvent(previousPageIndex);
  }
  /** Whether there is a previous page. */
  hasPreviousPage() {
    return this.pageIndex >= 1 && this.pageSize != 0;
  }
  /** Whether there is a next page. */
  hasNextPage() {
    const maxPageIndex = this.getNumberOfPages() - 1;
    return this.pageIndex < maxPageIndex && this.pageSize != 0;
  }
  /** Calculate the number of pages */
  getNumberOfPages() {
    if (!this.pageSize) {
      return 0;
    }
    return Math.ceil(this.length / this.pageSize);
  }
  /**
   * Changes the page size so that the first item displayed on the page will still be
   * displayed using the new page size.
   *
   * For example, if the page size is 10 and on the second page (items indexed 10-19) then
   * switching so that the page size is 5 will set the third page as the current page so
   * that the 10th item will still be displayed.
   */
  _changePageSize(pageSize) {
    const startIndex = this.pageIndex * this.pageSize;
    const previousPageIndex = this.pageIndex;
    this.pageIndex = Math.floor(startIndex / pageSize) || 0;
    this.pageSize = pageSize;
    this._emitPageEvent(previousPageIndex);
  }
  /** Checks whether the buttons for going forwards should be disabled. */
  _nextButtonsDisabled() {
    return this.disabled || !this.hasNextPage();
  }
  /** Checks whether the buttons for going backwards should be disabled. */
  _previousButtonsDisabled() {
    return this.disabled || !this.hasPreviousPage();
  }
  /**
   * Updates the list of page size options to display to the user. Includes making sure that
   * the page size is an option and that the list is sorted.
   */
  _updateDisplayedPageSizeOptions() {
    if (!this._initialized) {
      return;
    }
    if (!this.pageSize) {
      this._pageSize = this.pageSizeOptions.length != 0 ? this.pageSizeOptions[0] : DEFAULT_PAGE_SIZE;
    }
    this._displayedPageSizeOptions = this.pageSizeOptions.slice();
    if (this._displayedPageSizeOptions.indexOf(this.pageSize) === -1) {
      this._displayedPageSizeOptions.push(this.pageSize);
    }
    this._displayedPageSizeOptions.sort((a, b) => a - b);
    this._changeDetectorRef.markForCheck();
  }
  /** Emits an event notifying that a change of the paginator's properties has been triggered. */
  _emitPageEvent(previousPageIndex) {
    this.page.emit({
      previousPageIndex,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      length: this.length
    });
  }
};
_MatPaginator.ɵfac = function MatPaginator_Factory(t) {
  return new (t || _MatPaginator)(ɵɵdirectiveInject(MatPaginatorIntl), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(MAT_PAGINATOR_DEFAULT_OPTIONS, 8));
};
_MatPaginator.ɵcmp = ɵɵdefineComponent({
  type: _MatPaginator,
  selectors: [["mat-paginator"]],
  hostAttrs: ["role", "group", 1, "mat-mdc-paginator"],
  inputs: {
    disabled: "disabled",
    color: "color",
    pageIndex: "pageIndex",
    length: "length",
    pageSize: "pageSize",
    pageSizeOptions: "pageSizeOptions",
    hidePageSize: "hidePageSize",
    showFirstLastButtons: "showFirstLastButtons",
    selectConfig: "selectConfig"
  },
  outputs: {
    page: "page"
  },
  exportAs: ["matPaginator"],
  features: [ɵɵInheritDefinitionFeature],
  decls: 14,
  vars: 14,
  consts: [[1, "mat-mdc-paginator-outer-container"], [1, "mat-mdc-paginator-container"], ["class", "mat-mdc-paginator-page-size"], [1, "mat-mdc-paginator-range-actions"], ["aria-live", "polite", 1, "mat-mdc-paginator-range-label"], ["mat-icon-button", "", "type", "button", "class", "mat-mdc-paginator-navigation-first", 3, "matTooltip", "matTooltipDisabled", "matTooltipPosition", "disabled"], ["mat-icon-button", "", "type", "button", 1, "mat-mdc-paginator-navigation-previous", 3, "matTooltip", "matTooltipDisabled", "matTooltipPosition", "disabled", "click"], ["viewBox", "0 0 24 24", "focusable", "false", "aria-hidden", "true", 1, "mat-mdc-paginator-icon"], ["d", "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"], ["mat-icon-button", "", "type", "button", 1, "mat-mdc-paginator-navigation-next", 3, "matTooltip", "matTooltipDisabled", "matTooltipPosition", "disabled", "click"], ["d", "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"], ["mat-icon-button", "", "type", "button", "class", "mat-mdc-paginator-navigation-last", 3, "matTooltip", "matTooltipDisabled", "matTooltipPosition", "disabled"], [1, "mat-mdc-paginator-page-size"], [1, "mat-mdc-paginator-page-size-label"], ["class", "mat-mdc-paginator-page-size-select", 3, "appearance", "color"], ["class", "mat-mdc-paginator-page-size-value"], [1, "mat-mdc-paginator-page-size-select", 3, "appearance", "color"], ["hideSingleSelectionIndicator", "", 3, "value", "disabled", "aria-labelledby", "panelClass", "disableOptionCentering", "selectionChange"], [3, "value"], [1, "mat-mdc-paginator-page-size-value"], ["mat-icon-button", "", "type", "button", 1, "mat-mdc-paginator-navigation-first", 3, "matTooltip", "matTooltipDisabled", "matTooltipPosition", "disabled", "click"], ["d", "M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"], ["mat-icon-button", "", "type", "button", 1, "mat-mdc-paginator-navigation-last", 3, "matTooltip", "matTooltipDisabled", "matTooltipPosition", "disabled", "click"], ["d", "M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"]],
  template: function MatPaginator_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "div", 0)(1, "div", 1);
      ɵɵtemplate(2, MatPaginator_Conditional_2_Template, 5, 4, "div", 2);
      ɵɵelementStart(3, "div", 3)(4, "div", 4);
      ɵɵtext(5);
      ɵɵelementEnd();
      ɵɵtemplate(6, MatPaginator_Conditional_6_Template, 3, 5, "button", 5);
      ɵɵelementStart(7, "button", 6);
      ɵɵlistener("click", function MatPaginator_Template_button_click_7_listener() {
        return ctx.previousPage();
      });
      ɵɵnamespaceSVG();
      ɵɵelementStart(8, "svg", 7);
      ɵɵelement(9, "path", 8);
      ɵɵelementEnd()();
      ɵɵnamespaceHTML();
      ɵɵelementStart(10, "button", 9);
      ɵɵlistener("click", function MatPaginator_Template_button_click_10_listener() {
        return ctx.nextPage();
      });
      ɵɵnamespaceSVG();
      ɵɵelementStart(11, "svg", 7);
      ɵɵelement(12, "path", 10);
      ɵɵelementEnd()();
      ɵɵtemplate(13, MatPaginator_Conditional_13_Template, 3, 5, "button", 11);
      ɵɵelementEnd()()();
    }
    if (rf & 2) {
      ɵɵadvance(2);
      ɵɵconditional(2, !ctx.hidePageSize ? 2 : -1);
      ɵɵadvance(3);
      ɵɵtextInterpolate1(" ", ctx._intl.getRangeLabel(ctx.pageIndex, ctx.pageSize, ctx.length), " ");
      ɵɵadvance(1);
      ɵɵconditional(6, ctx.showFirstLastButtons ? 6 : -1);
      ɵɵadvance(1);
      ɵɵproperty("matTooltip", ctx._intl.previousPageLabel)("matTooltipDisabled", ctx._previousButtonsDisabled())("matTooltipPosition", "above")("disabled", ctx._previousButtonsDisabled());
      ɵɵattribute("aria-label", ctx._intl.previousPageLabel);
      ɵɵadvance(3);
      ɵɵproperty("matTooltip", ctx._intl.nextPageLabel)("matTooltipDisabled", ctx._nextButtonsDisabled())("matTooltipPosition", "above")("disabled", ctx._nextButtonsDisabled());
      ɵɵattribute("aria-label", ctx._intl.nextPageLabel);
      ɵɵadvance(3);
      ɵɵconditional(13, ctx.showFirstLastButtons ? 13 : -1);
    }
  },
  dependencies: [MatIconButton, MatFormField, MatSelect, MatOption, MatTooltip],
  styles: [".mat-mdc-paginator{display:block;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;color:var(--mat-paginator-container-text-color);background-color:var(--mat-paginator-container-background-color);font-family:var(--mat-paginator-container-text-font);line-height:var(--mat-paginator-container-text-line-height);font-size:var(--mat-paginator-container-text-size);font-weight:var(--mat-paginator-container-text-weight);letter-spacing:var(--mat-paginator-container-text-tracking)}.mat-mdc-paginator .mat-mdc-select-value{font-size:var(--mat-paginator-select-trigger-text-size)}.mat-mdc-paginator .mat-mdc-form-field-subscript-wrapper{display:none}.mat-mdc-paginator .mat-mdc-select{line-height:1.5}.mat-mdc-paginator-outer-container{display:flex}.mat-mdc-paginator-container{display:flex;align-items:center;justify-content:flex-end;padding:0 8px;flex-wrap:wrap-reverse;width:100%;min-height:var(--mat-paginator-container-size)}.mat-mdc-paginator-page-size{display:flex;align-items:baseline;margin-right:8px}[dir=rtl] .mat-mdc-paginator-page-size{margin-right:0;margin-left:8px}.mat-mdc-paginator-page-size-label{margin:0 4px}.mat-mdc-paginator-page-size-select{margin:0 4px;width:84px}.mat-mdc-paginator-range-label{margin:0 32px 0 24px}.mat-mdc-paginator-range-actions{display:flex;align-items:center}.mat-mdc-paginator-icon{display:inline-block;width:28px;fill:var(--mat-paginator-enabled-icon-color)}.mat-mdc-icon-button[disabled] .mat-mdc-paginator-icon{fill:var(--mat-paginator-disabled-icon-color)}[dir=rtl] .mat-mdc-paginator-icon{transform:rotate(180deg)}.cdk-high-contrast-active .mat-mdc-icon-button[disabled] .mat-mdc-paginator-icon,.cdk-high-contrast-active .mat-mdc-paginator-icon{fill:currentColor;fill:CanvasText}.cdk-high-contrast-active .mat-mdc-paginator-range-actions .mat-mdc-icon-button{outline:solid 1px}"],
  encapsulation: 2,
  changeDetection: 0
});
var MatPaginator = _MatPaginator;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatPaginator, [{
    type: Component,
    args: [{
      selector: "mat-paginator",
      exportAs: "matPaginator",
      inputs: ["disabled"],
      host: {
        "class": "mat-mdc-paginator",
        "role": "group"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation$1.None,
      template: `<div class="mat-mdc-paginator-outer-container">
  <div class="mat-mdc-paginator-container">
    @if (!hidePageSize) {
      <div class="mat-mdc-paginator-page-size">
        <div class="mat-mdc-paginator-page-size-label" [attr.id]="_pageSizeLabelId">
          {{_intl.itemsPerPageLabel}}
        </div>

        @if (_displayedPageSizeOptions.length > 1) {
          <mat-form-field
            [appearance]="_formFieldAppearance!"
            [color]="color"
            class="mat-mdc-paginator-page-size-select">
            <mat-select
              [value]="pageSize"
              [disabled]="disabled"
              [aria-labelledby]="_pageSizeLabelId"
              [panelClass]="selectConfig.panelClass || ''"
              [disableOptionCentering]="selectConfig.disableOptionCentering"
              (selectionChange)="_changePageSize($event.value)"
              hideSingleSelectionIndicator>
              @for (pageSizeOption of _displayedPageSizeOptions; track pageSizeOption) {
                <mat-option [value]="pageSizeOption">
                  {{pageSizeOption}}
                </mat-option>
              }
            </mat-select>
          </mat-form-field>
        }

        @if (_displayedPageSizeOptions.length <= 1) {
          <div class="mat-mdc-paginator-page-size-value">{{pageSize}}</div>
        }
      </div>
    }

    <div class="mat-mdc-paginator-range-actions">
      <div class="mat-mdc-paginator-range-label" aria-live="polite">
        {{_intl.getRangeLabel(pageIndex, pageSize, length)}}
      </div>

      @if (showFirstLastButtons) {
        <button mat-icon-button type="button"
                class="mat-mdc-paginator-navigation-first"
                (click)="firstPage()"
                [attr.aria-label]="_intl.firstPageLabel"
                [matTooltip]="_intl.firstPageLabel"
                [matTooltipDisabled]="_previousButtonsDisabled()"
                [matTooltipPosition]="'above'"
                [disabled]="_previousButtonsDisabled()">
          <svg class="mat-mdc-paginator-icon"
              viewBox="0 0 24 24"
              focusable="false"
              aria-hidden="true">
            <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"/>
          </svg>
        </button>
      }
      <button mat-icon-button type="button"
              class="mat-mdc-paginator-navigation-previous"
              (click)="previousPage()"
              [attr.aria-label]="_intl.previousPageLabel"
              [matTooltip]="_intl.previousPageLabel"
              [matTooltipDisabled]="_previousButtonsDisabled()"
              [matTooltipPosition]="'above'"
              [disabled]="_previousButtonsDisabled()">
        <svg class="mat-mdc-paginator-icon"
             viewBox="0 0 24 24"
             focusable="false"
             aria-hidden="true">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
      </button>
      <button mat-icon-button type="button"
              class="mat-mdc-paginator-navigation-next"
              (click)="nextPage()"
              [attr.aria-label]="_intl.nextPageLabel"
              [matTooltip]="_intl.nextPageLabel"
              [matTooltipDisabled]="_nextButtonsDisabled()"
              [matTooltipPosition]="'above'"
              [disabled]="_nextButtonsDisabled()">
        <svg class="mat-mdc-paginator-icon"
             viewBox="0 0 24 24"
             focusable="false"
             aria-hidden="true">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
        </svg>
      </button>
      @if (showFirstLastButtons) {
        <button mat-icon-button type="button"
                class="mat-mdc-paginator-navigation-last"
                (click)="lastPage()"
                [attr.aria-label]="_intl.lastPageLabel"
                [matTooltip]="_intl.lastPageLabel"
                [matTooltipDisabled]="_nextButtonsDisabled()"
                [matTooltipPosition]="'above'"
                [disabled]="_nextButtonsDisabled()">
          <svg class="mat-mdc-paginator-icon"
              viewBox="0 0 24 24"
              focusable="false"
              aria-hidden="true">
            <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"/>
          </svg>
        </button>
      }
    </div>
  </div>
</div>
`,
      styles: [".mat-mdc-paginator{display:block;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;color:var(--mat-paginator-container-text-color);background-color:var(--mat-paginator-container-background-color);font-family:var(--mat-paginator-container-text-font);line-height:var(--mat-paginator-container-text-line-height);font-size:var(--mat-paginator-container-text-size);font-weight:var(--mat-paginator-container-text-weight);letter-spacing:var(--mat-paginator-container-text-tracking)}.mat-mdc-paginator .mat-mdc-select-value{font-size:var(--mat-paginator-select-trigger-text-size)}.mat-mdc-paginator .mat-mdc-form-field-subscript-wrapper{display:none}.mat-mdc-paginator .mat-mdc-select{line-height:1.5}.mat-mdc-paginator-outer-container{display:flex}.mat-mdc-paginator-container{display:flex;align-items:center;justify-content:flex-end;padding:0 8px;flex-wrap:wrap-reverse;width:100%;min-height:var(--mat-paginator-container-size)}.mat-mdc-paginator-page-size{display:flex;align-items:baseline;margin-right:8px}[dir=rtl] .mat-mdc-paginator-page-size{margin-right:0;margin-left:8px}.mat-mdc-paginator-page-size-label{margin:0 4px}.mat-mdc-paginator-page-size-select{margin:0 4px;width:84px}.mat-mdc-paginator-range-label{margin:0 32px 0 24px}.mat-mdc-paginator-range-actions{display:flex;align-items:center}.mat-mdc-paginator-icon{display:inline-block;width:28px;fill:var(--mat-paginator-enabled-icon-color)}.mat-mdc-icon-button[disabled] .mat-mdc-paginator-icon{fill:var(--mat-paginator-disabled-icon-color)}[dir=rtl] .mat-mdc-paginator-icon{transform:rotate(180deg)}.cdk-high-contrast-active .mat-mdc-icon-button[disabled] .mat-mdc-paginator-icon,.cdk-high-contrast-active .mat-mdc-paginator-icon{fill:currentColor;fill:CanvasText}.cdk-high-contrast-active .mat-mdc-paginator-range-actions .mat-mdc-icon-button{outline:solid 1px}"]
    }]
  }], () => [{
    type: MatPaginatorIntl
  }, {
    type: ChangeDetectorRef
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [MAT_PAGINATOR_DEFAULT_OPTIONS]
    }]
  }], {
    color: [{
      type: Input
    }],
    pageIndex: [{
      type: Input
    }],
    length: [{
      type: Input
    }],
    pageSize: [{
      type: Input
    }],
    pageSizeOptions: [{
      type: Input
    }],
    hidePageSize: [{
      type: Input
    }],
    showFirstLastButtons: [{
      type: Input
    }],
    selectConfig: [{
      type: Input
    }],
    page: [{
      type: Output
    }]
  });
})();
var _MatPaginatorModule = class _MatPaginatorModule {
};
_MatPaginatorModule.ɵfac = function MatPaginatorModule_Factory(t) {
  return new (t || _MatPaginatorModule)();
};
_MatPaginatorModule.ɵmod = ɵɵdefineNgModule({
  type: _MatPaginatorModule,
  declarations: [MatPaginator],
  imports: [MatButtonModule, MatSelectModule, MatTooltipModule],
  exports: [MatPaginator]
});
_MatPaginatorModule.ɵinj = ɵɵdefineInjector({
  providers: [MAT_PAGINATOR_INTL_PROVIDER],
  imports: [MatButtonModule, MatSelectModule, MatTooltipModule]
});
var MatPaginatorModule = _MatPaginatorModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatPaginatorModule, [{
    type: NgModule,
    args: [{
      imports: [MatButtonModule, MatSelectModule, MatTooltipModule],
      exports: [MatPaginator],
      declarations: [MatPaginator],
      providers: [MAT_PAGINATOR_INTL_PROVIDER]
    }]
  }], null, null);
})();
export {
  MAT_PAGINATOR_DEFAULT_OPTIONS,
  MAT_PAGINATOR_INTL_PROVIDER,
  MAT_PAGINATOR_INTL_PROVIDER_FACTORY,
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent
};
//# sourceMappingURL=@angular_material_paginator.js.map
