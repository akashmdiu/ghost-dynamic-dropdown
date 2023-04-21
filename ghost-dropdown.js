
"use strict";

const init = {
    ghostDropdown: (config = {}) => {
        const {
            targetElement = 'ul',
            hasDropdownDetectText = '[has_dropdown]',
            subitemDetectText = '[subitem]',
            hasDropdownIcon = "<svg width='19' height='10' viewBox='0 0 19 10' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M1.74805 1.52002L9.54883 9.00002L17.3496 1.52002' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>",
            hasDropdownClasses = 'has_dropdown',
            submenuUlClasses = 'sub-menu'
        } = config;

        const target = document.querySelector(targetElement);
        const listItems = target.querySelectorAll('li');

        listItems.forEach((li) => {
            const link = li.querySelector('a');
            if (link.textContent.includes(hasDropdownDetectText)) {
                li.classList.add(hasDropdownClasses);
                link.innerHTML = `${link.textContent.replace(hasDropdownDetectText, '')}<span>${hasDropdownIcon}</span>`;
                const subItems = [];
                let nextSibling = li.nextElementSibling;
                while (nextSibling !== null && nextSibling.querySelector('a').textContent.includes(subitemDetectText)) {
                    subItems.push(nextSibling);
                    nextSibling = nextSibling.nextElementSibling;
                }
                if (subItems.length > 0) {
                    const subList = document.createElement('ul');
                    subList.classList.add(submenuUlClasses);
                    subItems.forEach((subItem) => {
                        const subLink = subItem.querySelector('a');
                        subLink.textContent = subLink.textContent.replace(subitemDetectText, '');
                        subList.appendChild(subItem);
                    });
                    li.appendChild(subList);
                }
            }
        });
    }
};


// Initialize
init.ghostDropdown({
    targetElement: '.ghost-dropdown-menu',
    hasDropdownDetectText: '[has_dropdown]',
    hasDropdownClasses: 'has_dropdown',
    subitemDetectText: '[subitem]',
    hasDropdownIcon: "<svg width='19' height='10' viewBox='0 0 19 10' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M1.74805 1.52002L9.54883 9.00002L17.3496 1.52002' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>",
    submenuUlClasses: 'sub-menu'
});

