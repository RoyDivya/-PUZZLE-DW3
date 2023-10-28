# Code Smells and Improvements

1. Changed name convention -book for b, booklist for books, item for b

    - Variable names used could be more descriptive for better understandability.
    - Above mentioned change have been made in `book-search.component.html`and `reading-list.component.html`

2. formateDate function is removed - added a pipe instead

    - Function call triggers with every change detection which can be prevented by using pipe. It improves application performance.
    - Above mentioned change have been made in `book-search.component.html`

3. Used ngSubmit instead of submit

    - This will prevent default submit event of browser with the aid of returning false.
    - In `book-search.component.html`, `submit` event added for searchForm is replaced by `ngSubmit`.

4. The name of formBuilder is changed from fb to form

    - The name of formBuilder is changed from fb to form for better clarity in `book-search.component.ts`
    
5. Removed unneccessary code : async pipe is used for displaying books data

    - The subscription made on store.select() within ngOnInit() is never unsubscribed. This can lead to potential memory leaks. To resolve this, pipe `async` is added in the template which unsubscribes when component is torn down.
    - Above mentioned change have been made in `book-search.component.html`.


# Web Accessibility issues

## From Lighthouse report:

1. `aria-label` attribute is added to buttons since it didn't had accessible names.

        - `aria-label` is added to the search button in `book-search.component.html`.

2. Adjusted background and foreground colors to achieve sufficient contrast ratio between them.

        - Appropriate changes has been made in `app.component.scss` to get sufficient contrast ratio for reading-list button and its background.

## Manually detected:

1. Added `alt` attribute to `img` tags as it specifies an alternate text for image in case the image is not loaded in book-search component.
2. Added `alt` attribute to `img` tags as it specifies an alternate text for image in case the image is not loaded in reading-list component.
3. Added `aria-label` attribute with appropriate value in the elements wherever required to make accessible for screen readers in book-search.component.html and  app.component.html
4. In `book-search.component.html` To improve accessibility, the anchor tag (<a>) used as a button is replaced with an actual button element (<button>) and a click event listener is used.
5. The buttons can be made visually focusable and accessible. The closing button of reading list in `app.component.html` is made focusable by adding outline in `app.component.scss`.