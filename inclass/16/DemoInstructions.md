# Form Event Handling

> The material here will be covered in-class. These notes and code-snippets are supporting materials. Note that your instructor is likely to include additional material during class.
>
> The starter kit code for this is part of your **student workbook**.
>
> Topic: Capture, process, and validate HTML form input with JavaScript.

----

## Demo Walkthrough

This lesson combines two related form workflows. First, you capture form input and echo it back to the page without allowing the browser to reload. Second, you add validation so the same form only gets processed after it passes the built-in and custom rules.

> ***Tip:** Frequent, small commits*
> 
> Make a commit after each meaningful checkpoint. This keeps the form processing and validation work easy to review separately.
> 
> ```ps title="Commit Example"
> git add .
> git commit -m "Capture form input"
> ```



## Part 1: Capture and Echo Form Input

Start with the form that is already in the starter kit. The HTML gives us named controls, a submit button, a reset button, and an output area where JavaScript can display the processed values.


1. Notice that we already have the code to select the `<form>` element and the output area for displaying/echoing results to the user.

    ```js title="demo/js/main.js"
    const form = document.querySelector('#contact-form');
    const result = document.querySelector('#result');
    ```

2. Create a helper function that gathers the current form values.

    Use `form.elements` for the named text controls and radio group. For checkboxes, query the checked boxes and map them to an array of values.

    ```diff lang="js" title="demo/js/main.js"
      function serializeForm(formEl) {
    +   const { fullName, email, bio } = formEl.elements;
    +   const plan = formEl.elements.plan.value;
    +   const topics = Array.from(formEl.querySelectorAll('input[name="topics"]:checked'))
    +     .map((checkbox) => checkbox.value);
  
    +   return {
    +     fullName: fullName.value.trim(),
    +     email: email.value.trim(),
    +     plan,
    +     topics,
    +     bio: bio.value.trim(),
    +     submittedAt: new Date().toLocaleString(),
    +   };
      }
    ```

3. Format the submitted data for the output area.

    ```diff lang="js" title="demo/js/main.js"
      function formatSubmission(data) {
    +   return `Submission received:
    +     - Name: ${data.fullName || '(none)'}
    +     - Email: ${data.email || '(none)'}
    +     - Skill: ${data.plan || '(none)'}
    +     - Strengths: ${data.topics.length ? data.topics.join(', ') : '(none)'}
    +     - Bio: ${data.bio || '(none)'}
    +     - Time: ${data.submittedAt}`;
      }
    ```

4. Listen for the `submit` event. Then serialize the form and echo the result.

    **Important:** Notice we call `.preventDefault()` so the browser does not reload the page.

    ```diff lang="js" title="demo/js/main.js"
      form.addEventListener('submit', (event) => {
        event.preventDefault();

    +   const data = serializeForm(form);
    +   result.textContent = formatSubmission(data);
      });
    ```

5. Listen for the `reset` event.

    ```diff lang="js" title="demo/js/main.js"
      form.addEventListener('reset', () => {
    +   result.textContent = 'Awaiting submission...';
      });
    ```


> ***Tip:** Checkpoint*
> 
> Submit the form with different combinations of radio buttons and checkboxes. Confirm that the page does not reload and the output area changes.
> 
> ```ps title="Commit"
> git add .
> git commit -m "Echo submitted form input"
> ```



## Part 2: Validate Form Input

The form already uses built-in validation attributes such as `required` and `type="email"`. Now add custom validation rules with JavaScript so the page gives more specific feedback before processing the submission.


1. Add custom validation helpers.

    These functions use `setCustomValidity()`. An empty string means the field is valid. Any other string becomes the browser's validation message for that field.

    ```diff lang="js" title="demo/js/main.js"
      function validateFullName(input) {
    +   const nameParts = input.value.trim().split(/\s+/).filter(Boolean);

    +   if (nameParts.length < 2) {
    +     input.setCustomValidity('Full Name must contain at least two words.');
    +   } else {
    +     input.setCustomValidity('');
    +   }
      }

      function validateEmail(input) {
    +   if (!input.value.includes('@')) {
    +     input.setCustomValidity('Email must contain an "@" symbol.');
    +   } else {
    +     input.setCustomValidity('');
    +   }
      }

      function validateBio(textarea) {
    +   if (textarea.value.trim().length < 40) {
    +     textarea.setCustomValidity('Bio must be at least 40 characters long.');
    +   } else {
    +     textarea.setCustomValidity('');
    +   }
      }
    ```

2. Route each edited field to the correct validation helper.

    ```diff lang="js" title="demo/js/main.js"
      function validateField(field) {
    +   if (field.name === 'fullName') {
    +     validateFullName(field);
    +   }
    +
    +   if (field.name === 'email') {
    +     validateEmail(field);
    +   }
    +
    +   if (field.name === 'bio') {
    +     validateBio(field);
    +   }
      }
    ```

3. Add helpers for full-form validation and cleanup.

    ```diff lang="js" title="demo/js/main.js"
      function validateForm() {
    +   validateField(form.elements.fullName);
    +   validateField(form.elements.email);
    +   validateField(form.elements.bio);
      }

      function clearCustomValidity() {
    +   form.elements.fullName.setCustomValidity('');
    +   form.elements.email.setCustomValidity('');
    +   form.elements.bio.setCustomValidity('');
      }
    ```

4. Validate as the user types.

    The `input` event gives dynamic feedback. `reportValidity()` asks the browser to show the current validation message for the field that changed.

    ```diff lang="js" title="demo/js/main.js"
      form.addEventListener('input', (event) => {
    +   validateField(event.target);
    +   event.target.reportValidity();
      });
    ```

5. Update the submit listener so invalid data is not processed.

    Run the custom validation first, then ask the form whether all built-in and custom rules pass.

    ```diff lang="js" title="demo/js/main.js"
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        validateForm();
      + 
      + if (!form.checkValidity()) {
      +   form.reportValidity();
      +   return;
      + }
  
        const data = serializeForm(form);
        result.textContent = formatSubmission(data);
      });
    ```

6. Update the reset listener so custom validity messages are cleared.

    ```diff lang="js" title="demo/js/main.js"
      form.addEventListener('reset', () => {
    +   clearCustomValidity();
        result.textContent = 'Awaiting submission...';
      });
    ```


> ***Tip:** Checkpoint*
> 
> Test valid form inputs before testing invalid ones. Try a one-word name, an email without `@`, and a short bio. Then fix the values and confirm the form echoes the submission.
> 
> ```ps title="Commit"
> git add .
> git commit -m "Validate form input"
> ```



## Conclusion

> ***Tip:** Refactoring the Code*
> 
> How might you have structured the code for this demo if you were to do it all on you own? Note that this is but *one* possible way to arrange the code, and it's not necessarily the *best* way.



> **Assigned homework:** Complete the homework "Practice Form Validation". It reinforces today's form submission workflow and gives fallback practice for validation checks, custom rules, and user-facing feedback.

By the end of this demo, you should have one form that supports both sides of client-side form handling. The first part shows how JavaScript can intercept a submission, read named form controls, and echo the submitted data without a page reload. The second part adds the validation layer so the same submission flow only runs after the browser and the custom JavaScript rules agree that the input is acceptable.

The important connection is that validation does not replace form processing. Validation protects the processing step. Once you see that relationship, `submit`, `preventDefault()`, `form.elements`, `setCustomValidity()`, `checkValidity()`, and `reportValidity()` fit together as one practical workflow.
