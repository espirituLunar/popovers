// ========================
// Variables
// ========================
const popoverTriggers = document.querySelectorAll('.popover-trigger')

// ========================
// Functions
// ========================
/**
 * Genera un unico string
 * @param {Number} length
 */
const generateUniqueString = length => {
  return Math.random().toString(36).substring(2, 2 + length)
}

/**
 * @param {HTMLElement} popoverTrigger
 */
const getPopover = popoverTrigger => {
  return document.querySelector(`#${popoverTrigger.dataset.target}`)
}

/**
 * @param {HTMLElement} popoverTrigger
 * @returns {HTMLElement}
 */
const createPopover = popoverTrigger => {
  const popover = document.createElement('div')
  popover.classList.add('popover')
  popover.dataset.position = popoverTrigger.dataset.popoverPosition

  // Dynamic id
  const id = generateUniqueString(5)
  popover.id = id
  popoverTrigger.dataset.target = id

  const p = document.createElement('p')
  p.textContent = popoverTrigger.dataset.content

  popover.appendChild(p)
  document.body.appendChild(popover)
  return popover
}

/**
 * Calcula el top y el left del  popover
 * @param {HTMLElement} popoverTrigger
 * @param {HTMLElement} popover
 * @returns {Object} top y left
 */
const calculatePopoverPosition = (popoverTrigger, popover) => {
  const popoverTriggerRect = popoverTrigger.getBoundingClientRect()
  const popoverRect = popover.getBoundingClientRect()
  const { position } = popover.dataset
  const space = 20

  if (position === 'top') {
    return {
      left: (popoverTriggerRect.left + popoverTriggerRect.right) / 2 - popoverRect.width / 2,
      top: popoverTriggerRect.top - popoverRect.height - space
    }
  }

  if (position === 'left') {
    return {
      left: popoverTriggerRect.left - popoverRect.width - space,
      top: (popoverTriggerRect.top + popoverTriggerRect.bottom) / 2 -
      (popoverRect.height / 2)
    }
  }

  if (position === 'right') {
    return {
      left: popoverTriggerRect.right + space,
      top: (popoverTriggerRect.top + popoverTriggerRect.bottom) / 2 - popoverRect.height / 2
    }
  }

  if (position === 'bottom') {
    return {
      left: (popoverTriggerRect.left + popoverTriggerRect.right) / 2 - popoverRect.width / 2,
      top: popoverTriggerRect.bottom + space
    }
  }
}


// Positions popover
popoverTriggers.forEach(popoverTrigger => {
  const popover = getPopover(popoverTrigger) || createPopover(popoverTrigger)
  const popoverPosition = calculatePopoverPosition(popoverTrigger, popover)

  popover.style.top = `${popoverPosition.top}px`
  popover.style.left = `${popoverPosition.left}px`


  popover.setAttribute('hidden', true)
})


document.addEventListener('mouseover', event => {
  const popoverTrigger = event.target.closest('.popover-trigger')
  if (!popoverTrigger) return

  const popover = document.querySelector(`#${popoverTrigger.dataset.target}`)
  if (popover.hasAttribute('hidden')) {
    popover.removeAttribute('hidden')
  } else {
    popover.setAttribute('hidden', true)
  }
})


document.addEventListener('mouseover', event => {
  if (!event.target.closest('.popover') && !event.target.closest('.popover-trigger')) {
    const popovers = [...document.querySelectorAll('.popover')]
    popovers.forEach(popover => popover.setAttribute('hidden', true))
  }
})
