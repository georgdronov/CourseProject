# Course Project

## Use this (depending on what group you are in):

- **.NET**: C#, Blazor, or MVC (you choose)
- **JavaScript**: JavaScript or TypeScript (you choose), React (ask if you want to replace React with Angular)

You can use any database and any other libraries, components, or even frameworks (but do not replace the ones specified above).

There are no limitations on architecture or services used (you don't even have to separate front and back; it's not a recommendation, but you may go this way). Also, you may replace Bootstrap with any CSS framework and/or UI library you like.

## Requirements:

You must implement a web application for customizable forms (quizzes, tests, questionnaires, polls, etc.), something similar to Google Forms. Users define "templates" (a set of questions, their names and descriptions, etc.), and other users fill out "forms" (their specific answers) using these templates (e.g., enter or select values in the fields).

Example: I create a template with one integer-valued question, "How many apples do you eat per day?" Users fill out corresponding forms, and I can analyze the answers.

Non-authenticated users:

- Cannot create templates
- Cannot leave comments and likes
- Cannot fill out forms
- Can use search and view templates in read-only mode

Admin-page functionalities include:

- User management: view, block, unblock, delete, add to admins, remove from admins
- **Important:** Admin can remove admin access from themselves

Admin can:

- View and modify all pages and content as if they are the owner of every template and form

**Filled-out forms** (answers):

- Can be seen by the author of the form, the creator of the template, and admins
- Templates are viewable by everyone

Only the admin or the template/form creator can:

- Manage the template (add/delete/edit questions)
- Manage the form (delete it or edit answers)

Users can:

- Register and authenticate via site forms

Every page provides access to **full-text search** in the top header. The search results always display templates (e.g., if text is found in the question description or template comments, the result links to the template itself).

Every user has a **personal page** where they can manage a sortable table of templates (create, delete, or edit) and filled forms (on separate tabs).

Each template contains several tabs:

1. General settings (title, description, etc.)
2. Access settings (all authenticated users or specific users)
3. Editable set of questions
4. "Results" (filled-out forms based on the template with links to the forms)
5. Aggregation of results (e.g., average value for numeric fields, most frequent answer for string fields)

### Template settings:

- Title
- Description (supports markdown formatting)
- Topic (e.g., "Education," "Quiz," or "Other")
- Optional image (uploaded to the cloud)
- Tags (with autocompletion from the database)

### Form access:

- Templates can be marked "public" (available to any authenticated user)
- The user can select specific users who can fill out the form (user selection with autocompletion for names and emails)

### Custom questions:

- Fixed fields: user (auto-filled) and date (auto-filled)
- Up to 4 questions of each type:
  - Single-line strings
  - Multi-line texts
  - Positive integers
  - Checkboxes

Each question has a title, description, and an option to display it in the table of filled-out forms (on the template's results tab). Questions can be reordered with drag-and-drop.

### Example:

For a job candidate questionnaire:

- Single-line question: "Position" ("What position do you apply for?")
- Integer-value question: "Experience" ("Work on commercial projects or freelance (in years)")
- Single-line question: "Contact" ("Phone number or Skype")
- Multi-line text question: "Additional information" ("Write anything in the field below")

### Main page of the app:

- Gallery of the latest templates (name, description/image, author)
- Top 5 most popular templates (by filled forms)
- Tag cloud (clicking a tag displays the list of templates using the search results page)

When a template is opened, there is a **comments list** at the bottom (comments are added only at the end, cannot insert in between). Comments are updated automatically when the page is opened (with a 2-5 second delay).

Templates also have **likes** (only one per user per template).

## Additional Requirements:

- **Two languages**: English and another (Polish, Spanish, Uzbek, etc.); only the UI is translated, not user content
- **Two themes**: Light and dark, with the user selecting one and the choice being saved
- Use a CSS framework (e.g., Bootstrap), but any other CSS framework and control set can be used
- Responsive design, supporting different screen resolutions, including mobile
- Use an ORM (e.g., Sequelize, Prisma, TypeORM, EF)
- Use a full-text search engine (external library or native database feature)

## Prohibited:

- No full database scans with SELECTs
- Don't upload images to your web server
- Don't perform database queries in loops

### Optional (for extra credit):

- Authentication via social networks
- Add a question type with a selectable list of options
- Allow any number of questions of any type
- Add an "Email me a copy of my answers" checkbox

### Important Notes:

1. Do **not** copy code from external sources. It's better to write less but understand it fully. You will be asked to modify your code on the fly and demonstrate your understanding.
2. Use ready-made components and libraries as much as possible (e.g., for markdown rendering, image uploads, tag entry, tag cloud rendering).
3. **Deploy a static "Hello, world" page first**, and always keep a deployable version.
4. **Defend your project** even if only a small part is completed.
5. Avoid using JSON to serialize forms. You will need to edit templates and preserve answers.
6. **Do not generate tables in the database on the fly**. Instead, use fixed questions and manage their visibility and titles through a relational database.

Is it possible to use the X library? Yes, yes to all, remember my choice.

### Optional requirements (for a separate grade, only if all other requirements are implemented):

- Authentication via social networks.
- Add questions with the type “one from the given list” with the ability to specify a list of available options (e.g., the template author creates a "Position" question with options "Developer" / "DevOps" / "Tester").
- Add any number of questions of any type (not 0 or 1 or 2 or 3 or 4, but any number of them).
- Add the "E-mail me the copy of my answers" checkbox to the form.

### IMPORTANT NOTE:

**Do not copy any code from code heaps.** It’s much better to do less but completely understand what you write. I’m dead serious—we will ask you to modify your code on the fly, add something or change something, will ask you questions, and will check your ability to work with your project code. It’s more important than the number of implemented requirements. Your supervisor has seen a lot of similar projects and probably knows most of the available resources on this topic on the Internet. **Do not copy.** Use libraries as much as possible, but don’t copy.

### Use ready components, libraries, and controls:

For example, use a ready-to-use control to:

- Render markdown.
- Upload images with drag'n'drop.
- Enter tags.
- Render tag clouds.

The less custom code your app contains, the better.

### MOST IMPORTANT:

Start your work from the deployment of the static "Hello, world" page and have a deployable version all the time.

### EVEN MORE IMPORTANT:

Defend your project even if you've only done a small part of it.

### Additional considerations:

- **Do not serialize forms using JSON.** It’s a bad idea. You will need to edit templates, and answers should be preserved. For example, you should be able to change the question title or remove a question. Of course, you shouldn’t try to edit filled-out forms on the fly.
- Think of this problem in this way: all forms for a given template should be compatible, and you need to calculate aggregate values for them.
- **Do not generate database tables on the fly.** It’s a bad idea for several reasons.

### Fixed questions approach:

You need up to 4 questions of each type only. It means that you can consider the questions fixed and only manage whether they are shown and what titles are rendered. The relational database fits this task perfectly. It will work fast, and you won’t get into trouble with "I don’t know how to aggregate data from documents with different fields."
