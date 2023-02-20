import './index.css';

import { listContent } from './componentHTML';
import {
    addButtonHandler,
    listItemMouseOutHandler,
    listItemMouseOverHandler,
    onListItemClickHandler,
    onOverlayClickHandler,
    removeButtonHandler,
} from './handlers';
import { insertHTML } from './helpers';

const App = {
    // Initialize view selectors, can be referenced for DOM manipulation
    $: {
        list: document.querySelector('[data-list="list"]'),
        addButton: document.querySelector('[data-list="add-row"]'),
        removeButton: document.querySelector('[data-list="remove-row"]'),
        listItems: document.querySelector('.list-item'),
        app: document.querySelector('#app'),
        overlay: document.querySelector('[data-list="overlay"]')
    },

    state: {
        selectedItem: null,
        list: Array.from(Array(10).keys())
    },

    setState(key, value) {
        if (App.state.hasOwnProperty(key)) {
            App.state[key] = value;
        }
    },

    // evenListener for list item hover
    addListItemHoverListener(element) {
        element.addEventListener('mouseover', listItemMouseOverHandler(App));
        element.addEventListener('mouseout', listItemMouseOutHandler(App));
    },

    // remove listeners when transform to modal
    removeListItemHoverListener(element) {
        element.removeEventListener('mouseover', listItemMouseOverHandler);
        element.removeEventListener('mouseout', listItemMouseOutHandler);
    },

    addListClickListener(element) {
        element.addEventListener('click', onListItemClickHandler(App));
    },

    removeListClickListener(element) {
        element.removeEventListener('click', onListItemClickHandler(App));
    },

    // Func takes id and generates an empty row 
    createListItem(id) {
        const li = document.createElement("li");
        li.classList.add('list-li-item');
        li.dataset.id = id;
        insertHTML(li, listContent(id + 1));
        // hover and onClick events
        App.addListItemHoverListener(li);
        App.addListClickListener(li);
        return li;
    },

    // add event listeners for list actions - add, remove, hover
    bindListActionEvents() {
        const { $: { addButton, removeButton, overlay } } = App;
        // Add row
        addButton.addEventListener('click', addButtonHandler(App));
        // Remove row
        removeButton.addEventListener('click', removeButtonHandler(App));
        // overlay close listener
        overlay.addEventListener('click', onOverlayClickHandler(App))

    },

    // create an initial list with 10 items and bind + / - action events
    init() {
        App.$.list.replaceChildren(...App.state.list.map((v) => App.createListItem(v)));
        App.$.list.childNodes.forEach(($li, i) => {
            $li.animate([{ opacity: 0 }, { opacity: 1, easing: 'ease-in' }], i * 100);
            $li.animate([{ transform: 'translate(-20px)' }, { transform: 'translate(0px)' }], i * 50);
        });
        App.bindListActionEvents();
    }

}

// Initialize
App.init();