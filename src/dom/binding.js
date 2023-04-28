// For Tabbed Browsing

import {renderHomeContent, renderTodayContent, renderWeekContent} from './content.js';

export function newClickBind(element, action) {
    element.removeEventListener('click', action);
    element.addEventListener('click', action);
}

export default function bindButtons() {
    const homeBtn = document.getElementById("home-btn");
    const todayBtn = document.getElementById("today-btn");
    const thisWeekBtn = document.getElementById("this-week-btn");
    const burgerIcon = document.getElementById("burger");

    homeBtn.addEventListener('click', () => {
        renderHomeContent();
    });

    todayBtn.addEventListener('click', () => {
        renderTodayContent();
    });

    thisWeekBtn.addEventListener('click', () => {
        renderWeekContent();
    });

    burgerIcon.addEventListener('click', () => {
        document.querySelector('nav').classList.toggle('visible-block');
    });
}