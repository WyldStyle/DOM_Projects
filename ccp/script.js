document.addEventListener("DOMContentLoaded",()=>{
  const submitButton = document.querySelector('#submitMe')
  submitButton.addEventListener("click",()=>{
    window.alert('paste Me Pic Me')
  })
})

document.addEventListener("DOMContentLoaded",() =>{
   // Prevent the default behavior of dropping files outside the drop area.
    dropArea.addEventListener('dragover', function(e) {
        e.preventDefault();
    })
    dropArea.addEventListener('drop',())
})
