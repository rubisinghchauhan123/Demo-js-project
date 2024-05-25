function openConfirmDilog(id){
    swal({
        title:"Are you sure you want to delete theses Records ?",
        text:"This action can't be undone !",
        icon:"warning",
        buttons: true,
        dangerMode: true,
})
.then((willDelete) => {
    if (willDelete) {
        deleteDataFromLocal(id);
        swal("Proof! Your  file has been deleted ",{
            icon:"success",
        });
    } else { 
        swal("Your imaginary file is safe!");
    
    }
});
}
