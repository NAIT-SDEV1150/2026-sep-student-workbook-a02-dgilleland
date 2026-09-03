# Looping with Arrays

> The material here will be covered in-class. These notes and code-snippets are supporting materials. Note that your instructor is likely to include additional material during class.
>
> The starter kit code for this is part of your **student workbook**.
>
> Topic: Instructor guide for processing arrays with loops, callbacks, and common array methods

----

## Concepts

You already know arrays as a structure: an array holds ordered values, each value has an index, and `.length` reports how many values the array contains. This lesson moves from knowing what an array is to processing each item in an array.

Arrays and loops belong together because arrays often represent a collection of related values. A loop lets us repeat the same operation for each value without writing a separate statement for each index.

> ***Note:** Manual Loop*
> 
> A manual loop makes the indexes visible. This is useful when you need to understand how the program moves from one array position to the next.


### From Manual Loops to Array Methods

Manual loops are still important. They show the mechanics:

- start at index `0`
- keep going while the index is less than `.length`
- read the current value with `array[index]`
- update totals, counts, or selected values as needed

Built-in array methods package common loop patterns into named operations. The method name often describes the intent more clearly than the loop mechanics.

> ***Tip:** Array Method*
> 
> An array method hides the repeated index movement and asks you to focus on the operation for each item.


### Arrow Functions as Callback Syntax

Methods such as `.forEach()`, `.map()`, `.find()`, `.findIndex()`, `.filter()`, and `.sort()` receive a function as an argument. That function is called a callback because the array method calls it for the items it needs to inspect.

For this lesson, introduce arrow functions as a compact way to write those callbacks:

```js
let taskNames = courseTasks.map((task) => {
  return task.title;
});
```

The parameter, `task`, represents one item from the array. The body describes what to do with that one item. The array method decides how many times the callback runs.

### Method Purposes

Use these distinctions throughout the demo:

- `.forEach()` runs code once for each item and does not create a new array.
- `.map()` transforms every item and returns a new array the same length.
- `.find()` returns the first item that matches a condition.
- `.findIndex()` returns the index of the first item that matches a condition.
- `.filter()` returns a new array containing all matching items.
- `.slice()` returns a copied portion of an array without changing the original array.
- `.splice()` removes, replaces, or inserts items by changing the original array.
- `.sort()` orders an array using a compare function.

When teaching `.slice()` and `.splice()`, emphasize the spelling difference and the behaviour difference. `.slice()` copies. `.splice()` changes the array it is called on.

When teaching `.sort()`, emphasize that number comparisons should use subtraction, and string comparisons can use `.localeCompare()`.

----

## Demo Walkthrough

We're staying in a stand-alone JavaScript file for this lesson. There is no HTML, no CSS, no package setup, no modules, and no browser API work. Run the file directly with Node so you can focus on array processing.

> ***Tip:** Frequent, small commits*
> 
> We'll also practice version control by **making a commit after each group of steps**. Commits in git are a two-step process: First, we stage what changes we want to commit. Then we do the actual commit.
>
> ```ps title="Commit Example"
> git add .
> git commit -m "Loop through study minutes"
> ```


### Starter Script


1. Open the `~/inclass/13/demo.js` file in VS Code and run it in Node's watch mode.

    ```ps title="Terminal"
    node --watch demo.js
    ```

    The starter script confirms that the file is running.

    ```js title="~/inclass/13/demo.js"
    console.log('Lesson 14 demo.js has loaded');
    console.log('===============================');
    console.log();
    ```


> ***Note:** Optional Detour*
> 
> If you are comfortable with the starter script, there is an [optional script arguments detour](#optional-script-arguments) at the end of this guide.



### Manual Loop Over Study Minutes

Start with the pattern you already saw in the repetition lesson: a `for` loop that uses an index and `.length`.


1. Add an array and tracking variables.

    ```diff lang="js" title="~/inclass/13/demo.js"
      console.log('Lesson 14 demo.js has loaded');
      console.log('===============================');
      console.log();
    +
    + console.log('Manual loop over study minutes');
    + console.log('------------------------------');
    +
    + let studyMinutes = [45, 30, 0, 75, 50, 90, 20];
    + let totalMinutes = 0;
    + let longestSession = studyMinutes[0];
    ```

2. Loop through the array by index.

    ```diff lang="js" title="~/inclass/13/demo.js"
      let studyMinutes = [45, 30, 0, 75, 50, 90, 20];
      let totalMinutes = 0;
      let longestSession = studyMinutes[0];
    +
    + for (let index = 0; index < studyMinutes.length; index++) {
    +   let minutes = studyMinutes[index];
    +   totalMinutes = totalMinutes + minutes;
    +
    +   if (minutes > longestSession) {
    +     longestSession = minutes;
    +   }
    +
    +   console.log(`Day ${index + 1}: ${minutes} minutes`);
    + }
    +
    + console.log(`Total minutes: ${totalMinutes}`);
    + console.log(`Longest session: ${longestSession} minutes`);
    + console.log();
    ```

    > ***Note:** Index vs Display Number*
    >
    > The index starts at `0`, but the display label uses `index + 1` because you usually expect the first day to be called day 1.
    
    


> ```ps
> git add .
> git commit -m "Loop through study minutes"
> ```

### Map Each Value Into Display Text

Show `.forEach()` before `.map()` so you can separate two ideas:

- `.forEach()` is for repeated work such as logging output.
- `.map()` is for creating a new array from an existing array.


1. Add a `.forEach()` call that receives an arrow-function callback.

    ```diff lang="js" title="~/inclass/13/demo.js"
      console.log(`Longest session: ${longestSession} minutes`);
      console.log();
    +
    + console.log('ForEach for repeated output');
    + console.log('---------------------------');
    +
    + studyMinutes.forEach((minutes, index) => {
    +   console.log(`Study log ${index + 1}: ${minutes} minutes`);
    + });
    +
    + console.log();
    ```

    `.forEach()` calls the callback once for each item. Use it when the purpose is to do repeated work, not to build a new array.


> ```ps
> git add .
> git commit -m "Use forEach with study minutes"
> ```

Show `.map()` as a named version of a common loop pattern: create one new value for each existing value.


1. Add a `.map()` call that receives an arrow-function callback.

    ```diff lang="js" title="~/inclass/13/demo.js"
      console.log(`Longest session: ${longestSession} minutes`);
      console.log();
    +
    + console.log('Map each value into display text');
    + console.log('--------------------------------');
    +
    + let dailyLabels = studyMinutes.map((minutes, index) => {
    +   return `Day ${index + 1}: ${minutes} minutes`;
    + });
    +
    + console.log(dailyLabels);
    + console.log();
    ```

    The callback receives the current value first. It can also receive the current index as a second parameter.


> ```ps
> git add .
> git commit -m "Map study minutes into labels"
> ```

### Course Task Data

Move to an array of objects so the remaining methods can work with realistic conditions.


1. Add a `courseTasks` array.

    ```diff lang="js" title="~/inclass/13/demo.js"
      console.log(dailyLabels);
      console.log();
    +
    + console.log('Course task data');
    + console.log('----------------');
    +
    + let courseTasks = [
    +   {
    +     title: 'Read loop examples',
    +     priority: 2,
    +     minutes: 25,
    +     complete: true,
    +   },
    +   {
    +     title: 'Finish array practice',
    +     priority: 1,
    +     minutes: 45,
    +     complete: false,
    +   },
    +   {
    +     title: 'Review callback syntax',
    +     priority: 3,
    +     minutes: 20,
    +     complete: false,
    +   },
    +   {
    +     title: 'Submit reflection',
    +     priority: 2,
    +     minutes: 15,
    +     complete: true,
    +   },
    + ];
    ```

2. Use `.map()` to pull out task titles.

    ```diff lang="js" title="~/inclass/13/demo.js"
      let courseTasks = [
        {
          title: 'Read loop examples',
          priority: 2,
          minutes: 25,
          complete: true,
        },
        {
          title: 'Finish array practice',
          priority: 1,
          minutes: 45,
          complete: false,
        },
        {
          title: 'Review callback syntax',
          priority: 3,
          minutes: 20,
          complete: false,
        },
        {
          title: 'Submit reflection',
          priority: 2,
          minutes: 15,
          complete: true,
        },
      ];
    +
    + let taskNames = courseTasks.map((task) => {
    +   return task.title;
    + });
    +
    + console.log(taskNames);
    + console.log();
    ```


> ```ps
> git add .
> git commit -m "Create course task data"
> ```

### Find One Matching Item

Use `.find()` when one matching object is enough. Use `.findIndex()` when the position matters.


1. Find the first incomplete task and the first high-priority task index.

    ```diff lang="js" title="~/inclass/13/demo.js"
      console.log(taskNames);
      console.log();
    +
    + console.log('Find one matching item');
    + console.log('----------------------');
    +
    + let firstIncompleteTask = courseTasks.find((task) => {
    +   return task.complete === false;
    + });
    +
    + let firstHighPriorityIndex = courseTasks.findIndex((task) => {
    +   return task.priority === 1;
    + });
    +
    + console.log(firstIncompleteTask);
    + console.log(`First high-priority task index: ${firstHighPriorityIndex}`);
    + console.log();
    ```

    > ***Note:** First Match*
    >
    > `.find()` and `.findIndex()` stop at the first match. They are a good fit when one result answers the question.
    


> ```ps
> git add .
> git commit -m "Find matching tasks"
> ```

### Filter Matching Items

Use `.filter()` when the result may contain zero, one, or many items.


1. Filter incomplete tasks and quick tasks.

    ```diff lang="js" title="~/inclass/13/demo.js"
      console.log(`First high-priority task index: ${firstHighPriorityIndex}`);
      console.log();
    +
    + console.log('Filter matching items');
    + console.log('---------------------');
    +
    + let incompleteTasks = courseTasks.filter((task) => {
    +   return task.complete === false;
    + });
    +
    + let quickTasks = courseTasks.filter((task) => {
    +   return task.minutes <= 25;
    + });
    +
    + console.log('Incomplete tasks:');
    + console.log(incompleteTasks);
    + console.log('Quick tasks:');
    + console.log(quickTasks);
    + console.log();
    ```


> ```ps
> git add .
> git commit -m "Filter task lists"
> ```

### Slice vs Splice

Use `.slice()` when you need part of an array but should leave the original array alone. Use `.splice()` when you intentionally want to remove, replace, or insert items in an array.


1. Copy the first two tasks with `.slice()` and confirm the original array did not change.

    ```diff lang="js" title="~/inclass/13/demo.js"
      console.log('Quick tasks:');
      console.log(quickTasks);
      console.log();
    +
    + console.log('Slice vs splice');
    + console.log('---------------');
    +
    + let firstTwoTasks = courseTasks.slice(0, 2);
    + console.log('First two tasks from slice():');
    + console.log(firstTwoTasks);
    + console.log('Original courseTasks length after slice():');
    + console.log(courseTasks.length);
    ```

    The start index is included. The end index is not included, so `slice(0, 2)` copies indexes `0` and `1`.

2. Make a copy, then use `.splice()` on that copy.

    ```diff lang="js" title="~/inclass/13/demo.js"
      console.log('Original courseTasks length after slice():');
      console.log(courseTasks.length);
    +
    + let editableTasks = [...courseTasks];
    + let removedTasks = editableTasks.splice(1, 1, {
    +   title: 'Practice slice and splice',
    +   priority: 1,
    +   minutes: 30,
    +   complete: false,
    + });
    +
    + console.log('Removed task from splice():');
    + console.log(removedTasks);
    + console.log('Editable tasks after splice():');
    + console.log(editableTasks);
    + console.log('Original courseTasks length after editing the copy:');
    + console.log(courseTasks.length);
    + console.log();
    ```

    `.splice(1, 1, newTask)` starts at index `1`, removes one item, and inserts the new task at that same position.

    > ***Caution:** Mutating Method*
    >
    > `.splice()` changes the array it is called on. The demo uses `editableTasks` so you can see the mutation without disturbing the original `courseTasks` data used later.
    
    

> ```ps
> git add .
> git commit -m "Compare slice and splice"
> ```

### Sort Copied Arrays

Use copied arrays with `.sort()` so the demo can show sorting without changing the original `courseTasks` array.


1. Sort by a number field and a string field.

    ```diff lang="js" title="~/inclass/13/demo.js"
      console.log('Quick tasks:');
      console.log(quickTasks);
      console.log();
    +
    + console.log('Sort copied arrays');
    + console.log('------------------');
    +
    + let tasksByMinutes = [...courseTasks].sort((firstTask, secondTask) => {
    +   return firstTask.minutes - secondTask.minutes;
    + });
    +
    + let tasksByTitle = [...courseTasks].sort((firstTask, secondTask) => {
    +   return firstTask.title.localeCompare(secondTask.title);
    + });
    +
    + console.log('By minutes:');
    + console.log(tasksByMinutes);
    + console.log('By title:');
    + console.log(tasksByTitle);
    ```

    > ***Caution:** Compare Function*
    >
    > Without a compare function, JavaScript sorts values as strings. That can produce surprising results for numbers.
    
    

    The `[...courseTasks]` expression makes a shallow copy before sorting. The sort comparison is the focus of this step.


> ```ps
> git add .
> git commit -m "Sort task arrays"
> ```

## Conclusion

> **Assigned homework:** Complete [Homework: Practice Array Methods](./homework/140-homework.mdx). It reinforces today's loop-to-array-method connection and gives fallback practice for `map`, `find`, `filter`, `slice`, `splice`, sorting copied arrays, and optional script arguments.

Today's lesson connects the loop mechanics you already know with the array methods they will see often in JavaScript code.

You should be able to describe the difference between these patterns:

1. A manual `for` loop makes the index movement visible.
1. `.forEach()` runs repeated work for each item.
1. `.map()` creates a new value for every item.
1. `.find()` and `.findIndex()` stop at the first match.
1. `.filter()` keeps every item that matches a condition.
1. `.slice()` copies part of an array without changing the original.
1. `.splice()` changes the array it is called on.
1. `.sort()` orders values using a compare function.

> ***Tip:** Choosing the Tool*
> 
> Ask you to name the result they need before choosing a method.
>
> Do they need repeated output, a transformed array, one matching item, many matching items, a copied section, a changed array, or a sorted order?



### Optional: Script Arguments

If you are comfortable with the main demo, add this short side example after the core array-method walkthrough. It shows how command-line arguments become array data.


1. Create a separate `demo-args.js` file so the main `demo.js` stays focused on the lesson walkthrough.

    ```js title="~/inclass/13/demo-args.js"
    console.log('Argument demo');
    console.log('-------------');
    console.log(process.argv);
    ```

2. Run the file with Node's watch mode and pass a few values after the script filename.

    ```ps title="Terminal"
    node --watch demo-args.js apples oranges bananas
    ```

    `process.argv` is an array. The first two entries are special:

    - `process.argv[0]` is the path to the Node program.
    - `process.argv[1]` is the path to the script file being run.

    The values you typed after `demo-args.js` start at index `2`.

3. Add a small loop that prints only the student-provided arguments.

    ```diff lang="js" title="~/inclass/13/demo-args.js"
      console.log('Argument demo');
      console.log('-------------');
      console.log(process.argv);
    +
    + console.log();
    + console.log('Student-provided arguments');
    + console.log('--------------------------');
    +
    + for (let index = 2; index < process.argv.length; index++) {
    +   console.log(`Argument ${index - 1}: ${process.argv[index]}`);
    + }
    ```

    This is another reason indexes matter: the array has useful data, but the first useful entry for this task starts at index `2`.



> ```ps
> git add .
> git commit -m "Inspect script arguments"
> ```
