/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.projetoestagio.controller;

import br.com.projetoestagio.DAO.GenericDAO;
import br.com.projetoestagio.DAO.PacienteDAOImpl;
import br.com.projetoestagio.model.Paciente;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author eliez
 */
@WebServlet(name = "CarregarDadosPaciente", urlPatterns = {"/CarregarDadosPaciente"})
public class CarregarDadosPaciente extends HttpServlet {

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
        int idPessoa = Integer.parseInt(request.getParameter("idPessoa"));
        
        try {
            PacienteDAOImpl dao = new PacienteDAOImpl();
            Paciente paciente = new Paciente();
            paciente = (Paciente) dao.carregarDadosPaciente(idPessoa);
            request.setAttribute("paciente", paciente);
            String script="<script>$('#alterarDadosPacienteModal').modal('show');</script>";
            request.setAttribute("script", script);
            request.getRequestDispatcher("paciente/indexpaciente.jsp").forward(request, response);
        } catch (Exception ex) {
            System.out.println("Problemas ao carregar dados Paciente! Erro: " + ex.getMessage());
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
