// @ts-nocheck

import { psdFetch } from './fetch'
import sleep from './sleep'

export function $(selector) {
	const elems = document.querySelectorAll(selector)
	return elems.length === 1 ? elems[0] : [...elems]
}

export function moveswap(node) {
  const thisPos = parseInt(node.querySelector('#spnRank').innerText)
  const otherPos = parseInt(prompt('Enter station# to swap with'), 10)
  const list = $('#sortable_nav li')
  const otherNode = list[otherPos - 1] // zero based index
  moveSelected([node], otherPos, { preserveSelection: true, recalculateRanks: false })
  moveSelected([otherNode], thisPos, { preserveSelection: true })
}

export function getSelected() {
  return $('#sortable_nav').querySelectorAll('li.selected')
}

export function getAllItems() {
  return Array.from(document.querySelectorAll('#sortable_nav > li'))
}

export function moveselectedto() {
  moveSelected(getSelected(), parseInt($('#__PSZY_PREFNO__').value, 10))
}

export function moveselectedtop() {
  moveSelected(getSelected(), 1)
}

export function moveselectedbottom() {
  moveSelected(getSelected(), getAllItems().length)
}

export function moveSelected(selection, to, { preserveSelection = false, recalculateRanks = true } = {}) {
  const listContainer = $('#sortable_nav')
  let list = getAllItems()
  // input validation
  if (selection.length == 0) {
    return alert('Select at least one station')
  }
  if (!Number.isInteger(to) || isNaN(to) || to < 1) {
    return alert('Enter a valid preference number')
  }
  if (to > list.length) {
    return alert('Not enough stations. Try a smaller number')
  }
  // move
  selection.forEach(node => {
    listContainer.removeChild(node)
  })
  list = getAllItems()
  if (to < list.length) {
    const targetNode = list[to - 1] // zero based index
    selection.forEach(node => {
      listContainer.insertBefore(node, targetNode)
    })
  } else {
    selection.forEach(node => {
      listContainer.appendChild(node)
    })
  }
  if (recalculateRanks) correctRanks()
  glow(...selection)
  if (!preserveSelection) deselectAll()
}

export function selectNode(node) {
  // ignore clicks on any interactive element
  if (node.matches('input, a, button')) return
  // else (de)select the item
  node.closest('#sortable_nav > li')?.classList.toggle('selected')
  updateSelectedCount()
}

export function deselectAll() {
  getSelected().forEach(node => node.classList.remove('selected'))
  updateSelectedCount()
}

export function getRange() {
  const ranges = $('#__PSZY_RANGE__').value.split(',')
  const indices = []
  ranges.forEach(r => {
    r = r.trim()
    // matches numbers
    // insensitive to whitespace around number
    const singleNum = r.match(/^(\d+)$/m)
    if (singleNum !== null) {
      indices.push(parseInt(singleNum[1]))
      return
    }
    // matches: 10-22
    // insensitive to whitespace around number
    const numRange = r.match(/^(\d+)\W*-\W*(\d+)$/m)
    if (numRange !== null) {
      const min = parseInt(numRange[1])
      const max = parseInt(numRange[2])
      for (let i = min; i <= max; i++) {
        indices.push(i)
      }
      return
    }
  })
  return indices
}

export function selectRange() {
  const list = getAllItems()
  getRange().forEach(i => {
    // zero based indexing
    list[i - 1].classList.add('selected')
  })
  updateSelectedCount()
}

export function deselectRange() {
  const list = getAllItems()
  getRange().forEach(i => {
    // zero based indexing
    list[i - 1].classList.remove('selected')
  })
  updateSelectedCount()
}

export function getPattern() {
  const pattern = $('#__PSZY_PATTERN__').value
  return new RegExp(pattern, 'im')
}

export function selectPattern() {
  const list = getAllItems()
  const re = getPattern()
  list.forEach(n => {
    const text = n.querySelector('span.spanclass').innerText
    if (re.test(text)) {
      n.classList.add('selected')
    }
  })
  updateSelectedCount()
}

export function deselectPattern() {
  const list = getAllItems()
  const re = getPattern()
  list.forEach(n => {
    const text = n.querySelector('span.spanclass').innerText
    if (re.test(text)) {
      n.classList.remove('selected')
    }
  })
  updateSelectedCount()
}

export function updateSelectedCount() {
  const count = getSelected().length
  $('#__PSZY_SELECTEDCOUNT__').innerText = count.toString()
}

export function moveup(node) {
  const newPos = parseInt(node.previousSibling.querySelector('#spnRank').innerText)
  moveSelected([node], newPos, { preserveSelection: true })
  window.scrollBy({
    top: -1 * node.offsetHeight,
    behavior: 'smooth'
  })
}

export function movedown(node) {
  const newPos = parseInt(node.nextSibling.querySelector('#spnRank').innerText)
  moveSelected([node], newPos, { preserveSelection: true })
  window.scrollBy({
    top: node.offsetHeight,
    behavior: 'smooth'
  })
}

export function movetotop(node) {
  moveSelected([node], 1, { preserveSelection: true })
}

export function movetobottom(node) {
  moveSelected([node], getAllItems().length, { preserveSelection: true })
}

export function moveto(node) {
  const newNodePos = parseInt(prompt('Enter preference#'), 10)
  moveSelected([node], newNodePos, { preserveSelection: true })
}

export function glow(...nodes) {
  nodes.forEach((node) => {
    node.classList.add('glow')
    setTimeout(() => {
      node.classList.remove('glow')
    }, 400)
  })
}

export function correctRanks() {
  $('#sortable_nav > li').forEach((li, index) => {
    li.querySelector('#spnRank').innerText = index + 1
    li.querySelector('span.spanclass').setAttribute('cls', index + 1)
  })
}

export function exportCsv() {
  const list = getAllItems()
  const data = [['ID', 'NAME', 'ACCOMO', 'STIPEND', 'STUDENTS', 'PROJECTS', 'DISCIPLINES', 'NOTES']]
  list.forEach(n => {
    const id = n.querySelector('span.spanclass').getAttribute('spn')
    const name = encodeURIComponent(n.querySelector('span.spanclass').innerText)
    const accomo = Number(n.querySelector('input[type="checkbox"]').checked)
    const stipend = n.querySelector('#__PSZY_STIPEND__ span').innerText
    const students = n.querySelector('#__PSZY_STUDENTS__ span').innerText
    const projects = n.querySelector('#__PSZY_PROJECTS__ span').innerText
    const discipline = encodeURIComponent(n.querySelector('#__PSZY_DISCIPLINE__ span').innerText)
    const notes = encodeURIComponent(n.querySelector('#__PSZY_NOTE__').innerText)
    data.push([id, name, accomo, stipend, students, projects, discipline, notes])
  })
  const blob = new Blob([data.map(row => row.join(',')).join('\n')], { type: 'text/html', endings: 'native' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = 'station_preferences.csv'
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}

// read csv line by line
// find station id in pref list
// update row
// add row to doc fragment
// new stations remain in list
// add fragment to top of list
export function importCsv() {
  const picker = $('#__PSZY_FILE__')
  picker.click()
  picker.addEventListener('change', () => {
    picker.files?.[0]?.text().then(text => {
      if (!text.startsWith('ID,NAME,ACCOMO,STIPEND,STUDENTS,PROJECTS,DISCIPLINES,NOTES')) return alert('Bad File')
      // temp store pref in fragment
      const fragment = document.createDocumentFragment();
      const stats = {
        restored: 0,
        added: 0,
        deleted: 0,
      }
      const data = text.trim().split('\n').map(s => s.trim().split(','))
      data.shift() // remove header
      data.forEach(row => {
        const [id, name, accomo, stipend, students, projects, discipline, notes] = row
        const node = $('#sortable_nav').querySelector(`span.spanclass[spn="${id}"]`)?.parentNode
        if (!node) {
          // station withdrawn
          stats.deleted ++
          return
        }
        node.querySelector('input[type="checkbox"]').checked = Number(accomo)
        node.querySelector('#__PSZY_STIPEND__ span').innerText = stipend
        node.querySelector('#__PSZY_STUDENTS__ span').innerText = students
        node.querySelector('#__PSZY_PROJECTS__ span').innerText = projects
        node.querySelector('#__PSZY_DISCIPLINE__ span').innerText = decodeURIComponent(discipline)
        node.querySelector('#__PSZY_NOTE__').innerText = decodeURIComponent(notes)
        stats.restored ++
        fragment.appendChild(node)
      })
      // stations remaining in list were added after backup
      stats.added = document.querySelectorAll('#sortable_nav > li').length
      // add back fragment to the top of this list
      if (stats.added) {
        $('#sortable_nav').insertBefore(fragment, $('#sortable_nav > li:first-child'))
      } else {
        $('#sortable_nav').appendChild(fragment)
      }
      correctRanks()
      alert(`imported ${data.length} rows, ${stats.restored} stations restored from backup, ${stats.added} added and ${stats.deleted} deleted since last visit`)
    })
  })
}

export async function viewProblemBank(node, { openInBackground = false } = {}) {
  let stid = node.querySelector('.spanclass.uiicon').attributes.spn.value
  const data = await psdFetch("http://psd.bits-pilani.ac.in/Student/ViewActiveStationProblemBankData.aspx/getPBPOPUP", {
    body: { StationId: stid },
    referrer: "http://psd.bits-pilani.ac.in/Student/ViewActiveStationProblemBankData.aspx",
  })
  if (data.length === 0) throw new Error('No problem banks found')
  const url = `StationproblemBankDetails.aspx?CompanyId=${data[0].CompanyId}&StationId=${data[0].StationId}&BatchIdFor=${data[0].BatchIdFor}&PSTypeFor=${data[0].PSTypeFor}`
  if (openInBackground) {
    const iframe = $('#__PSZY_BGFRAME__') as HTMLIFrameElement
    iframe.src = url
    await sleep(20)
    while (iframe.contentDocument?.readyState !== 'complete') {
      await sleep(20)
    }
    return updateStationInfo(node)
  }
  const w = window.open(url, "_blank")
  await sleep(20)
  while (w?.document?.readyState !== 'complete') {
    await sleep(20)
  }
  return updateStationInfo(node)
}

export async function updateStationInfo(node) {
  const stid = node.querySelector('.spanclass.uiicon').attributes.spn.value
  const data = await psdFetch("http://psd.bits-pilani.ac.in/Student/ViewActiveStationProblemBankData.aspx/getPBPOPUP", {
    body: { StationId: stid },
    referrer: "http://psd.bits-pilani.ac.in/Student/ViewActiveStationProblemBankData.aspx",
  })
  if (data.length === 0) throw new Error("No problem banks found for this station")
  const response1 = psdFetch("http://psd.bits-pilani.ac.in/Student/StationproblemBankDetails.aspx/ViewPB", {
    referrer: `http://psd.bits-pilani.ac.in/Student/StationproblemBankDetails.aspx?CompanyId=${data[0].CompanyId}&StationId=${data[0].StationId}&BatchIdFor=${data[0].BatchIdFor}&PSTypeFor=${data[0].PSTypeFor}`,
    body: { batchid: "undefined" },
  })
  const response2 = psdFetch("http://psd.bits-pilani.ac.in/Student/StationproblemBankDetails.aspx/StationFacilitiesInfo", {
    referrer: `http://psd.bits-pilani.ac.in/Student/StationproblemBankDetails.aspx?CompanyId=${data[0].CompanyId}&StationId=${data[0].StationId}&BatchIdFor=${data[0].BatchIdFor}&PSTypeFor=${data[0].PSTypeFor}`,
    body: { StationId: "0" },
  })
  const [data1, data2] = await Promise.all([response1, response2])
  const totStudents = data1?.map(p => p.TotalReqdStudents).reduce((acc, val) => acc + val) ?? '-'
  const tags = data1?.map(p => p.Tags.replaceAll(' ', '').replaceAll('-', '').replaceAll('Any', '')).join(',')
  node.querySelector('#__PSZY_STIPEND__ span').innerText = data2[0]?.Stipend ?? '-'
  node.querySelector('#__PSZY_STUDENTS__ span').innerText = totStudents
  node.querySelector('#__PSZY_PROJECTS__ span').innerText = data1?.[0].TotalProject ?? '-'
  node.querySelector('#__PSZY_DISCIPLINE__ span').innerText = Array.from(new Set(tags.split(','))).filter(x => !!x).join(',') || 'Any'
}

export async function fillAllStationInfo() {
  const allNodes = getAllItems()
  for (const [index, node] of Object.entries(allNodes)) {
    await viewProblemBank(node, { openInBackground: true })
    const i = parseInt(index)
    $('#__PSZY_FETCHINFOPROGRESS__').value = (i + 1) / allNodes.length
    // assuming each item takes 2 sec to fetch
    // calculate time (in minutes) of remaining nodes
    const timeLeft = Math.ceil((allNodes.length - i) * 2 / 60)
    $('#__PSZY_FETCHINFOPROGRESS__').title = `${i + 1}/${allNodes.length}: about ${timeLeft} minutes remaining`
    if (i === allNodes.length - 1) {
      $('#__PSZY_FETCHINFOPROGRESS__').removeAttribute('value')
    }
  }
}
