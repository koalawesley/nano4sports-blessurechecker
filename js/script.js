 /******************************************************************
        ** Inject graph with data (now hardcoded but in final demo it's dynamic.)                                
        *******************************************************************/
        var ctx = document.getElementById("myChart");
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["1", "2", "3", "4", "5", "6"],
                datasets: [{
                    label: 'Huidige sessie',
                    data: [0, 50, 150, 50, 150, 0],
                    backgroundColor: [
                        'rgba(26,41,128,0.7)'
                    ],
                    borderColor: [
                        'rgba(26,41,128,1)'
                    ],
                    borderWidth: 1
                },
                  {
                    label: 'Trainingsschema',
                    data: [0, 50, 100, 50, 100, 0],
                    backgroundColor: [
                        'rgba(38,208,206,0.7)'
                    
                    ],
                    borderColor: [
                        'rgba(38,208,206,1)'
                   
                    ],
                    borderWidth: 1
                }         
                          ]
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });


        $( document ).ready(function() {            
            /******************************************************************
            ** Global variables                                
            *******************************************************************/
            const bodyHolder = $("#bodyHolder");
            const body = $("#bodyPng");
            const back = $("#back");
            const modal = $("#tipsModal");
            const modalContent = $("#content");
            const modalExit = $("#exit");
            const second = $("#second");
            const graph = $("#graph");
            let open = false;
            let defaultButtons = 6;
            let dataAttMax = 15;
            let bodyOpen = false;

            /******************************************************************
            ** Click function when a dot is clicked                              
            *******************************************************************/
             $('.dot').click(function(){

                /******************************************************************
                ** Add the id of the clicked dot to the body                              
                *******************************************************************/
                $(body).addClass(this.id);

                /******************************************************************
                ** Store the data attributes                           
                *******************************************************************/
                var dataAtt = $(this).attr('data-index-number');
                var dataPlek = $(this).attr('data-plek');
                var parsedDataAtt = parseInt(dataAtt);


                /******************************************************************
                ** For loop to hide the default dots when a dot is clicked
                ** parsedDataAtt is the current data attribute
                ** defaultButtons is the number of the current default dots (6)                            
                *******************************************************************/
                if(parsedDataAtt <= defaultButtons) {
                    for(var x = 1;x <= defaultButtons; x++) {
                        $('div[data-index-number = '+ x +']').addClass("hide");
                    }
                } 

                /******************************************************************
                ** Linking the default dots to the zoomed in dots.
                ** dataAtt 1-6 are default dots                      
                *******************************************************************/
                let link;
                switch(dataAtt) {
                    /*Rechterknie*/
                    case "1":
                        link = "8";
                        break;
                    /*Linkerknie*/
                    case "2":
                        link = "7";
                        break;
                    /*Rechterbeen*/
                    case "3":
                        link = "11";
                        break;
                    /*Linkerbeen*/
                    case "4":
                        link = "12";
                        break;
                    /*Rechtervoet*/
                    case "5":
                        link ="9";
                        break;
                    /*Linkervoet*/
                    case "6":
                        link = "10";
                        break;
                }

                /******************************************************************
                ** Show the correct dots, default dots are hidden earlier and unhide
                ** back button                         
                *******************************************************************/
                $('div[data-index-number = '+ link +']').removeClass("hide");

                /******************************************************************
                ** Check if current dataAtt number is higher as defaultButtons value
                ** - if this is he case the modal will be opened                       
                *******************************************************************/
                if(parsedDataAtt > defaultButtons) {
                    open = true;
                    $(modal).addClass("showModal");

                    /******************************************************************
                    ** Get the data from data.json                    
                    *******************************************************************/
                   $.getJSON("data/data.json", function(data){
                    /******************************************************************
                    ** Clear html just in case                 
                    *******************************************************************/ 
                    modalContent.html('');

                    $.each(data, function(i, value){
                        /******************************************************************
                        ** Check if the clicked button matches data of the dataset                   
                        *******************************************************************/                   
                        if(dataPlek == value.plek) {

                            /******************************************************************
                            ** Set the title and set injury with value.naam
                            ** after that it creates a list with the tips/behandeling from the dataset                  
                            *******************************************************************/ 
                            modalContent.append('<h1>Tips & tricks</h1>');
                            let finalHtml = '<h2>' + value.naam + '</h2><h3>Mogelijke oorzaken</h3><ul class="oorzaken">';

                            for(var list = 0; list < value.tips.length; list++ ) {
                                finalHtml += '<li>' + value.tips[list] + '</li>';
                            }

                            /******************************************************************
                            ** Show advertisement between tips and behandeling.
                            ** first check if advertisement is set, then update the html variable
                            ** with the advetisements                        
                            *******************************************************************/
                            finalHtml += '<div class="container"><div class="row">';
                            if(value.advertentie) {
                                finalHtml += '<div class="col-12"><h4>Aanbevolen artikelen</h4><span>Gesponsorde content</span></div>';
                                for(var ad = 0; ad < value.advertentie.length; ad++) {
                                    finalHtml += '<div class="col-4"><a href="https://www.nike.com/nl/t/air-vapormax-2019-schoen-W4vCQ9/AR6631-002" target="_blank"><img src="' + value.advertentie[ad] + '"alt=""></a></div>';
                                }
                                finalHtml += '</div></div>';
                            }
                            finalHtml += '</ul><h3>Behandeling</h3>';
                            finalHtml += '<ul class="behandeling">';

                            for(var list = 0; list < value.behandeling.length; list++ ) {
                                finalHtml += '<li>' + value.behandeling[list] + '</li>';
                            }
                            modalContent.append(finalHtml);     
                        }
                    });
                  });
                }
            });

            /******************************************************************
            ** Click function to go back                          
            *******************************************************************/
            $(back).click(function(){

                /******************************************************************
                ** Check if the modal is open. If the modal is open the modal needs
                ** to be closed first.                      
                *******************************************************************/
                if(open) {
                    open = false;
                    $(modal).removeClass("showModal");

                    /******************************************************************
                    ** Clear html                
                    *******************************************************************/ 
                    modalContent.html('');
                } else {
                    /******************************************************************
                    ** Check if a default button has the class hide, if not show the stats
                    ** page again.                
                    *******************************************************************/ 
                    if($('div[data-index-number = "1"').hasClass("hide")) {

                    } else {
                        if(bodyOpen) {
                            graph.show();
                            second.hide();
                            $('.headerIcon').addClass("hide");
                            bodyOpen = false;
                        }
                    }
                    /******************************************************************
                    ** Remove all added classes to the body and go back to default                     
                    *******************************************************************/
                    $(body).removeClass().addClass("default");

                    /******************************************************************
                    ** Show all default buttons again                   
                    *******************************************************************/
                    for(var x = 0;x <= defaultButtons; x++) {
                        $('div[data-index-number = '+ x +']').removeClass("hide");
                    }

                    /******************************************************************
                    ** Hide all non default buttons                  
                    *******************************************************************/
                    for(var x = defaultButtons + 1; x <= dataAttMax; x++ ) {
                        $('div[data-index-number = '+ x +']').addClass("hide");
                    }
                }
            });

            /******************************************************************
            ** Close stats and open modal                 
            *******************************************************************/
            $(".showBody").click(function(){
                graph.fadeOut();
                second.fadeIn();
                $('.headerIcon').removeClass("hide");
                bodyOpen = true;
            });

            /******************************************************************
            ** Close modal                 
            *******************************************************************/
            $(modalExit).click(function(){
                $(modal).removeClass("showModal");
                open = false;
            });
        });