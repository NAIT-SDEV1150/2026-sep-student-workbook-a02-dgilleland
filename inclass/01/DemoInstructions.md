# Course Introduction + Software & System Setup

> Refer to the **Course Outline** for evaluations and course overview.

## Software/Accounts

Before we write any JavaScript, we need to make sure everyone has the same basic working environment. These tools are part of the course workflow, not just optional extras.

> ***Note:** One-Time Setup*
> 
> Most of this setup only needs to be done once on your computer. If a tool is already installed and the version command works, you do not need to reinstall it.
>
> When you install a new command-line tool, close and reopen your terminal before checking the version. Terminals often only learn about newly installed programs when they start.


### GitHub Account Setup

You need a GitHub account for this course. GitHub is where we will store, submit, and review code through the term.

<Steps>
1. Go to <a href="https://github.com/" target="_blank">GitHub</a> and create an account if you do not already have one.
1. Turn on two-factor authentication for your GitHub account.
1. Add a clear profile name so your instructor can connect your GitHub activity to you.
1. Find your GitHub-provided private email address if you do not want your personal email shown in commit history.
</Steps>

GitHub's private email addresses usually follow this kind of pattern.

```txt title="GitHub private email pattern"
username@users.noreply.github.com
```

> ***Tip:** Keep Your Account Accessible*
> 
> Use a password manager or another reliable system for your GitHub credentials and two-factor authentication codes.
>
>  Losing access to GitHub during the course can block you from submitting work.


### One-Time Git Setup

`git` needs to know what name and email address to attach to your commits. This is a one-time setup on your computer.

```ps title="Set Your Git Identity"
git config --global user.name "Your Name"
git config --global user.email "username@users.noreply.github.com"
```

Use your **human name** for `user.name`. For `user.email`, use either your normal email address or the private GitHub email address from your GitHub account settings.

It is also useful to set the default branch name to `main`.

```ps title="Set Default Branch Name"
git config --global init.defaultBranch main
```

You can check your settings with the following commands.

```ps title="Check Git Settings"
git config --global user.name
git config --global user.email
git config --global init.defaultBranch
```

> ***Note:** What Git Records*
> 
> Every commit records an author name and email address. That is why we configure these values before we start making course commits.
>
> This does not log you in to GitHub. It only tells `git` what identity to write into your local commit history.


### Software Installation/Configuration

Install the following tools. The order below is a practical order for most students, especially on Windows.


1. Install <a href="https://code.visualstudio.com/download" target="_blank">Visual Studio Code</a>.

    VS Code is our main editor. On Windows, the User Installer is fine. During installation, it is useful to enable the "Open with Code" options if they are offered.

2. Install <a href="https://git-scm.com/downloads" target="_blank">Git</a>.

    On Windows, use Git for Windows from the official Git site. You can accept the default setup choices. If the installer asks about the default editor, VS Code is a reasonable choice.

3. Install <a href="https://nodejs.org/en/download" target="_blank">Node.js LTS</a>.

    Choose the LTS version, not the Current version. Node lets us run JavaScript outside the browser, and it also installs `npm`.

4. Install <a href="https://pnpm.io/installation" target="_blank">pnpm</a>.

    💫 After Node is installed, the simplest course setup on Windows is usually:

    ```ps title="Install pnpm"
    npm install -g pnpm@latest-11
    ```

5. Install <a href="https://cli.github.com/" target="_blank">GitHub CLI</a>.

    GitHub CLI gives us the `gh` command, which helps connect local Git work with GitHub.


After installation, close all terminal windows, open a new terminal, and check the versions.

```ps title="Check Tool Versions"
code --version
git --version
node --version
npm --version
pnpm --version
gh --version
```

If a command prints a version number, the tool is available from your terminal. If a command is not recognized, restart the terminal first. If it still fails, the tool may not be installed correctly or may not be on your system path.

> ***Caution:** PowerShell Script Policy*
> 
> On some Windows computers, `npm` or `pnpm` may be blocked by PowerShell's script execution policy.
>
> If you see a message about scripts being disabled, ask your instructor before changing security settings. The common course fix is:
>
> ```ps title="PowerShell Current User Script Policy"
> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
> ```


Once GitHub CLI is installed, authenticate it with GitHub.

```ps title="GitHub CLI Login"
gh auth login
gh auth status
```

For the login prompts, use GitHub.com, HTTPS, and browser-based authentication unless your instructor gives different directions.

> ***Note:** Authentication vs. Identity*
> 
> `git config --global user.name` and `git config --global user.email` set the identity written into commits.
>
> `gh auth login` signs the GitHub CLI in to your GitHub account.
>
> They are related, but they are not the same setup step.



----

## Understanding CLI Tools

### Built-In Tools

Your terminal has several commands built in. These commands let you move around your file system, look at what is inside folders, and create new folders.

> ***Note:** Terminal Location*
> 
> The terminal always has a current location. Commands such as `cd`, `ls`, `dir`, and `mkdir` work relative to that current location unless you give them a fuller path.
>
> If a command does something unexpected, check where your terminal is first.


### `cd` - Change Directory

Use `cd` to move the terminal into another folder.

```ps title="Move to the C Drive"
cd C:/
```

```ps title="Move into the GitHub Workspace Folder"
cd C:/GH/
```

```ps title="Move into the Course Folder"
cd C:/GH/SDEV-1150/
```

You can also move up one folder with `..`.

```ps title="Move Up One Folder"
cd ..
```

> ***Tip:** Use Tab Completion*
> 
> Type the first few letters of a folder name and press `Tab`.
>
> The terminal can often complete the folder name for you. This helps avoid spelling mistakes in longer paths.


### `ls` and `dir` - List Folder Contents

Use `ls` or `dir` to list the files and folders in the terminal's current location.

```ps title="List Files and Folders"
ls
```

```ps title="Windows-Style Listing"
dir
```

In PowerShell, both commands are available. You will often see `ls` in examples because it is short and common in many command-line environments. You may also see `dir` in Windows-focused instructions.

> ***Note:** Look Before You Move*
> 
> A useful habit is to run `ls` before using `cd`.
>
> First list what is in the current folder, then move into the folder you want.


### `mkdir` - Make Directory

Use `mkdir` to create a new folder.

```ps title="Create the Main Git Workspace"
mkdir C:/GH/
```

```ps title="Create the Course Folder"
mkdir C:/GH/SDEV-1150/
```

```ps title="Create a GitHub Username Folder"
mkdir C:/GH/your-github-username/
```

After creating folders, use `ls` to confirm they exist.

```ps title="Confirm the Folder Was Created"
ls C:/GH/
```

> ***Caution:** Folder Names Matter*
> 
> Keep folder names simple. Avoid spaces and special characters in course-work paths when possible.
>
> Simple folder names make terminal commands easier to type and easier to troubleshoot.


### Git Workspace Folders

Create a dedicated folder for your Git work. For this course, use the following pattern on Windows.

```txt title="Suggested Git Workspace"
C:/GH/
```

Inside that folder, create a folder for this course.

```txt title="Course Work Folder"
C:/GH/SDEV-1150/
```

You should also create a folder for repositories that belong directly to your GitHub account. Use your GitHub username for this folder.

```txt title="Personal GitHub Repositories"
C:/GH/your-github-username/
```

For example, my personal GitHub repositories live under this kind of folder.

```txt title="Example"
C:/GH/stewdent/
```

> ***Caution:** Avoid OneDrive Folders*
> 
> Do not put course repositories in your Documents folder or on your Desktop if those folders are managed by Microsoft OneDrive.
>
> OneDrive can sometimes lock files inside a Git repository, which can interfere with normal Git commands. It can also make it less clear where your backup or remote copy lives.
>
> For this course, GitHub is the remote/off-computer storage for your Git repositories. OneDrive is not part of the course Git workflow.


> ***Tip:** Keep Repositories Organized*
> 
> A consistent folder structure saves time later.
>
> When your instructor asks you to open a repo, clone a starter kit, or find a course project, you should know where that work belongs on your computer.


## Intro to VS Code

VS Code is the main workspace for this course. We will use it to edit files, run terminal commands, preview Markdown, and work with Git.

### Open a Folder

Start VS Code by opening a folder, not just a single file. Most programming projects are made of several files that work together.


1. Create or choose a folder for exploring VS Code; place it under the folder you set up for the repos under you GitHub account (e.g.: `C:\GH\stewdent\xplore-vs-code`).
2. Open VS Code.
3. Use **File > Open Folder...** and select that folder.
4. Notice the Explorer panel on the left. This is where you will see files and folders for the current project.


> ***Tip:** Folder First*
> 
> A lot of VS Code features work best when a folder is open: terminal location, Git tracking, search, extensions, and project settings.


### Use the Integrated Terminal

VS Code has a built-in terminal. This lets us stay in the editor while running commands.

```ps title="Open the VS Code Terminal"
Ctrl + `
```

The backtick key is usually near the top-left of the keyboard. The same shortcut opens and closes the terminal panel.

Try a simple version check from inside the VS Code terminal.

```ps title="Check Node from VS Code"
node --version
```

If the command works in Windows Terminal but not in VS Code, close and reopen VS Code. It may need to restart before it sees newly installed tools.

### Install Recommended Extensions

VS Code has useful Markdown support built in, but the following extensions are helpful for course notes and workbook files.


1. Open the Extensions view in VS Code.
2. Search for and install <a href="https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one" target="_blank">Markdown All in One</a>.
3. Search for and install <a href="https://marketplace.visualstudio.com/items?itemName=yzane.markdown-pdf" target="_blank">Markdown PDF</a>.
4. Search for and install <a href="https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermaid" target="_blank">Markdown Preview Mermaid Support</a>.


> ***Caution:** Do Not Install Everything*
> 
> Extensions are useful, but too many extensions can make VS Code harder to understand and troubleshoot.
>
> Start with the recommended extensions. Add more only when you have a clear reason.


### Preview Markdown

Many course files use Markdown. Markdown lets us write plain text that can be rendered as headings, lists, links, code blocks, and other document structures.

Create a `README.md` file and use the Markdown preview command. Here's some sample text to use.

```md title="README.md"
# My First Course README

This folder contains my practice work for SDEV-1150.

## What I Am Practicing

- Writing Markdown files
- Using VS Code
- Running commands in the terminal
- Making small Git commits

## Useful Links

- [MDN JavaScript Guide](https://developer.mozilla.org/docs/Web/JavaScript/Guide)
- [VS Code Documentation](https://code.visualstudio.com/docs)

## Notes

Today I learned that Markdown uses plain text symbols to describe document structure.
```

```ps title="Markdown Preview Shortcut"
Ctrl + Shift + V
```

You can also open the Command Palette with `Ctrl + Shift + P` and search for `Markdown: Open Preview`.

### Use Source Control

VS Code has a Source Control view for Git. You can open it from the left sidebar or with this shortcut.

```ps title="Source Control Shortcut"
Ctrl + Shift + G
```

In this course, you will still learn the terminal commands for Git because the commands make the workflow explicit.

```ps title="Basic Git Routine"
git status
git add .
git commit -m "Describe the change"
```

> ***Note:** Frequent Small Commits*
> 
> You will hear this often: commit small changes frequently.
>
> Small commits make it easier to see your progress, recover from mistakes, and explain what changed.


## Your Student Workbook

Ensure you have obtained your **Student Workbook** in this first class. You will be using it in every class and in completing your homework for this course.

----

## Conclusion

There is a lot of *minutiae* for you to pick up. Little details, such as single-line and multi-line comments, proper "terminology" for things in JavaScript, and a host of other little details &ndash; all of these are things that you will have to pick up as you move through this course.

You are also expected to **read** about JavaScript. That's another place where you will pick up all the small pieces of information you need to know. Through continual "hands-on" work with JavaScript, you will do *your part* on polishing your understanding!


## What is a Computer Program?

> *A computer program is a set of **instructions** for manipulating **information**.*

> ***Note:** So many resources*
> 
> There are several paths you can take to learn JavaScript. <a href="https://developer.mozilla.org/docs/Web/JavaScript/Guide/Introduction#where_to_find_javascript_information" target="_blank">Where do you find JavaScript information?</a> The best place to start is the **Mozilla Developer Network**, or **mdn**, website. Take some time to read their core page on <a href="https://developer.mozilla.org/docs/Web/JavaScript" target="_blank">**JavaScript**</a>.

JavaScript has eight <a href="https://developer.mozilla.org/docs/Web/JavaScript/Guide/Grammar_and_types#data_structures_and_types" target="_blank">data types</a>, seven of which are <a href="https://developer.mozilla.org/docs/Glossary/Primitive" target="_blank">primitives</a> and the eighth being the fundamental <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object" target="_blank">object</a> data type.
