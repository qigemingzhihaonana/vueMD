const getters = {
  menuData: state => state.user.menuData,
  token: state => state.user.token,
  name: state => state.user.name,
  tableData: state => state.role.tableData,
  tableDataAdd: state=> state.role.tableDataAdd,
  tableDataAddRole: state => state.module.tableDataAddRole,
  tableDataRole: state => state.module.tableDataRole
}

export default getters
