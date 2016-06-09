/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.projetoestagio.controller;

import br.com.projetoestagio.DAO.ExercicioDAOImpl;
import br.com.projetoestagio.DAO.PacienteDAOImpl;
import br.com.projetoestagio.model.Exercicio;
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
 * @author Eliezer.L
 */
@WebServlet(name = "AtivarPaciente", urlPatterns = {"/AtivarPaciente"})
public class AtivarPaciente extends HttpServlet {

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
        Integer idPessoa = Integer.parseInt(request.getParameter("idPessoa"));

        Paciente paciente = new Paciente();
        paciente.setIdPessoa(idPessoa);
        paciente.setStatusPessoa("A");
        try {
            PacienteDAOImpl dao = new PacienteDAOImpl();
            if (dao.inativar(paciente)) {
                mensagem = "Paciente ativado com sucesso!";
            } else {
                mensagem = "Problemas ao ativar Paciente!";
            }
            request.setAttribute("mensagem", mensagem);
            request.getRequestDispatcher("ListarPaciente").forward(request, response);
        } catch (Exception ex) {
            System.out.println("Problemas no Servlet ao ativar Paciente! Erro: " + ex.getMessage());
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