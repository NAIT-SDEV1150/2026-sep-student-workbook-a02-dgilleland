# Repetition - Flow Control Intro

> The material here will be covered in-class. These notes and code-snippets are supporting materials. Note that your instructor is likely to include additional material during class.
>
> The starter kit code for this is part of your **student workbook**.
>
> Topic:  Instructor guide for while loops, for loops, accumulators, break, and nested loops

----

## Concepts

You should have completed homework that introduced repetition using looping statements. This lesson reinforces that concept with new examples. Do not repeat the homework samples. The goal is to help you recognize the same loop patterns in different problem settings.

### Flow Control

Repetition is the third major flow-control idea you have now seen:

1. **Simple sequence** runs one statement after another.
1. **Conditionals** choose whether a block runs.
1. **Repetition** runs a block more than once.

Every loop needs a way to stop. That usually means there is a value that changes during the loop and a condition that eventually becomes false.

> ***Note :** Loop Anatomy*
> 
> A useful way to read loops is to look for four pieces:
>
> - the starting state
> - the condition
> - the repeated work
> - the update that moves the loop toward exiting

### Choosing a Loop

Use a `while` loop when the repetition is controlled by a condition. We may not know the exact number of repetitions in advance.

Use a `for` loop when the number of repetitions is known or naturally tied to an index. Arrays are a common place where `for` loops make sense because each array item has an index.

> ***Caution:** Infinite Loops*
> 
> A loop that never reaches its stopping condition can keep running forever.
>
> When you write a loop, ask them to identify which value changes and how that change helps the loop stop.


----

## Demo Walkthrough

We're going back to a stand-alone JavaScript file for this lesson. There is no HTML, no CSS, no package setup, and no modules. Run the file directly with Node so you can focus on the loop behaviour.

> ***Tip:** Frequent, small commits*
> 
> We'll also practice version control by **making a commit after each group of steps**. Commits in git are a two-step process: First, we stage what changes we want to commit. Then we do the actual commit.
>
> ```ps title="Commit Example"
> git add .
> git commit -m "Create savings loop"
> ```


### Starter Script


1. Open the `~/inclass/12/demo.js` file in VS Code and run it in Node's watch mode.

    ```ps title="Terminal"
    node --watch demo.js
    ```

    The starter script confirms that the file is running.

    ```js title="~/inclass/12/demo.js"
    console.log('Lesson 13 demo.js has loaded');
    console.log('===============================');
    console.log();
    ```


### Saving Toward a Purchase

Use a `while` loop when a condition controls how long repetition continues.


1. Add values for a savings goal.

    ```diff lang="js" title="~/inclass/12/demo.js"
      console.log('Lesson 13 demo.js has loaded');
      console.log('===============================');
      console.log();
    +
    + console.log('Saving toward a purchase');
    + console.log('------------------------');
    +
    + let laptopCost = 950;
    + let savingsBalance = 320;
    + let monthlyDeposit = 135;
    + let month = 0;
    ```

    The question is: how many months will it take until the balance reaches the cost?

2. Add the `while` loop.

    ```diff lang="js" title="~/inclass/12/demo.js"
      let laptopCost = 950;
      let savingsBalance = 320;
      let monthlyDeposit = 135;
      let month = 0;
    +
    + while (savingsBalance < laptopCost) {
    +   month = month + 1;
    +   savingsBalance = savingsBalance + monthlyDeposit;
    +   console.log(`Month ${month}: $${savingsBalance}`);
    + }
    +
    + console.log(`Goal reached after ${month} months.`);
    + console.log();
    ```

    The loop keeps running while `savingsBalance < laptopCost` is true.

    > ***Note :** What Changes?*
    >
    > The `savingsBalance` and `month` variables change inside the loop.
    >
    > If `savingsBalance` never changed, the condition would never become false.
    

> ```ps
> git add .
> git commit -m "Create savings loop"
> ```

### Study Session Totals

Use a `for` loop when the repetition is tied to a known number of positions.


1. Create an array of study minutes.

    ```diff lang="js" title="~/inclass/12/demo.js"
      console.log(`Goal reached after ${month} months.`);
      console.log();
    +
    + console.log('Study session totals');
    + console.log('--------------------');
    +
    + let studyMinutes = [45, 30, 0, 75, 50, 90, 20];
    + let totalMinutes = 0;
    + let completedSessions = 0;
    ```

    The `0` is intentional. It represents a missed session.

2. Loop through the array.

    ```diff lang="js" title="~/inclass/12/demo.js"
      let studyMinutes = [45, 30, 0, 75, 50, 90, 20];
      let totalMinutes = 0;
      let completedSessions = 0;
    +
    + for (let index = 0; index < studyMinutes.length; index++) {
    +   let minutes = studyMinutes[index];
    +   console.log(`Session ${index + 1}: ${minutes} minutes`);
    + }
    ```

    Point out that `index` starts at `0`, but the displayed session number uses `index + 1`.

3. Add conditional logic and accumulators.

    ```diff lang="js" title="~/inclass/12/demo.js"
      for (let index = 0; index < studyMinutes.length; index++) {
        let minutes = studyMinutes[index];
    -   console.log(`Session ${index + 1}: ${minutes} minutes`);
    + 
    +   if (minutes > 0) {
    +     completedSessions = completedSessions + 1;
    +     totalMinutes = totalMinutes + minutes;
    +     console.log(`Session ${index + 1}: ${minutes} minutes`);
    +   } else {
    +     console.log(`Session ${index + 1}: missed`);
    +   }
    + 
    +   if (minutes >= 75) {
    +     console.log('  Long study session');
    +   }
      }
    ```

    This loop does several jobs: it reads each value, decides how to report it, and builds totals.

4. Calculate and display the average.

    ```diff lang="js" title="~/inclass/12/demo.js"
      for (let index = 0; index < studyMinutes.length; index++) {
        let minutes = studyMinutes[index];
      
        if (minutes > 0) {
          completedSessions = completedSessions + 1;
          totalMinutes = totalMinutes + minutes;
          console.log(`Session ${index + 1}: ${minutes} minutes`);
        } else {
          console.log(`Session ${index + 1}: missed`);
        }
      
        if (minutes >= 75) {
          console.log('  Long study session');
        }
      }
    +
    + let averageMinutes = totalMinutes / completedSessions;
    +
    + console.log(`Completed sessions: ${completedSessions}`);
    + console.log(`Total minutes: ${totalMinutes}`);
    + console.log(`Average minutes: ${averageMinutes.toFixed(1)}`);
    + console.log();
    ```

    > ***Note :** Accumulator Variables*
    >
    > `totalMinutes` and `completedSessions` are accumulator variables.
    >
    > They start with neutral values and are updated as the loop finds information.
    


> ```ps
> git add .
> git commit -m "Summarize study sessions"
> ```

### Stop When the Target Is Reached

Sometimes a loop can stop as soon as it finds what it needs.


1. Add a target and a running total.

    ```diff lang="js" title="~/inclass/12/demo.js"
      console.log(`Average minutes: ${averageMinutes.toFixed(1)}`);
      console.log();
    +
    + console.log('First target day');
    + console.log('----------------');
    +
    + let targetMinutes = 150;
    + let runningTotal = 0;
    + let targetDay = undefined;
    ```

2. Loop until the running total reaches the target.

    ```diff lang="js" title="~/inclass/12/demo.js"
      let targetMinutes = 150;
      let runningTotal = 0;
      let targetDay = undefined;
    +
    + for (let index = 0; index < studyMinutes.length; index++) {
    +   runningTotal = runningTotal + studyMinutes[index];
    +
    +   if (runningTotal >= targetMinutes) {
    +     targetDay = index + 1;
    +     break;
    +   }
    + }
    ```

    The `break` statement exits the loop immediately.

3. Display the result.

    ```diff lang="js" title="~/inclass/12/demo.js"
      for (let index = 0; index < studyMinutes.length; index++) {
        runningTotal = runningTotal + studyMinutes[index];
      
        if (runningTotal >= targetMinutes) {
          targetDay = index + 1;
          break;
        }
      }
    +
    + if (targetDay) {
    +   console.log(`The target was reached on day ${targetDay}.`);
    + } else {
    +   console.log('The target was not reached this week.');
    + }
    +
    + console.log();
    ```

    > ***Caution:** Use Break Intentionally*
    >
    > `break` is useful when the loop has already found the answer.
    >
    > It should be easy to explain why the loop does not need to continue.
    

> ```ps
> git add .
> git commit -m "Find first target day"
> ```

### Nested Loops

Nested loops are useful when repeated work has groups inside groups.


1. Create two arrays: habits and days.

    ```diff lang="js" title="~/inclass/12/demo.js"
      console.log();
    +
    + console.log('Weekly habit tracker');
    + console.log('--------------------');
    +
    + let habits = ['Read', 'Code', 'Review'];
    + let days = ['Mon', 'Tue', 'Wed', 'Thu'];
    ```

2. Add the outer loop.

    ```diff lang="js" title="~/inclass/12/demo.js"
      let habits = ['Read', 'Code', 'Review'];
      let days = ['Mon', 'Tue', 'Wed', 'Thu'];
    +
    + for (let habitIndex = 0; habitIndex < habits.length; habitIndex++) {
    +   let line = `${habits[habitIndex]}:`;
    +   console.log(line);
    + }
    ```

    The outer loop controls which habit is being processed.

3. Add the inner loop.

    ```diff lang="js" title="~/inclass/12/demo.js"
      for (let habitIndex = 0; habitIndex < habits.length; habitIndex++) {
        let line = `${habits[habitIndex]}:`;
    -   console.log(line);
    + 
    +   for (let dayIndex = 0; dayIndex < days.length; dayIndex++) {
    +     line = `${line} ${days[dayIndex]}=[ ]`;
    +   }
    + 
    +   console.log(line);
      }
    +
    + console.log();
    ```

    Read this outside-in: for each habit, loop through each day.

    > ***Note :** Nested Loop Reading Habit*
    >
    > In nested loops, name the outer loop first.
    >
    > "For each habit, for each day..." is easier to reason about than starting with the inner loop.
    

### Optimize After It Works

Optimization is easier to discuss after the correct logic is visible.


1. Add a final threshold search using `for...of`.

    ```diff lang="js" title="~/inclass/12/demo.js"
      console.log();
    +
    + console.log('Optimized threshold search');
    + console.log('--------------------------');
    +
    + let rewardThreshold = 180;
    + let checkedDays = 0;
    + runningTotal = 0;
    +
    + for (let minutes of studyMinutes) {
    +   checkedDays = checkedDays + 1;
    +   runningTotal = runningTotal + minutes;
    +
    +   if (runningTotal >= rewardThreshold) {
    +     break;
    +   }
    + }
    +
    + console.log(`Checked ${checkedDays} days.`);
    + console.log(`Running total: ${runningTotal} minutes.`);
    ```

    This version does not need an index because it only needs each value from the array.

> ```ps
> git add .
> git commit -m "Use nested loops"
> ```

## Conclusion

> **Assigned homework:** Complete the assigned homework "Practice Loop Control". It reinforces today's repetition work and gives fallback practice for `while` loops, stop conditions, nested loops, and improving code after it works.

Loops let JavaScript repeat work. A `while` loop is useful when repetition depends on a condition. A `for` loop is useful when repetition is tied to a known count or an array index. A nested loop is useful when repeated work has repeated work inside it.

> ***Tip:** Understanding JavaScript 👀*
> 
> The key habit in this lesson is to identify what changes.
>
> In every loop, ask: What is the starting state? What condition is checked? What work repeats? What update moves the loop toward exiting?
