/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.projetoestagio.controller;

import br.com.projetoestagio.DAO.AvaliacaoDAOImpl;
import br.com.projetoestagio.DAO.AvaliacaoMedicamentoSuplementoDAOImpl;
import br.com.projetoestagio.DAO.AvaliacaoPatologiaDAOImpl;
import br.com.projetoestagio.DAO.GenericDAO;
import br.com.projetoestagio.model.Avaliacao;
import static br.com.projetoestagio.util.Conversoes.converterData;
import java.io.IOException;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Grazy
 */
@WebServlet(name = "AlterarAvaliacao", urlPatterns = {"/AlterarAvaliacao"})
public class AlterarAvaliacao extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, Exception {

        if ("alterar".equals(request.getParameter("acao"))) {
            Integer idavaliacao = Integer.parseInt(request.getParameter("idavaliacao"));
            Date dataConsulta = converterData(request.getParameter("data_avaliacao").replace("-", "/"));
            Integer metaavaliacao = Integer.parseInt(request.getParameter("meta_avaliacao"));
            String observacao_importante_avaliacao = request.getParameter("observacao_importante_avaliacao");
            Double peso_desejavel_avaliacao = Double.parseDouble(request.getParameter("peso_desejavel_avaliacao"));
            String objetivo_avaliacao = request.getParameter("objetivo_avaliacao");
            Integer colesterol = Integer.parseInt(request.getParameter("colesterol"));
            Integer triglicerideos = Integer.parseInt(request.getParameter("triglicerideos"));
            Integer diabetes = Integer.parseInt(request.getParameter("diabetes"));

            Boolean acompan_avaliacao = Boolean.parseBoolean(request.getParameter("acompan_avaliacao"));
            String conduta_adotada_avaliacao = request.getParameter("conduta_adotada_avaliacao");
            Double qtd_agua_avaliacao = Double.parseDouble(request.getParameter("qtd_agua_avaliacao"));
            Boolean fumaavaliacao = Boolean.parseBoolean(request.getParameter("fuma"));
            Boolean praticaexercicio = Boolean.parseBoolean(request.getParameter("praticaexercicio"));
            String func_intestino_avaliacao = request.getParameter("func_intestino_avaliacao");
            String urina_avaliacao = request.getParameter("urina_avaliacao");
            String local_alim_avaliacao = request.getParameter("local_alim_avaliacao");

            Avaliacao avaliacao = new Avaliacao();
            avaliacao.setDataAvaliacao(dataConsulta);
            avaliacao.setMetaAvaliacao(metaavaliacao);
            avaliacao.setObservaoImportanteAvaliacao(observacao_importante_avaliacao);
            avaliacao.setPesoDesejavelAvaliacao(peso_desejavel_avaliacao);
            avaliacao.setObjetivoAvaliacao(objetivo_avaliacao);
            avaliacao.setColesterol(colesterol);
            avaliacao.setTrigliceridios(triglicerideos);
            avaliacao.setDiabetes(diabetes);
            avaliacao.setAcompanAvaliacao(acompan_avaliacao);
            avaliacao.setCondutaAdotadaAvaliacao(conduta_adotada_avaliacao);
            avaliacao.setQtdAguaAvaliacao(qtd_agua_avaliacao);
            avaliacao.setFumaAvaliacao(fumaavaliacao);
            avaliacao.setFuncIntestinoAvaliacao(func_intestino_avaliacao);
            avaliacao.setUrinaAvaliacao(urina_avaliacao);
            avaliacao.setLocalAlimAvaliacao(local_alim_avaliacao);
            avaliacao.setPraticaExercicioAvaliacao(praticaexercicio);
            avaliacao.setIdAvaliacao(idavaliacao);

            AvaliacaoDAOImpl daoAvaliacao = new AvaliacaoDAOImpl();
            String msg;
            try {
                if(daoAvaliacao.alterar(avaliacao)){
                    msg = "Alterado com sucesso.";
                }else{
                    msg = "Erro ao alterar";
                }
                request.setAttribute("msg", msg);
                request.getRequestDispatcher("ListarAvaliacao").forward(request, response);

            } catch (Exception e) {
                e.printStackTrace();
                System.out.println("Erro ao cadastrar Avalicao. Erro: " + e.getMessage());
            }

        } else {
            try {
                GenericDAO dao = new AvaliacaoDAOImpl();
                Integer id = Integer.parseInt(request.getParameter("idavaliacao"));
                request.setAttribute("avaliacao", dao.carregar(id));

                //buscando lista de medicamentos
                AvaliacaoMedicamentoSuplementoDAOImpl tableAvaliacao = new AvaliacaoMedicamentoSuplementoDAOImpl();
                request.setAttribute("medicamentos", tableAvaliacao.tabelaavaliacaomedicamento(id, 0));
                //buscando lista de patologias
                AvaliacaoPatologiaDAOImpl avaliacaoPatologiaDAOImpl = new AvaliacaoPatologiaDAOImpl();
                request.setAttribute("avaliacaopatologias", avaliacaoPatologiaDAOImpl.tabelaavaliacaopatologia(id));

                request.getRequestDispatcher("/nutricionista/carregaravaliacao.jsp").forward(request, response);
            } catch (Exception e) {
                System.out.println("Erro ao carregar avaliacao. Erro: " + e.getMessage());
            }
        }

    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (Exception ex) {
            Logger.getLogger(AlterarAvaliacao.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (Exception ex) {
            Logger.getLogger(AlterarAvaliacao.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
