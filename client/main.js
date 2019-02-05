import submitFilters from './submitFilters'
import launchModal from './launchModal'
import launchRemoveUserModal from './removeUser'
import fetchKpis from './fetchKpis'

window.addEventListener("DOMContentLoaded", ()=> {
    submitFilters()
    launchModal()
    fetchKpis()
    launchRemoveUserModal()
})