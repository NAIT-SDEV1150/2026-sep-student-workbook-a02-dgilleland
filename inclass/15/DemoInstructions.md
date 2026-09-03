# Event Listeners

> The material here will be covered in-class. These notes and code-snippets are supporting materials. Note that your instructor is likely to include additional material during class.
>
> The starter kit code for this is part of your **student workbook**.
>
> Topic:  Instructor guide for browser events, event listeners, event objects, delegation, bubbling, and capturing

----

## Concepts

You have already used JavaScript to select and change DOM elements. Event listeners add the next browser idea: instead of running all changes immediately, JavaScript can wait for a user action and respond when that action happens.

### Event-Driven Programming

An event-driven program is organized around things that happen:

- a user clicks a button
- the pointer enters or leaves an element
- a key is pressed
- a form is submitted

The browser detects the event. JavaScript registers a listener function. When the event happens, the browser calls that listener.

### Event Objects

Most listener functions receive an event object. The event object contains information about what happened:

- `event.type` names the event.
- `event.target` points to the element where the event started.
- keyboard events include values such as `event.key` and `event.code`.

### Bubbling, Capturing, and Delegation

Many events move through the DOM tree. In the capturing phase, the event travels from the outside of the document toward the target. In the bubbling phase, it travels back from the target toward its ancestors.

Event delegation uses bubbling on purpose. Instead of adding a listener to every list item, code can add one listener to the parent list and inspect `event.target`.

> ***Note:** Old Starter Fit*
> The old starter kit is a strong fit for clicks, hover events, keydown events, dynamic DOM updates, multiple listeners, and event delegation.
>
> It needed adjustment for this lesson because it used an older project layout, npm instructions, completed JavaScript, and a delegation snippet that referenced `li` before declaring it. It also demonstrated bubbling through delegation but did not explicitly show capturing.


----

## Demo Walkthrough

> *Estimated walkthrough time (with discussion): **125-155 minutes** total*
>


This Lesson demo is adapted from an older event-listener starter kit. The project is already initialized, so you do not need to run `pnpm init` or install packages one by one.

This version uses two HTML pages and several ES modules. The main page keeps the core event examples together. The panorama sample lives on its own page so the layout stays easier to scan.

> ***Tip:** Frequent, small commits*
> 
> We'll also practice version control by **making a commit after each group of steps**. Commits in git are a two-step process: First, we stage what changes we want to commit. Then we do the actual commit.
> 
> ```ps title="Commit Example"
> git add .
> git commit -m "Add click listeners"
> ```



### Starter Files

<FileTree>
- demo
  - css
    - styles.css
  - img
    - javascript-logo.png
  - js
    - clickEvents.js
    - hoverCard.js
    - keyboardEvents.js
    - listDelegation.js
    - main.js
    - panoramaPanels.js
    - propagationEvents.js
  - index.html
  - panorama.html
  - package.json
  - ReadMe.md
</FileTree>

Both HTML pages load `./js/main.js` as a module script. The `main.js` file coordinates the demo by importing setup functions from the other files.

### Project Setup


1. Open the `~/inclass/15/demo` folder in VS Code.

2. Install the prepared dependencies.

    ```ps title="Terminal"
    pnpm install
    ```

3. Run the development server.

    ```ps title="Terminal"
    pnpm dev
    ```

4. Type `o` and press <kbd>Enter</kbd> to open the page in the browser.

5. Open the browser's Developer Tools Console.


### Page Navigation

The demo has two pages. Each page uses the same header pattern:

```html title="~/inclass/15/demo/index.html"
<div class="site-header">
  <h1 id="page-title">Event Listeners</h1>
  <nav class="page-nav" aria-label="Demo pages">
    <a href="./index.html" aria-current="page">Core Samples</a>
    <a href="./panorama.html">Panorama Panels</a>
  </nav>
</div>
```

On `panorama.html`, move `aria-current="page"` to the Panorama Panels link. This gives the page a small navbar without moving the demo away from the lesson title.

### Main Coordinator

Start with `main.js`. It imports the setup functions and calls them.


1. Add a first console message.

    ```js title="~/inclass/15/demo/js/main.js"
    console.log('Lesson 16 main.js loaded');
    ```

2. Import each module.

    ```diff lang="js" title="~/inclass/15/demo/js/main.js"
    - // TODO: Add imports
    + import { setupClickEvents } from './clickEvents.js';
    + import { setupHoverCard } from './hoverCard.js';
    + import { setupKeyboardEvents } from './keyboardEvents.js';
    + import { setupListDelegation } from './listDelegation.js';
    + import { setupPanoramaPanels } from './panoramaPanels.js';
    + import { setupPropagationEvents } from './propagationEvents.js';
      
      console.log('Lesson 16 main.js loaded');
    ```

3. Call each setup function.

    ```diff lang="js" title="~/inclass/15/demo/js/main.js"
      console.log('Lesson 16 main.js loaded');
    
    - // TODO: Call UI setup functions
    + setupClickEvents();
    + setupHoverCard();
    + setupKeyboardEvents();
    + setupListDelegation();
    + setupPanoramaPanels();
    + setupPropagationEvents();
    ```

    Each setup function checks whether its HTML exists before adding listeners. That lets one `main.js` work on both pages.


### Click Events

Use `addEventListener()` to run a function when a click happens.


1. Open `clickEvents.js` and select the click-demo elements.

    ```diff lang="js" title="~/inclass/15/demo/js/clickEvents.js"
      export function setupClickEvents() {
    -   // TODO: Select #btn-toggle, #btn-message, and #message.
    -   // TODO: Add click listeners that update the page.
    +   const btnToggle = document.querySelector('#btn-toggle');
    +   const btnMessage = document.querySelector('#btn-message');
    +   const message = document.querySelector('#message');
    +
    +   if (!btnToggle || !btnMessage || !message) {
    +     return;
    +   }
      }
    ```

2. Add a click listener that toggles a class on the body.

    ```diff lang="js" title="~/inclass/15/demo/js/clickEvents.js"
        if (!btnToggle || !btnMessage || !message) {
          return;
        }
    +
    +   btnToggle.addEventListener('click', function () {
    +   document.body.classList.toggle('highlight');
    +
    +   const isHighlighted = document.body.classList.contains('highlight');
    +   btnToggle.textContent = isHighlighted ? 'Highlight is ON' : 'Highlight is OFF';
    +   });
      }
    ```

    The listener function does not run when the page loads. It runs each time the button is clicked.

3. Add a second click listener that changes message text.

    ```diff lang="js" title="~/inclass/15/demo/js/clickEvents.js"
        btnToggle.addEventListener('click', function () {
          document.body.classList.toggle('highlight');
        
          const isHighlighted = document.body.classList.contains('highlight');
          btnToggle.textContent = isHighlighted ? 'Highlight is ON' : 'Highlight is OFF';
        });
    +
    +   btnMessage.addEventListener('click', function () {
    +   const timeString = new Date().toLocaleTimeString();
    +   message.textContent = `Message updated at ${timeString}`;
    +   });
      }
    ```


> ```ps
> git add .
> git commit -m "Add click listeners"
> ```

### Mouse Events

Mouse events can update the interface while the pointer moves over an element.


1. Select the hover elements.

    ```diff lang="js" title="~/inclass/15/demo/js/hoverCard.js"
      export function setupHoverCard() {
    -   // TODO: Select #hover-card and #hover-status.
    -   // TODO: Add mouseover and mouseout listeners.
    +   const hoverCard = document.querySelector('#hover-card');
    +   const hoverStatus = document.querySelector('#hover-status');
    +
    +   if (!hoverCard || !hoverStatus) {
    +     return;
    +   }
      }
    ```

2. Add `mouseover` and `mouseout` listeners.

    ```diff lang="js" title="~/inclass/15/demo/js/hoverCard.js"
        if (!hoverCard || !hoverStatus) {
          return;
        }
    +
    +   hoverCard.addEventListener('mouseover', function () {
    +   hoverStatus.textContent = 'Status: Hovering';
    +   });
    +
    +   hoverCard.addEventListener('mouseout', function () {
    +   hoverStatus.textContent = 'Status: Not hovering';
    +   });
      }
    ```

    The two listeners work together to keep the status accurate.


### Keyboard Events

Use the event object to read information about the key that was pressed.


1. Select the keyboard output area and add a document-level listener.

    ```diff lang="js" title="~/inclass/15/demo/js/keyboardEvents.js"
      export function setupKeyboardEvents() {
    -   // TODO: Select #key-output.
    -   // TODO: Add a keydown listener on document.
    +   const keyOutput = document.querySelector('#key-output');
    +
    +   if (!keyOutput) {
    +     return;
    +   }
    +
    +   document.addEventListener('keydown', function (event) {
    +     keyOutput.textContent = `Last key: ${event.key} (code: ${event.code})`;
    +   });
      }
    ```

    The listener is on `document` because the page should respond when the user types anywhere.
2. This listener responds to the `'keydown'` event. That means *every* keypress results in this listener being fired/executed. Notice what happens when you press <kbd>shift</kbd> or <kbd>caps lock</kbd>. 
    
    - If the caps-lock is on, what happens when you press a letter?
    - What happens if you hold a key down? *(Hint: Add a `console.log(event.key)` to the event.)
3. There are lots of other <a href="https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#events" target="_blank">keyboard events</a>. What do you think are the purposes of these events?

    - keydown
    - keyup
    - keypress 🗑️ (note: deprecated)


> ```ps
> git add .
> git commit -m "Add mouse and keyboard listeners"
> ```

### Panorama Panels

The panorama sample lives on `panorama.html`. It combines mouse events with event objects, event delegation, class changes, and conditional UI text. It uses one full panorama image and creates the slice effect with CSS background positioning, so you do not need to do any image processing during the lesson.

The HTML contains one parent container with five image panels, a status message, and the required Unsplash credit:

```html title="~/inclass/15/demo/panorama.html"
<div id="panorama" class="panorama" aria-label="Five-panel mountain panorama">
  <span class="panorama-panel panel-1" role="img" aria-label="Left edge of a mountain panorama"></span>
  <span class="panorama-panel panel-2" role="img" aria-label="Left-center panel of a mountain panorama"></span>
  <span class="panorama-panel panel-3" role="img" aria-label="Center panel of a mountain panorama"></span>
  <span class="panorama-panel panel-4" role="img" aria-label="Right-center panel of a mountain panorama"></span>
  <span class="panorama-panel panel-5" role="img" aria-label="Right edge of a mountain panorama"></span>
</div>
```

Each panel shows a different part of the same image:

```css title="~/inclass/15/demo/css/styles.css"
.panorama-panel {
  background-image: url("../img/jean-brochard-q3zREeu4SMA-medium-unsplash.jpg");
  background-size: 500% 100%;
}

.panel-1 {
  background-position: 0% 0;
}

.panel-2 {
  background-position: 25% 0;
}

.panel-3 {
  background-position: 50% 0;
}

.panel-4 {
  background-position: 75% 0;
}

.panel-5 {
  background-position: 100% 0;
}
```

`background-size: 500% 100%` makes the image five panels wide. The `background-position` rules choose which fifth each panel displays.

The credit is hidden at first. When the panels join, we want it to show the attribution:

```html title="Attribution"
Photo by <a href="https://unsplash.com/@jeanbrochard" target="_blank" rel="noopener noreferrer">Jean Brochard</a> on <a href="https://unsplash.com/" target="_blank" rel="noopener noreferrer">Unsplash</a>
```

Both external credit links open in a new tab with `target="_blank"` and include `rel="noopener noreferrer"`.


1. Select the panorama elements.

    ```diff lang="js" title="~/inclass/15/demo/js/panoramaPanels.js"
      export function setupPanoramaPanels() {
    -   // TODO: Select #panorama, #panorama-status, and #panorama-credit.
    -   // TODO: Add mouseover and mouseout listeners to the panorama container.
    +   const panorama = document.querySelector('#panorama');
    +   const panoramaStatus = document.querySelector('#panorama-status');
    +   const panoramaCredit = document.querySelector('#panorama-credit');
    +
    +   if (!panorama || !panoramaStatus || !panoramaCredit) {
    +     return;
    +   }
      }
    ```

2. Add one `mouseover` listener to the parent container.

    ```diff lang="js" title="~/inclass/15/demo/js/panoramaPanels.js"
        if (!panorama || !panoramaStatus || !panoramaCredit) {
          return;
        }
    +
    +   panorama.addEventListener('mouseover', function (event) {
    +     const panel = event.target.closest('.panorama-panel');
    +
    +     if (!panel || !panorama.contains(panel)) {
    +       return;
    +     }
    +
    +     panorama.classList.add('is-joined');
    +     panoramaStatus.textContent = 'Panorama: panels joined';
    +     panoramaCredit.hidden = false;
    +   });
      }
    ```

    `mouseover` fires when the pointer enters child panels. That makes it a useful event for this example because one listener on the parent can respond to any panel.

3. Add a `mouseout` listener that checks `event.relatedTarget`.

    ```diff lang="js" title="~/inclass/15/demo/js/panoramaPanels.js"
        panorama.addEventListener('mouseover', function (event) {
          const panel = event.target.closest('.panorama-panel');
        
          if (!panel || !panorama.contains(panel)) {
            return;
          }
        
          panorama.classList.add('is-joined');
          panoramaStatus.textContent = 'Panorama: panels joined';
          panoramaCredit.hidden = false;
        });
    +
    +   panorama.addEventListener('mouseout', function (event) {
    +     if (panorama.contains(event.relatedTarget)) {
    +       return;
    +     }
    +
    +     panorama.classList.remove('is-joined');
    +     panoramaStatus.textContent = 'Panorama: separated panels';
    +     panoramaCredit.hidden = true;
    +   });
      }
    ```

    `mouseout` can happen while moving between child panels. `event.relatedTarget` tells us where the pointer went next, so the code only separates the panels when the pointer leaves the full panorama container.


> ```ps
> git add .
> git commit -m "Add panorama hover panel sample"
> ```

### Event Delegation

Event delegation uses one parent listener to handle clicks from child elements.


1. Return to the home page ("Core Samples"). Select the list and output area.

    ```diff lang="js" title="~/inclass/15/demo/js/listDelegation.js"
      export function setupListDelegation() {
    -   // TODO: Select #list and #selection.
    -   // TODO: Add one click listener to the list and use event.target.
    +   const list = document.querySelector('#list');
    +   const selection = document.querySelector('#selection');
    +
    +   if (!list || !selection) {
    +     return;
    +   }
      }
    ```

2. Add one listener to the list.

    ```diff lang="js" title="~/inclass/15/demo/js/listDelegation.js" ".closest('li')"
        if (!list || !selection) {
          return;
        }
    +
    +   list.addEventListener('click', function (event) {
    +     const li = event.target.closest('li');
    +
    +     if (!li || !list.contains(li)) {
    +       return;
    +     }
    +
    +     const previousSelection = list.querySelector('li.active');
    +
    +     if (previousSelection) {
    +       previousSelection.classList.remove('active');
    +     }
    +
    +     li.classList.add('active');
    +
    +     const id = li.getAttribute('data-id');
    +     selection.textContent = `Selected: Item ${id}`;
    +   });
      }
    ```

3. Notice the use of `event.target.closest('li')` to find the list item. But what was the target that was actually clicked on? Consider adding a `console.log(event.target);` to inspect it in the dev tools' console.

    ```diff lang="js" title="~/inclass/15/demo/js/listDelegation.js"
        list.addEventListener('click', function (event) {
          const li = event.target.closest('li');
    +     console.log(event.target);
     
          if (!li || !list.contains(li)) {
    +       selection.textContent = `Clicked on the <${event.target.tagName}>.`;
            return;
          }
    ```

    - What happens when you click on the word "Item" in the list?
    - What happens when you click on the number in the list?
    - What happens if you click on the whitespace to the right of the number?
    - What happens when you click *between* the list items?
4. One final experiment: Let's remove the search for the `list` and `selection` elements and see what happens.

    ```diff lang="js" title="~/inclass/15/demo/js/listDelegation.js"
      export function setupListDelegation() {
    -   const list = document.querySelector('#list');
    -   const selection = document.querySelector('#selection');
      }
    ```

    Does the page still work? Why?

    > ***Tip:** Unique IDs on Elements*

    > The answer to why it still works is in the HTML:
    >
    > ```html title="index.html" "id="
    > <ul id="list" class="list">
    >   <li data-id="1"><i>Item</i> <b>01</b></li>
    >   <li data-id="2"><i>Item</i> <b>02</b></li>
    >   <li data-id="3"><i>Item</i> <b>03</b></li>
    > </ul>
    > <div id="selection" class="output">Selected: (none)</div>
    > ```
    >
    > Because of the `id="list"` and the `id="selection"`, these elements have a *unique identifier*. *Most* browsers will generate a global variable of the same name. In our case, that means the browser automatically created a `list` variable to reference the `<ul>` and a `selection` variable to reference the following `<div>`.
    >
    > But, **don't rely on this**, particularly whenever the element's identifier is in *kebab-case*.
    
    


### Bubbling and Capturing

Use nested elements to show the order in which event listeners run.


1. Select the propagation demo elements.

    ```diff lang="js" title="~/inclass/15/demo/js/propagationEvents.js"
      export function setupPropagationEvents() {
    -   // TODO: Select the nested boxes, inner button, event log, and clear button.
    -   // TODO: Add bubbling and capturing listeners.
    +   const outerBox = document.querySelector('#outer-box');
    +   const middleBox = document.querySelector('#middle-box');
    +   const innerButton = document.querySelector('#inner-button');
    +   const eventLog = document.querySelector('#event-log');
    +   const btnClearLog = document.querySelector('#btn-clear-log');
    +
    +   if (!outerBox || !middleBox || !innerButton || !eventLog || !btnClearLog) {
    +     return;
    +   }
      }
    ```

2. Create a helper that writes to the event log.

    ```diff lang="js" title="~/inclass/15/demo/js/propagationEvents.js"
        if (!outerBox || !middleBox || !innerButton || !eventLog || !btnClearLog) {
          return;
        }
    +
    +   function addLog(messageText) {
    +     const logItem = document.createElement('li');
    +     logItem.textContent = messageText;
    +     eventLog.append(logItem);
    +   }
      }
    ```

3. Add bubbling listeners. What happens when you click on each area?

    ```diff lang="js" title="~/inclass/15/demo/js/propagationEvents.js"
        function addLog(messageText) {
          const logItem = document.createElement('li');
          logItem.textContent = messageText;
          eventLog.append(logItem);
        }
    +
    +   outerBox.addEventListener('click', function () {
    +     addLog('Bubble: outer box');
    +   });
    +
    +   middleBox.addEventListener('click', function () {
    +     addLog('Bubble: middle box');
    +   });
    +
    +   innerButton.addEventListener('click', function () {
    +     addLog('Bubble: inner button');
    +   });
      }
    ```

    You should notice that clicking on an inner item has the `click` event "bubble" up through the DOM, triggering the event listeners of the *parent* elements.

4. Add a clear button. This can "reset" the display area so you can explore the effects of your clicking more carefully.

    ```diff lang="js" title="~/inclass/15/demo/js/propagationEvents.js"
        innerButton.addEventListener('click', function () {
          addLog('Bubble: inner button');
        });
    +
    +   btnClearLog.addEventListener('click', function () {
    +     eventLog.textContent = '';
    +   });
      }
    ```

5. Add extra listeners on the `outerBox` and `middleBox`, this time with a slightly different message about "capturing" the click. Make special note about the *order* of the messages that appear in the `eventLog` element.

    ```diff lang="js" title="~/inclass/15/demo/js/propagationEvents.js"
        btnClearLog.addEventListener('click', function () {
          eventLog.textContent = '';
        });
    +
    +   outerBox.addEventListener('click', function () {
    +     addLog('Capture: outer box');
    +   });
    +
    +   middleBox.addEventListener('click', function () {
    +     addLog('Capture: middle box');
    +   });
      }
    ```

6. What happens if you add a *third* parameter to the `addEventListener()`? Make the following changes by using `true` for the third argument - `useCapture`.

    ```diff lang="js" title="~/inclass/15/demo/js/propagationEvents.js" ", true"
    +   outerBox.addEventListener('click', function () {
    +     addLog('Capture: outer box');
    -   });
    +   }, true);
    +
    +   middleBox.addEventListener('click', function () {
    +     addLog('Capture: middle box');
    -   });
    +   }, true);
    ```

    Click the inner button. Notice now how all "Capture" messages appear *before* bubbling messages.

    > `useCapture` &mdash; A boolean value indicating whether events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree. Events that are bubbling upward through the tree will not trigger a listener designated to use capture. Event bubbling and capturing are two ways of propagating events that occur in an element that is nested within another element, when both elements have registered a handle for that event. The event propagation mode determines the order in which elements receive the event.
    >
    > <a href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#parameters" target="_blank">See the note on the `useCapture` optional argument for `addEventListener()`</a>



> ```ps
> git add .
> git commit -m "Compare bubbling and capturing"
> ```

----

## Conclusion

> **Assigned homework:** Complete [Homework: Practice Event Flow](./homework/160-homework.mdx). It reinforces today's event-listener workflow and gives fallback practice for mouse events, keyboard events, delegation, bubbling, and capturing.

You should leave this lesson with a practical event workflow:

1. Select the element that should listen.
1. Choose the event type.
1. Write a listener function.
1. Use the event object when the response depends on what happened.
1. Decide whether the listener belongs on the target element or a parent element.

They should also be cognizant of the nature of **event bubbling** in the DOM.

> ***Tip:** Event Listener Habit*
> 
> Which element is *listening* and which element *triggered* the event? That distinction is the key to understanding delegation, bubbling, and capturing.


