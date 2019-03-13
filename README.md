# Hide Navigation Bar for Ionic 4
*This project is WIP. It will be continued when Supertabs for Ionic 4 is released*

[![NPM version][npm-image]][npm-url]

The current development consists of two parts:
- hide header when scrolling up
- stretch header when scrolling down

Both should not be used together on the same page, either you want to make room for reading content or you want to add an expansible header, not both together :)

This plugin is also made as generic as possible, making it maybe a bit harder to setup but giving the user much more freedom to design what he wants.

![](https://github.com/heidji/readme-content/blob/master/stretch-hide-v4.gif?raw=true)

## Installation

```
npm i ionic4-hidenav
```

## Implementation

Create (or modify if you already have) a **shared.module.ts** in your project root folder:

```typescript
import { NgModule } from '@angular/core';
import {HidenavModule} from 'ionic4-hidenav';

@NgModule({
    imports: [HidenavModule],
    exports: [HidenavModule]
})
export class SharedModule { }
```
and import the SharedModule on every page you intend to use this plugin:

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import {SharedModule} from '../shared.module';

const routes: Routes = [
    {
        path: '',
        component: HomePage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        SharedModule
    ],
    declarations: [HomePage]
})
export class HomePageModule {
}
```
---

## Part1: Expansible header
This is a custom component defined using this HTML tag:
```html
<hidenav-stretchhheader></hidenav-stretchhheader>
```
This component should be defined outside of `<ion-content>` and comes with required and optional child DOM elements:

### Step1: Define the stretchheader component and provide a reference to IonContent:

**home.page.html**
```html
<hidenav-stretchheader [hidenav-rel-content]="content"></hidenav-stretchheader>
```
##### If you are unfamiliar with how to get a reference to IonContent, here is the related code:

**home.page.ts**
```typescript
import {Component, ViewChild} from '@angular/core';
import {IonContent} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild(IonContent) content: IonContent;

}
```
### Step2: 

add the HTML Element that should shrink and expand and give it the `#shrinkexpand` reference variable:

```html
<hidenav-stretchheader [hidenav-rel-content]="content">
    <div #shrinkexpand header-height="30" opacity-factor="7" opacity-color="black">
        <!-- hopefully big enough content -->
    </div>
</hidenav-stretchheader>
```
Inputs for `#shrinkexpand`:

| input             | type                         | Description                                                   |
| ----------------- | ---------------------------- | ------------------------------------------------------------- |
| `header-height`   | **required**                 | height to which the header shrinks to                         |
| `opacity-factor`  | optional / default = 0       | `1 - 10` opacity of shrunk header overlay                     |
| `opacity-color`   | optional / default = black   | accepts any css color description (name, rgb, # ..)           |
| `init-expanded`   | optional / default = false   | set to `true` if you want the header to initiate expanded     |

#### *(Optional)* Add static elements:
These come in handy to make the header look like a navigation bar. If you want to add any buttons or titles you need to use the `#static` reference variable:
```html
<hidenav-stretchheader [hidenav-rel-content]="content">
    <div #shrinkexpand header-height="30" opacity-factor="7" opacity-color="black">
        <!-- hopefully big enough content -->
    </div>
    <div #static>
        <ion-toolbar [routerLink]="'/home2/'" color="white" style="font-size: 46px">
            <ion-icon style="color: white;" name="arrow-round-back"></ion-icon>
        </ion-toolbar>
    </div>
    <div #static>
        <!-- other elemenet -->
    </div>
</hidenav-stretchheader>
```
You can add as many `#static` elements as you need.

### Events: 
you can subscribe to the `(scroll)` event for example like:
```html
<hidenav-stretchheader [hidenav-rel-content]="content" (scroll)="handleScrollEvent($event)">
    <!-- header -->
</hidenav-stretchheader>
```
The $event variable returns the current header height.
### Functions:

- `expand(duration)`: scrolls content to top and expands the header.
- `shrink(duration)`: scrolls just about enought to shrink the header if it is expanded.
- `toggle(duration)`: toggles between `expand()` and `shrink()`.

Note that `duration` is optional and defaults to 200.

---
## Part2: Hide Header on scroll
This function is fairly simple to implement than the previous one, all you will have to do is define directives `hidenav-header="name"` and `hidenav-content="name"` in the page you want to use.
The variable `name` should always be unique to both elements that need to work together globally. If the page is killed you can reuse it, but no two live elements should carry the same name or you will get a console.log warning and probably a broken page :)

In the following example, both header and content have the same name so they can identify each other and work together:
```html
<ion-header hidenav-header="page1">
    <!-- header content -->
</ion-header>

<ion-content padding hidenav-content="page1">
    <!-- biiiig page -->
</ion-content>
```

**PS**.: as mentioned in the beginning, you should not use both methods (Part1 and Part2) together on one page. It was never tested and is not intended to be used.

---
## Final words
This project's main motivation is to implement hardware accelerated header animations to be used with **zyra/super-tabs**, but up until now there are no releases for it for Ionic 4. I do not intend to implement it for the default ionic tabs because frankly they are inferior to super-tabs and I have no interest in using them at all..

[npm-url]: https://npmjs.org/package/ionic4-hidenav
[npm-image]: https://img.shields.io/badge/npm-0.0.5-green.svg
 
