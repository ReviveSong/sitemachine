export function divider_component(item, data) {
    let new_item = document.createElement("div");

    if (item.invert == true) new_item.setAttribute("data-sb-invert", "");

    return new_item;
}