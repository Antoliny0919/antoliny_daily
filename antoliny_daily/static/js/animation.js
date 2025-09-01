class TypingAnimation {
    /**
    * @param {HTMLElement} element - It is an element with the attribute `data-animation="typing"`,
    *                                to which the typing effect is applied.
    * @param {string[]} words - A list of words to which the typing effect will be applied sequentially,
    *                           separated by ","
    */
    constructor(element, words, typeSpeed = 150, deleteSpeed = 100, pauseTime = 2000) {
        this.element = element;
        this.words = words;
        this.typeSpeed = typeSpeed;
        this.deleteSpeed = deleteSpeed;
        this.pauseTime = pauseTime;
        this.currentWordIndex = 0;
        this.currentText = '';
        this.isDeleting = false;

        this.start();
    }

    start() {
    const currentWord = this.words[this.currentWordIndex];
        if (this.isDeleting) {
            // delete
            this.currentText = currentWord.substring(0, this.currentText.length - 1);
        } else {
            // write
            this.currentText = currentWord.substring(0, this.currentText.length + 1);
        }

        this.element.textContent = this.currentText;

        let timeout = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

        if (!this.isDeleting && this.currentText === currentWord) {
            // end of write
            timeout = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentText === '') {
            // end of delete
            this.isDeleting = false;
            this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
            timeout = 500;
        }

        setTimeout(() => this.start(), timeout);
    }
};
document.addEventListener('DOMContentLoaded', () => {
    const typingElements = document.querySelectorAll('[data-animation="typing"]');
    for (const node of typingElements) {
        const iterateWords = node.dataset.typingItems.split(',');
        new TypingAnimation(node, iterateWords);
    }
});
