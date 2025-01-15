The Word Master web game is an interactive word-guessing application developed using JavaScript, providing users with a challenging and engaging experience. Inspired by the popular word games, this project emphasizes logic, word validation, and a dynamic user interface.

Key Features:

Word of the Day Integration: Fetches a daily target word from an external API to provide a fresh challenge every day.
Interactive Gameplay: Users have six attempts to guess a five-letter word, with feedback given for each guess:
Letters in the correct position are marked as "correct."
Letters present in the word but in the wrong position are marked as "close."
Letters not in the word are marked as "wrong."

Dynamic User Interface: Each letter is displayed dynamically in a grid, visually representing user guesses and feedback.
A loading indicator informs users of ongoing validations with the API.
Real-Time Validation: Validates user guesses through an external API to ensure they are valid words before processing feedback.
Keyboard Support: Fully integrated with keyboard input for adding letters, backspacing, and submitting guesses using Enter.
Error Handling: Invalid words are highlighted visually, giving users instant feedback to adjust their guesses.
Responsive Design: Provides an engaging experience across various devices and screen sizes.

Technical Highlights:

Utilizes asynchronous JavaScript (fetch API) for smooth communication with external services.
Implements a mapping algorithm to accurately track and manage letter occurrences for precise feedback.
Robust event handling ensures smooth gameplay, even during edge cases like rapid inputs or invalid actions.

Outcome:
Word Master showcases the effective use of JavaScript to create an interactive and visually engaging web application. It demonstrates skills in DOM manipulation, API integration, and responsive design, delivering a seamless user experience.
