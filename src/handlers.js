import { animateListItem, insertHTML } from './helpers';

export const listItemMouseOverHandler = ({ state }) => (e) => {
    e.stopPropagation();
    if (state.selectedItem) return;
    // References for animation elements created on event trigger because the li is not appended to DOM yet ~ see.70
    const currentDataId = Number(e.target.getAttribute("data-id"));
    const currentElement = e.target;
    const prevElement = document.querySelector(`[data-id="${currentDataId - 1}"]`);
    const nextElement = document.querySelector(`[data-id="${currentDataId + 1}"]`);
    animateListItem(currentElement, 40, 200);
    animateListItem(prevElement, 20, 100);
    animateListItem(nextElement, 20, 100);
}

export const listItemMouseOutHandler = () => (e) => {
    e.stopPropagation();
    const currentDataId = Number(e.target.getAttribute("data-id"));
    const currentElement = e.target;
    const prevElement = document.querySelector(`[data-id="${currentDataId - 1}"]`);
    const nextElement = document.querySelector(`[data-id="${currentDataId + 1}"]`);
    animateListItem(currentElement, 0, 200);
    animateListItem(prevElement, 0, 100);
    animateListItem(nextElement, 0, 100);
}

export const removeButtonHandler = ({ $: { list }, removeListClickListener, removeListItemHoverListener, setState, state }) => (e) => {
    e.stopPropagation();
    removeListClickListener(list.lastChild);
    removeListItemHoverListener(list.lastChild);
    list.removeChild(list.lastChild);
    setState("list", state.list.slice(0, -1));
}

export const addButtonHandler = ({ $, createListItem, state, setState }) => (e) => {
    e.stopPropagation();
    const { list } = $;
    const listChildLength = list.childNodes.length;
    if (listChildLength > 100) return;
    const newRowElement = createListItem(listChildLength);
    newRowElement.animate([{ opacity: 0 }, { opacity: 1, easing: 'ease-in' }], 100);
    newRowElement.animate([{ transform: 'translate(-20px)' }, { transform: 'translate(0px)' }], 100);
    list.appendChild(newRowElement);
    setState("list", state.list.concat(listChildLength));
}

export const onListItemClickHandler = ({ state, setState, $ }) => (e) => {
    // if selected item exists just return
    if (state.selectedItem) return;

    setState("selectedItem", Number(e.target.getAttribute("data-id")));

    // show overlay and animate
    $.overlay.classList.replace('hidden', 'block');
    $.overlay.animate([{ opacity: 0 }, { opacity: 1, easing: 'ease-in' }], 200);

    // transform the list item into modal
    const $listItem = e.target;
    $listItem.classList.replace('list-li-item', 'list-item-modal');
    $listItem.animate([{ height: '3.5rem' }, { height: '15rem' }], { duration: 200, fill: 'forwards', });
    $listItem.animate([{ width: '24rem' }, { width: '30rem' }], { duration: 200, fill: 'forwards', });
    $listItem.innerHTML = '';
    insertHTML($listItem, `Pop-up view for ${state.selectedItem + 1}`);

    // scroll to top to show modal
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}

export const onOverlayClickHandler = ({ state, setState, $ }) => (e) => {
    e.stopPropagation();
    // Hide overlay and animate
    $.overlay.classList.replace('block', 'hidden');
    $.overlay.animate([{ opacity: 1 }, { opacity: 0, easing: 'ease-in' }], 200);
    const $listItem = document.querySelector(`[data-id="${state.selectedItem}"]`)

    // revert from popup modal to list item
    $listItem.innerHTML = '';
    $listItem.animate([{ opacity: '1' }, { opacity: '0' }], { duration: 300, fill: 'forwards' });
    $listItem.animate([{ height: '15rem' }, { height: '3.5rem' }], { duration: 300, fill: 'forwards' });
    $listItem.animate([{ width: '30rem' }, { width: '24rem' }], { duration: 300, fill: 'forwards' });

    // wait for animations to complete then reset innerHTML for list item and reset state
    setTimeout(() => {
        $listItem.animate([{ opacity: '0' }, { opacity: '1' }], { duration: 300, fill: 'forwards' });
        $listItem.classList.replace('list-item-modal', 'list-li-item');
        insertHTML($listItem, `<span> ${state.selectedItem + 1}</span>`);
        setState("selectedItem", null);
    }, 300);
}
