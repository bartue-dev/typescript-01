import './css/style.css'
import FullList from './model/FullList'
import ListItem from './model/ListItem'
import ListTemplate from './templates/ListTemplates'

const initApp = (): void => {
  const fullList = FullList.instance
  const template = ListTemplate.instance

  const itemEntryForm = document.querySelector("#itemEntryForm") as HTMLFormElement

  itemEntryForm.addEventListener("submit", (event: SubmitEvent): void => {
    event.preventDefault();

    const input = document.querySelector("#newItem") as HTMLInputElement

    const newEntryText: string = input.value.trim();

    if (!newEntryText.length) return

    const itemId: number = fullList.list.length
      ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
      : 1

    const newItem = new ListItem(itemId.toString(), newEntryText);

    fullList.addItem(newItem)

    template.render(fullList)
  })

  const clearItem = document.querySelector("#clearItemsButton") as HTMLButtonElement
  
  clearItem.addEventListener("click", (): void => {
    fullList.clearList();
    template.clear();
  });

  fullList.load()
  template.render(fullList)
  

}

document.addEventListener("DOMContentLoaded", initApp)
