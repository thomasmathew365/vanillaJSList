export const insertHTML = (el, html) => el.insertAdjacentHTML("afterbegin", html);

export const replaceHTML = (el, html) => {
	el.replaceChildren();
	insertHTML(el, html);
};

export const animateListItem = (listItem, position, duration) => {
	listItem && listItem.animate([{ transform: `translate(${position}px)` }], { duration: duration, fill: 'forwards', });
}
