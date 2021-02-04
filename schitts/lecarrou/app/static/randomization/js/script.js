$(function(){
	if(window.navigator.language.slice(0, 2) == 'fr'){
        alert('test')
		$("#id_ran_dem_dat").datepicker(
			{
				dateFormat: 'dd/mm/yy',
			}
    	);
	} 
	else
	{
		$("#id_ran_dem_dat").datepicker(
			{
				dateFormat: 'yy-mm-dd',
			}
    	);
	}
});

$(document).ready(function() {


    // masquage certains champs du formulaire au chargement de la page
    $(function(){
        $("#div_id_ran_dem_nom").hide();
        $("#div_id_ran_dem_dat").hide();
    });

    // affichage des champs en fonction de la valeur sélectionnée dans la liste 
    $("#div_id_ran_bug").on("change", function(event){
        console.log($("#id_ran_bug").val())

        if ($("#id_ran_bug").val() == 1 ){
            $("#div_id_ran_dem_nom").show();
            $("#div_id_ran_dem_dat").show();
        }
        else {
            $("#div_id_ran_dem_nom").hide();
            $("#div_id_ran_dem_dat").hide();
        }
    });

});