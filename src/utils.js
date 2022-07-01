window.space = window.space || {}

window.space.createElement = (tagName, ...styleClasses) => {
    let element = document.createElement(tagName)

    for (let styleClass of styleClasses) {
        element.classList.add(styleClass)
    }

    return element
}

window.space.areSame = (objects) => {
    return objects.filter((e) => {
        return e === objects[0]
    }).length === objects.length
}
