export default (headers) => {
  let link = {};
  if (headers.link) {
    link = JSON.parse(headers.link);
  } else {
    link.per_page = headers.per_page;
    link.total_entries = headers.total_entries;
    link.current_page = headers.current_page;
    link.total_pages = headers.total_pages;
  }
  return link;
};
