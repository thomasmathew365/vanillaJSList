import './index.css';

import { v4 as uuidv4 } from 'uuid';

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

function AppFactory(config) {

    const state = {
        selectedItem: null,
        list: Array.from(Array(10).keys()),
        listContainerID : uuidv4()
    }

    const setState = (key, value) => {
        if (App.state.hasOwnProperty(key)) {
            App.state[key] = value;
        }
    }

    // Func takes id and generates an empty row 
    const createListItem = (id) => {
        let { type, onClick } = config;

        if (type !== 'div' || type !== 'li' || type !== 'p') {
            console.error('Not a supported child type');
            type = 'li';
        }
        const listChild = document.createElement(type);
        if (typeof onClick !== 'function') {
            addListClickListener(listChild)
        } else {
            addListClickListener(listChild, onClick)
        }

        listChild.classList.add('list-li-item');
        listChild.dataset.id = id;
        insertHTML(listChild, listContent(id + 1));
        // hover and onClick events
        addListItemHoverListener(listChild);
        // App.addListClickListener(li);
        return listChild;
    };

    // Initialize view selectors, can be referenced for DOM manipulation
    const $ = {
        list: document.querySelector('[data-list="list"]'),
        addButton: document.querySelector('[data-list="add-row"]'),
        removeButton: document.querySelector('[data-list="remove-row"]'),
        listItems: document.querySelector('.list-item'),
        app: document.querySelector('#app'),
        overlay: document.querySelector('[data-list="overlay"]')
    }

  

    // evenListener for list item hover
    const addListItemHoverListener = (element) => {
        element.addEventListener('mouseover', listItemMouseOverHandler(App));
        element.addEventListener('mouseout', listItemMouseOutHandler(App));
    }

    // remove listeners when transform to modal
    const removeListItemHoverListener = (element) => {
        element.removeEventListener('mouseover', listItemMouseOverHandler);
        element.removeEventListener('mouseout', listItemMouseOutHandler);
    }

    const addListClickListener = (element, handler) => {
        element.addEventListener('click', handler ? handler : onListItemClickHandler(App));
    }

    const removeListClickListener = (element) => {
        element.removeEventListener('click', onListItemClickHandler(App));
    }



    // add event listeners for list actions - add, remove, hover
    const bindListActionEvents = () => {
        const { $: { addButton, removeButton, overlay } } = App;
        // Add row
        addButton.addEventListener('click', addButtonHandler(App));
        // Remove row
        removeButton.addEventListener('click', removeButtonHandler(App));
        // overlay close listener
        overlay.addEventListener('click', onOverlayClickHandler(App))

    }

    // create an initial list with 10 items and bind + / - action events
    // const init = () => {
    //     $.list.replaceChildren(...state.list.map((v) => createListItem(v)));
    //     // App.$.list.childNodes.forEach(($li, i) => {
    //     //     $li.animate([{ opacity: 0 }, { opacity: 1, easing: 'ease-in' }], i * 100);
    //     //     $li.animate([{ transform: 'translate(-20px)' }, { transform: 'translate(0px)' }], i * 50);
    //     // });
    //     // App.bindListActionEvents();
    // }

    const init = () => {
        const listContainer = `
        <ul class="flex flex-col w-full mt-20" data-list="list">
        </ul>
        `
        
        $.list.replaceChildren(...state.list.map((v) => createListItem(v)));

        // App.$.list.childNodes.forEach(($li, i) => {
        //     $li.animate([{ opacity: 0 }, { opacity: 1, easing: 'ease-in' }], i * 100);
        //     $li.animate([{ transform: 'translate(-20px)' }, { transform: 'translate(0px)' }], i * 50);
        // });
        // App.bindListActionEvents();
        console.log(state.listContainerID)
    }

    return {
        init
    }


}

// Initialize
// AppFactory.init();

const App = new AppFactory({
    type: 'div',
    size: 100,
    // onClick: (e) => alert(e.target)
});

const App2 = new AppFactory({
    type: 'p',
    size: 100,
    // onClick: (e) => alert(e.target)
});

App.init(); 

