const setSidebarState = (type,data) => {
  return {
    type,
    data,
  };
};

export const toggleSidebar = ()=> {
  return setSidebarState(
    'TOGGLE_SIDEBAR',
    undefined
  )
};

export const showTaskList = ()=> {
  return setSidebarState(
    'SHOW_TASK_LIST',
    undefined
  )
};

export const showTaskDetail = (_id)=> {
  return setSidebarState(
    'SHOW_TASK_DETAIL',
    _id
  )
};

export const showChatList = ()=> {
  return setSidebarState(
    'SHOW_CHAT_LIST',
    undefined
  )
};

export const showChatDetail = (_id)=> {
  return setSidebarState(
    'SHOW_CHAT_DETAIL',
    _id
  )
};

