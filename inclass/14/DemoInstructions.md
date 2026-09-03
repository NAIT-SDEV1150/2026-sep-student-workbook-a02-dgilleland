# DOM Manipulation

> The material here will be covered in-class. These notes and code-snippets are supporting materials. Note that your instructor is likely to include additional material during class.
>
> The starter kit code for this is part of your **student workbook**.
>
> Topic: Guide for selecting, navigating, creating, inserting, replacing, and removing DOM nodes

----

## Concepts

The previous lesson introduced the first habit of DOM work: select an element, log it, confirm JavaScript found what was expected, and then change one thing about it.

This lesson goes deeper. You should now see the DOM as a tree they can search, navigate, and modify while the page is running.

### Selection vs Navigation

`document.querySelector()` and `document.querySelectorAll()` search for elements using selector strings. That is useful when the code knows what pattern it wants.

DOM navigation starts from an element that JavaScript already has and moves to nearby nodes. This is useful when the code needs to work relative to the current element:

- parent elements
- child elements
- previous or next sibling elements

> ***Note:** Element vs Node*
> 
> The DOM contains different kinds of nodes. Elements are nodes, but text is also represented by text nodes.
>
> Use element-focused properties such as `children`, `firstElementChild`, and `nextElementSibling` when you only need element nodes.



### Creating DOM Nodes

You should distinguish between changing an existing element and creating a new one:

- `.textContent` changes the text content of an existing element.
- `document.createElement()` creates a new element node.
- `document.createTextNode()` creates a text node.
- `.append()` and `.appendChild()` insert nodes into the live DOM.

Use `.textContent` when an element only needs plain text. Use `document.createTextNode()` when the text itself should be its own node, usually because it is being appended beside other nodes.

### Fragments

A `DocumentFragment` is a temporary container for DOM nodes. It lets code build a group of nodes first, then insert the group into the page once.

The fragment itself does not remain visible in the final DOM tree. Its children move into the destination.

----

## Demo Walkthrough

The Lesson 15 demo carries forward the browser starter from Lesson 12. The project is already initialized, so you do not need to run `pnpm init` or install packages one by one.

> ***Tip:** Frequent, small commits*
> 
> We'll also practice version control by **making a commit after each group of steps**. Commits in git are a two-step process: First, we stage what changes we want to commit. Then we do the actual commit.
>
> ```ps title="Commit Example"
> git add .
> git commit -m "Select DOM elements"
> ```



### Starter Files

<FileTree>
- demo
  - css
    - styles.css
  - img
    - icons8-javascript-48.png
    - undraw_building-a-website_1wrp.svg
    - undraw_completed_vjc6.svg
  - js
    - credits.js
    - main.js
  - index.html
  - package.json
  - ReadMe.md
</FileTree>

The `main.js` file starts empty. The `package.json` file already has the Vite dev script and dependencies.

### Project Setup


1. Open the `~/inclass/14/demo` folder in VS Code.

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


### Connect JavaScript


1. Add the module script tag in `index.html`.

    ```diff lang="html" title="~/inclass/14/demo/index.html"
      <link rel="shortcut icon" href="./img/icons8-javascript-48.png" type="image/x-icon">
      <link rel="stylesheet" href="./css/styles.css">
    - <!-- Place script tag here -->
    + <script type="module" src="./js/main.js"></script>
    ```

2. Import PicoCSS and log a first message in `main.js`.

    ```js title="~/inclass/14/demo/js/main.js"
    import '@picocss/pico/css/pico.green.min.css';

    console.log('Lesson 15 main.js loaded');
    ```


> ```ps
> git add .
> git commit -m "Connect browser script"
> ```

### Select Multiple Elements

Use `querySelectorAll()` when the code needs every element matching a selector.


1. Select major page areas and all navigation links.

    ```diff lang="js" title="~/inclass/14/demo/js/main.js"
      console.log('Lesson 15 main.js loaded');
    +
    + const pageHeading = document.querySelector('h1');
    + const mainContent = document.querySelector('main');
    + const navLinks = document.querySelectorAll('nav a');
    +
    + console.log(pageHeading);
    + console.log(mainContent);
    + console.log(navLinks);
    ```

    `navLinks` is a `NodeList`. It looks array-like and has `.forEach()`, but it is not an array.

2. Convert the `NodeList` into an array when array methods are useful.

    ```diff lang="js" title="~/inclass/14/demo/js/main.js"
      console.log(navLinks);
    +
    + const navLinkLabels = [...navLinks].map((link) => {
    +   return link.textContent;
    + });
    +
    + console.log(navLinkLabels);
    ```

3. Check a selection that fails.

    ```diff lang="js" title="~/inclass/14/demo/js/main.js"
      console.log(navLinkLabels);
    +
    + const missingPanel = document.querySelector('.announcement-panel');
    + console.log(missingPanel);
    ```

    The console shows `null`. You should check for `null` before changing an element that might not exist.


### Select From a Subtree

Once JavaScript has an element, it can search inside that element instead of searching the full document.


1. Search for the language list from `mainContent`.

    ```diff lang="js" title="~/inclass/14/demo/js/main.js"
      const missingPanel = document.querySelector('.announcement-panel');
      console.log(missingPanel);
    +
    + const languageList = mainContent.querySelector('ul');
    + const languageItems = languageList.querySelectorAll('li');
    +
    + console.log(languageList);
    + console.log(languageItems);
    ```

    This keeps the selector focused on the part of the page the code is working with.


> ```ps
> git add .
> git commit -m "Select DOM elements"
> ```

### Navigate the DOM Tree

Navigation moves from a selected element to nearby elements.


1. Navigate from the list to its parent and children.

    ```diff lang="js" title="~/inclass/14/demo/js/main.js"
      console.log(languageItems);
    +
    + const listParent = languageList.parentElement;
    + const firstLanguage = languageList.firstElementChild;
    + const lastLanguage = languageList.lastElementChild;
    +
    + console.log(listParent);
    + console.log(firstLanguage);
    + console.log(lastLanguage);
    ```

2. Navigate between sibling elements.

    ```diff lang="js" title="~/inclass/14/demo/js/main.js"
      console.log(lastLanguage);
    +
    + const paragraphBeforeList = languageList.previousElementSibling;
    + const ruleAfterList = languageList.nextElementSibling;
    +
    + console.log(paragraphBeforeList);
    + console.log(ruleAfterList);
    ```

    > ***Note:** Element Properties*
    >
    > The `firstElementChild` and `nextElementSibling` properties skip text nodes.
    >
    > That is usually easier for beginners than `firstChild` and `nextSibling`, which may return whitespace text nodes.
    
    


### Modify Existing Elements

Use `.textContent`, attributes, and styles to change elements that already exist.


1. Change text content.

    ```diff lang="js" title="~/inclass/14/demo/js/main.js"
      console.log(ruleAfterList);
    +
    + pageHeading.textContent = 'DOM API Practice';
    + paragraphBeforeList.textContent = 'JavaScript can select, navigate, and modify the live DOM.';
    ```

2. Change styles on the list.

    ```diff lang="js" title="~/inclass/14/demo/js/main.js"
      asideImage.setAttribute('alt', 'A person building a website');
    +
    + languageList.style.borderLeft = '0.4rem solid var(--pico-primary)';
    + languageList.style.paddingLeft = '1rem';
    ```

3. Change the existing aside image attributes.

    ```diff lang="js" title="~/inclass/14/demo/js/main.js"
      paragraphBeforeList.textContent = 'JavaScript can select, navigate, and modify the live DOM.';
    +
    + const asideImage = document.querySelector('aside img');
    + asideImage.setAttribute('width', '180');
    + asideImage.alt = 'A person building a website';
    + asideImage.src = './img/undraw_code-review_jdgp.svg';
    ```


> ```ps
> git add .
> git commit -m "Navigate and modify the DOM"
> ```

### Create Elements With Text Content

Create a new element, put text inside it with `.textContent`, and append it to the page.


1. Create a status paragraph.

    ```diff lang="js" title="~/inclass/14/demo/js/main.js"
      asideImage.alt = 'A person building a website';
      asideImage.src = './img/undraw_code-review_jdgp.svg';
    +
    + const statusMessage = document.createElement('p');
    + statusMessage.textContent = 'Created with document.createElement() and .textContent.';
    + mainContent.append(statusMessage);
    ```

    `.textContent` is direct and clear when the element only needs plain text.


### Create Text Nodes

Use `document.createTextNode()` when the text itself is being appended as a node beside other nodes.


1. Create a note with a strong label and a text node.

    ```diff lang="js" title="~/inclass/14/demo/js/main.js"
      const statusMessage = document.createElement('p');
      statusMessage.textContent = 'Created with document.createElement() and .textContent.';
      mainContent.append(statusMessage);
    +
    + const reminder = document.createElement('p');
    + const reminderLabel = document.createElement('strong');
    + reminderLabel.textContent = 'Reminder: ';
    +
    + const reminderText = document.createTextNode('created text nodes can sit beside element nodes.');
    +
    + console.log(reminder, reminderLabel, reminderText);
    ```

2. So far, all we've done with `reminder`, `reminderLabel` and `reminderText` is generate **document fragments**. They are all separate from each other. Let's assemble them.

    ```diff lang="js" title="~/inclass/14/demo/js/main.js"
      console.log(reminder, reminderLabel, reminderText);
    + 
    + reminder.append(reminderLabel);
    + reminder.appendChild(reminderText);
    + console.log(reminder);
    ```

    The `reminder` paragraph now contains both an element node and a text node.

    > ***Note:** .append() or .appendChild()?*
    > 
    > Choose `.append()` when you want to:
    >
    > ```js
    > list.append(item);
    > list.append(item1, item2, item3);
    > message.append("Saved!");
    > ```
    >
    > It can append nodes or strings, and it can append multiple things at once. It returns undefined.
    > 
    > Choose `.appendChild()` when you specifically need the older Node API:
    >
    > ```js
    > const addedItem = list.appendChild(item);
    > ```
    >
    > It accepts one `Node` only, does not accept plain strings, and returns the appended node. That return value is occasionally useful for chaining or storing the inserted node.
    >
    > One important shared behavior: both methods **move an existing node** if it is already in the DOM; they do not clone it.
    >
    > **Rule of thumb:** use `.append()` unless you need `appendChild()`'s return value or you are working in applications that specifically require the classic DOM
      API.
    >
    > Sources: <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/append" target="_blank">MDN on Element.append()</a>, <a href="https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild" target="_blank">MDN on Node.appendChild()</a>,

3. While we have assembled the `reminder` paragraph, it's still not part of the DOM. Let's add that to the DOM.

    ```diff lang="js" title="~/inclass/14/demo/js/main.js"
      console.log(reminder);
      
    + mainContent.append(reminder); // It is only at this point that the <p> becomes part of the DOM
    ```



> ```ps
> git add .
> git commit -m "Create DOM nodes"
> ```

### Create and Insert an Image

Use the additional Undraw image to practice image attributes.


1. Create a figure with an image and caption.

    ```diff lang="js" title="~/inclass/14/demo/js/main.js"
      mainContent.append(reminder);
    +
    + const completionFigure = document.createElement('figure');
    + const completionImage = document.createElement('img');
    + const completionCaption = document.createElement('figcaption');
    +
    + completionImage.src = './img/undraw_completed_vjc6.svg';
    + completionImage.alt = 'A completed task checklist';
    + completionImage.width = '220';
    + completionCaption.textContent = 'Image element created and configured from JavaScript.';
    +
    + completionFigure.append(completionImage, completionCaption);
    + mainContent.append(completionFigure);
    ```

### Replace and Remove Elements

Use `replaceWith()` and `.remove()` for targeted DOM changes.


1. Replace the first list item.

    ```diff lang="js" title="~/inclass/14/demo/js/main.js"
      completionFigure.append(completionCaption);
      mainContent.append(completionFigure);
    +
    + const replacementItem = document.createElement('li');
    + replacementItem.textContent = 'DOM nodes can be replaced.';
    + firstLanguage.replaceWith(replacementItem);
    ```

2. Remove the horizontal rule after the list.

    ```diff lang="js" title="~/inclass/14/demo/js/main.js"
      const replacementItem = document.createElement('li');
      replacementItem.textContent = 'DOM nodes can be replaced.';
      firstLanguage.replaceWith(replacementItem);
    +
    + ruleAfterList.remove();
    ```


### Use a Document Fragment

Build several nodes in a `DocumentFragment`, then append the group once.


1. Create a fragment with several list items.

    ```diff lang="js" title="~/inclass/14/demo/js/main.js"
      ruleAfterList.remove();
    +
    + const fragment = document.createDocumentFragment();
    + const newTopics = ['Select', 'Navigate', 'Create', 'Insert'];
    +
    + for (let topic of newTopics) {
    +   const topicItem = document.createElement('li');
    +   topicItem.textContent = `Practice: ${topic}`;
    +   fragment.append(topicItem);
    + }
    +
    + languageList.append(fragment);
    ```

    The fragment is a temporary container. Its children move into `languageList`.


> ```ps
> git add .
> git commit -m "Replace remove and fragment DOM nodes"
> ```

### Finish With Credits


1. Import and use the supplied footer helper.

    ```diff lang="js" title="~/inclass/14/demo/js/main.js"
      import '@picocss/pico/css/pico.green.min.css';
    + import { fillCredits } from './credits';

      console.log('Lesson 15 main.js loaded');
    ```

    ```diff lang="js" title="~/inclass/14/demo/js/main.js"
      languageList.append(fragment);
    +
    + fillCredits(2026, 'Stew Dent');
    ```


## Conclusion

> **Assigned homework:** Complete [Homework: Practice DOM Creation and Navigation](./homework/150-homework.mdx). It reinforces today's DOM workflow and gives fallback practice for DOM navigation, creating/inserting nodes, replacing/removing nodes, and document fragments.

You should leave this lesson with a practical DOM workflow:

1. Select or navigate to the node they need.
1. Log and confirm the selection.
1. Choose whether to modify an existing node or create a new one.
1. Insert, replace, or remove nodes intentionally.

> ***Tip:** DOM API Habit*
> 
> Keep asking yourself what kind of value each operation returns: one element, a collection, a text node, a new element, or nothing visible.


