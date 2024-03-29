/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.projetoestagio.controller;

import br.com.projetoestagio.DAO.GenericDAO;
import br.com.projetoestagio.DAO.MedicamentoSuplementoDAOImpl;
import br.com.projetoestagio.model.MedicamentoSuplemento;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Grazy Martins
 */
@WebServlet(name = "CadastrarMedicamentoSuplemento", urlPatterns = {"/CadastrarMedicamentoSuplemento"})
public class CadastrarMedicamentoSuplemento extends HttpServlet {

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
            throws ServletException, IOException {
        
        String mensagem = null;
        String nomeMedicamentoSuplemento = request.getParameter("nomemedicamentosuplemento");
        String tipoMedicamentoSuplemento = request.getParameter("tipomedicamentosuplemento");

        MedicamentoSuplemento medicamentosuplemento = new MedicamentoSuplemento();

        medicamentosuplemento.setNomeMedicamentoSuplemento(nomeMedicamentoSuplemento.toUpperCase());
        medicamentosuplemento.setTipoMedicamentoSuplemento(tipoMedicamentoSuplemento.toUpperCase());
        medicamentosuplemento.setSincronizaMedicamentoSuplemento(1);
        medicamentosuplemento.setStatusMedicamentoSuplemento("A");

        try {
            GenericDAO dao = new MedicamentoSuplementoDAOImpl();
            if (dao.cadastrar(medicamentosuplemento)) {
                mensagem = "Cadastrado com sucesso";
            } else {
                mensagem = "Erro ao cadastrar";
            }

            request.setAttribute("sucesso", mensagem);
            request.getRequestDispatcher("cadastrarmedicamentosuplemento.jsp").forward(request, response);
        } catch (Exception ex) {
            System.out.println("Erro " + ex.getMessage());
            ex.printStackTrace();
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
        processRequest(request, response);
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
        processRequest(request, response);
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
