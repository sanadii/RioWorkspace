import { ComplexBase, ComponentBase, applyMixins } from '@syncfusion/ej2-react-base';
import { Component, createElement } from 'react';
import { Accordion, Breadcrumb, Carousel, ContextMenu, Menu, Sidebar, Tab, Toolbar, TreeView } from '@syncfusion/ej2-navigations';

/**
 * `AccordionItemDirective` represent a item of the React Accordion.
 * It must be contained in a Accordion component(`AccordionComponent`).
 * ```tsx
 * <AccordionComponent>
 *   <AccordionItemsDirective>
 *    <AccordionItemDirective  header='Header1'></AccordionItemDirective>
 *    <AccordionItemDirective  header='Header2' content='Content2'></AccordionItemDirective>
 *   <AccordionItemsDirective>
 * </AccordionComponent>
 * ```
 */
class AccordionItemDirective extends ComplexBase {
}
AccordionItemDirective.moduleName = 'accordionItem';
class AccordionItemsDirective extends ComplexBase {
}
AccordionItemsDirective.propertyName = 'items';
AccordionItemsDirective.moduleName = 'accordionItems';

/**
 * Represents the React Accordion Component.
 * ```html
 * <AccordionComponent></AccordionComponent
 * ```
 */
class AccordionComponent extends Accordion {
    constructor(props) {
        super(props);
        this.initRenderCalled = false;
        this.checkInjectedModules = false;
        this.directivekeys = { 'accordionItems': 'accordionItem' };
        this.immediateRender = false;
        this.portals = [];
    }
    render() {
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            super.render();
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    }
}
applyMixins(AccordionComponent, [ComponentBase, Component]);

/**
 * `ItemDirective` directive represent a item of the React Toolbar.
 * It must be contained in a Toolbar component(`ToolbarComponent`).
 * ```tsx
 * <ToolbarComponent>
 *   <ItemsDirective>
 *    <ItemDirective text='Cut'></ItemDirective>
 *    <ItemDirective text='Copy'></ItemDirective>
 *   <ItemsDirective>
 * </ToolbarComponent>
 * ```
 */
class ItemDirective extends ComplexBase {
}
ItemDirective.moduleName = 'item';
class ItemsDirective extends ComplexBase {
}
ItemsDirective.propertyName = 'items';
ItemsDirective.moduleName = 'items';

/**
 * Represents the React Toolbar Component.
 * ```html
 * <ToolbarComponent></ToolbarComponent
 * ```
 */
class ToolbarComponent extends Toolbar {
    constructor(props) {
        super(props);
        this.initRenderCalled = false;
        this.checkInjectedModules = false;
        this.directivekeys = { 'items': 'item' };
        this.immediateRender = false;
        this.portals = [];
    }
    render() {
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            super.render();
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    }
}
applyMixins(ToolbarComponent, [ComponentBase, Component]);

/**
 * `ContextMenuComponent` represents the react ContextMenu Component.
 * ```ts
 * <div id='target'>Right click / Touch hold to open the ContextMenu</div>
 * <ContextMenuComponent target='#target' items={menuItems} />
 * ```
 */
class ContextMenuComponent extends ContextMenu {
    constructor(props) {
        super(props);
        this.initRenderCalled = false;
        this.checkInjectedModules = false;
        this.immediateRender = true;
        this.portals = [];
    }
    render() {
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            super.render();
            this.initRenderCalled = true;
        }
        else {
            return createElement('ul', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    }
}
applyMixins(ContextMenuComponent, [ComponentBase, Component]);

/**
 * `BreadcrumbItemDirective` represent a item of the React Breadcrumb.
 * It must be contained in a Breadcrumb component(`BreadcrumbComponent`).
 * ```tsx
 * <BreadcrumbComponent>
 *   <BreadcrumbItemsDirective>
 *    <BreadcrumbItemDirective text='Home' url='/'></BreadcrumbItemDirective>
 *    <BreadcrumbItemDirective text='Index' url='./index'></BreadcrumbItemDirective>
 *   </BreadcrumbItemsDirective>
 * </BreadcrumbComponent>
 * ```
 */
class BreadcrumbItemDirective extends ComplexBase {
}
BreadcrumbItemDirective.moduleName = 'breadcrumbItem';
class BreadcrumbItemsDirective extends ComplexBase {
}
BreadcrumbItemsDirective.propertyName = 'items';
BreadcrumbItemsDirective.moduleName = 'breadcrumbItems';

/**
 * `BreadcrumbComponent` represents the react Breadcrumb Component.
 * ```ts
 * <BreadcrumbComponent items={breadcrumbItems} />
 * ```
 */
class BreadcrumbComponent extends Breadcrumb {
    constructor(props) {
        super(props);
        this.initRenderCalled = false;
        this.checkInjectedModules = false;
        this.directivekeys = { 'breadcrumbItems': 'breadcrumbItem' };
        this.immediateRender = false;
        this.portals = [];
    }
    render() {
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            super.render();
            this.initRenderCalled = true;
        }
        else {
            return createElement('nav', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    }
}
applyMixins(BreadcrumbComponent, [ComponentBase, Component]);

/**
 * `CarouselItemDirective` represent a item of the React Carousel.
 * It must be contained in a Carousel component(`CarouselComponent`).
 * ```tsx
 * <CarouselComponent>
 *   <CarouselItemsDirective>
 *    <CarouselItemDirective template='#item1'></CarouselItemDirective>
 *    <CarouselItemDirective template='#item2'></CarouselItemDirective>
 *   </CarouselItemsDirective>
 * </CarouselComponent>
 * ```
 */
class CarouselItemDirective extends ComplexBase {
}
CarouselItemDirective.moduleName = 'carouselItem';
class CarouselItemsDirective extends ComplexBase {
}
CarouselItemsDirective.propertyName = 'items';
CarouselItemsDirective.moduleName = 'carouselItems';

/**
 * `CarouselComponent` represents the react Carousel Component.
 * ```ts
 * <CarouselComponent items={carouselItems} />
 * ```
 */
class CarouselComponent extends Carousel {
    constructor(props) {
        super(props);
        this.initRenderCalled = false;
        this.checkInjectedModules = false;
        this.directivekeys = { 'carouselItems': 'carouselItem' };
        this.immediateRender = false;
        this.portals = [];
    }
    render() {
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            super.render();
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    }
}
applyMixins(CarouselComponent, [ComponentBase, Component]);

/**
 * `TabItemDirective` represent a item of the React Tab.
 * It must be contained in a Tab component(`Tab`).
 * ```tsx
 * <TabComponent>
 *  <TabItemsDirective>
 *   <TabItemDirective header= { 'Header 1' } content= { 'Content 1' } />
 *   <TabItemDirective header= { 'Header 2' } content= { 'Content 2' } />
 *  <TabItemsDirective>
 * </TabComponent>
 * ```
 */
class TabItemDirective extends ComplexBase {
}
TabItemDirective.moduleName = 'tabItem';
TabItemDirective.complexTemplate = { 'headerText': 'header.text' };
class TabItemsDirective extends ComplexBase {
}
TabItemsDirective.propertyName = 'items';
TabItemsDirective.moduleName = 'tabItems';

/**
 * Represents the React Tab Component.
 * ```html
 * <TabComponent></TabComponent>
 * ```
 */
class TabComponent extends Tab {
    constructor(props) {
        super(props);
        this.initRenderCalled = false;
        this.checkInjectedModules = false;
        this.directivekeys = { 'tabItems': 'tabItem' };
        this.immediateRender = false;
        this.portals = [];
    }
    render() {
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            super.render();
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    }
}
applyMixins(TabComponent, [ComponentBase, Component]);

/**
 * `TreeViewComponent` represents the react TreeView Component.
 * ```ts
 * <TreeViewComponent allowDragAndDrop={true}></TreeViewComponent>
 * ```
 */
class TreeViewComponent extends TreeView {
    constructor(props) {
        super(props);
        this.initRenderCalled = false;
        this.checkInjectedModules = true;
        this.immediateRender = false;
        this.portals = [];
    }
    render() {
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            super.render();
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    }
}
applyMixins(TreeViewComponent, [ComponentBase, Component]);

/**
 * `SidebarComponent` represents the Essential JS 2 React Sidebar Component.
 * ```ts
 * <SidebarComponent></SidebarComponent>
 * ```
 */
class SidebarComponent extends Sidebar {
    constructor(props) {
        super(props);
        this.initRenderCalled = false;
        this.checkInjectedModules = true;
        this.immediateRender = true;
        this.portals = [];
    }
    render() {
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            super.render();
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    }
}
applyMixins(SidebarComponent, [ComponentBase, Component]);

class MenuItemDirective extends ComplexBase {
}
MenuItemDirective.moduleName = 'menuItem';
class MenuItemsDirective extends ComplexBase {
}
MenuItemsDirective.propertyName = 'items';
MenuItemsDirective.moduleName = 'menuItems';

/**
 * `MenuComponent` represents the react Menu Component.
 * ```ts
 * <MenuComponent items={menuItems} />
 * ```
 */
class MenuComponent extends Menu {
    constructor(props) {
        super(props);
        this.initRenderCalled = false;
        this.checkInjectedModules = false;
        this.directivekeys = { 'menuItems': 'menuItem' };
        this.immediateRender = false;
        this.portals = [];
    }
    render() {
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            super.render();
            this.initRenderCalled = true;
        }
        else {
            return createElement('ul', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    }
}
applyMixins(MenuComponent, [ComponentBase, Component]);

export { AccordionItemDirective, AccordionItemsDirective, AccordionComponent, ItemDirective, ItemsDirective, ToolbarComponent, ContextMenuComponent, BreadcrumbItemDirective, BreadcrumbItemsDirective, BreadcrumbComponent, CarouselItemDirective, CarouselItemsDirective, CarouselComponent, TabItemDirective, TabItemsDirective, TabComponent, TreeViewComponent, SidebarComponent, MenuItemDirective, MenuItemsDirective, MenuComponent };
export * from '@syncfusion/ej2-navigations';
export { Inject } from '@syncfusion/ej2-react-base';
//# sourceMappingURL=ej2-react-navigations.es2015.js.map
