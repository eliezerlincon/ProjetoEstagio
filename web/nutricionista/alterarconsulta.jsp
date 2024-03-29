<%-- 
    Document   : alterarpaciente
    Created on : 19/04/2016, 12:56:10
    Author     : eliez
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Nutricionista </title>

        <!-- Bootstrap core CSS -->

        <link href="../production/css/bootstrap.min.css" rel="stylesheet">

        <link href="../production/fonts/css/font-awesome.min.css" rel="stylesheet">
        <link href="../production/css/animate.min.css" rel="stylesheet">

        <!-- Custom styling plus plugins -->
        <link href="../production/css/custom.css" rel="stylesheet">
        <link href="../production/css/icheck/flat/green.css" rel="stylesheet">
        <script src="../js/foto.js" type="text/javascript"></script>
        <script src="../js/validacoes.js" type="text/javascript"></script>  
        <script src="../js/submetendo formularios.js" type="text/javascript"></script>
        <script src="../js/mascara_telefone.js" type="text/javascript"></script>


        <script src="../production/js/jquery.min.js"></script>

        <script>
            function myFuncction() {
                var x, text;

                // Get the value of the input field with id="numb"
                x = document.getElementById("idadePaciente").value;

                // If x is Not a Number or less than one or greater than 10
                if (isNaN(x) || x < 18 || x > 65) {
                    window.alert('Idade não permitida');

                    document.getElementById("idadePaciente").focus();
                } else {
                    text = "";
                }
                document.getElementById("demo").innerHTML = text;
            }

        </script>
        <script>
function mostraSenha(){
document.getElementById("senhaPessoa").type = "text";
}
</script>
    </head>
    <body class="nav-md">
        <div class="container body">
            <div class="main_container">
                <%@include file="menunutricionista.jsp" %>
                <!-- page content -->
                <div class="right_col" role="main">
                    <div class="">

                        <div class="clearfix"></div>

                        <div class="row">

                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="x_panel" style="height:600px;">
                                    <div class="x_title">
                                        <h2>Dados Da Consulta</h2>
                                    
                                        <div class="clearfix"></div>
                                    </div>
                                    <div class="x_content">
                                        <br />
                                        <form id="alteraconsulta"  name="alteraconsulta" action="CompletarConsulta" method="POST" data-parsley-validate class="form-horizontal form-label-left">

                                                            
                                                            <div class="modal-body">


                                                                <br />


                                                                <div class="form-group"  hidden="">
                                                                    <label class="control-label col-md-3 col-sm-3 col-xs-12" for="first-name">ID <span class="required">*</span>
                                                                    </label>
                                                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                                                        <input type="text" value="${consulta.idConsulta}"  id="idConsulta" name="idConsulta" placeholder="ID" required="required" readonly="" class="form-control col-md-7 col-xs-12">
                                                                    </div>
                                                                </div>
                                                                <div class="form-group">
                                                                    <label class="control-label col-md-3 col-sm-3 col-xs-12" for="first-name">Data <span class="required">*</span>
                                                                    </label>
                                                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                                                        <input type="date" value="${consulta.dataConsulta}" id="dataConsulta" name="dataConsulta" placeholder="Nome" required="required" class="form-control col-md-7 col-xs-12">
                                                                    </div>
                                                                </div>
                                                                <div class="form-group">
                                                                    <label class="control-label col-md-3 col-sm-3 col-xs-12" for="first-name">Horário <span class="required">*</span>
                                                                    </label>
                                                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                                                        <input type="time" value="${consulta.horaConsulta}" id="horaConsulta" name="horaConsulta" placeholder="E-mail" required="required"  class="form-control col-md-7 col-xs-12">
                                                                    </div>
                                                                </div>
                                                                    <div class="form-group" >
                                                                    <label class="control-label col-md-3 col-sm-3 col-xs-12" for="first-name">Conduta <span ></span>
                                                                    </label>
                                                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                                                        <input type="text" value="${consulta.condutaNutricionalConsulta}"  id="condutaNutricionalConsulta" name="condutaNutricionalConsulta" placeholder="Ainda não há dados nesse campo"  class="form-control col-md-7 col-xs-12">
                                                                    </div>
                                                                </div>
                                                                    <div class="form-group" >
                                                                    <label class="control-label col-md-3 col-sm-3 col-xs-12" for="first-name">Obs Consulta <span></span>
                                                                    </label>
                                                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                                                        <input type="text" value="${consulta.obsConsulta}" id="obsConsulta" name="obsConsulta" placeholder="Ainda não há dados nesse campo"  class="form-control col-md-7 col-xs-12">
                                                                    </div>
                                                                </div>
                                                                    <div class="form-group" >
                                                                    <label class="control-label col-md-3 col-sm-3 col-xs-12" for="first-name">Status <span class="required">*</span>
                                                                    </label>
                                                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                                                        <input type="text" value="${consulta.statusConsulta}"  id="statusConsulta" name="statusConsulta" placeholder="Ainda não há dados nesse campo" required="required"  class="form-control col-md-7 col-xs-12">
                                                                    </div>
                                                                </div>
                                                                    
                                                                
                                                                
                                                                
                                                                
                                                            </div>
                                                            <div class="modal-footer">
                                                                
                                                                <a href="<%= request.getContextPath()%>/ListarConsulta?idPessoa=<%=session.getAttribute("id")%>"<button class="btn btn-default">Voltar</button></a>
                                                                <a href=""><button type="submit" class="btn btn-primary">Próximo</button></a>
                                                            </div>

                                                        </form>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                    <!--Inicio modal erro paciente -->
                    <div class="modal fade bs-example-modalParaDiferenciarDeOutroModal-sm" id="erroPaciente" tabindex="-1" role="dialog" aria-hidden="true">
                        <div class="modal-dialog modal-sm">
                            <div class="modal-content">

                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span>
                                    </button>
                                    <h4 class="modal-title" id="myModalLabel2">Mensagem</h4>
                                </div>
                                <div class="modal-body">
                                    <h4>${erroPaciente}</h4>
                                </div>

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-primary" data-dismiss="modal">OK</button>
                                </div>

                            </div>
                        </div>
                    </div>
                    <!--Fim modal erro paciente -->

                    <!-- footer content -->
                    <footer>
                        <div class="">
                            <p class="pull-right">
                                <span class="lead"> NutriSIS</span>
                            </p>
                        </div>
                        <div class="clearfix"></div>
                    </footer>
                    <!-- /footer content -->

                </div>
                <!-- /page content -->
            </div>     
        </div>
        <script src="../production/js/bootstrap.min.js"></script>

        <!-- chart js -->
        <script src="../production/js/chartjs/chart.min.js"></script>
        <!-- bootstrap progress js -->
        <script src="../production/js/progressbar/bootstrap-progressbar.min.js"></script>
        <script src="../production/js/nicescroll/jquery.nicescroll.min.js"></script>
        <!-- icheck -->
        <script src="../production/js/icheck/icheck.min.js"></script>

        <script src="../production/js/custom.js"></script>

        <!-- image cropping -->
        <script src="../production/js/cropping/cropper.min.js"></script>
        <script src="../production/js/cropping/main.js"></script>


        <!-- daterangepicker -->
        <script type="text/javascript" src="../production/js/moment.min.js"></script>
        <script type="text/javascript" src="../production/js/datepicker/daterangepicker.js"></script>
        <!-- moris js -->
        <script src="../production/js/moris/raphael-min.js"></script>
        <script src="../production/js/moris/morris.js"></script>

        ${script}
    </body>
</html>
