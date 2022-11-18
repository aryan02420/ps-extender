const listItems = [
  [1001, 'Manufacturing-Acme Corporation, Toontown'],
]

function renderListItem(rank, id, name) {
  return `
  <li class="col-sm-12 item-blue clearfix ui-state-default">
    <span cls="${rank}" spn="${id}" cname="${name}" class="spanclass uiicon ui-icon-arrowthick-2-n-s">${name}</span>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <div class="ui-state-default sortable-number">
        <span id="spnRank" class="">${rank}</span>
    </div>
    <input type="checkbox" chkaccomo="${id}" class="accomo pull-right" name="accomoPreference" value="${id}">
  </li>
  `
}

const listContainer = document.querySelector('#sortable_nav')

let renderedList = ''

listItems.forEach(([id, name], index) => {
  renderedList += renderListItem(index + 1, id, name)
})

listContainer.innerHTML = renderedList