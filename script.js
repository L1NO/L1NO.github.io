function openPop() {
  const dialog = document.getElementById('popupDialog');
  if (dialog.style.display === 'none' || dialog.style.display === '') {
    dialog.style.display = 'flex';
  } else {
    dialog.style.display = 'none';
  }
}
